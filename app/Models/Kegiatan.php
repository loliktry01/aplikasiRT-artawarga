<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Kegiatan extends Model
{
    use HasFactory;

    protected $table = 'kegiatan';
    protected $primaryKey = 'kegiatan_id';
    protected $fillable = ['nama_kegiatan', 'tanggal', 'anggaran'];

    public function subKegiatan()
    {
        return $this->hasMany(SubKegiatan::class, 'kegiatan_id');
    }

    public function subKategoriKegiatan()
    {
        return $this->hasMany(SubKategoriKegiatan::class, 'kegiatan_id');
    }

    public function pengeluaran()
    {
        return $this->hasMany(Pengeluaran::class, 'kegiatan_id');
    }
}
