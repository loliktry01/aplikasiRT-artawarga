<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PemasukanBOP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BopApiController extends Controller
{

    public function index()
    {
        $data = PemasukanBOP::select('id', 'tgl', 'nominal', 'ket', 'bkt_nota')
            ->latest()
            ->get();

        return response()->json([
            'status'  => true,
            'message' => 'Data berhasil diambil.',
            'data'    => $data
        ]);
    }

    public function bop_create(Request $request)
    {
        $validated = $request->validate([
            'tgl'       => 'required|date',
            'nominal'   => 'required|numeric|min:0',
            'ket'       => 'required|string',
            'bkt_nota'  => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        // Upload file jika ada
        if ($request->hasFile('bkt_nota')) {
            $file      = $request->file('bkt_nota');
            $extension = $file->getClientOriginalExtension();
            $filename  = now()->format('Ymd_His') . '_nota.' . $extension;

            $path = $file->storeAs('nota_bop', $filename, 'public');
            $validated['bkt_nota'] = $path;
        }

        $data = PemasukanBOP::create($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Data berhasil disimpan!',
            'data'    => $data
        ], 201);
    }

    public function destroy($id)
    {
        $data = PemasukanBOP::find($id);

        if (!$data) {
            return response()->json([
                'status'  => false,
                'message' => 'Data tidak ditemukan.'
            ], 404);
        }

        // Hapus file nota jika ada
        if ($data->bkt_nota && Storage::disk('public')->exists($data->bkt_nota)) {
            Storage::disk('public')->delete($data->bkt_nota);
        }

        $data->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Data berhasil dihapus.'
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = PemasukanBOP::find($id);

        if (!$data) {
            return response()->json([
                'status'  => false,
                'message' => 'Data tidak ditemukan.'
            ], 404);
        }

        $validated = $request->validate([
            'tgl'       => 'nullable|date',
            'nominal'   => 'nullable|numeric|min:0',
            'ket'       => 'nullable|string',
            'bkt_nota'  => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        // Jika upload file baru
        if ($request->hasFile('bkt_nota')) {

            // Hapus file lama
            if ($data->bkt_nota && Storage::disk('public')->exists($data->bkt_nota)) {
                Storage::disk('public')->delete($data->bkt_nota);
            }

            $file      = $request->file('bkt_nota');
            $extension = $file->getClientOriginalExtension();
            $filename  = now()->format('Ymd_His') . '_nota.' . $extension;

            $path = $file->storeAs('nota_bop', $filename, 'public');
            $validated['bkt_nota'] = $path;
        }

        $data->update($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Data berhasil diperbarui.',
            'data'    => $data
        ]);
    }
}
