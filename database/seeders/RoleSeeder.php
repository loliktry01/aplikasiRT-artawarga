<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
  
    public function run(): void
    {
        $roles = [
            [
                'nama_role' => 'Superadmin',
                'deskripsi_role' => 'Memiliki akses penuh ke seluruh sistem dan pengaturan aplikasi.'
            ],
            [
                'nama_role' => 'Ketua RT',
                'deskripsi_role' => 'Bertanggung jawab atas koordinasi dan pengawasan kegiatan RT.'
            ],
            [
                'nama_role' => 'Bendahara',
                'deskripsi_role' => 'Mengelola keuangan RT, mencatat pemasukan dan pengeluaran.'
            ],
            [
                'nama_role' => 'Sekretaris',
                'deskripsi_role' => 'Mengurus administrasi, surat-menyurat, dan dokumentasi RT.'
            ],
            [
                'nama_role' => 'Warga',
                'deskripsi_role' => 'Anggota masyarakat yang terdaftar di lingkungan RT.'
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(['nama_role' => $role['nama_role']], $role);
        }

    }
}
