<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Kat extends Model
{
    use HasFactory;

    protected $table = 'kat';
    protected $primaryKey = 'kats_id';
    protected $fillable = ['nm_kat', 'keterangan'];

    public function subkat()
    {
        // return $this->hasMany(subkat::class, 'kats_id');
    }
}
