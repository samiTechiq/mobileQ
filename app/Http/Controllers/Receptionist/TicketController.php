<?php

namespace App\Http\Controllers\Receptionist;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Agent;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
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

    /**
     * Get a ticket by ID
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTicketById($id)
    {
        $ticket = Ticket::with([
            'business:id,name',
            'agent:id,name',
            'assignedBy:id,name'
        ])
            ->findOrFail($id);

        return response()->json($ticket);
    }

    /**
     * Get a ticket by number
     *
     * @param string $ticketNumber
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTicketByNumber($ticketNumber)
    {
        $ticket = Ticket::with([
            'business:id,name',
            'agent:id,name',
            'assignedBy:id,name'
        ])
            ->where('ticket_number', $ticketNumber)
            ->firstOrFail();

        return response()->json($ticket);
    }

    /**
     * Get all waiting tickets
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getWaitingTickets(Request $request)
    {
        $businessId = $request->business_id;
        $agentId = $request->agent_id;

        $tickets = Ticket::with([
            'business:id,name',
            'agent:id,name'
        ])
            ->where('status', 'waiting')
            ->when($businessId, function ($query) use ($businessId) {
                return $query->where('business_id', $businessId);
            })
            ->when($agentId, function ($query) use ($agentId) {
                return $query->where('agent_id', $agentId);
            })
            // Order by priority first (emergency > urgent > normal > high > medium > low), then by creation time
            ->orderByRaw("FIELD(priority, 'emergency', 'urgent', 'normal', 'high', 'medium', 'low')")
            ->orderBy('created_at')
            ->get()
            ->map(function ($ticket) {
                // Calculate waiting time in minutes
                $ticket->waiting_minutes = Carbon::parse($ticket->created_at)->diffInMinutes(now());
                return $ticket;
            });

        return response()->json($tickets);
    }

    /**
     * Get all in-progress tickets
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getInProgressTickets(Request $request)
    {
        $businessId = session('business.id');
        $agentId = $request->user()->id;

        $tickets = Ticket::where('status', 'in_progress')
            ->when($businessId, function ($query) use ($businessId) {
                return $query->where('business_id', $businessId);
            })->when($agentId, function ($query) use ($agentId) {
                return $query->where('agent_id', $agentId);
            })->orderBy('started_at')
            ->get()
            ->map(function ($ticket) {
                // Calculate in-progress time in minutes
                $ticket->in_progress_minutes = Carbon::parse($ticket->started_at)->diffInMinutes(now());
                return $ticket;
            });

        return $tickets;
    }


    /**
     * Get completed tickets
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCompletedTickets(Request $request)
    {
        $businessId = $request->business_id;
        $agentId = $request->agent_id;
        $limit = $request->limit ?? 50;

        $tickets = Ticket::with([
            'business:id,name',
            'agent:id,name'
        ])
            ->where('status', 'completed')
            ->when($businessId, function ($query) use ($businessId) {
                return $query->where('business_id', $businessId);
            })
            ->when($agentId, function ($query) use ($agentId) {
                return $query->where('agent_id', $agentId);
            })
            ->orderByDesc('completed_at')
            ->limit($limit)
            ->get();

        return response()->json($tickets);
    }

    /**
     * Call the next ticket
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function callNextTicket(string $id)
    {

        try {
            DB::beginTransaction();

            // Update ticket status
            $updated = Ticket::where('id', $id)->where('status', 'waiting')->update([
                'status' => 'in_progress',
                'started_at' => now(),
            ]);

            if ($updated) {
                // Update agent status if needed
                // User::where('id', $request->agent_id)->update(['status' => 'busy']);

                DB::commit();
                return redirect()->route('agent.dashboard')->with([
                    'success' => true,
                    'message' => 'Ticket called successfully',
                ]);
            } else {
                DB::rollBack();
                return redirect()->route('agent.dashboard')->with([
                    'success' => false,
                    'message' => 'Ticket not found or not in waiting status',
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            report($e);
            return redirect()->route('agent.dashboard')->with([
                'success' => false,
                'message' => 'Database error',
            ]);
        }
    }

    /**
     * Complete a ticket
     *
     * @param Request $request
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function completeTicket(Request $request, string $id)
    {
        try {
            DB::beginTransaction();

            // First get the ticket to calculate wait time
            $ticket = Ticket::where('id', $id)
                ->where('status', 'in_progress')
                ->where('agent_id', $request->user()->id)
                ->first();

            if (!$ticket) {
                DB::rollBack();
                return redirect()->route('agent.dashboard')->with([
                    'success' => false,
                    'message' => 'Ticket not found or not in progress',
                ]);
            }

            // Calculate wait time (from creation to being called)
            $waitTimeMinutes = Carbon::parse($ticket->created_at)->diffInMinutes(Carbon::parse($ticket->started_at));

            // Update ticket status
            $ticket->status = 'completed';
            $ticket->completed_at = now();
            $ticket->wait_time = $waitTimeMinutes;
            $ticket->save();

            DB::commit();
            return redirect()->route('agent.dashboard')->with([
                'success' => true,
                'message' => 'Ticket completed successfully',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            report($e);
            return redirect()->route('agent.dashboard')->with([
                'success' => false,
                'message' => 'Database error',
            ]);
        }
    }

    /**
     * Cancel a ticket
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function cancelTicket(Request $request)
    {
        $request->validate([
            'ticket_id' => 'required|exists:tickets,id',
        ]);

        try {
            $updated = Ticket::where('id', $request->ticket_id)
                ->where('status', 'waiting')
                ->update(['status' => 'cancel']);

            if ($updated) {
                return response()->json(['success' => true]);
            } else {
                return response()->json(['success' => false, 'message' => 'Ticket not found or not in waiting status'], 404);
            }
        } catch (\Exception $e) {
            report($e);
            return response()->json(['success' => false, 'message' => 'Database error'], 500);
        }
    }

    /**
     * Get average wait time
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAverageWaitTime(Request $request)
    {
        $businessId = $request->business_id;
        $period = $request->period ?? 'today';

        try {
            $query = Ticket::where('status', 'completed')
                ->whereNotNull('wait_time');

            if ($businessId) {
                $query->where('business_id', $businessId);
            }

            if ($period === 'today') {
                $query->whereDate('created_at', Carbon::today());
            } elseif ($period === 'week') {
                $query->where('created_at', '>=', Carbon::now()->subDays(7));
            } elseif ($period === 'month') {
                $query->where('created_at', '>=', Carbon::now()->subDays(30));
            }

            $average = $query->avg('wait_time');

            return response()->json(['average_wait_time' => $average ? round($average) : 0]);
        } catch (\Exception $e) {
            report($e);
            return response()->json(['average_wait_time' => 0]);
        }
    }

    /**
     * Get current queue length
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCurrentQueueLength(Request $request)
    {
        $businessId = $request->business_id;
        $agentId = $request->agent_id;

        try {
            $query = Ticket::where('status', 'waiting');

            if ($businessId) {
                $query->where('business_id', $businessId);
            }

            if ($agentId) {
                $query->where('agent_id', $agentId);
            }

            $count = $query->count();

            return response()->json(['queue_length' => $count]);
        } catch (\Exception $e) {
            report($e);
            return response()->json(['queue_length' => 0]);
        }
    }

    /**
     * Get a ticket's position in the queue
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTicketPosition(Request $request)
    {
        $request->validate([
            'ticket_id' => 'required|exists:tickets,id',
        ]);

        try {
            // First get the ticket details
            $ticket = Ticket::where('id', $request->ticket_id)
                ->where('status', 'waiting')
                ->first();

            if (!$ticket) {
                return response()->json(['success' => false, 'message' => 'Ticket not found or not in waiting status'], 404);
            }

            // Count tickets with higher priority or earlier creation time
            $query = Ticket::where('status', 'waiting')
                ->where('business_id', $ticket->business_id)
                ->where(function ($q) use ($ticket) {
                    // Higher priority tickets
                    $q->whereRaw("FIELD(priority, 'emergency', 'urgent', 'normal', 'high', 'medium', 'low') < FIELD(?, 'emergency', 'urgent', 'normal', 'high', 'medium', 'low')", [$ticket->priority])
                        // Same priority but created earlier
                        ->orWhere(function ($q2) use ($ticket) {
                            $q2->whereRaw("FIELD(priority, 'emergency', 'urgent', 'normal', 'high', 'medium', 'low') = FIELD(?, 'emergency', 'urgent', 'normal', 'high', 'medium', 'low')", [$ticket->priority])
                                ->where('created_at', '<', $ticket->created_at);
                        });
                });

            if ($ticket->agent_id) {
                $query->where(function ($q) use ($ticket) {
                    $q->where('agent_id', $ticket->agent_id)
                        ->orWhereNull('agent_id');
                });
            }

            $position = $query->count() + 1; // Position is 1-based (position 1 means next in line)

            return response()->json([
                'success' => true,
                'position' => $position
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json(['success' => false, 'message' => 'Database error'], 500);
        }
    }
}