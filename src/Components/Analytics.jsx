import { Link } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from "react";


// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analytics() {
    const transaction = localStorage.getItem("transactions");
    
    const [theme ] = useState(localStorage.getItem("theme") || "light");
    
        useEffect(() => {
            // Set the theme on the <html> tag whenever the theme changes
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme); // Save the selected theme to localStorage
        }, [theme]);
    

    if (!transaction) {
        return (
            <div className="p-2 flex h-screen w-full">
                <p className="badge badge-primary">Analytics</p>
                <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
                    <p className="text-2xl font-bold">No transactions found</p>
                    <Link to="/" className="btn btn-primary">Go to Records</Link>
                </div>
            </div>
        );
    }

    // Parse the transaction data from localStorage
    const transactions = JSON.parse(transaction);

    // Process the data for categories and their corresponding total incomes and expenses
    const categories = [...new Set(transactions.map((t) => t.category))]; // Extract unique categories
    const incomeData = categories.map((category) =>
        transactions
            .filter((transaction) => transaction.category === category)
            .reduce((total, transaction) => total + transaction.income, 0)
    );
    const expenseData = categories.map((category) =>
        transactions
            .filter((transaction) => transaction.category === category)
            .reduce((total, transaction) => total + transaction.expenses, 0)
    );

    // Chart data
    const data = {
        labels: categories,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex flex-col p-2 gap-2  w-full h-screen">
            <p className="badge badge-primary">Analytics</p>

            <div className=" grid grid-cols-12 h-screen  w-full">
                <div className="w-full col-span-12">
                    <Bar className="w-full" data={data} />
                </div>
            </div>

        </div>
    );
}
