import React, { useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, usePage, router } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function ManajemenData() {
    const { props } = usePage();
    const users = props.users?.data || [];
    const roles = props.roles || [];

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    const filteredData = users.filter((item) => {
        const term = search.toLowerCase();
        const matchName = item.nm_lengkap?.toLowerCase().includes(term);
        const matchKK = item.no_kk?.includes(term);
        const matchRole =
            roleFilter === "all" || item.role?.nm_role === roleFilter;
        return (matchName || matchKK) && matchRole;
    });

    return (
        <AppLayout>
            <div className="space-y-10">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full bg-white">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                        <span className="font-bold text-gray-900 pr-5">
                            MANAJEMEN DATA
                        </span>
                    </h1>

                    <div className="mt-4 md:mt-0">
                        <Link href="/tambah-data">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Plus size={16} className="mr-2" />
                                Tambah Data
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* FILTER SECTION */}
                <div className="bg-white w-full">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Search */}
                        <div className="relative w-full md:w-1/3">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Cari berdasarkan nama atau KK"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        {/* Filter Role */}
                        <div className="flex items-center gap-3">
                            <Select
                                value={roleFilter}
                                onValueChange={setRoleFilter}
                            >
                                <SelectTrigger className="w-[150px] text-gray-700">
                                    <SelectValue placeholder="Filter Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua</SelectItem>
                                    {roles.map((r) => (
                                        <SelectItem
                                            key={r.id}
                                            value={r.nama_role}
                                        >
                                            {r.nama_role}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {(search || roleFilter !== "all") && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearch("");
                                        setRoleFilter("all");
                                    }}
                                    className="text-gray-700"
                                >
                                    Reset
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="rounded-xl border overflow-hidden shadow-sm bg-white">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left font-medium">
                                    No. KK
                                </th>
                                <th className="py-3 px-4 text-left font-medium">
                                    Nama Lengkap
                                </th>
                                <th className="py-3 px-4 text-left font-medium">
                                    Domisili
                                </th>
                                <th className="py-3 px-4 text-left font-medium">
                                    Role
                                </th>
                                <th className="py-3 px-4 text-left font-medium">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredData.map((item, i) => (
                                <tr
                                    key={i}
                                    className="border-b hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-3 px-4">{item.no_kk}</td>

                                    <td className="py-3 px-4">
                                        <div className="font-bold">
                                            {item.nm_lengkap}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {item.email}
                                        </div>
                                    </td>

                                    <td className="py-3 px-4 max-w-xs">
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {item.alamat}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                RT {item.rt}/RW {item.rw},{" "}
                                                {item.kelurahan?.nama_kelurahan}
                                                ,{" "}
                                                {item.kecamatan?.nama_kecamatan}
                                                , {item.kota?.nama_kota}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="py-3 px-4">
                                        <Badge variant="outline">
                                            {item.role?.nm_role}
                                        </Badge>
                                    </td>

                                    <td className="py-3 px-4 flex items-center gap-2">
                                        <Link
                                            href={`/manajemen-data/${item.id}/edit`}
                                        >
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="bg-yellow-300 hover:bg-yellow-400"
                                            >
                                                <Pencil className="w-4 h-4 text-gray-800" />
                                            </Button>
                                        </Link>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="bg-red-500 hover:bg-red-600"
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        `Yakin hapus ${item.nm_lengkap}?`
                                                    )
                                                ) {
                                                    router.delete(
                                                        route(
                                                            "superadmin.deleteUser",
                                                            item.id
                                                        )
                                                    );
                                                }
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4 text-white" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                            {filteredData.length === 0 && (
                                <tr>
                                    <td
                                        className="py-6 text-center text-gray-500"
                                        colSpan={5}
                                    >
                                        Tidak ada data ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
