import { Link } from "react-router-dom"; // Mengimpor komponen Link dari react-router-dom untuk navigasi
import { useState, useEffect } from "react"; // Mengimpor hook useState dan useEffect
import BarChart from "../Components/barChart"; // Mengimpor komponen BarChart

export default function Analytics() {
    // Mendapatkan data transaksi dari localStorage
    const transaction = localStorage.getItem("transactions");

    // Mendapatkan tema dari localStorage, default ke "business" jika tidak ada
    const [theme] = useState(localStorage.getItem("theme") || "business");

    // Menggunakan useEffect untuk mengatur tema pada elemen <html>
    useEffect(() => {
        // Menetapkan atribut "data-theme" pada elemen <html> berdasarkan tema yang dipilih
        document.documentElement.setAttribute("data-theme", theme);

        // Menyimpan tema yang dipilih ke localStorage
        localStorage.setItem("theme", theme);
    }, [theme]); // Efek hanya dijalankan ulang jika nilai tema berubah

    // Jika tidak ada data transaksi, tampilkan pesan "No transactions found"
    if (!transaction) {
        return (
            <div className="p-2 flex h-screen w-full">
                {/* Label Analytics */}
                <p className="badge badge-primary">Analytics</p>

                {/* Pesan ketika tidak ada transaksi */}
                <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
                    <p className="text-2xl font-bold">No transactions found</p>
                    
                    {/* Tombol untuk navigasi kembali ke halaman utama */}
                    <Link to="/" className="btn btn-primary">Go to Records</Link>
                </div>
            </div>
        );
    }

    // Jika data transaksi ada, tampilkan komponen Analytics
    return (
        <div className="flex flex-col p-2 gap-2 w-full h-screen">
            {/* Label Analytics */}
            <p className="badge badge-primary">Analytics</p>

            {/* Grid untuk menampilkan grafik */}
            <div className="grid grid-cols-12 h-screen w-full">
                {/* Grafik ditampilkan dalam kolom penuh */}
                <div className="w-full overflow-auto col-span-12">
                    <BarChart /> {/* Komponen BarChart untuk menampilkan data */}
                </div>
            </div>
        </div>
    );
}
