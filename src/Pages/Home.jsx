import React, { useState, useEffect } from "react";
import dataJSON from "../data.json";



export default function Home() {
    const [theme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        // Set the theme on the <html> tag whenever the theme changes
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme); // Save the selected theme to localStorage
    }, [theme]);

    return (
        <>
                {dataJSON.HomeWelcome.map((item) => (
                    <div className="w-full h-screen justify-center p-2 grid grid-cols-12   place-items-center " key={item.id}>
                        <div className= "col-span-12 md:col-span-6">
                            <p className="font-extrabold text-6xl">{item.appName}</p>
                            <p>{item.Headline}</p>
                            <p>{item.Slogan}</p>
                        </div>
                        <img className="col-span-12 md:col-span-6 box-shadow" src={item.logo} alt={item.appName} />
                    </div>
                ))}
        </>
    )
    
}