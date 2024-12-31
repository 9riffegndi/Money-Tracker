import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import komponen-komponen yang dibutuhkan
import Sidebar from './Components/Sidebar.jsx';

// Import komponen-komponen halaman
import Records from './Components/Records.jsx';
import Analytics from './Components/Analytics.jsx';
import History from './Components/History.jsx';

import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';

export default function App() {
  const [theme] = useState(localStorage.getItem("theme") || "Business");

  // Menggunakan useEffect untuk mengatur tema berdasarkan yang ada di localStorage
  useEffect(() => {
    // Mengatur tema pada tag <html> setiap kali tema berubah
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // Menyimpan tema yang dipilih ke localStorage
  }, [theme]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cek apakah ada data pengguna yang terdaftar di localStorage (menggunakan dataRegisterUsers)
  useEffect(() => {
    const token = localStorage.getItem('dataRegisterUsers');
    if (token) {
      setIsAuthenticated(true); // Jika ada, set isAuthenticated menjadi true
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Sidebar yang tampil di sebelah kiri */}
        <Sidebar className='w-max '/>
        <div className="w-full">
          
          {/* Routing aplikasi */}
          <Routes>

            {/* Jika sudah terautentikasi, tampilkan halaman-halaman berikut */}
            {isAuthenticated ? (
              <>
              <Route path="/" element={<Home />} />
                <Route path="/records" element={<Records />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/history" element={<History />} />
              </>
            ) : (
              // Jika belum terautentikasi, hanya tampilkan halaman Home
              <>
                <Route path="/" element={<Home />} />
              </>
            )}

            {/* Halaman login dan register tidak boleh diakses jika sudah terautentikasi */}
            <Route path="/login"    element={isAuthenticated ? <Navigate to="/records" /> : <Login /> } />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/records" /> : <Register /> } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
