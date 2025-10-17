<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained('roles')->cascadeOnDelete();
            $table->string('email')->unique();
            $table->string('username');
            $table->string('password');
            $table->string('nama_lengkap');
            $table->string('foto_profil')->nullable();
            $table->string('no_hp');
            
            $table->string('kode_provinsi');
            $table->string('kode_kota_kabupaten');
            $table->string('kode_kecamatan');
            $table->string('kode_desa');

            $table->string('rt_rw');
            $table->string('alamat_lengkap');
            $table->string('kode_pos');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
