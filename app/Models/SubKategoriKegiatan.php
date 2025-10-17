<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SubKategoriKegiatan extends Model
{
    use HasFactory;

    protected $table = 'sub_kategori_kegiatan';
    protected $primaryKey = 'sub_kategori_kegiatan_id';
    protected $fillable = [
        'kategori_kegiatan_id',
        'kegiatan_id',
        'nama_sub_kategori',
        'keterangan'
    ];

    public function kategoriKegiatan()
    {
        return $this->belongsTo(KategoriKegiatan::class, 'kategori_kegiatan_id');
    }

    public function kegiatan()
    {
        return $this->belongsTo(Kegiatan::class, 'kegiatan_id');
    }
}
