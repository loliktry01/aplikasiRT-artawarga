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
        Schema::table('pengurus', function (Blueprint $table) {
            // Drop the nama_pengurus column since we'll get the name from the user
            if (Schema::hasColumn('pengurus', 'nama_pengurus')) {
                $table->dropColumn('nama_pengurus');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengurus', function (Blueprint $table) {
            $table->string('nama_pengurus')->nullable();
        });
    }
};