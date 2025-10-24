import React from "react";
import heroImage from '../assets/hero.png';
import modelheroImage from '../assets/model_hero.png';
import { Button } from "@/components/ui/button";

export default function landingpage() {
    return (
        <div className="font-['DM_Sans'] text-gray-900">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-8 py-6 relative z-10">
                
                {/* Pembungkus baru untuk Logo dan Links */}
                <div className="flex items-center gap-10"> 
                    <h1 className="text-xl font-bold uppercase border-r border-gray-400 pr-5">Arthawarga</h1>
                    <ul className="flex gap-6 text-sm font-medium uppercase">
                        <li className="hover:text-green-700 cursor-pointer">Home</li>
                        <li className="hover:text-green-700 cursor-pointer">About</li>
                        <li className="hover:text-green-700 cursor-pointer">Fitur</li>
                        <li className="hover:text-green-700 cursor-pointer">Kontak</li>
                    </ul>
                </div>
                
                <button className="bg-white text-green-700 px-5 py-2 rounded-full font-semibold">
                    Login
                </button>
            </nav>

            {/*AWAL HERO */}
            <div>
                <section className="relative pt-40 pb-36">
                        <img 
                            src={heroImage} 
                            alt="Gambar tidak ditemukan"
                            className="absolute right-0 -top-25 w-[70] h-[180%] object-cover z-0 object-top"
                    />
                    <img 
                        src={modelheroImage}
                        alt="model hero tidak ditemukan"
                        className="absolute bottom-25 left-[58%] h-[70%] z-10 object-contain"
                    />

                    {/* 3. Konten Teks Hero (di atas gambar) */}
                    <div className="max-w-7xl mx-auto px-8 pt-1 relative z-20">
                        
                        {/* H1 Utama */}
                        <h2 className="text-5xl font-['DM_Sans'] font-extrabold text-gray-900 leading-tight max-w-lg">
                            Website manajemen <br/>
                            <span className="font-['DM_Sans'] text-[#26C3A6]">keuangan</span> <br/>
                            Rukun Tetangga
                        </h2>

                        {/* Sub-judul/Slogan */}
                        <p className=" font-['DM_Sans'] mt-6 text-lg max-w-md italic text-gray-700">
                            "Dari Catatan Manual ke Era Digital <br/>
                            Semua dalam Genggaman."
                        </p>
                </div>
                </section>
            </div>

        {/*AKHIR SECTION HERO*/}

        {/*AWAL SECTION TENTANG*/}

        <section id="about" className="py-120 bg-white">
                <div className="max-w-4xl mx-auto px-8 text-center">
                    
                    {/* Judul Tentang */}
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
                        Tentang
                    </h2>
                    
                    {/* Isi Paragraf Tentang */}
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Website manajemen keuangan RT ini hadir untuk membantu pengurus dan warga dalam 
                        mengelola keuangan dengan lebih transparan, rapi, dan mudah diakses. Dengan adanya
                        sistem ini, setiap pemasukan dan pengeluaran dapat dicatat secara digital, sehingga warga
                        bisa ikut memantau perkembangan kas RT kapan saja. Selain itu, website ini juga 
                        mempermudah pembuatan laporan bulanan maupun tahunan tanpa harus repot mencatat manual.
                    </p>
                </div>
            </section>

        </div>
    ); 
}