import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { usePage } from "@inertiajs/react";
import heroImage from "../assets/hero.png"; // Consider replacing with Islamic/mosque themed image
import modelheroImage from "../assets/model_hero.png"; // Consider replacing with property/finance themed image
import ketuaRtImage from "../assets/ketua-rt.png";
import sekretarisImage from "../assets/sekretaris.png";
import bendaharaImage from "../assets/bendahara.png";
import wargaImage from "../assets/warga.png";
import cardWaveImage from "../assets/cardWave.png";
import featuresWaveBg from "../assets/featuresWaveBg.svg";
import iconPencatatan from "../assets/iconPencatatan.png";
import iconDetail from "../assets/iconDetail.png";
import iconCetak from "../assets/iconCetak.png";
import iconLaporan from "../assets/iconLaporan.png";
import iconAkses from "../assets/iconAkses.png";
import iconCalender from "../assets/iconCalender.png";
import Footer from "@/components/ui/Footer";
import { useNotify } from "@/components/ToastNotification";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import iconArthaWarga from "../assets/iconArthaWarga.png";

// --- Modified Role Card with Professional Theme ---
const RoleCard = ({ title, color, desc, image }) => (
    <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden min-h-[480px] border border-blue-100"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-full z-0">
            <img
                src={cardWaveImage}
                alt="Wave background"
                className="absolute bottom-[-5rem] left-0 w-full z-0 opacity-10"
            />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-10 pb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-700"></div>
                </div>
            </div>
            <h3 className={`text-2xl font-extrabold mb-6 ${color}`}>{title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-10 max-w-xs">
                {desc}
            </p>
            <div className="relative w-full flex justify-center items-end h-72 mt-auto">
                <img
                    src={image}
                    alt={title}
                    className="object-contain max-h-110 transform transition-transform duration-300 hover:scale-105 translate-y-30"
                />
            </div>
        </div>
    </motion.div>
);

// --- Modified Feature Card with Professional Theme ---
const FeatureCard = ({ title, description, icon }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="p-5 md:p-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg border border-blue-500/30 shadow-xl transition-all duration-300 hover:scale-[1.02] text-white flex flex-col items-center h-full"
    >
        <div className="mb-4">
            <img
                src={icon}
                alt={title}
                className="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-lg"
            />
        </div>
        <h4 className="text-lg md:text-xl font-bold mb-2 leading-snug text-center">
            {title}
        </h4>
        <p className="text-center text-sm md:text-base font-light leading-relaxed opacity-90 flex-grow">
            {description}
        </p>
    </motion.div>
);

export default function Welcome() {
    const { auth } = usePage().props;
    const { notifySuccess, notifyError } = useNotify();
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSmoothScroll = useCallback((e, targetId) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            setMenuOpen(false); // Tutup menu mobile setelah klik
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        post(route("login.post"), {
            onSuccess: () => {
                notifySuccess("Login berhasil! Mengalihkan ke dashboard...");
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 1200);
            },
            onError: (errors) => {
                if (errors.email || errors.password) {
                    notifyError(errors.email || errors.password);
                } else {
                    notifyError("Email atau password salah.");
                }
            },
        });
    };

    const roles = [
        {
            title: "Ketua RT",
            color: "text-blue-600",
            desc: "Ketua RT dapat memantau seluruh laporan keuangan, mencatat pemasukan, pengeluaran, serta kegiatan warga. Selain itu, Ketua RT juga dapat mencetak laporan keuangan setiap akhir bulan.",
            image: ketuaRtImage,
        },
        {
            title: "Sekretaris",
            color: "text-green-600",
            desc: "Sekretaris RT berperan dalam mencatat dan memantau data keuangan serta kegiatan RT. Ia juga membantu mencetak laporan keuangan akhir bulan untuk keperluan administrasi.",
            image: sekretarisImage,
        },
        {
            title: "Bendahara",
            color: "text-orange-600",
            desc: "Bendahara RT bertanggung jawab dalam menginput data pemasukan, pengeluaran, dan kegiatan RT. Selain itu, bendahara juga memantau laporan keuangan dan mencetak laporan akhir bulan.",
            image: bendaharaImage,
        },
        {
            title: "Warga",
            color: "text-red-600",
            desc: "Warga RT dapat melihat informasi keuangan RT secara transparan dan mencetak laporan keuangan akhir bulan sebagai bentuk keterbukaan data.",
            image: wargaImage,
        },
    ];

    const featuresData = [
        {
            title: "Pencatatan Keuangan",
            description: "Mencatat pemasukan & pengeluaran dengan mudah.",
            icon: iconPencatatan,
        },
        {
            title: "Detail Kegiatan",
            description: "Menampilkan rincian kegiatan dan laporan realisasi.",
            icon: iconDetail,
        },
        {
            title: "Cetak Nota & Bukti",
            description: "Membuat bukti pembayaran digital untuk warga.",
            icon: iconCetak,
        },
        {
            title: "Laporan Otomatis",
            description: "Menyusun laporan keuangan siap cetak otomatis.",
            icon: iconLaporan,
        },
        {
            title: "Akses Transparan",
            description: "Warga dapat melihat informasi keuangan terbuka.",
            icon: iconAkses,
        },
        {
            title: "Tagihan Bulanan",
            description: "Mengirimkan pengingat taginan air dan sampah secara otomatis.",
            icon: iconCalender,
        },
    ];

    return (
        <div className="font-['Poppins'] text-gray-900 overflow-x-hidden">
            {/* NAVBAR with Professional Theme */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg py-3"
                        : "bg-gradient-to-r from-blue-700/90 to-blue-900/90 py-4 backdrop-blur-sm"
                }`}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 md:px-10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">A</span>
                        </div>

                        <h1
                            className={`text-lg sm:text-xl font-bold uppercase transition-colors duration-300 ${
                                isScrolled ? "text-white" : "text-white"
                            }`}
                        >
                            Arthawarga
                        </h1>
                    </div>

                    {/* MENU DESKTOP with Professional Colors */}
                    <ul className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-wider">
                        <li
                            className={`cursor-pointer hover:text-blue-300 transition-colors ${
                                isScrolled ? "text-white" : "text-white"
                            }`}
                            onClick={(e) => handleSmoothScroll(e, "home")}
                        >
                            Home
                        </li>
                        <li
                            className={`cursor-pointer hover:text-blue-300 transition-colors ${
                                isScrolled ? "text-white" : "text-white"
                            }`}
                            onClick={(e) => handleSmoothScroll(e, "about")}
                        >
                            About
                        </li>
                        <li
                            className={`cursor-pointer hover:text-blue-300 transition-colors ${
                                isScrolled ? "text-white" : "text-white"
                            }`}
                            onClick={(e) => handleSmoothScroll(e, "fitur")}
                        >
                            Fitur
                        </li>
                    </ul>

                    {/* LOGIN BUTTON (Hanya Tampil di Desktop 'md:block') with Professional Styling */}
                    {auth?.user ? (
                        <a
                            href="/dashboard"
                            className="hidden md:block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2.5 rounded-full font-bold hover:from-blue-700 hover:to-blue-900 transition-all shadow-md hover:shadow-lg"
                        >
                            Dashboard
                        </a>
                    ) : (
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <button className="hidden md:block bg-gradient-to-r from-white to-gray-100 text-blue-800 px-6 py-2.5 rounded-full font-bold hover:from-blue-50 hover:to-blue-100 border border-blue-400 shadow-md hover:shadow-lg transition-all">
                                    Login
                                </button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-50 to-gray-50 border-2 border-blue-200">
                                <DialogHeader>
                                    <DialogTitle className="text-center text-2xl font-bold mb-3 text-blue-800">
                                        Masuk ke Arthawarga
                                    </DialogTitle>
                                </DialogHeader>
                                <form
                                    onSubmit={handleLogin}
                                    className="space-y-4 bg-white p-6 rounded-lg"
                                >
                                    <div>
                                        <Label className="pb-3 text-blue-800">Email</Label>
                                        <Input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            required
                                            className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label className="pb-3 text-blue-800">Password</Label>
                                        <Input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {errors.password && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    <DialogFooter>
                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Memproses..."
                                                : "Login"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}

                    {/* Hamburger Button */}
                    <button
                        className={`md:hidden text-3xl transition-colors duration-300 ${
                            isScrolled ? "text-white" : "text-white"
                        }`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>
                </div>

                {/* Menu Mobile with Professional Theme */}
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden bg-gradient-to-b from-blue-800 to-blue-900 shadow-lg px-6 py-4 flex flex-col gap-4 text-sm uppercase text-center"
                    >
                        <a
                            href="#home"
                            onClick={(e) => handleSmoothScroll(e, "home")}
                            className="text-white hover:text-blue-300 py-2 transition-colors"
                        >
                            Home
                        </a>
                        <a
                            href="#about"
                            onClick={(e) => handleSmoothScroll(e, "about")}
                            className="text-white hover:text-blue-300 py-2 transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="#fitur"
                            onClick={(e) => handleSmoothScroll(e, "fitur")}
                            className="text-white hover:text-blue-300 py-2 transition-colors"
                        >
                            Fitur
                        </a>
                        {/* Tombol Login Mobile: Membuka Dialog yang sama */}
                        {auth?.user ? (
                            <a
                                href="/dashboard"
                                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-full font-bold mt-2"
                            >
                                Dashboard
                            </a>
                        ) : (
                            <button
                                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-full font-bold mt-2"
                                onClick={() => {
                                    setMenuOpen(false);
                                    setOpen(true);
                                }}
                            >
                                Login
                            </button>
                        )}
                    </motion.div>
                )}
            </nav>

            {/* HERO with Professional Theme */}
            <section
                id="home"
                className="relative pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50"
            >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-10 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-center md:text-left w-full md:w-1/2 max-w-lg mx-auto md:mx-0 mt-10 md:mt-0"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-blue-900">
                            Solusi Manajemen <br />
                            <span className="text-blue-600">
                                Keuangan RT
                            </span>{" "}
                            <br />
                            yang Profesional
                        </h2>
                        <p className="mt-6 text-sm sm:text-base md:text-lg italic text-blue-800">
                            "Transparansi dan Akuntabilitas dalam
                            Pengelolaan Keuangan RT yang Solid dan Terpercaya."
                        </p>
                        <div className="mt-8 flex justify-center md:justify-start gap-4">
                            <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-full font-bold hover:from-blue-700 hover:to-blue-900 transition-all shadow-md hover:shadow-lg">
                                Mulai Sekarang
                            </button>
                            <button className="bg-gradient-to-r from-white to-gray-100 text-blue-800 px-6 py-3 rounded-full font-bold border border-blue-300 hover:from-blue-50 hover:to-blue-100 transition-all shadow-md hover:shadow-lg">
                                Pelajari Lebih Lanjut
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="relative w-full max-w-xs md:max-w-md object-contain z-10 mx-auto mt-10 bg-gradient-to-br from-blue-100 to-gray-100 rounded-2xl p-6 shadow-lg"
                    >
                        <img
                            src={modelheroImage}
                            alt="Model Hero"
                            className="w-full h-auto object-contain"
                        />
                    </motion.div>
                </div>

                {/* Decorative elements for Professional theme */}
                <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-blue-200 opacity-30 blur-xl"></div>
                <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-gray-200 opacity-30 blur-xl"></div>
            </section>

            {/* ABOUT with Professional Theme */}
            <section
                id="about"
                className="relative py-20 bg-gradient-to-r from-blue-700 to-blue-900 text-center px-6 overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-white">
                        Tentang Kami
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed max-w-3xl mx-auto">
                        Platform manajemen keuangan RT ini hadir untuk membantu
                        pengurus RT dalam mengelola keuangan dengan cara yang
                        transparan, akuntabel, dan profesional. Dengan sistem ini, setiap
                        transaksi keuangan dapat dicatat secara digital,
                        sehingga memudahkan pengawasan dan pelaporan yang akurat.
                    </p>
                </motion.div>
            </section>

            {/* ROLES with Professional Theme */}
            <section id="roles" className="bg-gradient-to-b from-blue-50 to-gray-50 px-6 md:px-20 pb-20 pt-20">
                <h2
                    className="text-4xl font-extrabold text-center mb-16
                        bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800"
                >
                    Peran Pengguna
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {roles.map((r, i) => (
                        <RoleCard key={i} {...r} />
                    ))}
                </div>
            </section>

            {/* FITUR with Professional Theme */}
            <section
                id="fitur"
                className="relative pt-40 md:pt-10 pb-40 bg-gradient-to-b from-blue-50 to-gray-50 overflow-visible"
            >
                <div className="absolute top-[70px] md:top-[50px] left-0 w-full z-0 h-full opacity-10">
                    <img
                        src={featuresWaveBg}
                        alt="Background wave"
                        className="w-full h-full object-cover object-top"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-blue-900 text-4xl sm:text-4xl md:text-5xl font-extrabold text-center mb-16"
                    >
                        Fitur Unggulan
                    </motion.h2>

                    <div className="px-8 py-14">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {featuresData.map((f, i) => (
                                <FeatureCard key={i} {...f} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
