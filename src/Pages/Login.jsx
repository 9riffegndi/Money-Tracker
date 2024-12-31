import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LayoutsAuth from "../Layouts/LayoutsAuth";
import { Link } from "react-router-dom";

export default function Login() {
    // Menggunakan hook useNavigate untuk navigasi setelah login
    const navigate = useNavigate();

    // State untuk menyimpan tema yang dipilih, nilai default adalah "Business"
    const [theme] = useState(localStorage.getItem("theme") || "Business");

    useEffect(() => {
        // Mengubah atribut data-theme pada <html> tag sesuai dengan tema yang dipilih
        document.documentElement.setAttribute("data-theme", theme);
        // Menyimpan tema yang dipilih ke localStorage
        localStorage.setItem("theme", theme);
    }, [theme]);

    // State untuk menyimpan data login (email dan password)
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    // State untuk menyimpan pesan error jika login gagal
    const [error, setError] = useState("");

    // Fungsi untuk menangani login
    const handleLogin = (e) => {
        e.preventDefault(); // Mencegah form dari pengiriman default
        const savedData = localStorage.getItem("dataRegisterUsers"); // Mengambil data pengguna terdaftar dari localStorage
        
        if (savedData) {
            const savedRegister = JSON.parse(savedData); // Mengurai data pengguna terdaftar
            
            // Memeriksa apakah email dan password cocok dengan yang ada di localStorage
            if (
                savedRegister.email === login.email &&
                savedRegister.password === login.password
            ) {
                console.log("Login successful!");
                setError(""); // Reset pesan error
                // Navigasi ke halaman home setelah login berhasil
                navigate("/");  // Pastikan navigasi berjalan dengan benar
                window.location.reload(); // Memuat ulang halaman setelah login
            } else {
                setError("Invalid email or password"); // Menampilkan error jika email atau password salah
            }
        } else {
            setError("No registered user found"); // Menampilkan error jika tidak ada pengguna terdaftar
        }
    };

    // Fungsi untuk menangani perubahan input form
    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    return (
        <LayoutsAuth>
            <div className="max-w-sm p-6 border rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-primary mb-6">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={login.email}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={login.password}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                    <button type="submit" className="btn btn-primary w-full">Login</button>
                    {error && <p className="text-red-500 text-center">{error}</p>} {/* Menampilkan pesan error jika ada */}
                </form>
                {/* Tautan untuk menuju halaman registrasi jika pengguna belum memiliki akun */}
                <Link to="/register" className="text-center block mt-4">Don't have an account? Register</Link>
            </div>
        </LayoutsAuth>
    );
}
