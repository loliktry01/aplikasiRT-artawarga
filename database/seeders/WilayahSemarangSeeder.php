<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kota;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\Rw;
use App\Models\Rt;
use Illuminate\Support\Facades\DB;

class WilayahSemarangSeeder extends Seeder
{
    public function run(): void
    {
        // Gunakan Transaksi DB agar lebih cepat dan aman
        DB::transaction(function () {
            
            // 1. Buat Kota Semarang
            $kota = Kota::firstOrCreate(['nama_kota' => 'Kota Semarang']);

            // Data Lengkap 16 Kecamatan & 177 Kelurahan di Kota Semarang
            $dataWilayah = [
                // === PUSAT & TENGAH ===
                'Semarang Tengah' => [
                    'Bangunharjo', 'Brumbungan', 'Gabahan', 'Jagalan', 'Karangkidul',
                    'Kauman', 'Kembangsari', 'Kranggan', 'Miroto', 'Pandansari',
                    'Pekunden', 'Pendrikan Kidul', 'Pendrikan Lor', 'Purwodinatan', 'Sekayu'
                ],
                'Semarang Selatan' => [
                    'Barusari', 'Bulustalan', 'Lamper Kidul', 'Lamper Lor', 'Lamper Tengah',
                    'Mugassari', 'Peterongan', 'Pleburan', 'Randusari', 'Wonodri'
                ],
                'Semarang Timur' => [
                    'Bugangan', 'Karangtempel', 'Karangturi', 'Kebonagung', 'Kemijen',
                    'Mlatibaru', 'Mlatiharjo', 'Rejosari', 'Sarirejo', 'Sawah Besar'
                ],

                // === UTARA ===
                'Semarang Utara' => [
                    'Bandarharjo', 'Bulu Lor', 'Dadapsari', 'Kuningan', 'Panggung Kidul',
                    'Panggung Lor', 'Plombokan', 'Purwosari', 'Tanjung Mas'
                ],

                // === BARAT ===
                'Semarang Barat' => [
                    'Bojongsalaman', 'Bongsari', 'Cabean', 'Gisikdrono', 'Kalibanteng Kidul',
                    'Kalibanteng Kulon', 'Karangayu', 'Kembangarum', 'Krapyak', 'Krobokan',
                    'Manyaran', 'Ngemplak Simongan', 'Salaman Mloyo', 'Tambakharjo',
                    'Tawang Mas', 'Tawangsari'
                ],

                // === SELATAN (ATAS) ===
                'Candisari' => [
                    'Candi', 'Jatingaleh', 'Jomblang', 'Kaliwiru', 'Karanganyar Gunung',
                    'Tegalsari', 'Wonotingal'
                ],
                'Gajahmungkur' => [
                    'Bendan Duwur', 'Bendan Ngisor', 'Bendungan', 'Gajahmungkur',
                    'Karangrejo', 'Lempongsari', 'Petompon', 'Sampangan'
                ],
                'Banyumanik' => [
                    'Banyumanik', 'Gedawang', 'Jabungan', 'Ngesrep', 'Padangsari',
                    'Pedalangan', 'Pudakpayung', 'Srondol Kulon', 'Srondol Wetan',
                    'Sumurboto', 'Tinjomoyo'
                ],
                'Tembalang' => [
                    'Bulusan', 'Jangli', 'Kedungmundu', 'Kramas', 'Mangunharjo',
                    'Meteseh', 'Rowosari', 'Sambiroto', 'Sendangguwo', 'Sendangmulyo',
                    'Tandang', 'Tembalang'
                ],

                // === TIMUR ===
                'Gayamsari' => [
                    'Gayamsari', 'Kaligawe', 'Pandean Lamper', 'Sambirejo', 'Sawah Besar',
                    'Siwalan', 'Tambakrejo'
                ],
                'Pedurungan' => [
                    'Gemah', 'Kalicari', 'Muktiharjo Kidul', 'Palebon', 'Pedurungan Kidul',
                    'Pedurungan Lor', 'Pedurungan Tengah', 'Penggaron Kidul', 'Plamongan Sari',
                    'Tlogomulyo', 'Tlogosari Kulon', 'Tlogosari Wetan'
                ],
                'Genuk' => [
                    'Bangetayu Kulon', 'Bangetayu Wetan', 'Banjardowo', 'Gebangsari',
                    'Genuksari', 'Karangroto', 'Kudu', 'Muktiharjo Lor', 'Penggaron Lor',
                    'Sembungharjo', 'Terboyo Kulon', 'Terboyo Wetan', 'Trimulyo'
                ],

                // === BARAT DAYA (PINGGIRAN) ===
                'Gunungpati' => [
                    'Cepoko', 'Gunungpati', 'Jatirejo', 'Kalisegoro', 'Kandri', 'Mangunsari',
                    'Ngijo', 'Nongkosawit', 'Pakintelan', 'Patemon', 'Plalangan', 'Pongangan',
                    'Sadeng', 'Sekaran', 'Sukorejo', 'Sumurejo'
                ],
                'Mijen' => [
                    'Bubakan', 'Cangkiran', 'Jatibarang', 'Jatisari', 'Karangmalang',
                    'Kedungpani', 'Mijen', 'Ngadirgo', 'Pesantren', 'Polaman',
                    'Purwosari', 'Tambangan', 'Wonolopo', 'Wonoplumbon'
                ],
                'Ngaliyan' => [
                    'Bambankerep', 'Beringin', 'Gondoriyo', 'Kalipancur', 'Ngaliyan',
                    'Podorejo', 'Purwoyoso', 'Tambakaji', 'Wates', 'Wonosari'
                ],
                'Tugu' => [
                    'Jerakah', 'Karanganyar', 'Mangkang Kulon', 'Mangkang Wetan',
                    'Mangunharjo', 'Randugarut', 'Tugurejo'
                ],
            ];

            // LOOPING UTAMA
            foreach ($dataWilayah as $namaKecamatan => $daftarKelurahan) {
                
                // 2. Buat Kecamatan
                $kecamatan = Kecamatan::firstOrCreate([
                    'kota_id' => $kota->id,
                    'nama_kecamatan' => $namaKecamatan
                ]);

                $this->command->info("Memproses Kecamatan: $namaKecamatan");

                foreach ($daftarKelurahan as $namaKelurahan) {
                    // 3. Buat Kelurahan
                    $kelurahan = Kelurahan::firstOrCreate([
                        'kecamatan_id' => $kecamatan->id,
                        'nama_kelurahan' => $namaKelurahan
                    ]);

                 
                }
            }
        });
    }
}