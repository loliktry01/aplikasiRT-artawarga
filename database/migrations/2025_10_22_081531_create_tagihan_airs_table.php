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
        Schema::create('tagihan_airs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kat_iuran_id')->constrained('kat_iuran')->cascadeOnDelete();
            $table->foreignId('usr_id')->constrained('usr')->cascadeOnDelete();
            $table->date('tgl');
            $table->integer('mtr_bln_lalu');
            $table->integer('mtr_skrg');
            $table->integer('total');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tagihan_airs');
    }
};
