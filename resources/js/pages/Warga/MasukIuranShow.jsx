import React from "react";
import { useForm } from "@inertiajs/react";

export default function MasukIuranShow({ iuran }) {
  const { data, setData, post, processing, errors } = useForm({
    id: iuran.id,
    bkt_byr: null,
    bkt_nota: null,
    ket: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("masuk-iuran.store"), { forceFormData: true });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h2>Detail Iuran</h2>

      <p><b>Judul:</b> {iuran.pengumuman?.judul || "-"}</p>
      <p><b>Kategori:</b> {iuran.pengumuman?.kat_iuran?.nm_kat || "-"}</p>
      <p><b>Tanggal Tagihan:</b> {iuran.tgl}</p>
      <p><b>Nominal:</b> Rp {iuran.nominal?.toLocaleString("id-ID")}</p>
      <p><b>Status:</b> {iuran.status}</p>

      <form onSubmit={submit} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Bukti Pembayaran:</label><br />
          <input type="file" onChange={(e) => setData("bkt_byr", e.target.files[0])} />
          {errors.bkt_byr && <p style={{ color: "red" }}>{errors.bkt_byr}</p>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Bukti Nota (opsional):</label><br />
          <input type="file" onChange={(e) => setData("bkt_nota", e.target.files[0])} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Keterangan:</label><br />
          <textarea
            value={data.ket}
            onChange={(e) => setData("ket", e.target.value)}
            rows="3"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" disabled={processing} style={{ background: "#2563eb", color: "white", padding: "8px 16px", border: "none", borderRadius: "5px" }}>
          {processing ? "Mengirim..." : "Kirim Bukti Pembayaran"}
        </button>
      </form>
    </div>
  );
}
