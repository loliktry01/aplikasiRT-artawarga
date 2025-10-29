<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SuperAdminController extends Controller
{
    public function users()
    {
        $users = User::with('role')->paginate(10);
        $roles = Role::all();

        return Inertia::render('SuperAdmin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
            'flash' => [
                'success' => session('success')
            ]
        ]);
    }

    public function createUser()
    {
        $roles = Role::all();

        return Inertia::render('SuperAdmin/Users/Create', [
            'roles' => $roles
        ]);
    }

    public function storeUser(Request $request)
    {
        $request->validate([
            'nm_lengkap' => 'required|string',
            'email' => 'required|email|unique:usr',
            'no_kk' => 'required|digits:16|unique:usr',
            'password' => 'required|min:6',
            'no_hp' => 'nullable',
            'role_id' => 'required',
            'status' => 'required',
            'rt' => 'nullable',
            'rw' => 'nullable',
            'kode_pos' => 'nullable'
        ]);

        User::create([
            'nm_lengkap' => $request->nm_lengkap,
            'email' => $request->email,
            'no_kk' => $request->no_kk,
            'password' => Hash::make($request->password),
            'no_hp' => $request->no_hp,
            'role_id' => $request->role_id,
            'status' => $request->status,
            'rt_rw' => $request->rt . '/' . $request->rw,
            'kode_pos' => $request->kode_pos,
        ]);

        return redirect()->route('superadmin.users')->with('success', 'User berhasil ditambahkan');
    }

    public function editUser($id)
    {
        $user = User::findOrFail($id);
        $roles = Role::all();

        return Inertia::render('SuperAdmin/Users/Edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'nm_lengkap' => 'required|string',
            'email' => 'required|email|unique:usr,email,'.$id,
            'no_kk' => 'required|digits:16|unique:usr,no_kk,'.$id,
            'no_hp' => 'nullable',
            'role_id' => 'required',
            'status' => 'required',
            'rt' => 'nullable',
            'rw' => 'nullable',
            'kode_pos' => 'nullable'
        ]);

        $data = [
            'nm_lengkap' => $request->nm_lengkap,
            'email' => $request->email,
            'no_kk' => $request->no_kk,
            'no_hp' => $request->no_hp,
            'role_id' => $request->role_id,
            'status' => $request->status,
            'rt_rw' => $request->rt . '/' . $request->rw,
            'kode_pos' => $request->kode_pos,
        ];

        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return redirect()->route('superadmin.users')->with('success', 'Data user berhasil diperbarui');
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return back()->with('success', 'User berhasil dihapus');
    }
}
