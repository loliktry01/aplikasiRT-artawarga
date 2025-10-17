<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'email', 'username', 'password', 'nama_lengkap', 'foto_profil', 'no_hp',
        'provinsi_code', 'kota_kabupaten_code', 'kecamatan_code', 'desa_code',
        'rt_rw', 'alamat_lengkap', 'kode_pos'
    ];

    protected $hidden = ['password'];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
