<?php

namespace App\Http\Controllers;

use App\Models\PemasukanIuran;
use App\Models\KategoriIuran; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MasukIuranController extends Controller
{
    public function index()
    {
        $userId = Auth::id();


        $iurans = PemasukanIuran::with(['pengumuman.kat_iuran'])
            ->where('usr_id', $userId)
            ->whereIn('kat_iuran_id', [1, 2])
            ->orderByDesc('tgl')
            ->paginate(10)
            ->withQueryString();
        
        $totalIuran = PemasukanIuran::where('usr_id', $userId)->whereIn('kat_iuran_id', [1, 2])->count();

        $unpaidIuran = PemasukanIuran::where('usr_id', $userId)
            ->where('status', 'tagihan')->whereIn('kat_iuran_id', [1, 2])
            ->count();

        $paidIuran = PemasukanIuran::where('usr_id', $userId)
            ->where('status', 'approved')->whereIn('kat_iuran_id', [1, 2])
            ->count();

        return Inertia::render('Warga/MasukIuranIndex', [
            'iurans' => $iurans,
            'totalIuran' => $totalIuran,
            'pendingIuran' => $unpaidIuran,
            'paidIuran' => $paidIuran
        ]);
    }

    public function show($id)
    {
        $iuran = PemasukanIuran::with(['pengumuman.kat_iuran'])->findOrFail($id);


        if ($iuran->usr_id !== Auth::id()) {
            abort(403, 'Akses ditolak.');
        }

        return Inertia::render('Warga/MasukIuranShow', [
            'iuran' => $iuran,
        ]);
    }


    /**
     * Menyimpan data Pemasukan Iuran baru.
     */
    public function store(Request $request)
    {
        // 🛑 FIX 1: AKTIFKAN KEMBALI VALIDASI
        $validated = $request->validate([
            'kat_iuran_id' => 'required|integer|exists:kat_iuran,id',
            'tgl'          => 'required|date',
            'nominal'      => 'required|integer|min:1',
            'ket'          => 'nullable|string|max:255',
            // Pastikan Anda telah menghapus kolom 'id' dari form jika Anda mengambil semua data ($request->all())
        ]);
        
        // FIX 2: TANGANI PERUBAHAN TIPE DATA (nominal sudah di-validate integer, tapi pastikan)
        $validated['nominal'] = (int) $validated['nominal'];

        // 🛑 FIX 3: Tambahkan kolom usr_id (hampir pasti wajib di DB lama)
        // Jika tidak ada di $fillable model, kita harus tambahkan ke model/migration dulu.
        // Asumsi: Kita harus tambahkan ke $validated agar database mau menerima.
        $validated['usr_id'] = Auth::id(); 
        
        // 🛑 FIX 4: Pastikan $fillable model Anda mencakup 'usr_id' jika Anda menyimpan ini.
        // Jika model PemasukanIuran.php tidak memiliki 'usr_id' di $fillable,
        // baris di atas akan gagal.

        try {
            PemasukanIuran::create($validated);
            
            // 🛑 FIX 5: Ganti Redirect ke Response JSON (untuk AJAX/Inertia)
            return response()->json([
                'success' => true, 
                'message' => 'Data iuran berhasil disimpan!'
            ], 200);

        } catch (\Exception $e) {
            // 🛑 DEBUG KRITIS: dd() akan menampilkan error SQL/PHP di browser.
            dd("Gagal Menyimpan:", $e->getMessage(), $validated); 
            
            // Jika Anda menonaktifkan dd(), gunakan return json error
            // return response()->json([
            //     'success' => false, 
            //     'message' => 'Gagal menyimpan data. ERROR: ' . $e->getMessage() 
            // ], 500);
        }
    }
}