<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pemasukan extends Model
{
    use HasFactory;

    protected $table = 'pemasukan';
    protected $primaryKey = 'pemasukan_id';
    protected $fillable = ['jenis_sumber_dana_id', 'tanggal', 'nominal', 'keterangan'];

    public function jenisSumberDana()
    {
        //return $this->belongsTo(JenisSumberDana::class, 'jenis_sumber_dana_id');
    }

    public function danaTotal()
    {
        return $this->hasOne(DanaTotal::class, 'pemasukan_id');
    }
}
