<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Models\Agent;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::where('business_id', session('business.id'))->get();
        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/users/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string|max:255',
        ]);

        DB::transaction(function () use ($request) {
            // Create the user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
                'business_id' => session('business.id'),
            ]);

            if ($user->role == 'agent') {
                $user->agent()->create([
                    'business_id' => session('business.id'),
                    'status' => 'available',
                ]);
            }
        });
        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('admin/users/show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('admin/users/edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Prepare validation rules
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class . ',email,' . $id,
            'role' => 'required|string|max:255',
        ];

        // Only validate password if it's provided
        if ($request->filled('password')) {
            $rules['password'] = ['confirmed', Rules\Password::defaults()];
        }

        $request->validate($rules);

        // Find the user
        $user = User::findOrFail($id);

        // Prepare update data
        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ];

        // Only update password if it's provided
        if ($request->filled('password')) {
            $userData['password'] = Hash::make($request->password);
        }

        // Update the user
        DB::transaction(function () use ($user, $userData) {
            $user->update($userData);
            // If the user is an agent and if the id does not exist in the agents table, create a new agent
            if ($user->role == 'agent') {
                $agent = Agent::where('user_id', $user->id)->first();
                if (!$agent) {
                    $user->agent()->create([
                        'business_id' => session('business.id'),
                        'status' => 'available',
                    ]);
                }
            }
            // If the user is not an agent and if the id exists in the agents table, delete the agent
            if ($user->role != 'agent') {
                $agent = Agent::where('user_id', $user->id)->first();
                if ($agent) {
                    $agent->delete();
                }
            }
        });

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }

    /**
     * Show the page for deleting the specified resource.
     */
    public function delete(string $id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('admin/users/delete', [
            'user' => $user,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find the user
        $user = User::findOrFail($id);

        // Delete the user
        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }
}