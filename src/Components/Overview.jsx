
// import { useState, useEffect } from "react";

// export default function Overview({ className = "" }) {
//     const [transactions, setTransactions] = useState([]);
//     const [editTransactionIndex, setEditTransactionIndex] = useState(null);
//     const [sortOption, setSortOption] = useState("");

//     // Load transactions from localStorage on component mount
//     useEffect(() => {
//         const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
//         setTransactions(savedTransactions);
//     }, []);

//     // Save transactions to localStorage whenever they are updated
//     useEffect(() => {
//         if (transactions.length > 0) {
//             localStorage.setItem("transactions", JSON.stringify(transactions));
//         }
//     }, [transactions]);

//     // Handle form submission
//     const handleAddTransaction = (e) => {
//         e.preventDefault();

//         const formData = new FormData(e.target);
        
//         const income = parseFloat(formData.get("income")) || 0;
//         const expenses = parseFloat(formData.get("expenses")) || 0;

//         if (income < 0 || expenses < 0) {
//             alert("Income dan Expenses tidak boleh bernilai negatif.");
//             return;
//         }

//         // Handle file upload for iconCategory
//         const iconFile = formData.get("iconCategory");
//         const iconCategoryUrl = iconFile ? URL.createObjectURL(iconFile) : '';

//         const newTransaction = {
//             category: formData.get("category"),
//             description: formData.get("description"),
//             income,
//             expenses,
//             date: formData.get("date"),
//             iconCategory: iconCategoryUrl, // Store the image URL
//         };

//         if (editTransactionIndex !== null) {
//             const updatedTransactions = [...transactions];
//             updatedTransactions[editTransactionIndex] = newTransaction;
//             setTransactions(updatedTransactions);
//             setEditTransactionIndex(null); // Reset the edit state
//         } else {
//             setTransactions([...transactions, newTransaction]);
//         }

//         e.target.reset(); // Reset form fields
//         document.getElementById('my_modal_4').close(); // Close modal
//     };

//     // Handle delete transaction
//     const handleDeleteTransaction = (index) => {
//         const updatedTransactions = transactions.filter((_, i) => i !== index);
//         setTransactions(updatedTransactions);
//     };

//     // Handle edit transaction
//     const handleEditTransaction = (index) => {
//         const transaction = transactions[index];
//         setEditTransactionIndex(index); // Set the index of the transaction to edit
//         document.getElementById('my_modal_4').showModal();

//         // Pre-fill the form with the transaction data
//         setTimeout(() => {
//             const form = document.forms['transactionForm'];
//             form['category'].value = transaction.category;
//             form['description'].value = transaction.description;
//             form['income'].value = transaction.income;
//             form['expenses'].value = transaction.expenses;
//             form['iconCategory'].value = transaction.iconCategory;
//             form['date'].value = transaction.date;
//         }, 0);
//     };

//     // Handle sorting
//     const handleSortChange = (e) => {
//         const option = e.target.value;
//         setSortOption(option);
    
//         let sortedTransactions = [...transactions];
    
//         if (option === "Most Expenses") {
//             sortedTransactions.sort((a, b) => b.expenses - a.expenses);
//         } else if (option === "Newest") {
//             sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
//         } else if (option === "Oldest") {
//             sortedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
//         }
    
//         setTransactions(sortedTransactions);
//     };

//     return (
//         <section className="w-full flex flex-col gap-2 grow">
//             <div className={`grid bg-primary grid-cols-8 min-h-[120px] gap-2 p-2 rounded-lg w-full ${className}`}>
//                 {/* Income */}
//                 <div className="bg-green-200 rounded-lg items-center gap-1 justify-center col-span-2 flex flex-col md:flex-row">
//                     <img className="w-[30%] md:w-[20%]" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/income-1474500-1249736.png?f=webp&w=512" />
//                     <div className="flex flex-col items-center text-center justify-center">
//                         <p className="font-bold hidden xs:block">Income</p>
//                         <pre className="w-[90px] whitespace-pre-wrap break-words">
//                             {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
//                                 transactions.reduce((acc, t) => acc + t.income, 0)
//                             )}
//                         </pre>
//                     </div>
//                 </div>

//                 {/* Expenses */}
//                 <div className="bg-red-200 rounded-lg items-center gap-1 justify-center col-span-2 flex flex-col md:flex-row">
//                     <img className="w-[30%] md:w-[20%]" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/expenses-6192559-5150646.png?f=webp&w=512" />
//                     <div className="flex flex-col items-center text-center justify-center">
//                         <p className="font-bold hidden xs:block">Expenses</p>
//                         <pre className="w-[90px] whitespace-pre-wrap break-words">
//                             {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
//                                 transactions.reduce((acc, t) => acc + t.expenses, 0)
//                             )}
//                         </pre>
//                     </div>
//                 </div>

