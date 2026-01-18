import React, { useState, useMemo } from "react";
import { usePage, router } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
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
    ChevronLeft,
    ChevronRight,
    ChevronsUpDown,
    Banknote,
    Calculator,
    Database,
    RotateCcw,
    Plus,
    Wallet,
    TrendingUp,
    TrendingDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import FinancialLineChart from "@/components/FinancialLineChart";
import DownloadPdfBtn from "@/components/DownloadPdfBtn";

export default function Dashboard() {
    const {
        transaksi = [],
        auth,
        saldoAwal,
        sisaSaldo,
        totalPengeluaran,
        userTotal,
        sisaIuran,
        sisaBop,
    } = usePage().props;
    const userRole = auth?.user?.role_id;

    // --- STATE CONFIG ---
    const [sortField, setSortField] = useState("tgl");
    const [sortOrder, setSortOrder] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const itemsPerPage = 8;

    // --- HELPER FUNCTIONS ---
    const formatRupiah = (val) =>
        "Rp " + parseInt(val || 0).toLocaleString("id-ID");

    const toggleSort = (field) => {
        if (field === sortField) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const handleFilterChange = (month, year) => {
        setSelectedMonth(month);
        setSelectedYear(year);

        router.get(
            route("dashboard"),
            { month, year },
            { preserveScroll: true, preserveState: true }
        );
    };

    // --- LOGIKA FILTER & SORTING ---
    const filteredData = useMemo(() => {
        return transaksi.filter((t) => {
            const d = new Date(t.tgl);
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const year = String(d.getFullYear());

            let monthMatch = selectedMonth ? month === selectedMonth : true;
            let yearMatch = selectedYear ? year === selectedYear : true;

            return monthMatch && yearMatch;
        });
    }, [transaksi, selectedMonth, selectedYear]);

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            const valA = a[sortField];
            const valB = b[sortField];
            if (!valA || !valB) return 0;
            if (typeof valA === "string" && typeof valB === "string") {
                return sortOrder === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            }
            return sortOrder === "asc" ? valA - valB : valB - a[sortField];
        });
    }, [filteredData, sortField, sortOrder]);

    // --- PAGINATION ---
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // --- CHART DATA ---
    const chartData = useMemo(() => {
        const monthlyData = {};
        filteredData.forEach((t) => {
            const date = new Date(t.tgl);
            const key = `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}`;

            if (!monthlyData[key]) {
                monthlyData[key] = {
                    pemasukan: 0,
                    pengeluaran: 0,
                    dateObj: date,
                };
            }

            const nominal =
                t.status === "Pemasukan"
                    ? t.jumlah_sisa - t.jumlah_awal
                    : t.jumlah_digunakan;

            if (t.status === "Pemasukan") {
                monthlyData[key].pemasukan += nominal;
            } else {
                monthlyData[key].pengeluaran += nominal;
            }
        });

        let saldo = 0;
        return Object.keys(monthlyData)
            .sort()
            .map((key) => {
                const d = monthlyData[key];
                saldo += d.pemasukan - d.pengeluaran;
                return {
                    month: d.dateObj.toLocaleString("id-ID", {
                        month: "short",
                        year: "numeric",
                    }),
                    pemasukan: d.pemasukan,
                    pengeluaran: d.pengeluaran,
                    saldo,
                };
            });
    }, [filteredData]);

    // --- COMPONENT: CARD ITEM with Islamic/Property Theme ---
    const InfoCard = ({
        title,
        value,
        subtitle,
        icon: Icon,
        variant = "blue", // default variant changed to blue for professional theme
    }) => {
        // Konfigurasi warna berdasarkan variant with Professional theme
        const themes = {
            blue: {
                bar: "bg-blue-600",
                iconBg: "bg-blue-50",
                iconColor: "text-blue-600",
            },
            purple: {
                bar: "bg-purple-600",
                iconBg: "bg-purple-50",
                iconColor: "text-purple-600",
            },
            orange: {
                // Professional orange
                bar: "bg-orange-500",
                iconBg: "bg-orange-50",
                iconColor: "text-orange-600",
            },
            green: {
                bar: "bg-green-600",
                iconBg: "bg-green-50",
                iconColor: "text-green-600",
            },
            red: {
                bar: "bg-red-600",
                iconBg: "bg-red-50",
                iconColor: "text-red-600",
            },
            indigo: {
                bar: "bg-indigo-700",
                iconBg: "bg-indigo-100",
                iconColor: "text-indigo-800",
            },
        };

        const theme = themes[variant] || themes.blue;

        return (
            <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100 p-5 h-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Vertical Bar (Accent) with Professional theme */}
                <div
                    className={`absolute left-0 top-0 bottom-0 w-[6px] rounded-l-xl ${theme.bar} bg-gradient-to-b`}
                />

                <div className="flex flex-col h-full pl-3">
                    {/* Icon Container with Professional theme */}
                    <div
                        className={`w-12 h-12 rounded-2xl ${theme.iconBg} bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center mb-4 border border-blue-200`}
                    >
                        <Icon
                            className={`w-6 h-6 ${theme.iconColor}`}
                            strokeWidth={2}
                        />
                    </div>

                    {/* Text Content */}
                    <div className="mt-auto">
                        <p className="text-blue-700 text-sm font-medium mb-1 tracking-wide">
                            {title}
                        </p>
                        <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                            {value}
                        </h3>
                        {subtitle && (
                            <p className="text-xs text-blue-600 mt-2 font-medium italic">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-1 bg-gradient-to-b from-blue-50 to-gray-50 min-h-screen">
                <div className="w-full px-1">
                    {/* --- HEADER & BUTTONS with Professional Theme --- */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
                        <h1 className="text-2xl md:text-3xl font-bold">
                            DASHBOARD KEUANGAN RT
                        </h1>

                        {/* Action Buttons with Professional Theme */}
                        {userRole !== 5 && (
                            <div className="flex gap-3">
                                {(userRole === 2 ||
                                    userRole === 3 ||
                                    userRole === 4) && (
                                    <>
                                        <Button
                                            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-md"
                                            onClick={() =>
                                                router.visit(
                                                    "/dashboard/pemasukan"
                                                )
                                            }
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Tambah Pemasukan
                                        </Button>
                                        <Button
                                            className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white shadow-md"
                                            onClick={() =>
                                                router.visit(
                                                    "/dashboard/pengeluaran"
                                                )
                                            }
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Tambah Pengeluaran
                                        </Button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* --- CARDS GRID with Professional Theme --- */}
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 ${
                            userRole === 1 ? "lg:grid-cols-4" : "lg:grid-cols-3"
                        } gap-6 mb-8 w-full px-4`}
                    >
                        {/* BAGIAN ADMIN (4 KARTU) with Professional Theme */}
                        {userRole === 1 && (
                            <>
                                <InfoCard
                                    title="Total Keluarga (KK)"
                                    value={userTotal}
                                    icon={Database}
                                    variant="indigo"
                                    subtitle="Data terdaftar sistem"
                                />
                                <InfoCard
                                    title="Sisa Dana BOP"
                                    value={formatRupiah(sisaBop)}
                                    icon={Wallet}
                                    variant="blue"
                                    subtitle={`BOP: ${formatRupiah(sisaBop)}`} // Style with Professional theme
                                />
                                <InfoCard
                                    title="Sisa Dana Iuran"
                                    value={formatRupiah(sisaIuran)}
                                    icon={Banknote}
                                    variant="orange" // Changed to orange for Professional theme
                                    subtitle={`Iuran: ${formatRupiah(
                                        sisaIuran
                                    )}`}
                                />
                                <InfoCard
                                    title="Total Saldo Aktif"
                                    value={formatRupiah(sisaSaldo)}
                                    icon={Calculator}
                                    variant="blue"
                                    subtitle="Akumulasi seluruh dana"
                                />
                            </>
                        )}

                        {/* BAGIAN USER LAIN (3 KARTU) with Professional Theme */}
                        {(userRole === 2 ||
                            userRole === 3 ||
                            userRole === 4 ||
                            userRole === 5) && (
                            <>
                                <InfoCard
                                    title="Total Pemasukan"
                                    value={formatRupiah(saldoAwal)}
                                    icon={TrendingUp}
                                    variant="blue"
                                />
                                <InfoCard
                                    title="Total Pengeluaran"
                                    value={formatRupiah(totalPengeluaran)}
                                    icon={TrendingDown}
                                    variant="red"
                                />
                                <InfoCard
                                    title="Saldo Sekarang"
                                    value={formatRupiah(sisaSaldo)}
                                    icon={Wallet}
                                    variant="blue"
                                />
                            </>
                        )}
                    </div>

                    {/* --- CHART SECTION with Professional Theme --- */}
                    <div className="px-4">
                        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-100">
                            <h2 className="text-xl font-bold text-blue-800 mb-4">Grafik Keuangan</h2>
                            <FinancialLineChart data={chartData} />
                        </div>
                    </div>

                    {/* --- TABLE CONTAINER with Professional Theme --- */}
                    <div className="bg-gradient-to-br from-white to-blue-50 overflow-hidden shadow-lg sm:rounded-xl border border-blue-100 mt-8 mx-4">
                        {/* Filter Bar with Professional Theme */}
                        <div className="p-4 border-b border-blue-100 flex flex-wrap gap-2 items-center justify-end bg-gradient-to-r from-blue-50 to-gray-50">
                            <span className="text-sm text-blue-800 font-medium mr-1">
                                Filter:
                            </span>

                            {/* Filter Bulan */}
                            <select
                                value={selectedMonth}
                                onChange={(e) =>
                                    handleFilterChange(
                                        e.target.value,
                                        selectedYear
                                    )
                                }
                                className="border border-blue-300 rounded-md px-3 py-1.5 text-sm text-blue-800 focus:ring-blue-500 focus:border-blue-500 h-9 bg-white"
                            >
                                <option value="">Semua Bulan</option>
                                {[...Array(12)].map((_, i) => (
                                    <option
                                        key={i}
                                        value={String(i + 1).padStart(2, "0")}
                                    >
                                        {new Date(0, i).toLocaleString(
                                            "id-ID",
                                            { month: "long" }
                                        )}
                                    </option>
                                ))}
                            </select>

                            {/* Filter Tahun */}
                            <select
                                value={selectedYear}
                                onChange={(e) =>
                                    handleFilterChange(
                                        selectedMonth,
                                        e.target.value
                                    )
                                }
                                className="border border-blue-300 rounded-md px-3 py-1.5 text-sm text-blue-800 focus:ring-blue-500 focus:border-blue-500 h-9 bg-white"
                            >
                                <option value="">Semua Tahun</option>
                                {[...Array(6)].map((_, i) => {
                                    const year = new Date().getFullYear() - i;
                                    return (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    );
                                })}
                            </select>

                            {/* Reset Button */}
                            {(selectedMonth || selectedYear) && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setSelectedMonth("");
                                        setSelectedYear("");
                                        router.get(
                                            route("dashboard"),
                                            {},
                                            {
                                                preserveScroll: true,
                                                preserveState: true,
                                            }
                                        );
                                    }}
                                    className="text-red-700 border-red-300 bg-red-50 hover:bg-red-100 hover:text-red-800 h-9"
                                >
                                    <RotateCcw className="w-3 h-3" />
                                </Button>
                            )}

                            {/* Download PDF */}
                            <DownloadPdfBtn
                                month={selectedMonth}
                                year={selectedYear}
                            />
                        </div>

                        {/* Table Content (Using Shadcn Table inside the container) */}
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-blue-50 hover:bg-blue-100 border-b border-blue-200">
                                        {[
                                            { key: "tgl", label: "Tanggal" },
                                            {
                                                key: "kategori",
                                                label: "Kategori",
                                            },
                                            {
                                                key: "jumlah_awal",
                                                label: "Saldo Awal",
                                            },
                                            {
                                                key: "jumlah_pemasukan",
                                                label: "Saldo Masuk",
                                            },
                                            {
                                                key: "jumlah_pengeluaran",
                                                label: "Saldo Keluar",
                                            },
                                            {
                                                key: "jumlah_sisa",
                                                label: "Saldo Akhir",
                                            },
                                            { key: "status", label: "Status" },
                                        ].map((col) => (
                                            <TableHead
                                                key={col.key}
                                                onClick={() =>
                                                    toggleSort(col.key)
                                                }
                                                className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider cursor-pointer select-none h-auto bg-blue-100"
                                            >
                                                <div className="flex items-center gap-1">
                                                    {col.label}
                                                    <ChevronsUpDown className="h-3 w-3 text-blue-600" />
                                                </div>
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="bg-white divide-y divide-blue-100">
                                    {paginatedData.length ? (
                                        paginatedData.map((t, i) => {
                                            const nominal =
                                                t.status === "Pemasukan"
                                                    ? t.jumlah_sisa -
                                                      t.jumlah_awal
                                                    : t.jumlah_digunakan;

                                            return (
                                                <TableRow
                                                    key={i}
                                                    onClick={() =>
                                                        router.visit(
                                                            `/rincian/${t.id}`
                                                        )
                                                    }
                                                    className="hover:bg-blue-50 transition duration-150 cursor-pointer border-0"
                                                >
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-blue-800">
                                                        {t.tgl}
                                                    </TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-blue-900 font-medium">
                                                        {t.kategori}
                                                    </TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">
                                                        {formatRupiah(
                                                            t.jumlah_awal
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">
                                                        {t.status ===
                                                        "Pemasukan"
                                                            ? formatRupiah(
                                                                  nominal
                                                              )
                                                            : "–"}
                                                    </TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                                                        {t.status ===
                                                        "Pengeluaran"
                                                            ? formatRupiah(
                                                                  nominal
                                                              )
                                                            : "–"}
                                                    </TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-900">
                                                        {formatRupiah(
                                                            t.jumlah_sisa
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap">
                                                        <Badge
                                                            variant="secondary"
                                                            className={`
                                                                ${
                                                                    t.status ===
                                                                    "Pemasukan"
                                                                        ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300"
                                                                        : "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300"
                                                                } border rounded-full px-3 py-1
                                                            `}
                                                        >
                                                            {t.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="px-6 py-8 text-center text-blue-600"
                                            >
                                                Tidak ada data transaksi.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination Controls with Professional Theme */}
                        {filteredData.length > 0 && (
                            <div className="flex justify-end items-center gap-2 px-6 py-4 bg-blue-50 border-t border-blue-100">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.max(p - 1, 1)
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className="h-8 w-8 border-blue-300"
                                >
                                    <ChevronLeft className="w-4 h-4 text-blue-700" />
                                </Button>

                                <span className="text-sm text-blue-700">
                                    Halaman {currentPage} dari {totalPages}
                                </span>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.min(p + 1, totalPages)
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    className="h-8 w-8 border-blue-300"
                                >
                                    <ChevronRight className="w-4 h-4 text-blue-700" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
