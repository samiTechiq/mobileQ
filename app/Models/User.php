<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'avatar',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'timezone',
        'locale',
        'business_id',
        'phone',
        'active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relationship with business
    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    // Relationship with agent
    public function agent(): HasOne
    {
        return $this->hasOne(Agent::class);
    }

    // Role-based authorization helper methods
    public function isAdmin(): string
    {
        return $this->role === 'admin';
    }
    public function isAgent(): string
    {
        return $this->role === 'agent';
    }

    public function isBusinessAdmin()
    {
        return $this->role === 'business_admin';
    }

    public function isReceptionist()
    {
        return $this->role === 'receptionist';
    }
}