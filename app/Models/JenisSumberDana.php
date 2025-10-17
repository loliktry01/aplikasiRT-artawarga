<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JenisSumberDana extends Model
{
    use HasFactory;

    protected $table = 'jenis_sumber_dana';
    protected $primaryKey = 'jenis_sumber_dana_id';
    protected $fillable = ['nama_sumber_dana', 'keterangan'];

    public function pemasukan()
    {
        return $this->hasMany(Pemasukan::class, 'jenis_sumber_dana_id');
    }

    public function pengeluaran()
    {
        return $this->hasMany(Pengeluaran::class, 'jenis_sumber_dana_id');
    }
}
