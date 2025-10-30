<?php

namespace App\Http\Controllers;

use App\Models\PemasukanIuran;
use App\Models\User;
use App\Models\UserIuran;
use Illuminate\Http\Request;

class IuranController extends Controller
{
    public function iuran_create(Request $request)
    {
        $validated = $request->validate([
            'kat_iuran_id' => 'required|exists:kat_iuran,kat_iuran_id',
            'tgl' => 'required|date',
            'nominal' => 'required|numeric|min:0',
            'ket' => 'nullable|string',
            'jml_kk' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
        ]);

        $iuran = PemasukanIuran::create($validated);

        $users = User::all();
        foreach ($users as $user) {
            UserIuran::create([
                'usr_id' => $user->id,
                'masuk_iuran_id ' => $iuran->id,
                'tgl' => now(),
                'is_paid' => false,
                'is_approved' => false
            ]);
        }

        return back()->with('success', 'Data iuran berhasil disimpan.');
    }

}
