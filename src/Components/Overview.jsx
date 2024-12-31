

import { useState, useEffect } from "react";

export default function Overview({ className = "" }) {
    // Mendefinisikan state untuk menyimpan data transaksi
    const [transactions, setTransactions] = useState([]);
    const [editTransactionIndex, setEditTransactionIndex] = useState(null); // Menyimpan index transaksi yang sedang diedit
    const [sortOption, setSortOption] = useState(""); // Menyimpan pilihan urutan transaksi

    // Mengambil data transaksi dari localStorage saat komponen pertama kali dipasang
    useEffect(() => {
        const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
        setTransactions(savedTransactions);
    }, []);

    // Menyimpan data transaksi ke localStorage setiap kali transaksi diperbarui
    useEffect(() => {
        if (transactions.length > 0) {
            localStorage.setItem("transactions", JSON.stringify(transactions));
        }
    }, [transactions]);

    // Menangani pengiriman form untuk menambah atau memperbarui transaksi
    const handleAddTransaction = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        
        const income = parseFloat(formData.get("income")) || 0; // Mengambil nilai income dari form dan mengkonversinya ke angka
        const expenses = parseFloat(formData.get("expenses")) || 0; // Mengambil nilai expenses dari form dan mengkonversinya ke angka

        // Mengecek apakah income atau expenses bernilai negatif
        if (income < 0 || expenses < 0) {
            alert("Income dan Expenses tidak boleh bernilai negatif.");
            return;
        }

        const newTransaction = {
            category: formData.get("category"), // Kategori transaksi
            description: formData.get("description"), // Deskripsi transaksi
            income, // Nilai pendapatan
            expenses, // Nilai pengeluaran
            date: formData.get("date"), // Tanggal transaksi
        };

        // Jika sedang mengedit transaksi, perbarui transaksi yang ada, jika tidak, tambahkan transaksi baru
        if (editTransactionIndex !== null) {
            const updatedTransactions = [...transactions];
            updatedTransactions[editTransactionIndex] = newTransaction;
            setTransactions(updatedTransactions);
            setEditTransactionIndex(null); // Reset state edit
        } else {
            setTransactions([...transactions, newTransaction]);
        }

        e.target.reset(); // Reset form setelah transaksi disimpan
        document.getElementById('my_modal_4').close(); // Menutup modal
    };

    // Menangani penghapusan transaksi
    const handleDeleteTransaction = (index) => {
        const updatedTransactions = transactions.filter((_, i) => i !== index);
        setTransactions(updatedTransactions);
    };

    // Menangani pengeditan transaksi
    const handleEditTransaction = (index) => {
        const transaction = transactions[index];
        setEditTransactionIndex(index); // Set index transaksi yang akan diedit
        document.getElementById('my_modal_4').showModal();

        // Mengisi form dengan data transaksi yang akan diedit
        setTimeout(() => {
            const form = document.forms['transactionForm'];
            form['category'].value = transaction.category;
            form['description'].value = transaction.description;
            form['income'].value = transaction.income;
            form['expenses'].value = transaction.expenses;
            form['date'].value = transaction.date;
        }, 0);
    };

    // Menangani perubahan pilihan sorting
    const handleSortChange = (e) => {
        const option = e.target.value;
        setSortOption(option);
    
        let sortedTransactions = [...transactions];
    
        // Melakukan sorting berdasarkan opsi yang dipilih
        if (option === "Most Expenses") {
            sortedTransactions.sort((a, b) => b.expenses - a.expenses); // Sort berdasarkan pengeluaran terbesar
        } else if (option === "Newest") {
            sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort berdasarkan transaksi terbaru
        } else if (option === "Oldest") {
            sortedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort berdasarkan transaksi terlama
        }
    
        setTransactions(sortedTransactions);
    };

    return (
        <section className="w-full flex flex-col gap-2 grow">
            <div className={`grid bg-primary grid-cols-8 min-h-[120px] gap-2 p-2 rounded-lg w-full ${className}`}>
                {/* Income */}
                <div className="bg-success rounded-lg items-center gap-1 justify-center col-span-4 md:col-span-2 flex flex-col md:flex-row">
                    <img className="w-[15%] md:w-[20%]" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/income-1474500-1249736.png?f=webp&w=512" />
                    <div className="flex flex-col items-center text-center justify-center">
                        <p className="font-bold hidden xs:block">Income</p>
                        <pre className="w-[90px] text-xs md:text-sm whitespace-pre-wrap break-words">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                                transactions.reduce((acc, t) => acc + t.income, 0)
                            )}
                        </pre>
                    </div>
                </div>

                {/* Expenses */}
                <div className="bg-error rounded-lg items-center gap-1 justify-center col-span-4 md:col-span-2 flex flex-col md:flex-row">
                    <img className="w-[15%] md:w-[20%]" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/expenses-6192559-5150646.png?f=webp&w=512" />
                    <div className="flex flex-col items-center text-center justify-center">
                        <p className="font-bold hidden xs:block">Expenses</p>
                        <pre className="w-[90px] text-xs md:text-sm whitespace-pre-wrap break-words">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                                transactions.reduce((acc, t) => acc + t.expenses, 0)
                            )}
                        </pre>
                    </div>
                </div>

                {/* Total balance */}
                <div className="bg-info rounded-lg items-center gap-1 justify-center col-span-4 md:col-span-2 flex flex-col md:flex-row">
                    <img className="w-[15%] md:w-[20%]" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/money-bag-rupiah-1754554-1491544.png?f=webp&w=512" />
                    <div className="flex flex-col items-center text-center justify-center">
                        <p className="font-bold hidden xs:block">Saving</p>
                        <pre className="w-[90px] text-xs md:text-sm whitespace-pre-wrap break-words">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                                transactions.reduce((acc, t) => acc + t.income - t.expenses, 0)
                            )}
                        </pre>
                    </div>
                </div>
                
                {/* Add transaction */}
                <div className="bg-warning rounded-lg items-center gap-1 justify-center col-span-4 md:col-span-2 flex flex-col md:flex-row">
                    <button className="btn btn-circle bg-transparent border-transparent hover:bg-transparent hover:border-transparent" onClick={() => document.getElementById('my_modal_4').showModal()}>
                        <img className="w-[55%] md:w-[90%]" src="https://img.icons8.com/?size=100&id=1501&format=png&color=000000" />
                        <p className="font-bold hidden xs:block">ADD</p>
                    </button>

                    {/* Modal input */}
                    <dialog id="my_modal_4" className="modal">
                        <div className="modal-box">
                            <div className="modal-action flex flex-col gap-2">
                                <form className="flex w-full justify-between items-center" method="dialog">
                                    <p className="font-bold ml-3">Add Transaction</p>
                                    <button className="btn btn-circle btn-error">
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

            {/* Table */}
            <div className="w-full h-[240px]">
                {/* Table header */}
                <div className="flex w-full gap-2 items-center p-3 justify-between">
                    <p className="font-bold badge badge-sm xs:badge-md badge-primary">List of Transactions</p>
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
                                <th className="rounded-tr-lg bg-base-300 text-base-content">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.description}</td>
                                    <td className="text-center">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.income)}
                                    </td>
                                    <td className="text-center">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.expenses)}
                                    </td>
                                    <td className="text-center">{transaction.date}</td>
                                    <td className="flex gap-2 justify-center">
                                        <button className="btn btn-xs btn-warning" onClick={() => handleEditTransaction(index)}>Edit</button>
                                        <button className="btn btn-xs btn-error" onClick={() => handleDeleteTransaction(index)}>Delete</button>
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
