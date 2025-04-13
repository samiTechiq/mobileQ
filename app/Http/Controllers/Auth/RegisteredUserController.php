<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'business_name' => 'required|string|max:255',
            'business_email' => 'required|string|lowercase|email|max:255|unique:' . Business::class,
            'business_phone' => 'required|string|',
            'business_address' => 'required|string|max:255',
        ]);

        $userData = null;
        $businessData = null;

        DB::transaction(function () use ($request, &$user, &$business) {
            // Create business
            $business = Business::create([
                'name' => $request->business_name,
                'address' => $request->business_address,
                'phone' => $request->business_phone,
                'email' => $request->business_email,
            ]);

            // Create initial business admin user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'business_admin',
                'business_id' => $business->id,
            ]);
        });

        // Store business details in session
        session([
            'business' => [
                'id' => $business->id,
                'name' => $business->name,
                'email' => $business->email,
                'phone' => $business->phone,
                'address' => $business->address,
            ]
        ]);

        event(new Registered($user));

        Auth::login($user);

        if ($user->role === 'business_admin') {
            return redirect()->route('dashboard');
        } elseif ($user->role === 'receptionist') {
            return redirect()->route('receptionist.dashboard');
        } elseif ($user->role === 'agent') {
            return redirect()->route('agent.dashboard');
        } else {
            return redirect()->route('home')->with([
                'message' => 'Welcome to your dashboard',
                'type' => 'success',
            ]);
        }
    }
}