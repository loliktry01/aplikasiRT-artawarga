<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PemasukanIuran extends Model
{
    protected $table = 'masuk_iuran';

    public function user_iuran()
    {
        return $this->hasMany(UserIuran::class);
    }
    
}
