<?php

// Controller
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BopController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IuranController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\PengumumanController;
use App\Http\Controllers\SuperAdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('Welcome'));

// 🔐 Login & Logout
Route::get('/login', [AuthController::class, 'index'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware(['role.access'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/ringkasan/pemasukan', [IuranController::class, 'pemasukan'])->name('pemasukan.index');
    Route::post('/kategori-iuran/create', [IuranController::class, 'kat_iuran_create'])->name('kat_iuran.create');
    Route::delete('/kategori-iuran/{id}', [IuranController::class, 'kat_iuran_delete'])->name('kat_iuran.delete');

    Route::get('/ringkasan/kegiatan', [KegiatanController::class, 'create'])->name('kegiatan.create');
    Route::post('/kegiatan', [KegiatanController::class, 'store'])->name('kegiatan.store');

    Route::get('/bop', [BopController::class, 'index']);
    Route::get('/iuran', [IuranController::class, 'index']);
    Route::post('/bop/create', [BopController::class, 'bop_create'])->name('bop.create');
    Route::post('/iuran/create', [IuranController::class, 'iuran_create'])->name('iuran.create');

    Route::get('/ringkasan/pengumuman', [PengumumanController::class, 'pengumuman'])->name('pengumuman');
    Route::post('/pengumuman/create', [PengumumanController::class, 'pengumuman_create'])->name('pengumuman.create');

    Route::get('/ringkasan/pengeluaran', [PengeluaranController::class, 'index'])->name('pengeluaran');
    Route::post('/pengeluaran', [PengeluaranController::class, 'pengeluaran'])->name('pengeluaran.store');
    Route::get('/rincian/{id}', [DashboardController::class, 'rincian'])->name('rincian.show');
});


Route::get('/tambah_data', [SuperAdminController::class, 'createUser'])->name('superadmin.createUser');
Route::get('/manajemen_data', [SuperAdminController::class, 'users'])->name('superadmin.users');
Route::get('/superadmin', fn() => Inertia::render('Superadmin'))->name('superadmin');

Route::get('/manajemen_data/{id}/edit', [SuperAdminController::class, 'editUser'])->name('manajemen-data.edit');
Route::put('/manajemen-data/{id}', [SuperAdminController::class, 'update'])->name('manajemen-data.update');

Route::get('/users', [SuperAdminController::class, 'users'])->name('users');
Route::get('/users/create', [SuperAdminController::class, 'createUser'])->name('users.create');
Route::post('/users/store', [SuperAdminController::class, 'storeUser'])->name('users.store');
Route::get('/users/edit/{id}', [SuperAdminController::class, 'editUser'])->name('users.edit');
Route::post('/users/update/{id}', [SuperAdminController::class, 'updateUser'])->name('users.update');
Route::delete('/superadmin/users/{id}', [SuperadminController::class, 'deleteUser'])->name('superadmin.deleteUser');


Route::get('/manajemen_data', [SuperAdminController::class, 'users'])->name('superadmin.users');
Route::post('/manajemen-data', [SuperAdminController::class, 'store'])->name('manajemen-data.store');
Route::post('/superadmin/users', [SuperAdminController::class, 'storeUser'])->name('superadmin.storeUser');

Route::get('/superadmin/users', [SuperAdminController::class, 'users'])->name('superadmin.users');
Route::get('/superadmin/users/create', [SuperAdminController::class, 'createUser'])->name('superadmin.createUser');
Route::post('/superadmin/users', [SuperAdminController::class, 'storeUser'])->name('superadmin.storeUser');