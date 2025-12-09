<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PemasukanIuran extends Model
{
    use HasFactory;

    protected $table = 'masuk_iuran';
    
    protected $fillable = [
        'kat_iuran_id', 
        'usr_id', // BARU: Tambahkan FK User
        'tgl',
        'nominal',
        'ket',
        'status', // BARU: Tambahkan kolom status
        'bkt_byr',
    ];

    public function kategori_iuran()
    {
        // tambahkan foreign key & local key biar eksplisit
        return $this->belongsTo(KategoriIuran::class, 'kat_iuran_id', 'id');
    }

    public function pengeluaran()
    {
        return $this->hasMany(Pengeluaran::class);
    }

}
