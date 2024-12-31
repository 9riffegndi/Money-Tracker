import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BarChart from "../Components/barChart";

export default function Analytics() {
    const transaction = localStorage.getItem("transactions");
    
    const [theme ] = useState(localStorage.getItem("theme") || "business");
    
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


    return (
        <div className="flex flex-col p-2 gap-2  w-full h-screen">
            <p className="badge badge-primary">Analytics</p>

            <div className=" grid grid-cols-12 h-screen  w-full">
                <div className="w-full overflow-auto  col-span-12">
                    <BarChart />
                </div>
            </div>

        </div>
    );
}   