//                 {/* Total balance */}
//                 <div className="bg-blue-200 rounded-lg items-center gap-1 justify-center col-span-2 flex flex-col md:flex-row">
//                     <img className="w-[30%] md:w-[20%]" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/money-bag-rupiah-1754554-1491544.png?f=webp&w=512" />
//                     <div className="flex flex-col items-center text-center justify-center">
//                         <p className="font-bold hidden xs:block">Saving</p>
//                         <pre className="w-[90px] whitespace-pre-wrap break-words">
//                             {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
//                                 transactions.reduce((acc, t) => acc + t.income - t.expenses, 0)
//                             )}
//                         </pre>
//                     </div>
//                 </div>
                
//                 {/* Add transaction */}
//                 <div className="bg-yellow-200 rounded-lg items-center gap-1 justify-center col-span-2 flex flex-col md:flex-row">
//                     <button className="btn btn-circle btn-ghost absolute mb-0 xs:mb-8" onClick={() => document.getElementById('my_modal_4').showModal()}>
//                         <img src="https://img.icons8.com/?size=100&id=1501&format=png&color=000000" />
//                         <p className="font-bold hidden xs:block">ADD</p>
//                     </button>

//                     {/* Modal input */}
//                     <dialog id="my_modal_4" className="modal">
//                         <div className="modal-box">
//                             <div className="modal-action flex flex-col gap-2">
//                                 <form className="flex w-full justify-between items-center" method="dialog">
//                                     <p className="font-bold ml-3">Add Transaction</p>
//                                     <button className="btn btn-circle text-white btn-error">
//                                         <img className="w-8" src="https://img.icons8.com/?size=100&id=vu5kHwGC4PNb&format=png&color=FFFFFF" />
//                                     </button>
//                                 </form>

//                                 <form name="transactionForm" className="flex flex-col items-center gap-2" onSubmit={handleAddTransaction}>
//                                     <input
//                                         type="text"
//                                         name="category"
//                                         placeholder="Expenses Category"
//                                         className="input input-bordered input-info w-full"
//                                         required
//                                     />
//                                     <textarea
//                                         type="text"
//                                         name="description"
//                                         placeholder="Description"
//                                         className="textarea textarea-info w-full resize-none"
//                                         required
//                                     />
//                                     <div className="w-full flex items-center gap-2">
//                                         <input
//                                             type="number"
//                                             name="income"
//                                             placeholder="Income"
//                                             className="input input-bordered input-info w-full"
//                                         />
//                                         <input
//                                             type="number"
//                                             name="expenses"
//                                             placeholder="Expenses"
//                                             className="input input-bordered input-info w-full"
//                                         />
//                                         <input
//                                             type="date"
//                                             name="date"
//                                             className="input input-bordered input-info w-full"
//                                             required
//                                         />
//                                     </div>

//                                     <div className="flex rounded-lg border border-secondary flex-col w-full justify-center items-start">
//                                         <p className="bg-secondary w-full font-bold p-2 rounded-t-lg">Icon category expenses</p>
//                                         <input
//                                             type="file"
//                                             name="iconCategory"
//                                             className="p-2"
//                                             required
//                                         />
//                                     </div>

//                                     <button className="btn w-full btn-primary" type="submit">Save</button>
//                                 </form>
//                             </div>
//                         </div>
//                     </dialog>
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="w-full h-[250px]">
//                 {/* Table header */}
//                 <div className="flex w-full gap-2 items-center p-3 justify-between">
//                     <p className="font-bold badge badge-primary">List of Transactions</p>
//                     <select
//                         value={sortOption}
//                         onChange={handleSortChange}
//                         className="select rounded-full select-xs select-info w-max">
//                         <option disabled value={""}>Sorting</option>
//                         <option value={'Most Expenses'}>Most Expenses</option>
//                         <option value={'Newest'}>Newest</option>
//                         <option value={'Oldest'}>Oldest</option>
//                     </select>
//                 </div>
                
