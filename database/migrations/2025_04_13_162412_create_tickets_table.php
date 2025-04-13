<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('client_name')->nullable();
            $table->string('subject')->nullable();
            $table->text('description')->nullable();
            $table->enum('priority', ['low', 'medium', 'high'])->default('low');
            $table->enum('status', ['waiting', 'in_progress', 'completed', 'cancel'])->default('waiting');
            $table->string('ticket_number')->unique();
            $table->foreignId('agent_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('assigned_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->integer('wait_time')->nullable();
            $table->foreignId('business_id')->nullable()->constrained('businesses')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};