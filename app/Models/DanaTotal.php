<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DanaTotal extends Model
{
    use HasFactory;

    protected $table = 'dana_total';
    protected $primaryKey = 'dana_total_id';
    protected $fillable = ['pemasukan_id', 'pengeluaran_id', 'total'];

    public function pemasukan()
    {
        return $this->belongsTo(Pemasukan::class, 'pemasukan_id');
    }

    public function pengeluaran()
    {
        return $this->belongsTo(Pengeluaran::class, 'pengeluaran_id');
    }
}
