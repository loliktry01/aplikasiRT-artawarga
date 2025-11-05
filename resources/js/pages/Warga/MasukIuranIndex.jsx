import React from "react";
import { Link } from "@inertiajs/react";

export default function MasukIuranIndex({ iurans }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Daftar Tagihan Iuran</h1>

      {iurans.data.length === 0 ? (
        <p>Tidak ada tagihan iuran.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Tanggal</th>
              <th className="border px-4 py-2">Judul</th>
              <th className="border px-4 py-2">Nominal</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {iurans.data.map((iuran) => (
              <tr key={iuran.id}>
                <td className="border px-4 py-2">{iuran.tgl}</td>
                <td className="border px-4 py-2">
                  {iuran.pengumuman?.judul || "-"}
                </td>
                <td className="border px-4 py-2">
                  Rp {iuran.nominal?.toLocaleString("id-ID")}
                </td>
                <td className="border px-4 py-2">{iuran.status}</td>
                <td className="border px-4 py-2">
                  {iuran.status === "tagihan" ? (
                    <Link
                      href={route("masuk-iuran.show", iuran.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Bayar
                    </Link>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
