# Cash Flow - Web Aplikasi Manajemen Keuangan

Aplikasi Cash Flow adalah web aplikasi SPA (Single Page Application) untuk memonitor arus kas pribadi, termasuk pendapatan (income), pengeluaran (expenses), dan tabungan (saving). Dengan fitur CRUD (Create, Read, Update, Delete) dan visualisasi data menggunakan grafik, aplikasi ini dirancang untuk memberikan gambaran jelas tentang kondisi keuangan Anda.

## Tech Stack

- **React JS**: Untuk membangun antarmuka pengguna interaktif dan dinamis.
- **Local Storage**: Menyimpan data transaksi secara lokal pada browser.
- **Tailwind CSS + DaisyUI**: Untuk styling dan komponen UI yang responsif.
- **Recharts**: Untuk visualisasi data dengan grafik bar.
- **React Router DOM**: Untuk routing antar halaman di dalam aplikasi SPA.

## Fitur

### 1. **CRUD Transaksi**
- Menambah transaksi pendapatan dan pengeluaran.
- Mengedit atau menghapus transaksi.
- Menampilkan total pendapatan (income), pengeluaran (expense), dan tabungan (saving).

### 2. **Fitur Sorting**
- Sorting berdasarkan **Most Expenses**: Menampilkan transaksi pengeluaran terbesar.
- Sorting berdasarkan **Tanggal Sekarang**: Menampilkan transaksi yang terjadi hari ini.
- Sorting berdasarkan **Tertua**: Menampilkan transaksi yang paling lama.

### 3. **Login & Register**
- Pengguna dapat mendaftar dan login untuk mengakses data pribadi mereka.

### 4. **Analytic Chart**
- Grafik bar yang menunjukkan visualisasi pendapatan (income) dan pengeluaran (expense) menggunakan Recharts.

### 5. **Single Page Application (SPA)**
- Tidak ada reload halaman, semua interaksi dilakukan di dalam satu halaman.

## Instalasi

### Persyaratan Sistem

Pastikan Anda telah menginstal **Node.js** dan **npm** (Node Package Manager) di komputer Anda. Jika belum, Anda dapat mengunduhnya di [sini](https://nodejs.org/).

### Cara Menjalankan Aplikasi

1. **Clone repositori ini**:

    ```bash
    git clone link repo ini
    cd cash-flow
    ```

2. **Install dependencies**:

    Pastikan Anda berada di dalam direktori proyek dan jalankan perintah berikut untuk menginstal dependensi:

    ```bash
    npm install
    ```

3. **Menjalankan aplikasi**:

    Setelah dependensi terinstal, jalankan aplikasi dengan perintah berikut:

    ```bash
    npm start
    ```

    Aplikasi akan berjalan di `http://localhost:3000`.

4. **Menjalankan aplikasi untuk pengujian**:

    Jika Anda ingin menjalankan pengujian unit (misalnya, untuk komponen), jalankan perintah berikut:

    ```bash
    npm test
    ```

    Untuk melihat laporan pengujian dan metrik lainnya:

    ```bash
    npm run report
    ```

## Struktur Folder

```
cash-flow/
├── public/
│   └── index.html
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── App.test.js
│   ├── chartist.css
│   ├── data.json
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   ├── Components/
│   │   ├── Analytics.jsx
│   │   ├── BarChart.jsx
│   │   ├── History.jsx
│   │   ├── LogoApp.jsx
│   │   ├── Overview.jsx
│   │   ├── Records.jsx
│   │   └── Sidebar.jsx
│   ├── Layouts/
│   │   └── LayoutsAuth.jsx
│   └── Pages/
│       ├── Home.jsx
│       ├── Login.jsx
│       └── Register.jsx
├── tailwind.config.js
├── package.json
└── README.md
```

### Deskripsi Struktur Folder

- **`src/`**: Direktori utama untuk semua file sumber aplikasi.
  - **`App.css`**: File CSS global untuk aplikasi.
  - **`App.jsx`**: Komponen utama aplikasi.
  - **`App.test.js`**: File untuk pengujian unit komponen utama.
  - **`chartist.css`**: File CSS untuk styling chart (jika menggunakan chartist).
  - **`data.json`**: File yang berisi data awal (misalnya, transaksi keuangan).
  - **`index.js`**: Titik masuk utama untuk aplikasi React.
  - **`logo.svg`**: Logo aplikasi.
  - **`reportWebVitals.js`**: Untuk melaporkan performa aplikasi.
  - **`setupTests.js`**: Untuk konfigurasi pengujian unit.
  
  - **`Components/`**: Direktori untuk komponen UI reusable.
    - **`Analytics.jsx`**: Menampilkan grafik analitik.
    - **`BarChart.jsx`**: Komponen untuk grafik bar.
    - **`History.jsx`**: Menampilkan riwayat transaksi.
    - **`LogoApp.jsx`**: Komponen logo aplikasi.
    - **`Overview.jsx`**: Komponen untuk ringkasan keuangan.
    - **`Records.jsx`**: Menampilkan catatan transaksi.
    - **`Sidebar.jsx`**: Sidebar navigasi.
  
  - **`Layouts/`**: Direktori untuk layout yang digunakan di aplikasi.
    - **`LayoutsAuth.jsx`**: Layout untuk halaman login dan register.
  
  - **`Pages/`**: Direktori untuk halaman-halaman aplikasi.
    - **`Home.jsx`**: Halaman utama aplikasi yang menampilkan transaksi dan grafik.
    - **`Login.jsx`**: Halaman login pengguna.
    - **`Register.jsx`**: Halaman registrasi pengguna baru.

## Deskripsi Fitur

### **CRUD Transaksi**
Pada halaman utama (`Home.jsx`), pengguna dapat menambah transaksi melalui form yang telah disediakan. Data transaksi akan disimpan dalam Local Storage dan dapat diperbarui atau dihapus sesuai kebutuhan.

### **Sorting Transaksi**
- **Most Expenses**: Mengurutkan transaksi berdasarkan pengeluaran terbesar.
- **Tanggal Sekarang**: Menampilkan transaksi yang terjadi hari ini.
- **Tertua**: Menampilkan transaksi berdasarkan tanggal paling lama.

### **Analytic Chart**
Pengguna dapat melihat grafik pendapatan dan pengeluaran dalam bentuk **bar chart** menggunakan **Recharts**.

### **Login & Register**
- Pengguna dapat mendaftar dengan membuat akun baru, atau login menggunakan akun yang sudah ada untuk mengakses data keuangan mereka.

## Teknologi yang Digunakan

- **React JS**: Library JavaScript untuk membangun antarmuka pengguna.
- **File JSON**: Menyimpan data minoritas, seperti text button, sidebar, nama colom tabel dan lainnya.
- **Local Storage**: Menyimpan data transaksi secara lokal pada browser.
- **Tailwind CSS**: Framework CSS yang mempermudah styling.
- **DaisyUI**: Komponen UI berbasis Tailwind CSS untuk elemen-elemen yang lebih cepat dibuat.
- **Recharts**: Untuk visualisasi data dalam bentuk grafik.
- **React Router DOM**: Untuk mengatur routing dalam aplikasi SPA.

