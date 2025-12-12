import React, { useState, useMemo, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/layouts/AppLayout";

// --- SHADCN IMPORTS (Sama seperti Approval.jsx) ---
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// --- ICONS ---
import {
    ChevronsUpDown,
    ChevronLeft,
    ChevronRight,
    FileText,
    X,
    MoreVertical,
    Edit,
    Trash2,
    Search, // Icon baru
    RotateCcw, // Icon baru
    Filter, // Icon baru
} from "lucide-react";
import Swal from "sweetalert2";

export default function Kegiatan() {
    const { kegiatans } = usePage().props;

    // --- STATE FILTER & PAGINATION ---
    const [searchQuery, setSearchQuery] = useState("");
    const [filterBulan, setFilterBulan] = useState("all");
    const [filterTahun, setFilterTahun] = useState("all");

    // --- STATE SORTING ---
    const [sortField, setSortField] = useState("tgl_mulai");
    const [sortOrder, setSortOrder] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // --- STATE MODAL ---
    const [selectedDokuments, setSelectedDokuments] = useState({
        dokumen: null,
        nama: "",
    });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // --- HELPER NAMA BULAN ---
    const getNamaBulan = (bulan) => {
        const monthNames = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];
        // Input bulan bisa string angka "1" s/d "12"
        const index = parseInt(bulan) - 1;
        if (index >= 0 && index < 12) return monthNames[index];
        return bulan;
    };

    // --- LOGIKA FILTERING & SORTING ---
    const filteredAndSortedData = useMemo(() => {
        if (!kegiatans?.data) return [];

        let data = [...kegiatans.data];

        // 1. FILTERING
        data = data.filter((item) => {
            const date = new Date(item.tgl_mulai); // Ambil tanggal dari tgl_mulai

            // Filter Search (Nama Kegiatan)
            const matchSearch = item.nm_keg
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

            // Filter Bulan
            let matchBulan = true;
            if (filterBulan !== "all") {
                // getMonth() returns 0-11, jadi +1
                matchBulan = (date.getMonth() + 1).toString() === filterBulan;
            }

            // Filter Tahun
            let matchTahun = true;
            if (filterTahun !== "all") {
                matchTahun = date.getFullYear().toString() === filterTahun;
            }

            return matchSearch && matchBulan && matchTahun;
        });

        // 2. SORTING (Logika Lama)
        return data.sort((a, b) => {
            const valA = a[sortField];
            const valB = b[sortField];
            if (sortField === "dok_keg" || sortField === "aksi") return 0;
            if (!valA || !valB) return 0;

            if (typeof valA === "string") {
                return sortOrder === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            }
            return sortOrder === "asc" ? valA - valB : valB - valA;
        });
    }, [
        kegiatans,
        searchQuery,
        filterBulan,
        filterTahun,
        sortField,
        sortOrder,
    ]);

    // Ambil Tahun Unik dari Data untuk Dropdown
    const uniqueYears = useMemo(() => {
        if (!kegiatans?.data) return [];
        const years = kegiatans.data.map((item) =>
            new Date(item.tgl_mulai).getFullYear()
        );
        return [...new Set(years)].sort((a, b) => b - a);
    }, [kegiatans]);

    // --- PAGINATION LOGIC ---
    const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
    const paginatedData = filteredAndSortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset halaman ke 1 jika filter berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filterBulan, filterTahun]);

    const handleResetFilter = () => {
        setSearchQuery("");
        setFilterBulan("all");
        setFilterTahun("all");
    };

    const toggleSort = (field) => {
        if (field === sortField) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    // --- FORMAT DATE HELPER ---
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    // --- ACTION HANDLERS ---
    const handleRowClick = (id) => {
        router.visit(route("kegiatan.show", id));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Yakin ingin menghapus?",
            text: "Data kegiatan ini tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("kegiatan.destroy", id), {
                    onSuccess: () =>
                        Swal.fire(
                            "Terhapus!",
                            "Kegiatan berhasil dihapus.",
                            "success"
                        ),
                    onError: () =>
                        Swal.fire(
                            "Gagal",
                            "Terjadi kesalahan saat menghapus.",
                            "error"
                        ),
                });
            }
        });
    };

    // --- MODAL HANDLERS ---
    const openDialog = (dokumenArray, namaKegiatan) => {
        const docs = Array.isArray(dokumenArray)
            ? dokumenArray
            : [dokumenArray];
        setSelectedDokuments({ dokumen: docs, nama: namaKegiatan });
        setCurrentImageIndex(0);
    };

    const closeDialog = () => {
        setSelectedDokuments({ dokumen: null, nama: "" });
        setCurrentImageIndex(0);
    };

    const totalDokumen = selectedDokuments.dokumen?.length || 0;
    const nextImage = () =>
        setCurrentImageIndex((p) => Math.min(p + 1, totalDokumen - 1));
    const prevImage = () => setCurrentImageIndex((p) => Math.max(p - 1, 0));
    const currentImagePath = selectedDokuments.dokumen
        ? selectedDokuments.dokumen[currentImageIndex]
        : null;

    return (
        <AppLayout>
            <div className="space-y-6 relative">
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-center w-full bg-white gap-4 md:gap-0">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center md:text-left">
                        <span className="font-bold text-gray-900 md:pr-5">
                            DAFTAR KEGIATAN
                        </span>
                    </h1>
                    <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm px-4 py-2 rounded-md"
                        onClick={() => router.visit(route("kegiatan.create"))}
                    >
                        Tambah Kegiatan
                    </Button>
                </div>

                {/* --- TOOLBAR FILTER & SEARCH --- */}
                <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Cari nama kegiatan..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filters Group */}
                    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto items-center">
                        {/* Filter Bulan */}
                        <Select
                            value={filterBulan}
                            onValueChange={setFilterBulan}
                        >
                            <SelectTrigger className="w-full md:w-[140px]">
                                <SelectValue placeholder="Bulan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Bulan</SelectItem>
                                {Array.from(
                                    { length: 12 },
                                    (_, i) => i + 1
                                ).map((bln) => (
                                    <SelectItem
                                        key={bln}
                                        value={bln.toString()}
                                    >
                                        {getNamaBulan(bln)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Filter Tahun */}
                        <Select
                            value={filterTahun}
                            onValueChange={setFilterTahun}
                        >
                            <SelectTrigger className="w-full md:w-[120px]">
                                <SelectValue placeholder="Tahun" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Tahun</SelectItem>
                                {uniqueYears.map((thn) => (
                                    <SelectItem
                                        key={thn}
                                        value={thn.toString()}
                                    >
                                        {thn}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Reset Button */}
                        {(searchQuery ||
                            filterBulan !== "all" ||
                            filterTahun !== "all") && (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleResetFilter}
                                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 shrink-0"
                                title="Reset Filter"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* --- TABLE --- */}
                <div className="pb-10">
                    <div className="rounded-xl border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-white">
                                    {[
                                        {
                                            key: "nm_keg",
                                            label: "Nama Kegiatan",
                                        },
                                        {
                                            key: "tgl_mulai",
                                            label: "Tanggal Mulai",
                                        },
                                        {
                                            key: "tgl_selesai",
                                            label: "Tanggal Selesai",
                                        },
                                        {
                                            key: "pj_keg",
                                            label: "Penanggung Jawab",
                                        },
                                        { key: "panitia", label: "Panitia" },
                                        { key: "dok_keg", label: "Dokumen" },
                                        { key: "aksi", label: "" },
                                    ].map((col) => (
                                        <TableHead
                                            key={col.key}
                                            onClick={() =>
                                                col.key !== "aksi" &&
                                                toggleSort(col.key)
                                            }
                                            className={`font-semibold select-none ${
                                                col.key !== "aksi"
                                                    ? "cursor-pointer hover:bg-gray-50"
                                                    : ""
                                            }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                {col.label}
                                                {col.key !== "aksi" && (
                                                    <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                                                )}
                                            </div>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((keg, i) => (
                                        <TableRow
                                            key={keg.id || i}
                                            className="hover:bg-gray-50 transition cursor-pointer"
                                            onClick={() =>
                                                handleRowClick(keg.id)
                                            }
                                        >
                                            <TableCell className="font-medium">
                                                {keg.nm_keg}
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(keg.tgl_mulai)}
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(keg.tgl_selesai)}
                                            </TableCell>
                                            <TableCell>{keg.pj_keg}</TableCell>
                                            <TableCell>{keg.panitia}</TableCell>

                                            {/* Kolom Dokumen */}
                                            <TableCell>
                                                {keg.dok_keg ? (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openDialog(
                                                                keg.dok_keg,
                                                                keg.nm_keg
                                                            );
                                                        }}
                                                        className="text-blue-500 flex items-center gap-1 hover:underline z-10 relative"
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                        Lihat
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-400 text-xs italic">
                                                        -
                                                    </span>
                                                )}
                                            </TableCell>

                                            {/* Kolom Aksi */}
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0"
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        >
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.visit(
                                                                    route(
                                                                        "kegiatan.edit",
                                                                        keg.id
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />{" "}
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(
                                                                    keg.id
                                                                );
                                                            }}
                                                            className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />{" "}
                                                            Hapus
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    // --- EMPTY STATE ---
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="h-48 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <Filter className="w-10 h-10 text-gray-300 mb-2" />
                                                <p className="font-medium">
                                                    Tidak ada kegiatan ditemukan
                                                </p>
                                                <p className="text-xs mt-1">
                                                    Coba ubah filter atau kata
                                                    kunci pencarian Anda.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* --- PAGINATION (SHADCN STYLE) --- */}
                    {totalPages > 1 && (
                        <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm text-gray-500">
                            <div className="hidden md:block">
                                Menampilkan {paginatedData.length} dari{" "}
                                {filteredAndSortedData.length} data
                            </div>
                            <div className="flex items-center gap-2 mt-2 md:mt-0 ml-auto">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.max(p - 1, 1)
                                        )
                                    }
                                    className="h-8 w-8"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>

                                <span className="text-xs mx-2">
                                    Hal {currentPage} dari {totalPages}
                                </span>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.min(p + 1, totalPages)
                                        )
                                    }
                                    className="h-8 w-8"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- DIALOG MODAL IMAGE --- */}
                <Dialog
                    open={!!selectedDokuments.dokumen}
                    onOpenChange={closeDialog}
                >
                    <DialogContent className="max-w-4xl p-0 max-h-[90vh] flex flex-col">
                        <DialogHeader className="p-4 border-b">
                            <DialogTitle>
                                Dokumen Kegiatan: {selectedDokuments.nama}
                            </DialogTitle>
                        </DialogHeader>
                        <button
                            onClick={closeDialog}
                            className="absolute top-3 right-3 bg-white rounded-full p-1 shadow z-50 hover:bg-gray-100"
                        >
                            <X className="h-5 w-5 text-gray-700" />
                        </button>
                        <div className="relative flex-grow flex items-center justify-center p-4 bg-gray-50">
                            {currentImagePath ? (
                                <>
                                    {totalDokumen > 1 && (
                                        <Button
                                            onClick={prevImage}
                                            disabled={currentImageIndex === 0}
                                            className="absolute left-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                                            size="icon"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </Button>
                                    )}
                                    <div className="w-full h-full max-h-[70vh] flex justify-center items-center overflow-hidden">
                                        <img
                                            src={`/storage/${currentImagePath}`}
                                            alt="Dokumen"
                                            className="max-w-full max-h-full object-contain rounded-md shadow-sm"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    "https://via.placeholder.com/600x400?text=File+Error";
                                            }}
                                        />
                                    </div>
                                    {totalDokumen > 1 && (
                                        <Button
                                            onClick={nextImage}
                                            disabled={
                                                currentImageIndex ===
                                                totalDokumen - 1
                                            }
                                            className="absolute right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                                            size="icon"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </Button>
                                    )}
                                </>
                            ) : (
                                <p className="text-center text-gray-500 p-4">
                                    Tidak ada dokumen.
                                </p>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
