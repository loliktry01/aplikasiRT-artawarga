<?php

namespace App\Http\Controllers;

use App\Models\Pengurus;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengurusController extends Controller
{
    public function index()
    {
        $pengurus = Pengurus::with('user')->orderBy('jabatan')->get();

        // Define all possible positions
        $jabatanOptions = [
            'Ketua RT',
            'Sekretaris',
            'Bendahara',
            'Keamanan 1',
            'Keamanan 2',
            'Pembangunan 1',
            'Pembangunan 2',
            'Perlengkapan 1',
            'Perlengkapan 2',
            'Kerohanian',
            'Sosial',
            'Koordinator Jimpitan'
        ];

        return Inertia::render('Manajemen/Pengurus', [
            'pengurus' => $pengurus,
            'jabatanOptions' => $jabatanOptions,
            'users' => User::where('role_id', '!=', 1)->orderBy('nm_lengkap', 'asc')->get(['id', 'nm_lengkap', 'no_kk', 'email']), // Exclude superadmin and sort by name
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:usr,id',
            'jabatan' => 'required|string|in:Ketua RT,Sekretaris,Bendahara,Keamanan 1,Keamanan 2,Pembangunan 1,Pembangunan 2,Perlengkapan 1,Perlengkapan 2,Kerohanian,Sosial,Koordinator Jimpitan',
            'no_hp' => 'nullable|string|max:15',
            'keterangan' => 'nullable|string',
            'status' => 'required|in:aktif,tidak_aktif',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_mulai',
        ]);

        // Get user name to store with the pengurus record
        $user = User::findOrFail($request->user_id);

        $pengurus = Pengurus::create([
            'user_id' => $request->user_id,
            'jabatan' => $request->jabatan,
            'no_hp' => $request->no_hp,
            'keterangan' => $request->keterangan,
            'status' => $request->status,
            'tanggal_mulai' => $request->tanggal_mulai,
            'tanggal_selesai' => $request->tanggal_selesai,
        ]);

        return redirect()->back()->with('success', 'Data pengurus berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'required|exists:usr,id',
            'jabatan' => 'required|string|in:Ketua RT,Sekretaris,Bendahara,Keamanan 1,Keamanan 2,Pembangunan 1,Pembangunan 2,Perlengkapan 1,Perlengkapan 2,Kerohanian,Sosial,Koordinator Jimpitan',
            'no_hp' => 'nullable|string|max:15',
            'keterangan' => 'nullable|string',
            'status' => 'required|in:aktif,tidak_aktif',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_mulai',
        ]);

        $pengurus = Pengurus::findOrFail($id);

        $pengurus->update([
            'user_id' => $request->user_id,
            'jabatan' => $request->jabatan,
            'no_hp' => $request->no_hp,
            'keterangan' => $request->keterangan,
            'status' => $request->status,
            'tanggal_mulai' => $request->tanggal_mulai,
            'tanggal_selesai' => $request->tanggal_selesai,
        ]);

        return redirect()->back()->with('success', 'Data pengurus berhasil diperbarui');
    }

    public function destroy($id)
    {
        $pengurus = Pengurus::findOrFail($id);
        $pengurus->delete();

        return redirect()->back()->with('success', 'Data pengurus berhasil dihapus');
    }
}