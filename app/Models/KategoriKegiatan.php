<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class KategoriKegiatan extends Model
{
    use HasFactory;

    protected $table = 'kategori_kegiatan';
    protected $primaryKey = 'kategori_kegiatan_id';
    protected $fillable = ['nama_kategori', 'keterangan'];

    public function subKategoriKegiatan()
    {
        return $this->hasMany(SubKategoriKegiatan::class, 'kategori_kegiatan_id');
    }
}
