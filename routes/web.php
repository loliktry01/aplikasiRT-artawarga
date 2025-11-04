<?php

use App\Http\Controllers\Api\BopApiController;
use App\Http\Controllers\Api\IuranApiController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Controller
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BopController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IuranController;
use App\Http\Controllers\SuperAdminController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});


Route::get('/login', [AuthController::class, 'index'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// 📌 Dashboard & Ringkasan
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/ringkasan/pemasukan', [DashboardController::class, 'pemasukan'])->name('pemasukan');

// 📌 Aksi CRUD
Route::post('/bop/create', [BopController::class, 'bop_create'])->name('bop.create');
Route::post('/iuran/create', [IuranController::class, 'iuran_create'])->name('iuran.create');
Route::post('/kategori-iuran/create', [IuranController::class, 'kat_iuran_create'])->name('kat_iuran.create');
Route::delete('/kategori-iuran/delete/{id}', [IuranController::class, 'kat_iuran_delete'])->name('kat_iuran.delete');
Route::get('/api/masuk-bop', [BopApiController::class, 'index']);
Route::get('/api/masuk-iuran', [IuranApiController::class, 'index']);
/*
|--------------------------------------------------------------------------
| Protected Routes (User Logged In)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {


    /*
    |--------------------------------------------------------------------------
    | Super Admin Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware(['role:superadmin'])->prefix('superadmin')->name('superadmin.')->group(function () {

        // User Management
        Route::get('/users', [SuperAdminController::class, 'users'])->name('users');
        Route::get('/users/create', [SuperAdminController::class, 'createUser'])->name('users.create');
        Route::post('/users/store', [SuperAdminController::class, 'storeUser'])->name('users.store');
        Route::get('/users/edit/{id}', [SuperAdminController::class, 'editUser'])->name('users.edit');
        Route::post('/users/update/{id}', [SuperAdminController::class, 'updateUser'])->name('users.update');
        Route::delete('/users/delete/{id}', [SuperAdminController::class, 'deleteUser'])->name('users.delete');

    });

});
