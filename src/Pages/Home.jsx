import React, { useState, useEffect } from "react";

export default function Home() {
    const [theme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        // Set the theme on the <html> tag whenever the theme changes
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme); // Save the selected theme to localStorage
    }, [theme]);

    return (
        <div>
            <h1 className="text-3xl text-secondary font-bold underline w-full h-screen">
                Home
            </h1>
        </div>
    )
    
}