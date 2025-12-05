<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('keg', function (Blueprint $table) {
            // Mengubah kolom tgl_selesai agar menerima NULL
            $table->date('tgl_selesai')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('keg', function (Blueprint $table) {
            // Mengembalikan kolom tgl_selesai menjadi NOT NULL
            $table->date('tgl_selesai')->nullable(false)->change();
        });
    }
};