<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Business extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'timezone',
        'logo_path',
        'website',
        'is_active',
        'is_verified',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Create a slug from the name if not set
        static::creating(function ($business) {
            if (!$business->slug) {
                $business->slug = Str::slug($business->name);

                // Ensure slug is unique
                $count = 1;
                $originalSlug = $business->slug;
                while (static::where('slug', $business->slug)->exists()) {
                    $business->slug = $originalSlug . '-' . $count++;
                }
            }
        });
    }

    /**
     * Get the users for the business.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
