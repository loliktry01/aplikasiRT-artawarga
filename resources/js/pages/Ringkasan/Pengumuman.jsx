import React, { useState } from "react";
import { useForm, router } from "@inertiajs/react";

export default function Pengumuman({ kategori_iuran }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        judul: "",
        ket: "",
        kat_iuran_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pengumuman.create"), {
            onSuccess: () => {
                alert("✅ Pengumuman berhasil dibuat!");
                reset();
            },
        });
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
                Buat Pengumuman Iuran
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Judul</label>
                    <input
                        type="text"
                        value={data.judul}
                        onChange={(e) => setData("judul", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                        placeholder="Contoh: Iuran Kebersihan Bulan November"
                    />
                    {errors.judul && (
                        <p className="text-red-500 text-sm">{errors.judul}</p>
                    )}
                </div>

                <div>
                    <label className="block font-medium mb-1">Keterangan</label>
                    <textarea
                        value={data.ket}
                        onChange={(e) => setData("ket", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                        placeholder="Tuliskan detail pembayaran..."
                    ></textarea>
                    {errors.ket && (
                        <p className="text-red-500 text-sm">{errors.ket}</p>
                    )}
                </div>

                <div>
                    <label className="block font-medium mb-1">
                        Kategori Iuran
                    </label>
                    <select
                        value={data.kat_iuran_id}
                        onChange={(e) =>
                            setData("kat_iuran_id", e.target.value)
                        }
                        className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                    >
                        <option value="">-- Pilih Kategori Iuran --</option>
                        {kategori_iuran.map((kat) => (
                            <option key={kat.id} value={kat.id}>
                                {kat.nm_kat}
                            </option>
                        ))}
                    </select>
                    {errors.kat_iuran_id && (
                        <p className="text-red-500 text-sm">
                            {errors.kat_iuran_id}
                        </p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {processing ? "Menyimpan..." : "Simpan Pengumuman"}
                    </button>
                </div>
            </form>
        </div>
    );
}
