<?php

namespace App\Http\Controllers\Agent;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AgentController extends Controller
{
    /**
     * show the agent dashboard.
     */
    public function index(Request $request)
    {
        $businessId = session('business.id');
        $agentId = $request->user()->id;
        $tickets = Ticket::with('assignedBy:id,name')
            ->where('agent_id', $agentId)
            ->where('business_id', $businessId)
            ->where('status', 'waiting')
            ->orderBy('created_at', 'desc')
            ->get();

        $ticketInProgress = Ticket::where('status', 'in_progress')
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
        $ticketCount = [
            'total' => $tickets->count(),
            'in_progress' => $ticketInProgress->count(),
            'completed' => Ticket::where('status', 'completed')
                ->where('agent_id', $agentId)
                ->where('business_id', $businessId)
                ->count(),
        ];
        return inertia('agent/dashboard', [
            'tickets' => $tickets,
            'ticketInProgress' => $ticketInProgress[0] ?? null,
            'ticketCount' => $ticketCount

        ]);
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
}
