import { Link } from "react-router-dom";
import LogoApp from "./LogoApp";
import dataJSON from "../data.json";
import { useState, useEffect } from "react";

export default function Sidebar({ className='' }) {
    // State untuk mengecek apakah pengguna sudah terautentikasi
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // State untuk menyimpan data pengguna
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        // Mengambil data pengguna yang terdaftar dari localStorage
        const dataUsers = localStorage.getItem('dataRegisterUsers');
        if (dataUsers) {
            const parsedData = JSON.parse(dataUsers); // Parsing data
            setIsAuthenticated(true); // Menandakan bahwa pengguna sudah terautentikasi
            setUserData(parsedData); // Menyimpan data pengguna yang telah diparsing
        }
    }, []);

    // Fungsi untuk logout pengguna
    const handleLogout = () => {
        setIsAuthenticated(false); // Set status autentikasi menjadi false
        setUserData(null); // Menghapus data pengguna
        localStorage.removeItem('dataRegisterUsers'); // Menghapus data pengguna dari localStorage
        window.location.reload(); // Memuat ulang halaman setelah logout
    };

    // State untuk tema yang digunakan
    const [theme] = useState(localStorage.getItem("theme") || "Business");

    useEffect(() => {
        // Mengatur tema pada tag <html> setiap kali tema berubah
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme); // Menyimpan tema yang dipilih di localStorage
    }, [theme]);

    return (
        <div className="flex z-30   justify-between items-center  w-full md:w-max">
            <div className={`drawer lg:drawer-open   ${className}`}>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                {/* Konten halaman */}
                <label htmlFor="my-drawer-2" className="btn  rounded-none rounded-br-lg  btn-primary drawer-button lg:hidden">
                    <img width="20" src="https://img.icons8.com/?size=100&id=3096&format=png&color=000000" />
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    {isAuthenticated ? (
                                    <ul className="menu bg-primary text-base-content rounded-r-xl flex justify-between   h-screen   p-0 w-64 ">
                                    <div className="flex flex-col gap-1">
                                    <div className="flex p-2 gap-2 justify-start bg-primary rounded-tr-xl border-b-2 items-center">
                                        <LogoApp className="w-[100px]"/>
                                        <p className="font-bold">Cash Flow </p>
                                    </div>
                                        {/* Konten sidebar untuk pengguna yang sudah login */}
                                        <Link 
                                            className="p-3 flex gap-2 items-center hover:bg-primary hover:pl-11 delay-100 transition-all ease-linear"
                                            to="/"
                                        >
                                            <img
                                                className="w-[30px]"
                                                src="https://img.icons8.com/?size=100&id=73&format=png&color=000000"
                                                alt="Home Icon"
                                            />
                                            <p>{dataJSON.sidebarItems[0].item}</p>
                                        </Link>
                    
                                        <Link 
                                            className="p-3 flex gap-2 items-center hover:bg-primary hover:pl-11 delay-100 transition-all ease-linear"
                                            to="/records"
                                        >
                                            <img
                                                className="w-[30px]"
                                                src="https://img.icons8.com/?size=100&id=37930&format=png&color=000000"
                                                alt="Home Icon"
                                            />
                                            <p>{dataJSON.sidebarItems[1].item}</p>
                                        </Link>
                    
                                        <Link 
                                            className="p-3 flex gap-2 items-center hover:bg-primary hover:pl-11 delay-100 transition-all ease-linear"
                                            to="/analytics"
                                        >
                                            <img
                                                className="w-[30px]"
                                                src="https://img.icons8.com/?size=100&id=15&format=png&color=000000"
                                                alt="Analytics Icon"
                                            />
                                            <p>{dataJSON.sidebarItems[2].item}</p>
                                        </Link>
                    
                                        <Link 
                                            className="p-3 flex gap-2 items-center hover:bg-primary hover:pl-11 delay-100 transition-all ease-linear"
                                            to="/history"
                                        >
                                            <img
                                                className="w-[30px]"
                                                src="https://img.icons8.com/?size=100&id=58761&format=png&color=000000"
                                                alt="History Icon"
                                            />
                                            <p>{dataJSON.sidebarItems[3].item}</p>
                                        </Link>
                                    </div>
                                    <div className="p-2 border m-2 items-center justify-between rounded-lg flex flex-col gap-2">
                                        {userData ? (
                                            <p className="font-bold text-xs md:text-xl">{userData.name}</p>
                                        ) : null}
                                        {/* Tombol logout */}
                                        <button onClick={handleLogout} className="btn btn-error w-full">Logout</button>
                                    </div>
                                </ul>
                ) : (
                    <ul className="menu bg-primary text-base-content rounded-r-xl justify-between   h-screen   w-64 ">
                    <div className="flex flex-col gap-2 justify-start bg-primary rounded-tr-xl ">
                        <div className="flex gap-2 items-center rounded-tr-xl border-b-2 p-2">
                            <LogoApp className="w-[100px]"/>
                            <p className="font-bold">Cash Flow </p>
                        </div>
                    <Link 
                        className="p-3 flex gap-2 items-center hover:bg-primary hover:pl-11 delay-100 transition-all ease-linear"
                        to="/"
                    >
                        <img
                            className="w-[30px]"
                            src="https://img.icons8.com/?size=100&id=73&format=png&color=000000"
                            alt="Home Icon"
                        />
                        <p>{dataJSON.sidebarItems[0].item}</p>
                    </Link>
                    </div>
                    <div className="flex flex-col gap-2 w-full border p-2 rounded-lg items-center">
                        <p className="text-2xl font-bold">Login or Register</p>
                        {/* Link ke halaman login */}
                        <Link 
                            className="w-full"
                            to="/login">
                            <button className="btn w-full btn-secondary">Login</button>
                        </Link>
                        {/* Link ke halaman register */}
                        <Link 
                            className="w-full"
                            to="/register">
                            <button className="btn w-full btn-secondary">Register</button>
                        </Link>                
                    </div>
                    </ul>
                )}
            </div>
            </div>
            <p className="font-bold block sm:hidden p-2 ">Hallo world</p>
        </div>
    )
}
