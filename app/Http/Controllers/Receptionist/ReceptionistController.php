<?php

namespace App\Http\Controllers\Receptionist;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Agent;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ReceptionistController extends Controller
{
    public function index(Request $request)
    {
        // Get completed tickets (limit to 5)
        $completedTickets = Ticket::with(['business:id,name', 'agent:id,name'])
            ->where('status', 'completed')
            ->orderByDesc('completed_at')
            ->limit(5)
            ->get()
            ->map(function ($ticket) {
                $ticket->wait_time_formatted = $this->formatMinutes($ticket->wait_time);
                return $ticket;
            });

        // Get in-progress tickets
        $inProgressTickets = Ticket::with(['business:id,name', 'agent:id,name'])
            ->where('status', 'in_progress')
            ->orderByDesc('started_at')
            ->get()
            ->map(function ($ticket) {
                $ticket->in_progress_minutes = Carbon::parse($ticket->started_at)->diffInMinutes(now());
                $ticket->in_progress_formatted = 'Called ' . $this->formatMinutes(ceil($ticket->in_progress_minutes)) . ' ago';
                return $ticket;
            });

        // Get waiting tickets
        $waitingTickets = Ticket::with(['business:id,name', 'agent:id,name'])
            ->where('status', 'waiting')
            ->orderByRaw(
                "CASE
                WHEN priority = 'high' THEN 1
                WHEN priority = 'medium' THEN 2
                WHEN priority = 'low' THEN 3
                ELSE 4
                END"
            )
            ->orderBy('created_at')
            ->get()
            ->map(function ($ticket) {
                $ticket->waiting_minutes = Carbon::parse($ticket->created_at)->diffInMinutes(now());
                $ticket->waiting_formatted = $this->formatMinutes($ticket->waiting_minutes);
                return $ticket;
            });

        // Combine all tickets and sort by created_at
        $recentTickets = $completedTickets->concat($inProgressTickets)->concat($waitingTickets)
            ->sortByDesc('created_at')
            ->take(10)
            ->values()
            ->map(function ($ticket) {
                // Format created_at as time ago
                $ticket->created_at_formatted = $this->timeAgo($ticket->created_at);

                // Format status with proper capitalization
                $ticket->status_formatted = ucfirst(str_replace('_', ' ', $ticket->status));

                return $ticket;
            });

        // Get all agents who have tickets assigned to them today

        $agents = User::whereIn('id', function ($query) {
            $query->select('agent_id')
                ->from('tickets')
                ->whereNotNull('agent_id')
                ->whereDate('created_at', Carbon::today());
        })
            ->get(['id', 'name']);

        // Calculate statistics for each agent
        $agentStats = [];

        foreach ($agents as $agent) {
            // Count waiting tickets for this agent
            $waitingCount = Ticket::where('agent_id', $agent->id)
                ->where('status', 'waiting')
                ->count();

            // Count in-progress tickets for this agent
            $inProgressCount = Ticket::where('agent_id', $agent->id)
                ->where('status', 'in_progress')
                ->count();

            // Calculate average wait time for completed tickets
            $avgWaitTime = Ticket::where('agent_id', $agent->id)
                ->where('status', 'completed')
                ->whereNotNull('wait_time')
                ->avg('wait_time') ?: 0;

            $agentStats[$agent->id] = [
                'waiting_count' => $waitingCount,
                'in_progress_count' => $inProgressCount,
                'avg_wait_time' => round($avgWaitTime),
            ];
        }

        // Get overall statistics
        $overallStats = [
            'total_waiting' => Ticket::where('status', 'waiting')->count(),
            'total_in_progress' => Ticket::where('status', 'in_progress')->count(),
            'total_completed_today' => Ticket::where('status', 'completed')
                ->whereDate('completed_at', Carbon::today())
                ->count(),
            'avg_wait_time' => round(Ticket::where('status', 'completed')
                ->whereNotNull('wait_time')
                ->avg('wait_time') ?: 0),
        ];


        return Inertia::render('receptionist/dashboard', [
            'recentTickets' => $recentTickets,
            'agents' => $agents,
            'agentStats' => $agentStats,
            'overallStats' => $overallStats
        ]);
    }

    /**
     * Format minutes into a human-readable string
     *
     * @param int $minutes
     * @return string
     */
    private function formatMinutes($minutes)
    {
        if ($minutes < 60) {
            return $minutes . ' min';
        }

        $hours = floor($minutes / 60);
        $mins = $minutes % 60;

        if ($hours < 24) {
            return $hours . 'h ' . $mins . 'm';
        }

        $days = floor($hours / 24);
        $hrs = $hours % 24;

        return $days . 'd ' . $hrs . 'h';
    }

    /**
     * Convert timestamp to time ago format
     *
     * @param string $timestamp
     * @return string
     */
    private function timeAgo($timestamp)
    {
        return Carbon::parse($timestamp)->diffForHumans(null, true, true, 1);
    }

    /**
     * create ticket
     */
    public function create()
    {
        $agents = Agent::with('user:id,name')->where('status', 'available')->get();
        return Inertia::render('receptionist/ticket/create', [
            'agents' => $agents,
        ]);
    }

    /**
     * Create a new ticket
     *
     * @param Request $request
     * @return Inertia\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'client_name' => 'required|string|max:255',
            'agent_id' => 'nullable|exists:users,id',
            'priority' => 'required|in:low,medium,high',
            'description' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:255',
        ]);
        // dd($request->all());
        try {
            // Generate a unique ticket number (format: YMD-XXX where XXX is sequential)
            $ticketNumber = date('Ymd') . '-' . $this->generateSequentialNumber();

            $ticket = Ticket::create([
                'ticket_number' => $ticketNumber,
                'client_name' => $request->client_name,
                'business_id' => session('business.id'),
                'subject' => $request->subject ?? '',
                'agent_id' => $request->agent_id,
                'priority' => $request->priority,
                'description' => $request->description ?? '',
                'status' => 'waiting',
                'assigned_by' => Auth::id(),
            ]);

            return redirect()->route('receptionist.ticket.create')->with([
                'success' => true,
                'message' => 'Ticket created successfully',
                'ticket_number' => $ticket->ticket_number,
            ]);
        } catch (\Exception $e) {
            report($e);
            return redirect()->route('receptionist.ticket.create')->with([
                'success' => false,
                'message' => 'Failed to create ticket',
            ]);
        }
    }

    /**
     * Generate a sequential number for the ticket
     *
     * @return string
     */
    private function generateSequentialNumber()
    {
        // Get the last ticket number for today
        $today = date('Ymd');
        $pattern = $today . '-%';

        $lastTicket = Ticket::where('ticket_number', 'like', $pattern)
            ->orderByDesc('ticket_number')
            ->first();

        if ($lastTicket) {
            // Extract the sequential number and increment
            $parts = explode('-', $lastTicket->ticket_number);
            $seqNumber = (int)$parts[1] + 1;
        } else {
            // First ticket of the day
            $seqNumber = 1;
        }

        // Pad with zeros to ensure at least 3 digits
        return str_pad($seqNumber, 3, '0', STR_PAD_LEFT);
    }
}