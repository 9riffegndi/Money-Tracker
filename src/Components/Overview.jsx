
import { useState, useEffect } from "react";

export default function Overview({ className = "" }) {
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
        <section className="w-full flex flex-col gap-2 grow">
            <div className={`grid bg-primary grid-cols-8 min-h-[120px]  gap-2 p-2 rounded-lg w-full ${className}`}>
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
                                <th className="rounded-tr-lg bg-base-300 text-base-content">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {transactions.length > 0 ? (
                                transactions.map((transaction, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td className="badge badge-md rounded-full badge-secondary">{transaction.category}</td>
                                        <td>{transaction.description}</td>
                                        <td className="text-success">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.income)}</td>
                                        <td className="text-error">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.expenses)}</td>
                                        <td>{transaction.date}</td>
                                        <td className="flex w-full justify-center gap-2">
                                            <button onClick={() => handleEditTransaction(index)} className="btn btn-xs btn-warning">Edit</button>
                                            <button onClick={() => handleDeleteTransaction(index)} className="btn btn-xs btn-error">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>                                    
                                    <td colSpan="7">No transactions found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

