<?php

namespace App\Http\Controllers;

use App\Models\KategoriIuran;
use App\Models\PemasukanIuran;
use App\Models\Pengumuman;
use App\Models\User;
use Illuminate\Http\Request;

class IuranController extends Controller
{
    public function kat_iuran_create(Request $request)
    {
        $validated = $request->validate([
            'nm_kat' => 'required|string',
        ]);

        $kat_iuran = KategoriIuran::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Kategori iuran berhasil disimpan.',
            'data' => $kat_iuran,
        ]);
    }



    public function kat_iuran_delete($id)
    {
        $kategori = KategoriIuran::find($id);

        if (!$kategori) {
            return response()->json([
                'success' => false,
                'message' => 'Data kategori iuran tidak ditemukan.'
            ], 404);
        }

        $kategori->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data kategori iuran berhasil dihapus.'
        ]);
    }

    public function index()
    {
        return response()->json([
            'data' => PemasukanIuran::select('kat_iuran_id', 'tgl', 'nominal', 'ket', 'jml_kk', 'total')
                ->latest()
                ->get()
        ]);
    }

    public function iuran_create(Request $request)
    {
        $validated = $request->validate([
            'kat_iuran_id' => 'required|exists:kat_iuran,id',
            'tgl' => 'required|date',
            'nominal' => 'required|numeric|min:0',
            'ket' => 'nullable|string',
        ]);

        $iuran = PemasukanIuran::create([
            'kat_iuran_id' => $validated['kat_iuran_id'],
            'tgl' => $validated['tgl'],
            'nominal' => $validated['nominal'],
            'ket' => $validated['ket'],
            'status' => 'approved',
        ]);
       
        return back()->with('success', 'Data iuran berhasil disimpan.');
    }



    public function pengumuman_create(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string',
            'ket' => 'required|string',
            'kat_iuran_id' => 'required|exists:kat_iuran,id',
        ]);

        $pengumuman = Pengumuman::create([
            'judul' => $validated['judul'],
            'ket' => $validated['ket'],
            'kat_iuran_id' => $validated['kat_iuran_id'],
        ]);

        // $users = User::whereNotIn('role_id', [1, 2, 3, 4])->get();
        $users = User::all();

        foreach ($users as $user) {
            PemasukanIuran::create([
                'usr_id' => $user->id,
                'kat_iuran_id' => $validated['kat_iuran_id'],
                'pengumuman_id' => $pengumuman->id,
                'tgl' => now(),
                'status' => 'tagihan',
            ]);
        }

        return back()->with('success', 'Pengumuman berhasil dibuat dan tagihan dikirim ke semua warga.');
    }

    

}
