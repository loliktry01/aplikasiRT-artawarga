import React from "react";
import AppLayoutSuperadmin from "@/layouts/AppLayoutSuperadmin";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TambahData() {
  return (
    <AppLayoutSuperadmin>
      <div className="px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-gray-400 text-2xl md:text-3xl font-semibold border-b-2 border-gray-200 py-3 md:py-5">
          <Link
            href="/manajemen_data"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Manajemen Data
          </Link>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-black font-bold">Tambah Data</span>
        </div>

        {/* Form Input */}
        <form className="space-y-6 py-5 max-w-5xl">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <Input placeholder="Masukkan nama lengkap anda" />
          </div>

          {/* No. KK */}
          <div>
            <label className="block text-sm font-medium mb-1">No. KK</label>
            <Input placeholder="Masukkan Nomor Kartu Keluarga anda" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input placeholder="Masukkan alamat Email anda" />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input type="password" placeholder="Masukkan password akun anda" />
          </div>

          {/* No. HP */}
          <div>
            <label className="block text-sm font-medium mb-1">No. HP</label>
            <Input placeholder="Masukkan nomor telepon anda" />
          </div>

          {/* Alamat, RT, RW, Kode Pos */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <label className="block text-sm font-medium mb-1">Alamat</label>
              <Input placeholder="Masukkan alamat lengkap anda" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">RT</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih RT" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">RT 01</SelectItem>
                  <SelectItem value="2">RT 02</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">RW</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih RW" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">RW 01</SelectItem>
                  <SelectItem value="2">RW 02</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Kode Pos</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kode Pos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50144">50144</SelectItem>
                  <SelectItem value="50145">50145</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Role & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="warga">Warga</SelectItem>
                  <SelectItem value="rt">Ketua RT</SelectItem>
                  <SelectItem value="rw">Ketua RW</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aktif">Aktif</SelectItem>
                  <SelectItem value="nonaktif">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 pt-4">
            <Link href="/manajemen_data">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                Batal
              </Button>
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </AppLayoutSuperadmin>
  );
}
