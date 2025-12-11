<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Laporan SPJ Kegiatan: {{ $kegiatan->nm_keg }}</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 20mm 25mm 20mm 25mm; /* TOP - RIGHT - BOTTOM - LEFT */
        }

        body {
            font-family: 'Times New Roman', serif;
            font-size: 11pt;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th, td {
            padding: 8px 10px; /* Tambahkan padding kanan-kiri */
            border: 1px solid #000;
            vertical-align: top;
        }

        .no-border {
            border: none !important;
        }

    /* Biar kolom kanan tidak mepet */
        .wide-right {
            padding-right: 20px !important;
        }

    /* Header tabel */
        th {
            text-align: left;
            background: #f2f2f2;
        }
    </style>

</head>
<body>
    <div class="sheet">
        <!-- HALAMAN 1: COVER/JUDUL -->
        <div class="cover text-center">
            <h1>LAPORAN PERTANGGUNGJAWABAN</h1>
            <h1 class="sub">(SPJ)</h1>
            <h1 style="text-transform: uppercase; margin-top: 18px;">{{ $kegiatan->nm_keg }}</h1>
            <p style="margin-top: 36px; font-size: 12pt;">Periode: {{ $tgl_mulai }} s/d {{ $tgl_selesai }}</p>
        </div>

        <!-- HALAMAN BARU -->
        <div class="page-break"></div>

        <!-- 1. INFORMASI UMUM KEGIATAN -->
        <h2>1. INFORMASI UMUM KEGIATAN</h2>
        <table class="no-border" style="width:100%;">
            <tr>
                <td style="width:30%;">Nama Kegiatan</td>
                <td style="width:5%;">:</td>
                <td>{{ $kegiatan->nm_keg }}</td>
            </tr>
            <tr>
                <td>Waktu Pelaksanaan</td>
                <td>:</td>
                <td>{{ $tgl_mulai }} s/d {{ $tgl_selesai }}</td>
            </tr>
            <tr>
                <td>Penanggung Jawab (PJ)</td>
                <td>:</td>
                <td>{{ $kegiatan->pj_keg }}</td>
            </tr>
            <tr>
                <td>Sumber Dana</td>
                <td>:</td>
                <td>{{ $sumber_dana }}</td>
            </tr>
        </table>

        <!-- 2. REKAPITULASI PENGGUNAAN DANA -->
        <h2>2. REKAPITULASI PENGGUNAAN DANA</h2>
        <table>
            <thead>
                <tr>
                    <th style="width:70%;" class="text-left">Uraian</th>
                    <th class="text-right">Jumlah (Rp)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Dana BOP Awal (Saldo Sebelum Penggunaan)</td>
                    <td class="text-right">{{ number_format($saldoAwalBOP, 0, ',', '.') }},-</td>
                </tr>
                <tr>
                    <td>Jumlah Dana Digunakan (Total Pengeluaran Kegiatan)</td>
                    <td class="text-right">{{ number_format($totalPengeluaran, 0, ',', '.') }},-</td>
                </tr>
                <tr style="background-color:#f7f7f7;">
                    <td><b>Sisa Saldo BOP Setelah Kegiatan Ini</b></td>
                    <td class="text-right"><b>{{ number_format($sisaAkhir, 0, ',', '.') }},-</b></td>
                </tr>
                <tr>
                    <td colspan="2" style="border: none; padding-top:8px;">*Status: {{ $status_sisa_dana }}*</td>
                </tr>
            </tbody>
        </table>

        <!-- 3. RINCIAN PENGELUARAN DAN BUKTI TRANSAKSI -->
        <h2>3. RINCIAN PENGELUARAN DAN BUKTI TRANSAKSI</h2>
        <table>
            <thead>
                <tr>
                    <th style="width:5%;">No.</th>
                    <th style="width:15%;">Tanggal</th>
                    <th style="width:45%;">Uraian / Keterangan Belanja</th>
                    <th style="width:20%;">ID Referensi (Bukti ID)</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($pengeluaran as $item)
                <tr>
                    <td class="text-center">{{ $loop->iteration }}</td>
                    <td>{{ $item->tgl_formatted }}</td>
                    <td>
                        {{ $item->ket }}<br>
                        <i style="font-size:10pt;">(Toko/Vendor: {{ $item->toko ?? '-' }})</i><br>
                        <i style="font-size:10pt;">(Jumlah: Rp {{ number_format($item->nominal, 0, ',', '.') }})</i>
                    </td>
                    <td class="text-center">{{ $item->bukti_id }}</td>
                </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr style="background-color:#eaeaea;">
                    <td colspan="2" class="text-right"></td>
                    <td class="text-left"><b>TOTAL PENGELUARAN KEGIATAN INI</b></td>
                    <td class="text-center"><b>{{ number_format($totalPengeluaran, 0, ',', '.') }},-</b></td>
                </tr>
            </tfoot>
        </table>

        <!-- 4. DOKUMENTASI -->
        <div class="page-break"></div>
        <h2>4. DOKUMENTASI KEGIATAN</h2>
        <p>Lampiran visual ini membuktikan kegiatan telah dilaksanakan sesuai rencana:</p>
        <div class="img-container">
            <div class="img-box">
                @if ($dokumentasiBase64)
                    <img src="{{ $dokumentasiBase64 }}" alt="Dokumentasi Kegiatan">
                @else
                    <p style="padding: 40px 10px; color: #999;">Gambar Dokumentasi Gagal Dimuat. Pastikan URL Gambar valid dan Guzzle terinstal.</p>
                @endif
            </div>
        </div>
        <p style="margin-top: 10px; text-align: center;">Gambar Dokumentasi Utama Kegiatan.</p>

        <!-- 5. LEMBAR PENGESAHAN -->
        <div class="page-break"></div>
        <h2>5. LEMBAR PENGESAHAN</h2>

        <div style="text-align: right; margin-bottom: 18px;">
            {{ $kegiatan->kota ?? 'Semarang' }}, {{ $tgl_pengesahan }}
        </div>

        <table class="no-border sign-table" style="width:90%; margin: 0 auto;">
            <thead>
                <tr class="text-center">
                    <th style="width:33%;">Disusun Oleh:</th>
                    <th style="width:33%;">Diperiksa Oleh:</th>
                    <th style="width:33%;">Disetujui Oleh:</th>
                </tr>
                <tr class="text-center">
                    <th><b>Bendahara Kegiatan</b></th>
                    <th><b>Penanggung Jawab Kegiatan</b></th>
                    <th><b>Kepala Lembaga/RT</b></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-center" style="height:100px;"><p style="margin-top: 40px;">( ..................................... )</p></td>
                    <td class="text-center" style="height:100px;"><p style="margin-top: 40px;">( ..................................... )</p></td>
                    <td class="text-center" style="height:100px;"><p style="margin-top: 40px;">( ..................................... )</p></td>
                </tr>
            </tbody>
        </table>

        <p style="margin-top: 18px; text-align: center; f