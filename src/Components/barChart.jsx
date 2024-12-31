
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function TransactionsBarChart() {
  // Mengambil data transaksi dari localStorage
  // Jika localStorage kosong, gunakan array kosong sebagai default
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  // Memformat data transaksi untuk ditampilkan dalam grafik
  // Hanya mengambil 15 transaksi pertama
  const data = transactions.slice(0, 15).map((transaction) => ({
    date: transaction.date, // Tanggal transaksi
    income: transaction.income || 0, // Pendapatan (default 0 jika tidak ada)
    expenses: transaction.expenses || 0, // Pengeluaran (default 0 jika tidak ada)
  }));

  return (
    <div className="flexflex-col">
      {/* Bagian badge untuk menunjukkan legenda grafik */}
      <div className="flex w-full gap-1">
        <p className="badge badge-primary">Overview</p> {/* Label Overview */}
        <p className="badge badge-success">Income</p> {/* Label Pendapatan */}
        <p className="badge badge-error">Expenses</p> {/* Label Pengeluaran */}
      </div>

      {/* Komponen BarChart untuk menampilkan grafik batang */}
      <BarChart
        width={1000} // Lebar grafik
        height={500} // Tinggi grafik
        data={data} // Data yang akan ditampilkan
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }} // Margin grafik
      >
        {/* Grid untuk garis bantu pada grafik */}
        <CartesianGrid strokeDasharray="3 3" />
        
        {/* Sumbu X dengan label berupa tanggal */}
        <XAxis 
          dataKey="date" 
          tick={{ angle: -10, textAnchor: 'end', fontSize: 12 }} // Rotasi label agar terlihat rapi
        />
        
        {/* Sumbu Y untuk nilai pendapatan/pengeluaran */}
        <YAxis />
        
        {/* Tooltip untuk menampilkan detail saat hover */}
        <Tooltip />
        
        {/* Grafik batang untuk pendapatan */}
        <Bar dataKey="income" fill="red" name="Income" />
        
        {/* Grafik batang untuk pengeluaran */}
        <Bar dataKey="expenses" fill="green" name="Expenses" />
      </BarChart>
    </div>
  );
}
