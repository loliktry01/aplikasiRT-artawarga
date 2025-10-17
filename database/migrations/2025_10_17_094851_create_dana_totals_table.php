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
        Schema::create('dana_totals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pemasukan_id')->nullable()->constrained('pemasukans', 'id')->cascadeOnUpdate()->nullOnDelete();
            $table->foreignId('pengeluaran_id')->nullable()->constrained('pengeluarans', 'id')->cascadeOnUpdate()->nullOnDelete();
            $table->decimal('total', 15, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dana_totals');
    }
};
