import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function TransactionsBarChart() {
  // Mengambil data dari localStorage dan parsing JSON
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  // Format data untuk grafik
  const data = transactions.slice(0, 15).map((transaction) => ({
    date: transaction.date,
    income: transaction.income || 0,
    expenses: transaction.expenses || 0,
  }));

  return (
    <div className="flexflex-col">
      <div className="flex w-full gap-1">
        <p className="badge badge-primary">Overview</p>
            <p className="badge badge-success">Income</p>
            <p className="badge badge-error">Expanses</p>
      </div>
      <BarChart
        width={1000}
        height={500}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ angle: -10, textAnchor: 'end', fontSize: 12 }} />
        <YAxis />
        <Tooltip />
            <Bar dataKey="income" fill="red" name="Income" />
            <Bar dataKey="expenses" fill="green" name="Expenses" />
      </BarChart>
    </div>
  );
}
