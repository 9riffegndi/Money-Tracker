import React, { useState, useEffect } from "react";
import dataJSON from "../data.json";

export default function Home() {
    // State untuk menentukan apakah pengguna sudah terautentikasi
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // State untuk menyimpan data pengguna setelah login
    const [userData, setUserData] = useState(null);

    // Hook untuk memeriksa data pengguna yang disimpan di localStorage
    useEffect(() => {
        const dataUsers = localStorage.getItem('dataRegisterUsers');
        if (dataUsers) {
            const parsedData = JSON.parse(dataUsers); // Mengurai data pengguna dari localStorage
            setIsAuthenticated(true);
            setUserData(parsedData); // Menyimpan data pengguna setelah diurai
        }
    }, []); // Efek ini hanya dijalankan sekali saat komponen pertama kali dimuat

    // State untuk menyimpan tema yang dipilih
    const [theme] = useState(localStorage.getItem("theme") || "Business");

    // Hook untuk mengubah tema saat ada perubahan dan menyimpannya ke localStorage
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme); // Mengubah atribut data-theme pada tag <html>
        localStorage.setItem("theme", theme); // Menyimpan tema yang dipilih ke localStorage
    }, [theme]); // Efek ini dijalankan setiap kali tema berubah

    return (
        <>
            {/* Menampilkan informasi selamat datang dan konten dari dataJSON.HomeWelcome */}
            {dataJSON.HomeWelcome.map((item) => (
                <div className="w-full h-screen justify-center p-2 grid grid-cols-12 place-items-center" key={item.id}>
                    <div className="col-span-12 md:col-span-6">
                        {/* Menampilkan pesan selamat datang, jika sudah login menampilkan nama pengguna */}
                        {isAuthenticated ? <p className="text-3xl font-bold">Welcome {userData.name}</p> : <p className="text-3xl font-bold">Welcome</p>}
                        <p className="font-extrabold text-6xl">{item.appName}</p>
                        <p>{item.Headline}</p>
                        <p>{item.Slogan}</p>
                    </div>
                    <img className="col-span-12 md:col-span-6 box-shadow" src={item.logo} alt={item.appName} />
                </div>
            ))}
        </>
    )
}
