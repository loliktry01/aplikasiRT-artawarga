<style>
    /* --- WRAPPER UTAMA KUITANSI --- */
    .kuitansi-box {
        width: 90%;             /* Mengisi penuh kolom parent */
        box-sizing: border-box;  
        border: 1px solid #000;  
        padding: 10px 15px;      
        background-color: #fff;
        font-family: 'Times New Roman', serif;
        font-size: 10pt;         
        position: center;
    }

    /* --- HEADER --- */
    .k-header {
        text-align: center;
        margin-bottom: 15px;
    }
    .k-title {
        font-size: 12pt;
        font-weight: bold;
        text-transform: uppercase;
        text-decoration: underline double;
    }

    /* --- TABEL DATA UTAMA --- */
    table.k-table {
        width: 100%;
        border-collapse: collapse; 
        border: 1px solid #000;    
        margin-bottom: 15px;
    }

    /* Styling Baris dan Kolom */
    table.k-table tr {
        border-bottom: 1px solid #000; 
    }
    table.k-table tr:last-child {
        border-bottom: none; 
    }

    table.k-table td {
        vertical-align: top;
        padding: 8px 5px;      
        font-size: 10pt;
    }

    /* Lebar Kolom */
    .col-label { 
        width: 25%; 
        font-weight: bold; 
        font-style: italic; 
    }
    .col-sep { 
        width: 2%; 
        text-align: center; 
    }
    .col-val { 
        width: 73%; 
    }

    /* --- KOMPONEN KHUSUS --- */
    
    /* Box Abu-abu untuk Terbilang */
    .box-terbilang {
        background-color: #e0e0e0; 
        border: 1px solid #000;
        padding: 5px 8px;
        font-style: italic;
        font-weight: bold;
        display: block;
        width: 90%; 
    }

    /* Area Bawah (Deskripsi & Total) */
    .desc-container {
        min-height: 40px; 
        margin-bottom: 5px;
    }

    /* TABEL WRAPPER UNTUK TOTAL (Agar Rata Tengah Vertikal) */
    table.total-table {
        float: right;            /* Dorong ke kanan */
        border-collapse: collapse;
        border: none;
        margin-top: 5px;
    }
    table.total-table td {
        padding: 0;
        border: none;
        vertical-align: middle; /* KUNCI: Sejajar tengah vertikal */
    }

    .label-jumlah {
        font-weight: bold;
        padding-right: 8px;     /* Jarak antara tulisan JUMLAH= dengan Kotak */
        font-size: 10pt;
        white-space: nowrap;
    }

    .box-total-final {
        display: inline-block;
        background-color: #e0e0e0;
        border: 2px solid #000;
        padding: 6px 12px;      /* Padding kotak angka */
        font-weight: bold;
        font-size: 11pt;
        min-width: 130px;
        text-align: center;
    }

    /* --- TANDA TANGAN --- */
    .area-ttd {
        width: 100%;
        margin-top: 10px;
    }
    .ttd-kanan {
        float: right;
        width: 50%; 
        text-align: center;
        font-size: 10pt;
    }
    
    /* Utility Clearfix */
    .clearfix::after {
        content: "";
        clear: both;
        display: table;
    }
</style>

<div class="kuitansi-box">
    <div class="k-header">
        <span class="k-title">KUITANSI</span>
    </div>

    <table class="k-table">
        <tr>
            <td class="col-label">Sudah terima dari</td>
            <td class="col-sep">:</td>
            <td class="col-val">
                <b>{{ Str::limit($kuitansi['pemberi'], 40) }}</b>
            </td>
        </tr>

        <tr>
            <td class="col-label">Uang sebanyak</td>
            <td class="col-sep">:</td>
            <td class="col-val">
                <div class="box-terbilang">
                    {{ $kuitansi['terbilang'] }}
                </div>
            </td>
        </tr>

        <tr>
            <td class="col-label">Guna membayar</td>
            <td class="col-sep">:</td>
            <td class="col-val">
                <div class="desc-container">
                    {{ $kuitansi['deskripsi'] }}
                </div>
                
                <table class="total-table">
                    <tr>
                        <td class="label-jumlah">JUMLAH =</td>
                        <td>
                            <div class="box-total-final">
                                Rp. {{ number_format($kuitansi['total'], 0, ',', '.') }},-
                            </div>
                        </td>
                    </tr>
                </table>
                <div style="clear: both;"></div> </td>
        </tr>
    </table>

    <div class="area-ttd clearfix">
        <div class="ttd-kanan">
            <p style="margin: 0 0 5px 0;">{{ $kuitansi['kota'] }}, {{ $kuitansi['tanggal'] }}</p>
            <p style="margin: 0; font-size: 9pt;">Barang/Jasa sudah diterima dengan baik dan lengkap</p>
            
            <p style="margin: 20px 0 50px 0;">Penerima,</p>
            
            <p style="margin: 0; font-weight: bold;">
                ( ...................................... )
            </p>
        </div>
    </div>
</div>