//                 <div className="overflow-x-auto h-full">
//                     <table className="table table-zebra table-pin-rows table-pin-cols">
//                         <thead>
//                             <tr>
//                                 <th>No</th>
//                                 <th></th>
//                                 <th>Category</th>
//                                 <th>Description</th>
//                                 <th>Income</th>
//                                 <th>Expenses</th>
//                                 <th>Date</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {transactions.map((transaction, index) => (
//                                 <tr key={index}>
//                                     <th>{index + 1}</th>
//                                     <td><img className="h-8 rounded-full" src={transaction.iconCategory} alt="icon" /></td>
//                                     <td>{transaction.category}</td>
//                                     <td>{transaction.description}</td>
//                                     <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.income)}</td>
//                                     <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.expenses)}</td>
//                                     <td>{transaction.date}</td>
//                                     <td className="flex gap-2">
//                                         <button onClick={() => handleEditTransaction(index)} className="btn btn-xs btn-warning">Edit</button>
//                                         <button onClick={() => handleDeleteTransaction(index)} className="btn btn-xs btn-error">Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </section>
//     );
// }

import { useState, useEffect } from "react";

export default function Overview({ className = "" }) {
    const [transactions, setTransactions] = useState([]);
    const [editTransactionIndex, setEditTransactionIndex] = useState(null);
    const [sortOption, setSortOption] = useState("");
    const [error, setError] = useState("");

    // Load transactions from localStorage on component mount
    useEffect(() => {
        try {
            const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
            setTransactions(savedTransactions);
        } catch (error) {
            console.error("Error loading transactions:", error);
            setError("Failed to load transactions");
        }
    }, []);

    // Save transactions to localStorage whenever they are updated
    useEffect(() => {
        try {
            localStorage.setItem("transactions", JSON.stringify(transactions));
        } catch (error) {
            console.error("Error saving transactions:", error);
            setError("Failed to save transactions");
        }
    }, [transactions]);

    const resetForm = (form) => {
        form.reset();
        setEditTransactionIndex(null);
        setError("");
    };

    const validateTransaction = (income, expenses) => {
        if (income < 0 || expenses < 0) {
            setError("Income dan Expenses tidak boleh bernilai negatif");
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleAddTransaction = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const form = e.target;
            const formData = new FormData(form);
            
            const income = parseFloat(formData.get("income")) || 0;
            const expenses = parseFloat(formData.get("expenses")) || 0;

            if (!validateTransaction(income, expenses)) {
                return;
            }

            const iconFile = formData.get("iconCategory");
            let iconCategoryUrl = '';

            // Handle icon URL based on whether we're editing or adding
            if (editTransactionIndex !== null && (!iconFile || iconFile.size === 0)) {
                // Keep existing icon when editing and no new file is selected
                iconCategoryUrl = transactions[editTransactionIndex].iconCategory;
            } else if (iconFile && iconFile.size > 0) {
                // Create new URL for new file
                iconCategoryUrl = URL.createObjectURL(iconFile);
            }

            const newTransaction = {
                id: editTransactionIndex !== null ? 
                    transactions[editTransactionIndex].id : 
                    Date.now().toString(),
                category: formData.get("category"),
                description: formData.get("description"),
                income,
                expenses,
                date: formData.get("date"),
                iconCategory: iconCategoryUrl,
                createdAt: editTransactionIndex !== null ? 
                    transactions[editTransactionIndex].createdAt : 
                    new Date().toISOString()
            };

            if (editTransactionIndex !== null) {
                const updatedTransactions = transactions.map((t, index) => 
                    index === editTransactionIndex ? newTransaction : t
                );
                setTransactions(updatedTransactions);
            } else {
                setTransactions([...transactions, newTransaction]);
            }

            resetForm(form);
            document.getElementById('my_modal_4').close();
        } catch (error) {
            console.error("Error adding/updating transaction:", error);
            setError("Failed to save transaction");
        }
    };

    // Handle delete transaction
    const handleDeleteTransaction = (index) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
            if (confirmDelete) {
                const updatedTransactions = transactions.filter((_, i) => i !== index);
                setTransactions(updatedTransactions);
            }
        } catch (error) {
            console.error("Error deleting transaction:", error);
            setError("Failed to delete transaction");
        }
    };

    // Handle edit transaction
    const handleEditTransaction = (index) => {
        try {
            const transaction = transactions[index];
            setEditTransactionIndex(index);
            document.getElementById('my_modal_4').showModal();

            // Pre-fill the form with the transaction data
            setTimeout(() => {
                const form = document.forms['transactionForm'];
                form['category'].value = transaction.category || '';
                form['description'].value = transaction.description || '';
                form['income'].value = transaction.income || '';
                form['expenses'].value = transaction.expenses || '';
                form['date'].value = transaction.date || '';
            }, 0);
        } catch (error) {
            console.error("Error preparing edit form:", error);
            setError("Failed to prepare edit form");
        }
    };

    // Handle sorting
    const handleSortChange = (e) => {
        try {
            const option = e.target.value;
            setSortOption(option);
        
            let sortedTransactions = [...transactions];
        
            switch (option) {
                case "Most Expenses":
                    sortedTransactions.sort((a, b) => b.expenses - a.expenses);
                    break;
                case "Most Income":
                    sortedTransactions.sort((a, b) => b.income - a.income);
                    break;
                case "Newest":
                    sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                case "Oldest":
                    sortedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
                    break;
                default:
                    // Sort by created date if no option selected
                    sortedTransactions.sort((a, b) => 
                        new Date(b.createdAt) - new Date(a.createdAt)
                    );
            }
        
            setTransactions(sortedTransactions);
        } catch (error) {
            console.error("Error sorting transactions:", error);
            setError("Failed to sort transactions");
        }
    };

    // Calculate totals
    const totals = {
        income: transactions.reduce((acc, t) => acc + (t.income || 0), 0),
        expenses: transactions.reduce((acc, t) => acc + (t.expenses || 0), 0),
        saving: transactions.reduce((acc, t) => acc + (t.income || 0) - (t.expenses || 0), 0)
    };

    return (
        <section className="w-full flex flex-col gap-2 grow">
            {error && (
                <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            <div className={`grid bg-primary grid-cols-8 min-h-[120px] gap-2 p-2 rounded-lg w-full ${className}`}>
                {/* Income Card */}
                <div className="bg-green-200 rounded-lg items-center gap-1 justify-center col-span-2 flex flex-col md:flex-row">
                    <img 
                        className="w-[30%] md:w-[20%]" 
                        src="https://cdn.iconscout.com/icon/premium/png-512-thumb/income-1474500-1249736.png?f=webp&w=512" 
                        alt="Income"
                    />
                    <div className="flex flex-col items-center text-center justify-center">
                        <p className="font-bold hidden xs:block">Income</p>
                        <pre className="w-[90px] whitespace-pre-wrap break-words">
                            {new Intl.NumberFormat('id-ID', { 
                                style: 'currency', 
                                currency: 'IDR' 
                            }).format(totals.income)}
                        </pre>
                    </div>
                </div>

                {/* Expenses Card */}
                <div className="bg-red-200 rounded-lg items-center gap-1 justify-center col-span-2 flex flex-col md:flex-row">
                    <img 
                        className="w-[30%] md:w-[20%]" 
                        src="https://cdn.iconscout.com/icon/premium/png-512-thumb/expenses-6192559-5150646.png?f=webp&w=512" 
                        alt="Expenses"
                    />
                    <div className="flex flex-col items-center text-center justify-center">
                        <p className="font-bold hidden xs:block">Expenses</p>
                        <pre className="w-[90px] whitespace-pre-wrap break-words">
                            {new Intl.NumberFormat('id-ID', { 
                                style: 'currency', 
                                currency: 'IDR' 
                            }).format(totals.expenses)}
                        </pre>
                    </div>
                </div>

                {/* Savings Card */}
                <div className="bg-blue-200 rounded-lg items-center gap-1 justify-center col-span-2 flex flex-col md:flex-row">
                    <img 
                        className="w-[30%] md:w-[20%]" 
                        src="https://cdn.iconscout.com/icon/premium/png-512-thumb/money-bag-rupiah-1754554-1491544.png?f=webp&w=512" 
                        alt="Saving"
                    />
                    <div className="flex flex-col items-center text-center justify-center">
                        <p className="font-bold hidden xs:block">Saving</p>
                        <pre className="w-[90px] whitespace-pre-wrap break-words">
                            {new Intl.NumberFormat('id-ID', { 
                                style: 'currency', 
                                currency: 'IDR' 
                            }).format(totals.saving)}
                        </pre>
                    </div>
                </div>
                
                {/* Add Transaction Button */}
                <div className="bg-yellow-200 rounded-lg items-center gap-1 justify-center col-span-2 flex flex-col md:flex-row">
                    <button 
                        className="btn btn-circle btn-ghost absolute mb-0 xs:mb-8" 
                        onClick={() => {
                            setEditTransactionIndex(null);
                            document.getElementById('my_modal_4').showModal();
                        }}
                    >
                        <img 
                            src="https://img.icons8.com/?size=100&id=1501&format=png&color=000000" 
                            alt="Add"
                        />
                        <p className="font-bold hidden xs:block">ADD</p>
                    </button>

                    {/* Transaction Modal */}
                    <dialog id="my_modal_4" className="modal">
                        <div className="modal-box">
                            <div className="modal-action flex flex-col gap-2">
                                <form className="flex w-full justify-between items-center" method="dialog">
                                    <p className="font-bold ml-3">
                                        {editTransactionIndex !== null ? 'Edit' : 'Add'} Transaction
                                    </p>
                                    <button 
                                        className="btn btn-circle text-white btn-error"
                                        onClick={() => resetForm(document.forms['transactionForm'])}
                                    >
                                        <img 
                                            className="w-8" 
                                            src="https://img.icons8.com/?size=100&id=vu5kHwGC4PNb&format=png&color=FFFFFF" 
                                            alt="Close"
                                        />
                                    </button>
                                </form>

                                <form 
                                    name="transactionForm" 
                                    className="flex flex-col items-center gap-2" 
                                    onSubmit={handleAddTransaction}
                                >
                                    <input
                                        type="text"
                                        name="category"
                                        placeholder="Expenses Category"
                                        className="input input-bordered input-info w-full"
                                        required
                                    />
                                    <textarea
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
                                            min="0"
                                        />
                                        <input
                                            type="number"
                                            name="expenses"
                                            placeholder="Expenses"
                                            className="input input-bordered input-info w-full"
                                            min="0"
                                        />
                                        <input
                                            type="date"
                                            name="date"
                                            className="input input-bordered input-info w-full"
                                            required
                                        />
                                    </div>

                                    <div className="flex rounded-lg border border-secondary flex-col w-full justify-center items-start">
                                        <p className="bg-secondary w-full font-bold p-2 rounded-t-lg">
                                            Icon category expenses
                                        </p>
                                        {editTransactionIndex !== null && (
                                            <div className="p-2">
                                                <p className="text-sm mb-2">Current icon:</p>
                                                <img 
                                                    src={transactions[editTransactionIndex]?.iconCategory} 
                                                    alt="Current icon" 
                                                    className="h-12 w-12 object-cover rounded"
                                                />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            name="iconCategory"
                                            className="p-2"
                                            accept="image/*"
                                            required={editTransactionIndex === null}
                                        />
                                        {editTransactionIndex !== null && (
                                            <p className="text-xs text-gray-500 p-2">
                                                Leave empty to keep current icon
                                            </p>
                                        )}
                                    </div>

                                    <button className="btn w-full btn-primary" type="submit">
                                        {editTransactionIndex !== null ? 'Update' : 'Save'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="w-full h-[250px]">
                {/* Table header */}
                <div className="flex w-full gap-2 items-center p-3 justify-between">
                    <p className="font-bold badge badge-primary">List of Transactions</p>
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="select rounded-full select-xs select-info w-max"
                    >
                        <option disabled value="">Sorting</option>
                        <option value="Most Expenses">Most Expenses</option>
                        <option value="Most Income">Most Income</option>
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                    </select>
                </div>
                
                {/* Transactions Table */}
                <div className="overflow-x-auto h-full">
                    {transactions.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">
                            No transactions found. Click the ADD button to create one.
                        </div>
                    ) : (
                        <table className="table table-zebra table-pin-rows table-pin-cols">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Icon</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Income</th>
                                    <th>Expenses</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction, index) => (
                                    <tr key={transaction.id || index}>
                                        <th>{index + 1}</th>
                                        <td>
                                            {transaction.iconCategory ? (
                                                <img 
                                                    className="h-8 w-8 rounded-full object-cover" 
                                                    src={transaction.iconCategory} 
                                                    alt={`Icon for ${transaction.category}`}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "https://via.placeholder.com/32";
                                                    }}
                                                />
                                            ) : (
                                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-xs">N/A</span>
                                                </div>
                                            )}
                                        </td>
                                        <td>{transaction.category}</td>
                                        <td>
                                            <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap" 
                                                 title={transaction.description}>
                                                {transaction.description}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-green-600">
                                                {new Intl.NumberFormat('id-ID', { 
                                                    style: 'currency', 
                                                    currency: 'IDR' 
                                                }).format(transaction.income || 0)}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-red-600">
                                                {new Intl.NumberFormat('id-ID', { 
                                                    style: 'currency', 
                                                    currency: 'IDR' 
                                                }).format(transaction.expenses || 0)}
                                            </span>
                                        </td>
                                        <td>
                                            {new Date(transaction.date).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="flex gap-2">
                                            <button 
                                                onClick={() => handleEditTransaction(index)} 
                                                className="btn btn-xs btn-warning"
                                                title="Edit transaction"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteTransaction(index)} 
                                                className="btn btn-xs btn-error"
                                                title="Delete transaction"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </section>
    );
}