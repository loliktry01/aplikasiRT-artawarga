<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\PemasukanIuran;
use App\Models\PemasukanBOP;
use App\Models\Pengeluran;
use App\Models\KategoriIuran;
use App\Models\KategoriKegiatan;
use Illuminate\Support\Facades\Hash;

class SuperadminController extends Controller
{
   //Menampilkan dashboard SA
   public function index()
   {
    $totalUsers = User::count();
    $totalPemasukan = PemasukanIuran::sum('jumlah') + PemasukanBOP::sum('jumlah');
    $totalPengeluaran = Pengeluaran::sum('jumlah');
    $saldo = $totalPemasukan - $totalPengeluaran;

    return view('superadmin.dashboard', compact (
        'totalUsers', 'totalPemasukan', 'totalPengeluaran', 'saldo'
    ));
   } 
   
   //Menampilkan semua user dan role
   public function users()
    {
        $users = User::with('role')->get();
        $roles = Role::all();
        return view('superadmin.users.index', compact('users', 'roles'));
    }

    public function createUser()
    {
        $roles = Role::all();
        return view('superadmin.users.create', compact('roles'));
    }

    public function storeUser(Request $request)
    {
        $request->validate([
            'nm_lengkap' => 'required',
            'email' => 'required|email|unique:usr',
            'no_kk' => 'required|digits:16|unique:usr',
            'password' => 'required|min:6',
            'no_hp' => 'nullable',
            'rt_rw' => 'nullable',
            'kode_pos' => 'nullable',
            'role_id' => 'required'
        ]);

        User::create([
            'nm_lengkap' => $request->nm_lengkap,
            'email' => $request->email,
            'no_kk' => $request->no_kk,
            'password' => Hash::make($request->password),
            'no_hp' => $request->no_hp,
            'rt_rw' => $request->rt_rw,
            'kode_pos' => $request->kode_pos,
            'role_id' => $request->role_id
        ]);

        return redirect()->route('superadmin.users')->with('success', 'User berhasil ditambahkan');
    }

    public function editUser($id)
    {
        $user = User::findOrFail($id);
        $roles = Role::all();
        return view('superadmin.users.edit', compact('user', 'roles'));
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'nm_lengkap' => 'required',
            'email' => 'required|email|unique:usr,email,'.$id,
            'no_kk' => 'required|digits:16|unique:usr,no_kk,'.$id,
            'no_hp' => 'nullable',
            'rt_rw' => 'nullable',
            'kode_pos' => 'nullable',
            'role_id' => 'required'
        ]);

        $user->update([
            'nm_lengkap' => $request->nm_lengkap,
            'email' => $request->email,
            'no_kk' => $request->no_kk,
            'no_hp' => $request->no_hp,
            'rt_rw' => $request->rt_rw,
            'kode_pos' => $request->kode_pos,
            'role_id' => $request->role_id
        ]);

        return redirect()->route('superadmin.users')->with('success', 'Data user berhasil diperbarui');
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return back()->with('success', 'User berhasil dihapus');
    }

    //Laporan keuangan
    public function keuangan()
    {
        $pemasukanIuran = PemasukanIuran::all();
        $pemasukanBOP = PemasukanBOP::all();
        $pengeluaran = Pengeluaran::all();

        $totalPemasukan = $pemasukanIuran->sum('jumlah') + $pemasukanBOP->sum('jumlah');
        $totalPengeluaran = $pengeluaran->sum('jumlah');
        $saldo = $totalPemasukan - $totalPengeluaran;

        return view('superadmin.keuangan.index', compact(
            'pemasukanIuran', 'pemasukanBOP', 'pengeluaran', 'saldo'
        ));
    }

    //Data Kategori
    public function kategori()
    {
        $kategoriIuran = KategoriIuran::all();
        $kategoriKegiatan = KategoriKegiatan::all();
        return view('superadmin.kategori.index', compact('kategoriIuran', 'kategoriKegiatan'));
    }
}
