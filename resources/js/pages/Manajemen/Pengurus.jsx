import React, { useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Save } from "lucide-react";

export default function Pengurus() {
    const { pengurus, jabatanOptions, users } = usePage().props;

    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        user_id: "",
        jabatan: "",
        no_hp: "",
        keterangan: "",
        status: "aktif",
        tanggal_mulai: "",
        tanggal_selesai: "",
    });

    const handleEdit = (item) => {
        setData({
            user_id: item.user_id ? item.user_id.toString() : "",
            jabatan: item.jabatan,
            no_hp: item.no_hp || "",
            keterangan: item.keterangan || "",
            status: item.status,
            tanggal_mulai: item.tanggal_mulai || "",
            tanggal_selesai: item.tanggal_selesai || "",
        });
        setEditingId(item.id);
        setShowForm(true);
    };

    const handleCancel = () => {
        reset();
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            put(`/pengurus/${editingId}`, {
                onSuccess: () => {
                    reset();
                    setEditingId(null);
                    setShowForm(false);
                }
            });
        } else {
            post('/pengurus', {
                onSuccess: () => {
                    reset();
                    setShowForm(false);
                }
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus data pengurus ini?")) {
            router.delete(`/pengurus/${id}`, {
                onSuccess: () => {
                    // Refresh the page after successful deletion
                    window.location.reload();
                },
                onError: () => {
                    alert('Gagal menghapus data pengurus');
                }
            });
        }
    };

    const getUserById = (userId) => {
        return users.find(user => user.id === userId);
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Pengurus RT</h1>
                    <Button 
                        onClick={() => {
                            reset();
                            setEditingId(null);
                            setShowForm(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Pengurus
                    </Button>
                </div>

                {/* Form Section */}
                {showForm && (
                    <div className="bg-white p-6 rounded-lg shadow-md border">
                        <h2 className="text-lg font-semibold mb-4">
                            {editingId ? "Edit Data Pengurus" : "Tambah Data Pengurus"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {Object.keys(errors).length > 0 && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                    <h4 className="font-bold mb-2">Kesalahan Validasi:</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {Object.entries(errors).map(([key, value]) => (
                                            <li key={key}>{value}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Nama Lengkap</Label>
                                    <Select
                                        value={data.user_id}
                                        onValueChange={(val) => setData('user_id', val)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Cari dan pilih nama lengkap..." />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-60">
                                            {users
                                                .slice()
                                                .sort((a, b) => a.nm_lengkap.localeCompare(b.nm_lengkap))
                                                .map((user) => (
                                                    <SelectItem key={user.id} value={user.id.toString()}>
                                                        {user.nm_lengkap} (No. KK: {user.no_kk})
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.user_id && (
                                        <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>
                                    )}
                                </div>
                                <div>
                                    <Label>Jabatan</Label>
                                    <Select value={data.jabatan} onValueChange={(val) => setData('jabatan', val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Jabatan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {jabatanOptions.map((jabatan, index) => (
                                                <SelectItem key={index} value={jabatan}>
                                                    {jabatan}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.jabatan && (
                                        <p className="text-red-500 text-sm mt-1">{errors.jabatan}</p>
                                    )}
                                </div>
                                <div>
                                    <Label>No. HP</Label>
                                    <Input
                                        value={data.no_hp}
                                        onChange={(e) => setData('no_hp', e.target.value)}
                                        placeholder="081234567890"
                                    />
                                    {errors.no_hp && (
                                        <p className="text-red-500 text-sm mt-1">{errors.no_hp}</p>
                                    )}
                                </div>
                                <div>
                                    <Label>Status</Label>
                                    <Select value={data.status} onValueChange={(val) => setData('status', val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="aktif">Aktif</SelectItem>
                                            <SelectItem value="tidak_aktif">Tidak Aktif</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                                    )}
                                </div>
                                <div>
                                    <Label>Tanggal Mulai</Label>
                                    <Input
                                        type="date"
                                        value={data.tanggal_mulai}
                                        onChange={(e) => setData('tanggal_mulai', e.target.value)}
                                    />
                                    {errors.tanggal_mulai && (
                                        <p className="text-red-500 text-sm mt-1">{errors.tanggal_mulai}</p>
                                    )}
                                </div>
                                <div>
                                    <Label>Tanggal Selesai</Label>
                                    <Input
                                        type="date"
                                        value={data.tanggal_selesai}
                                        onChange={(e) => setData('tanggal_selesai', e.target.value)}
                                    />
                                    {errors.tanggal_selesai && (
                                        <p className="text-red-500 text-sm mt-1">{errors.tanggal_selesai}</p>
                                    )}
                                </div>
                                {/* <div className="md:col-span-2">
                                    <Label>User Terkait (Opsional)</Label>
                                    <Select 
                                        value={data.user_id} 
                                        onValueChange={(val) => setData('user_id', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih User (Opsional)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem key={user.id} value={user.id.toString()}>
                                                    {user.nm_lengkap} (No. KK: {user.no_kk})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div> */}
                                <div className="md:col-span-2">
                                    <Label>Keterangan</Label>
                                    <Input
                                        value={data.keterangan}
                                        onChange={(e) => setData('keterangan', e.target.value)}
                                        placeholder="Keterangan tambahan"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {editingId ? 'Update' : 'Simpan'}
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={handleCancel}
                                >
                                    Batal
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Data Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. HP</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periode</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pengurus.length > 0 ? (
                                pengurus.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {item.user ? item.user.nm_lengkap : (getUserById(item.user_id)?.nm_lengkap || '-')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{item.jabatan}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.no_hp || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge
                                                variant="outline"
                                                className={
                                                    item.status === 'aktif'
                                                        ? 'bg-green-100 text-green-800 border-green-300'
                                                        : 'bg-red-100 text-red-800 border-red-300'
                                                }
                                            >
                                                {item.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.tanggal_mulai ? new Date(item.tanggal_mulai).toLocaleDateString('id-ID') : '-'}
                                            {item.tanggal_selesai ? ` s.d. ${new Date(item.tanggal_selesai).toLocaleDateString('id-ID')}` : ''}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(item)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                        Belum ada data pengurus
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