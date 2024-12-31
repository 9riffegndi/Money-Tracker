import React from "react";
import { Children } from "react";

export default function LayoutsAuth({children}) {
    // Layout untuk halaman otentikasi (Login/Register)
    return (
        <div className="w-full h-screen flex justify-center items-center">
            {/* Menampilkan konten anak (children) yang diterima dari komponen lain */}
            {children}
        </div>
    )
}
