<?php

namespace App\Actions;

use App\Models\Agent;

class CreateAgent
{
    public function __invoke($userId, $business, $status)
    {
        // Create a new agent instance
        $agent = new Agent();
        $agent->user_id = $userId;
        $agent->business_id = $business;
        $agent->status = $status;
        $agent->save();

        return $agent;
    }
}