import React, { useState, useEffect } from "react";
import dataJSON from "../data.json";



export default function Home() {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [userData, setUserData] = useState(null);
        
        useEffect(() => {
            const dataUsers = localStorage.getItem('dataRegisterUsers');
            if (dataUsers) {
                const parsedData = JSON.parse(dataUsers); // Parse the data
                setIsAuthenticated(true);
                setUserData(parsedData); // Store the parsed data
            }
        }, []);
    

    const [theme] = useState(localStorage.getItem("theme") || "Business");

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
                            {isAuthenticated ? <p className="text-3xl font-bold">Welcome {userData.name}</p> : <p className="text-3xl font-bold">Welcome</p>}
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