import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function History({ className = "" }) {
    // State untuk tema, dengan nilai default dari localStorage atau "business"
    const [theme] = useState(localStorage.getItem("theme") || "business");

    useEffect(() => {
        // Mengatur tema pada elemen <html> saat tema berubah
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme); // Menyimpan tema ke localStorage
    }, [theme]);

    // State untuk menyimpan transaksi, indeks transaksi yang sedang diedit, dan opsi pengurutan
    const [transactions, setTransactions] = useState([]);
    const [editTransactionIndex, setEditTransactionIndex] = useState(null);
    const [sortOption, setSortOption] = useState("");

    // Mengambil data transaksi dari localStorage saat komponen dimuat
    useEffect(() => {
        const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
        setTransactions(savedTransactions);
    }, []);

    // Menyimpan transaksi ke localStorage setiap kali ada perubahan pada data transaksi
    useEffect(() => {
        if (transactions.length > 0) {
            localStorage.setItem("transactions", JSON.stringify(transactions));
        }
    }, [transactions]);

    // Fungsi untuk menambah atau memperbarui transaksi
    const handleAddTransaction = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const income = parseFloat(formData.get("income")) || 0;
        const expenses = parseFloat(formData.get("expenses")) || 0;

        if (income < 0 || expenses < 0) {
            alert("Income dan Expenses tidak boleh bernilai negatif.");
            return;
        }

        const newTransaction = {
            category: formData.get("category"),
            description: formData.get("description"),
            income,
            expenses,
            date: formData.get("date"),
        };

        if (editTransactionIndex !== null) {
            // Mengedit transaksi yang sudah ada
            const updatedTransactions = [...transactions];
            updatedTransactions[editTransactionIndex] = newTransaction;
            setTransactions(updatedTransactions);
            setEditTransactionIndex(null);
        } else {
            // Menambah transaksi baru
            setTransactions([...transactions, newTransaction]);
        }

        e.target.reset(); // Mengosongkan form
        document.getElementById('my_modal_4').close(); // Menutup modal
    };

    // Fungsi untuk menghapus transaksi berdasarkan indeks
    const handleDeleteTransaction = (index) => {
        const updatedTransactions = transactions.filter((_, i) => i !== index);
        setTransactions(updatedTransactions);
    };

    // Fungsi untuk mengedit transaksi
    const handleEditTransaction = (index) => {
        const transaction = transactions[index];
        setEditTransactionIndex(index); // Menyimpan indeks transaksi yang akan diedit
        document.getElementById('my_modal_4').showModal();

        // Mengisi form dengan data transaksi yang dipilih
        setTimeout(() => {
            const form = document.forms['transactionForm'];
            form['category'].value = transaction.category;
            form['description'].value = transaction.description;
            form['income'].value = transaction.income;
            form['expenses'].value = transaction.expenses;
            form['date'].value = transaction.date;
        }, 0);
    };

    // Fungsi untuk mengurutkan transaksi
    const handleSortChange = (e) => {
        const option = e.target.value;
        setSortOption(option);

        let sortedTransactions = [...transactions];

        if (option === "Most Expenses") {
            sortedTransactions.sort((a, b) => b.expenses - a.expenses);
        } else if (option === "Newest") {
            sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (option === "Oldest") {
            sortedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        setTransactions(sortedTransactions);
    };

    // Jika tidak ada transaksi, tampilkan pesan
    if (transactions.length === 0) {
        return (
            <div className="p-2 flex h-screen w-full">
                <p className="badge badge-primary">History</p>
                <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
                    <p className="text-2xl font-bold">No transactions found</p>
                    <Link to="/" className="btn btn-primary">Go to Records</Link>
                </div>
            </div>
        );
    }

    // Komponen utama untuk menampilkan transaksi
    return (
        <section className="w-full flex flex-col gap-2 p-2 grow">
            <p className="badge badge-primary">History</p>
            <div className={`grid grid-cols-8 min-h-[120px] gap-2 bg-primary p-2 rounded-lg w-full ${className}`}>
                <div className="bg-info rounded-lg items-center gap-1 justify-center col-span-6 flex flex-col md:flex-row">
                    <h1 className="font-bold text-2xl">History</h1>
                </div>
                <div className="bg-warning rounded-lg items-center gap-1 justify-center col-span-2 flex flex-col md:flex-row">
                    <button className="btn btn-circle btn-ghost absolute mb-0 xs:mb-8" onClick={() => document.getElementById('my_modal_4').showModal()}>
                        <img src="https://img.icons8.com/?size=100&id=1501&format=png&color=000000" />
                        <p className="font-bold hidden xs:block">ADD</p>
                    </button>
                    <dialog id="my_modal_4" className="modal">
                        <div className="modal-box">
                            <div className="modal-action flex flex-col gap-2">
                                <form className="flex w-full justify-between items-center" method="dialog">
                                    <p className="font-bold ml-3">Add Transaction</p>
                                    <button className="btn btn-circle text-white btn-error">
                                        <img className="w-8" src="https://img.icons8.com/?size=100&id=vu5kHwGC4PNb&format=png&color=FFFFFF" />
                                    </button>
                                </form>
                                <form name="transactionForm" className="flex flex-col items-center gap-2" onSubmit={handleAddTransaction}>
                                    <input
                                        type="text"
                                        name="category"
                                        placeholder="Expenses Category"
                                        className="input input-bordered input-info w-full"
                                        required
                                    />
                                    <textarea
                                        type="text"
                                        name="description"
                                        placeholder="Description"
                                        className="textarea textarea-info w-full resize-none"
                                        required
                                    />
                                    <div className="w-full flex items-center gap-2">
                                        <input
                                            type="number"
                                            name="income"
                                            placeholder="Income"
                                            className="input input-bordered input-info w-full"
                                        />
                                        <input
                                            type="number"
                                            name="expenses"
                                            placeholder="Expenses"
                                            className="input input-bordered input-info w-full"
                                        />
                                        <input
                                            type="date"
                                            name="date"
                                            className="input input-bordered input-info w-full"
                                            required
                                        />
                                    </div>
                                    <button className="btn w-full btn-primary" type="submit">Save</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>

            {/* Tabel transaksi */}
            <div className="w-full grow h-[350px]">
                <div className="flex w-full gap-2 items-center p-3 justify-between">
                    <p className="font-bold badge badge-primary">List of Transactions</p>
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="select rounded-full select-xs select-info w-max">
                        <option disabled value={""}>Sorting</option>
                        <option value={'Most Expenses'}>Most Expenses</option>
                        <option value={'Newest'}>Newest</option>
                        <option value={'Oldest'}>Oldest</option>
                    </select>
                </div>
                <div className="overflow-x-auto h-full">
                    <table className="table table-zebra table-pin-rows table-pin-cols">
                        <thead>
                            <tr className="text-center">
                                <th className="rounded-tl-lg bg-base-300 text-base-content">No</th>
                                <th className="bg-base-300 text-base-content">Category</th>
                                <th className="bg-base-300 text-base-content">Description</th>
                                <th className="bg-base-300 text-base-content">Income</th>
                                <th className="bg-base-300 text-base-content">Expenses</th>
                                <th className="bg-base-300 text-base-content">Date</th>
                                <th className="rounded-tr-lg bg-base-300 text-base-content">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td className="badge badge-md rounded-full badge-secondary">{transaction.category}</td>
                                    <td>{transaction.description}</td>
                                    <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.income)}</td>
                                    <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.expenses)}</td>
                                    <td>{transaction.date}</td>
                                    <td className="flex w-full justify-center gap-2">
                                        <button onClick={() => handleEditTransaction(index)} className="btn btn-xs btn-warning">Edit</button>
                                        <button onClick={() => handleDeleteTransaction(index)} className="btn btn-xs btn-error">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
