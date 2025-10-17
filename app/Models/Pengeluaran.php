<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pengeluaran extends Model
{
    use HasFactory;

    protected $table = 'pengeluaran';
    protected $primaryKey = 'pengeluaran_id';
    protected $fillable = [
        'kegiatan_id',
        'tanggal',
        'jumlah',
        'keterangan',
        'jenis_sumber_dana_id'
    ];

    public function jenisSumberDana()
    {
        return $this->belongsTo(JenisSumberDana::class, 'jenis_sumber_dana_id');
    }

    public function kegiatan()
    {
        return $this->belongsTo(Kegiatan::class, 'kegiatan_id');
    }

    public function danaTotal()
    {
        return $this->hasOne(DanaTotal::class, 'pengeluaran_id');
    }
}
