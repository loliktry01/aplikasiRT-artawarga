<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8" />
    <title>Laporan SPJ Kegiatan: {{ $kegiatan->nm_keg }}</title>
    <style>
        /* --- PENGATURAN HALAMAN --- */
        @page {
            size: A4 portrait;
            margin: 20mm 20mm 20mm 20mm;
        }

        body {
            font-family: serif; 
            font-size: 11pt;
            line-height: 1.3;
            color: #000;
        }

        /* --- UTILITY CLASSES --- */
        .text-center { text-align: center; }
        .text-left { text-align: left; }
        .text-right { text-align: right; }
        .text-bold { font-weight: bold; }
        .uppercase { text-transform: uppercase; }
        .mb-2 { margin-bottom: 10px; }
        .mt-4 { margin-top: 20px; }
        
        /* --- HEADER JUDUL --- */
        .header-title { margin-bottom: 20px; }
        .header-title h1 { margin: 0; font-size: 14pt; font-weight: bold; }
        .title-separator { border-bottom: 2px solid #000; margin: 15px 0 20px 0; }
        
        /* --- SECTION HEADERS --- */
        .section-title {
            font-size: 12pt;
            font-weight: bold;
            margin-top: 15px;
            margin-bottom: 5px;
            text-transform: uppercase;
        }

        /* --- INDENTASI KONTEN (Poin 1 Revisi) --- */
        /* Menggeser konten agar lurus di bawah huruf pertama Judul Nomor */
        .indent-content {
            padding-left: 25px; 
        }

        /* --- INFO ROW --- */
        .info-row { margin-bottom: 4px; }
        .info-label { display: inline-block; width: 170px; }

        /* --- TABEL DATA --- */
        table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 5px;
            margin-bottom: 15px;
        }
        table.data-table th, table.data-table td {
            border: 1px solid #000;
            padding: 5px 8px;
            vertical-align: top;
        }
        table.data-table th { background-color: #e0e0e0; text-align: center; }
        
        /* --- BUKTI TRANSAKSI --- */
        .transaction-block {
            margin-bottom: 15px;
            border: 1px solid #ccc;
            padding: 10px;
            page-break-inside: avoid;
        }
        .evidence-table { width: 100%; border: 0; margin-top: 10px; }
        .evidence-table td { width: 50%; vertical-align: top; text-align: center; padding: 5px; }
        .evidence-img {
            max-width: 100%; max-height: 220px; 
            object-fit: contain; border: 1px solid #999;
        }
        .empty-evidence {
            border: 1px dashed #aaa; color: #aaa; padding: 30px; font-size: 10pt; background: #fafafa;
        }

        /* --- TANDA TANGAN --- */
        .signature-table { width: 100%; margin-top: 10px; }
        .signature-table td { width: 33.33%; text-align: center; vertical-align: top; padding-bottom: 60px; }

        /* --- PAGE BREAK --- */
        .page-break { page-break-after: always; }
    </style>
</head>
<body>

    <div class="header-title text-center">
        <h1>LAPORAN PERTANGGUNGJAWABAN (SPJ)</h1>
        <h1 class="uppercase" style="margin-top: 8px;">{{ $kegiatan->nm_keg }}</h1>
    </div>
    <div class="title-separator"></div>

    <div class="section-title">1. INFORMASI UMUM KEGIATAN</div>
    <div class="indent-content">
        <div class="info-row"><span class="info-label">Nama Kegiatan</span> : {{ $kegiatan->nm_keg }}</div>
        <div class="info-row"><span class="info-label">Waktu Pelaksanaan</span> : {{ $tgl_mulai }} s/d {{ $tgl_selesai }}</div>
        <div class="info-row"><span class="info-label">Penanggung Jawab (PJ)</span> : {{ $kegiatan->pj_keg }}</div>
        <div class="info-row"><span class="info-label">Pengurus/Panitia</span> : {{ $kegiatan->panitia ?? '-' }}</div>
        <div class="info-row"><span class="info-label">Sumber Dana Utama</span> : {{ $sumber_dana_rekap }}</div>
    </div>

    <div class="section-title mt-4">2. REKAPITULASI PENGGUNAAN DANA</div>
    <div class="indent-content">
        <table class="data-table">
            <thead>
                <tr>
                    <th class="text-left">Uraian</th>
                    <th class="text-right" style="width: 35%;">Jumlah (Rp)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Total Dana Awal (Snapshot Saldo + Dana Kegiatan)</td>
                    <td class="text-right">{{ number_format($saldoAwalSnapshot, 0, ',', '.') }},-</td>
                </tr>
                <tr>
                    <td>Jumlah Dana Digunakan (Total Pengeluaran Kegiatan Ini)</td>
                    <td class="text-right">{{ number_format($totalPengeluaran, 0, ',', '.') }},-</td>
                </tr>
                <tr style="background-color: #f0f0f0; font-weight: bold;">
                    <td>Sisa Saldo Kas Akhir (Real)</td>
                    <td class="text-right">{{ number_format($sisaAkhir, 0, ',', '.') }},-</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="section-title mt-4">3. RINCIAN PENGELUARAN</div>
    <div class="indent-content">
        <table class="data-table">
            <thead>
                <tr>
                    <th style="width: 5%;">No.</th>
                    <th style="width: 15%;">Tanggal</th>
                    <th>Uraian / Keterangan Belanja</th>
                    <th style="width: 12%;">Sumber</th>
                    <th style="width: 20%;" class="text-right">Nominal (Rp)</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($pengeluaran as $item)
                <tr>
                    <td class="text-center">{{ $loop->iteration }}</td>
                    <td class="text-center">{{ $item->tgl_formatted }}</td>
                    <td>
                        {{ $item->ket }}
                        @if($item->toko)
                            <br><i style="font-size:10pt; color: #555;">(Toko: {{ $item->toko }})</i>
                        @endif
                    </td>
                    <td class="text-center" style="font-size: 10pt;">{{ $item->sumber_dana_item }}</td>
                    <td class="text-right">{{ number_format($item->nominal, 0, ',', '.') }},-</td>
                </tr>
                @empty
                <tr>
                    <td colspan="5" class="text-center" style="padding: 20px;">Tidak ada data pengeluaran.</td>
                </tr>
                @endforelse
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="4" class="text-right">TOTAL PENGELUARAN KEGIATAN INI</th>
                    <th class="text-right">{{ number_format($totalPengeluaran, 0, ',', '.') }},-</th>
                </tr>
            </tfoot>
        </table>
    </div>

    <div class="page-break"></div>
    <div class="section-title">4. DOKUMENTASI KEGIATAN ({{ count($dokumentasiBase64Array) }} Foto)</div>
    <div class="title-separator"></div>
    
    <div style="text-align: center;">
        @if(count($dokumentasiBase64Array) > 0)
            @foreach ($dokumentasiBase64Array as $idx => $base64Img)
                <div style="display: inline-block; width: 45%; margin: 10px 5px; vertical-align: top; page-break-inside: avoid;">
                    <img src="{{ $base64Img }}" style="width: 100%; height: 220px; object-fit: cover; border: 1px solid #ccc; padding: 3px;">
                    <p style="font-size: 10pt; margin-top: 5px; font-style: italic;">Dokumentasi ke-{{ $idx + 1 }}</p>
                </div>
            @endforeach
        @else
            <p class="text-center" style="color: #888; font-style: italic; margin-top: 50px;">
                - Belum ada dokumentasi foto yang dilampirkan -
            </p>
        @endif
    </div>

    @if($pengeluaran->count() > 0)
        <div class="page-break"></div>
        <div class="section-title">5. LAMPIRAN BUKTI KUITANSI & NOTA</div>
        <div class="title-separator"></div>

        @foreach ($pengeluaran as $item)
            <div class="transaction-block">
                {{-- Header Transaksi --}}
                <div style="background: #f9f9f9; padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; margin-bottom: 10px;">
                    #{{ $loop->iteration }} | {{ $item->ket }} 
                    <span style="float: right;">Rp {{ number_format($item->nominal, 0, ',', '.') }} ({{ $item->sumber_dana_item }})</span>
                </div>

                {{-- Tabel Layout: Kiri (Nota Asli), Kanan/Bawah (Kuitansi Seragam HTML) --}}
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        {{-- KOLOM 1: NOTA TOKO (GAMBAR) --}}
                        <td style="width: 40%; vertical-align: top; padding-right: 10px; border-right: 1px dashed #ccc;">
                            <div style="font-style: italic; margin-bottom: 5px; text-align: center; font-weight: bold;">(1) Nota/Struk Toko Asli</div>
                            
                            @if ($item->bkt_nota_base64)
                                <img src="{{ $item->bkt_nota_base64 }}" style="width: 100%; border: 1px solid #999;">
                            @else
                                <div style="border: 1px dashed #aaa; color: #aaa; padding: 30px; text-align: center; background: #fafafa;">
                                    Nota Tidak Tersedia
                                </div>
                            @endif
                        </td>

                        {{-- KOLOM 2: KUITANSI SERAGAM (HTML RENDER) --}}
                        <td style="width: 60%; vertical-align: top; padding-left: 10px;">
                            <div style="font-style: italic; margin-bottom: 5px; text-align: center; font-weight: bold;">(2) Kuitansi Seragam (Generated)</div>
                            
                            {{-- MEMANGGIL PARTIAL KUITANSI --}}
                            {{-- Kita kirim data yang sudah disiapkan di Controller --}}
                            @include('spj.kuitansi_partial', ['kuitansi' => $item->kuitansi_data])
                        </td>
                    </tr>
                </table>
            </div>

            {{-- Page break setiap 2 transaksi agar tidak terlalu padat, atau biarkan auto --}}
            @if($loop->iteration % 2 == 0 && !$loop->last) 
                <div class="page-break"></div>
            @else
                <br>
            @endif
        @endforeach
    @endif

    <div class="page-break"></div>
    
    <div style="margin-top: 50px;">
        <h3 class="text-center" style="text-transform: uppercase; margin-bottom: 10px;">LEMBAR PENGESAHAN</h3>
        
        <div style="height: 30px;"></div> 

        <div class="text-right mb-2" style="margin-right: 20px;">
            {{ $kegiatan->kota ?? 'Semarang' }}, {{ $tgl_pengesahan }}
        </div>

        <table class="signature-table">
            <tr>
                <td>
                    Menyetujui,<br><b>Kepala Lembaga/RT</b>
                    <br><br><br><br><br>
                    ( ..................................... )
                </td>
                <td>
                    Mengetahui,<br><b>Penanggung Jawab</b>
                    <br><br><br><br><br>
                    ( ..................................... )
                </td>
                <td>
                    Disusun Oleh,<br><b>Bendahara</b>
                    <br><br><br><br><br>
                    ( ..................................... )
                </td>
            </tr>
        </table>
    </div>

</body>
</html>