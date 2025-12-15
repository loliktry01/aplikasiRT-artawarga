<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class KegiatanApiController extends Controller
{
    protected function prepareKegiatanForResponse($kegiatan)
    {
        if (is_string($kegiatan->dok_keg)) {
            $kegiatan->dok_keg = json_decode($kegiatan->dok_keg, true) ?? [];
        } elseif (is_null($kegiatan->dok_keg)) {
            $kegiatan->dok_keg = [];
        }
        
        if (is_array($kegiatan->dok_keg)) {
            $kegiatan->dok_keg = array_map(function ($path) {
                return str_replace('\\', '/', $path);
            }, $kegiatan->dok_keg);
        }
        
        return $kegiatan;
    }

    /**
     * Lihat daftar semua kegiatan
     */
    public function index()
    {
        $data = Kegiatan::orderBy('tgl_mulai', 'desc')->get();
        $data->transform(fn ($item) => $this->prepareKegiatanForResponse($item));

        return response()->json([
            'success' => true,
            'data'    => $data
        ]);
    }

    /**
     * Lihat detail kegiatan (Id)
     */
    public function show($id)
    {
        try {
            $kegiatan = Kegiatan::with(['kategori_relasi', 'pengeluaran']) 
                                ->findOrFail($id);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Kegiatan tidak ditemukan'
            ], 404);
        }

        $kegiatan = $this->prepareKegiatanForResponse($kegiatan);

        return response()->json([
            'success' => true,
            'message' => 'Rincian kegiatan berhasil dimuat.',
            'data'    => $kegiatan
        ]);
    }

    /**
     * Tambah kegiatan
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nm_keg'      => 'required|string|max:255',
            'kat_keg_id'  => 'required|integer|exists:kat_keg,id', 
            'tgl_mulai'   => 'nullable|date',
            'tgl_selesai' => 'nullable|date|after_or_equal:tgl_mulai',
            'pj_keg'      => 'nullable|string|max:255',
            'panitia'     => 'nullable|string|max:255',
            'dok_keg.*'   => 'sometimes|file|mimes:jpg,jpeg,png,pdf|max:5120', 
            'rincian_kegiatan' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal validasi data kegiatan',
                'errors'  => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();
        $uploadedPaths = [];
        
        if ($request->hasFile('dok_keg')) {
            $files = is_array($request->file('dok_keg')) ? $request->file('dok_keg') : [$request->file('dok_keg')];

            foreach ($files as $file) {
                if ($file && $file->isValid()) {
                    $extension = $file->getClientOriginalExtension();
                    $filename = now()->format('Ymd_His') . '_' . uniqid() . '_keg.' . $extension;
                    
                    $path = $file->storeAs('keg', $filename, 'public');
                    
                    $path = str_replace('\\', '/', $path); 
                    
                    $uploadedPaths[] = $path;
                }
            }
        }
         
        $validatedData['dok_keg'] = !empty($uploadedPaths) ? $uploadedPaths : null;
 
        $kegiatan = Kegiatan::create($validatedData);
        $kegiatan = $this->prepareKegiatanForResponse($kegiatan);

        return response()->json([
            'success' => true,
            'message' => 'Kegiatan berhasil dibuat',
            'data'    => $kegiatan
        ], 201);
    }

    /**
     * Update kegiatan
     */
    public function update(Request $request, $id)
    {
        $kegiatan = Kegiatan::find($id);

        if (!$kegiatan) {
            return response()->json([
                'success' => false,
                'message' => 'Kegiatan tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nm_keg'            => 'sometimes|required|string|max:255',
            'kat_keg_id'        => 'sometimes|required|integer|exists:kat_keg,id',
            'tgl_mulai'         => 'sometimes|nullable|date',
            'tgl_selesai'       => 'sometimes|nullable|date|after_or_equal:tgl_mulai',
            'pj_keg'            => 'sometimes|nullable|string|max:255',
            'panitia'           => 'sometimes|nullable|string|max:255',
            'existing_dok_keg'  => 'sometimes|nullable|array', 
            'dok_keg.*'         => 'sometimes|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'rincian_kegiatan'  => 'nullable|string'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal validasi data kegiatan',
                'errors'  => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();
        $newlyUploadedPaths = [];

        $existingPaths = $request->input('existing_dok_keg');
        if (!is_array($existingPaths)) {
            $existingPaths = [];
        }
        
        if ($request->hasFile('dok_keg')) {
            $files = is_array($request->file('dok_keg')) ? $request->file('dok_keg') : [$request->file('dok_keg')];
            
            foreach ($files as $file) {
                if ($file && $file->isValid()) {
                    $extension = $file->getClientOriginalExtension();
                    $filename = now()->format('Ymd_His') . '_' . uniqid() . '_keg.' . $extension;
                    $path = $file->storeAs('keg', $filename, 'public');
                    $path = str_replace('\\', '/', $path); 
                    
                    $newlyUploadedPaths[] = $path;
                }
            }
        }
        
        $finalPaths = array_merge($existingPaths, $newlyUploadedPaths);
        
        $currentPaths = $this->prepareKegiatanForResponse($kegiatan)->dok_keg ?? [];
        $filesToDelete = array_diff($currentPaths, $finalPaths);
        
        foreach ($filesToDelete as $path) {
            $cleanPath = str_replace('\\', '/', $path);
            if ($cleanPath && Storage::disk('public')->exists($cleanPath)) {
                Storage::disk('public')->delete($cleanPath);
            }
        }
        
        // 4. Update data
        $validatedData['dok_keg'] = !empty($finalPaths) ? $finalPaths : null;
        unset($validatedData['existing_dok_keg']);

        $kegiatan->update($validatedData);
        $kegiatan = $this->prepareKegiatanForResponse($kegiatan);

        return response()->json([
            'success' => true,
            'message' => 'Data kegiatan berhasil diperbarui.',
            'data'    => $kegiatan
        ], 200);
    }

    /**
     * Hapus kegiatan
     */
    public function destroy($id)
    {
        $kegiatan = Kegiatan::find($id);

        if (!$kegiatan) {
            return response()->json([
                'success' => false,
                'message' => 'Kegiatan tidak ditemukan'
            ], 404);
        }

        $filePaths = $this->prepareKegiatanForResponse($kegiatan)->dok_keg;

        if (is_array($filePaths)) {
            foreach ($filePaths as $path) {
                $cleanPath = str_replace('\\', '/', $path);
                if ($cleanPath && Storage::disk('public')->exists($cleanPath)) {
                    Storage::disk('public')->delete($cleanPath);
                }
            }
        }

        $kegiatan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Kegiatan berhasil dihapus'
        ]);
    }
}