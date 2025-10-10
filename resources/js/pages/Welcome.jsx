import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";

export default function Welcome() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Card className="w-[380px] shadow-2xl rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm">
                    <CardHeader className="text-center space-y-2">
                        <div className="flex justify-center">
                            <Sparkle />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-800">
                            Selamat Datang 👋
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-gray-600">
                            Halaman ini sudah menggunakan <b>shadcn/ui</b>,{" "}
                            <b>TailwindCSS</b>, dan <b>react-icons</b>.
                        </p>

                        <Button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                            onClick={() => alert("Hai, pengguna!")}
                        >
                            Mulai Sekarang
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
