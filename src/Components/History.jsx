
import { useState, useEffect } from "react";

export default function History({ className = "" }) {

    const [theme, ] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        // Set the theme on the <html> tag whenever the theme changes
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme); // Save the selected theme to localStorage
    }, [theme]);


    const [transactions, setTransactions] = useState([]);
    const [editTransactionIndex, setEditTransactionIndex] = useState(null);
    const [sortOption, setSortOption] = useState("");

    // Load transactions from localStorage on component mount
    useEffect(() => {
        const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
        setTransactions(savedTransactions);
    }, []);

    // Save transactions to localStorage whenever they are updated
    useEffect(() => {
        if (transactions.length > 0) {
            localStorage.setItem("transactions", JSON.stringify(transactions));
        }
    }, [transactions]);

    // Handle form submission
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
            const updatedTransactions = [...transactions];
            updatedTransactions[editTransactionIndex] = newTransaction;
            setTransactions(updatedTransactions);
            setEditTransactionIndex(null); // Reset the edit state
        } else {
            setTransactions([...transactions, newTransaction]);
        }

        e.target.reset(); // Reset form fields
        document.getElementById('my_modal_4').close(); // Close modal
    };

    // Handle delete transaction
    const handleDeleteTransaction = (index) => {
        const updatedTransactions = transactions.filter((_, i) => i !== index);
        setTransactions(updatedTransactions);
    };

    // Handle edit transaction
    const handleEditTransaction = (index) => {
        const transaction = transactions[index];
        setEditTransactionIndex(index); // Set the index of the transaction to edit
        document.getElementById('my_modal_4').showModal();

        // Pre-fill the form with the transaction data
        setTimeout(() => {
            const form = document.forms['transactionForm'];
            form['category'].value = transaction.category;
            form['description'].value = transaction.description;
            form['income'].value = transaction.income;
            form['expenses'].value = transaction.expenses;
            form['date'].value = transaction.date;
        }, 0);
    };

    // Handle sorting
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


    return (
        <section className="w-full flex flex-col gap-2 p-2 grow">
            <div className={`grid bg-primary grid-cols-8 min-h-[120px] gap-2 p-2 rounded-lg w-full ${className}`}>
            
            
            <div className="bg-blue-200 rounded-lg items-center gap-1 justify-center col-span-6 flex flex-col md:flex-row">
                <h1 className="font-bold text-2xl">History</h1>
                </div>

                {/* Add transaction */}
                <div className="bg-yellow-200 rounded-lg items-center gap-1 justify-center col-span-2 flex flex-col md:flex-row">
                    <button className="btn btn-circle btn-ghost absolute mb-0 xs:mb-8" onClick={() => document.getElementById('my_modal_4').showModal()}>
                        <img src="https://img.icons8.com/?size=100&id=1501&format=png&color=000000" />
                        <p className="font-bold hidden xs:block">ADD</p>
                    </button>



                    {/* Modal input */}
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

            {/* Table */}
            <div className="w-full grow h-[400px]">
                {/* Table header */}
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
                                <th className="rounded-tl-lg bg-yellow-300">No</th>
                                <th className="bg-yellow-300">Category</th>
                                <th className="bg-yellow-300">Description</th>
                                <th className="bg-yellow-300">Income</th>
                                <th className="bg-yellow-300">Expenses</th>
                                <th className="bg-yellow-300">Date</th>
                                <th className="rounded-tr-lg bg-yellow-300">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{transaction.category}</td>
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

