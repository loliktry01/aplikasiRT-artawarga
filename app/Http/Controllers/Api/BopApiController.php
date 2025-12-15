<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PemasukanBOP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

/**
 * @OA\Tag(
 * name="BOP",
 * description="API untuk manajemen pemasukan BOP"
 * )
 */
class BopApiController extends Controller
{

    /**
     * @OA\Get(
     * path="/api/bop",
     * summary="Ambil semua data pemasukan BOP",
     * tags={"BOP"},
     * security={{"bearerAuth":{}}},
     *
     * @OA\Response(
     * response=200,
     * description="Data berhasil diambil"
     * )
     * )
     */
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

    /**
     * @OA\Post(
     * path="/api/bop/create",
     * summary="Tambah pemasukan BOP",
     * tags={"BOP"},
     * security={{"bearerAuth":{}}},
     *
     * @OA\RequestBody(
     * required=true,
     * @OA\MediaType(
     * mediaType="multipart/form-data",
     * @OA\Schema(
     * required={"tgl", "nominal", "ket", "bkt_nota"},
     *
     * @OA\Property(
     * property="tgl",
     * type="string",
     * format="date",
     * example="2025-01-25"
     * ),
     * @OA\Property(
     * property="nominal",
     * type="number",
     * format="float",
     * example=250000
     * ),
     * @OA\Property(
     * property="ket",
     * type="string",
     * example="Pembelian ATK"
     * ),
     * @OA\Property(
     * property="bkt_nota",
     * description="Upload file nota (jpg, jpeg, png, pdf) - WAJIB",
     * type="string",
     * format="binary",
     * nullable=false
     * )
     * )
     * )
     * ),
     *
     * @OA\Response(
     * response=201,
     * description="Data berhasil disimpan"
     * )
     * )
     */
    public function bop_create(Request $request)
    {
        $validated = $request->validate([
            'tgl'      => 'required|date',
            'nominal'  => 'required|numeric|min:0',
            'ket'      => 'required|string',
            'bkt_nota' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048', 
        ]);

        
        if ($request->hasFile('bkt_nota')) { 
            $file      = $request->file('bkt_nota');
            $extension = $file->getClientOriginalExtension();
            // FIX: Menggunakan Carbon::now() untuk memastikan fungsi format() ditemukan editor
            $filename  = Carbon::now()->format('Ymd_His') . '_nota.' . $extension; 

            $path = $file->storeAs('nota_bop', $filename, 'public');
            // FIX: Simpan path dengan forward slash
            $validated['bkt_nota'] = str_replace('\\', '/', $path); 
        } else {
            return response()->json([
                'status' => false,
                'message' => 'File bukti nota wajib diunggah.'
            ], 422);
        }

        $data = PemasukanBOP::create($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Data berhasil disimpan!',
            'data'    => $data
        ], 201);
    }
}