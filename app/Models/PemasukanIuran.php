<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PemasukanIuran extends Model
{
    protected $table = 'masuk_iuran';
    
    // Primary Key disetel kembali ke default 'id' (sesuai migration)
    // HAPUS: protected $primaryKey = 'masuk_iuran_id';
    
    protected $fillable = [
        'kat_iuran_id',
        'tgl',
        'nominal',
        'ket',
    ];

    public function kategori_iuran()
    {
        return $this->belongsTo(KategoriIuran::class, 'kat_iuran_id', 'id');
    }

    public function pengeluaran()
    {
        // Foreign key di tabel pengeluaran yang merujuk PK tabel ini ('id')
        return $this->hasMany(Pengeluaran::class, 'masuk_iuran_id', 'id');
    }
}