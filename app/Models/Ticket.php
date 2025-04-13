<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'client_name',
        'subject',
        'description',
        'priority',
        'status',
        'ticket_number',
        'agent_id',
        'assigned_by',
        'started_at',
        'completed_at',
        'wait_time',
        'business_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    /**
     * define relationship with the user model.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'agent_id');
    }

    /**
     * define relationship with the user model.
     */
    public function assignedBy()
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }

    /**
     * define relationship with the business model.
     */
    public function business()
    {
        return $this->belongsTo(Business::class, 'business_id');
    }
    /**
     * define relationship with the agent model.
     */
    public function agent()
    {
        return $this->belongsTo(User::class, 'agent_id');
    }
}