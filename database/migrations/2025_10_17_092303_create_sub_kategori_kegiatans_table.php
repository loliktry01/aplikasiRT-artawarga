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
        Schema::create('sub_kategori_kegiatans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kategori_kegiatan_id')->constrained('kategori_kegiatan', 'kategori_kegiatan_id')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreignId('kegiatan_id')->nullable()->constrained('kegiatan', 'kegiatan_id')->  cascadeOnUpdate()->nullOnDelete();
            $table->string('nama_sub_kategori');
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_kategori_kegiatans');
    }
};
