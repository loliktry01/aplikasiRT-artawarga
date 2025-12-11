import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { route } from "ziggy-js"; // Pastikan route helper diimport jika digunakan

export default function DownloadPdfKegiatan({ id }) {
    
    // REKOMENDASI: Menggunakan route yang sudah dikoreksi di web.php
    const handleDownload = () => {
        const url = route("kegiatan.generateSpjPdf", { id });

        // Menggunakan window.open agar download berjalan di tab baru
        window.open(url, '_blank');
    };

    return (
        <Button
            onClick={handleDownload}
            className="bg-violet-600 hover:bg-violet-700 text-white shadow-sm"
        >
            <Download className="w-4 h-4 mr-2" />
            Download Rincian Kegiatan
        </Button>
    );
}