<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Agent\AgentController;
use App\Http\Controllers\Receptionist\ReceptionistController;
use App\Http\Controllers\Receptionist\TicketController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home/index');
})->name('home');



Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard')->middleware('dashboard');

    // Route::get('/receptionist/dashboard', function () {
    //     return Inertia::render('receptionist/dashboard');
    // })->name('receptionist.dashboard')->middleware('receptionist');

    // Agent Route List
    Route::controller(AgentController::class)->group(function () {
        Route::get('/agent/dashboard', 'index')->name('agent.dashboard');
        Route::get('/agent/ticket/callnext/{id}', 'callNextTicket')->name('agent.ticket.callnext');
        Route::get('/agent/ticket/complete/{id}', 'completeTicket')->name('agent.ticket.complete');
        Route::put('/agent/ticket/update/{id}', 'update')->name('agent.ticket.update');
        Route::delete('/agent/ticket/destroy/{id}', 'destroy')->name('agent.ticket.destroy');
    })->middleware('agent');

    // Receptionist Route List
    Route::controller(ReceptionistController::class)->group(function () {
        Route::get('/receptionist/dashboard', 'index')->name('receptionist.dashboard');
        Route::get('/receptionist/ticket/create', 'create')->name('receptionist.ticket.create');
        Route::post('/receptionist/ticket/store', 'store')->name('receptionist.ticket.store');
        Route::get('/receptionist/ticket/{id}', 'show')->name('receptionist.ticket.show');
        Route::get('/receptionist/ticket/edit/{id}', 'edit')->name('receptionist.ticket.edit');
        Route::put('/receptionist/ticket/update/{id}', 'update')->name('receptionist.ticket.update');
        Route::delete('/receptionist/ticket/destroy/{id}', 'destroy')->name('receptionist.ticket.destroy');
    })->middleware('receptionist');

    Route::controller(UserController::class)->group(function () {
        Route::get('/admin/users', 'index')->name('admin.users.index');
        Route::get('/admin/users/create', 'create')->name('admin.users.create');
        Route::get('/admin/users/{id}', 'show')->name('admin.users.show');
        Route::post('/admin/users', 'store')->name('admin.users.store');
        Route::get('/admin/users/edit/{id}', 'edit')->name('admin.users.edit');
        Route::put('/admin/users/update/{id}', 'update')->name('admin.users.update');
        Route::get('/admin/users/delete/{id}', 'delete')->name('admin.users.delete');
        Route::delete('/admin/users/destroy/{id}', 'destroy')->name('admin.users.destroy');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';