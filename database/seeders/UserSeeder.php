<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Pastikan roles sudah ada
        if (Role::count() === 0) {
            $this->call(RoleSeeder::class);
        }

        // Ambil role superadmin (jika tidak ada, fallback ke id = 1)
        $roleId = Role::where('nama_role', 'Superadmin')->first()->id ?? 1;

        // Tambahkan user Superadmin default
        User::create([
            'role_id' => $roleId,
            'email' => 'admin@example.com',
            'username' => 'superadmin',
            'password' => bcrypt('password123'),
            'nama_lengkap' => 'Super Admin',
            'foto_profil' => null,
            'no_hp' => '081234567890',

            'kode_provinsi' => '31',      
            'kode_kota_kabupaten' => '31.74', 
            'kode_kecamatan' => '31.74.09',   
            'kode_desa' => '31.74.09.1005',    
            
            'rt_rw' => '01/02',
            'alamat_lengkap' => 'Jl. Merpati No.10, Kel. Gunung, Kebayoran Baru',
            'kode_pos' => '12120',
        ]);
    }
}
