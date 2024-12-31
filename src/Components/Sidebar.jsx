import { Link } from "react-router-dom";
import LogoApp from "./LogoApp";
import dataJSON from "../data.json";
import { useState, useEffect } from "react";


export default function Sidebar({ className='' }) {
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

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserData(null);
        localStorage.removeItem('dataRegisterUsers');
        window.location.reload();
    };

    const [theme] = useState(localStorage.getItem("theme") || "Business");

    useEffect(() => {
        // Set the theme on the <html> tag whenever the theme changes
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme); // Save the selected theme to localStorage
    }, [theme]);

    return (
        <div className="flex z-30   justify-between items-center  w-full md:w-max">
            <div className={`drawer lg:drawer-open   ${className}`}>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn  rounded-none rounded-br-lg  btn-primary drawer-button lg:hidden">
                    <img width="20" src="https://img.icons8.com/?size=100&id=3096&format=png&color=000000" />
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    {isAuthenticated ? (
                                    <ul className="menu bg-primary text-base-content rounded-r-xl flex justify-between   h-screen   p-0 w-64 ">
                                    <div className="flex flex-col gap-1">
                                    <div className="flex p-2 gap-2 justify-start bg-primary rounded-tr-xl border-b-2 items-center">
                                        <LogoApp className="w-[100px]"/>
                                        <p className="font-bold">Cash Flow </p>
                                    </div>
                                        {/* Sidebar content here */}
                                        <Link 
                                            className="p-3 flex gap-2 items-center hover:bg-primary hover:pl-11 delay-100 transition-all ease-linear"
                                            to="/"
                                        >
                                            <img
                                                className="w-[30px]"
                                                src="https://img.icons8.com/?size=100&id=73&format=png&color=000000"
                                                alt="Home Icon"
                                            />
                                            <p>{dataJSON.sidebarItems[0].item}</p>
                                        </Link>
                    
                                        <Link 
                                            className="p-3 flex gap-2 items-center hover:bg-primary hover:pl-11 delay-100 transition-all ease-linear"
                                            to="/records"
                                        >
                                            <img
                                                className="w-[30px]"
                                                src="https://img.icons8.com/?size=100&id=37930&format=png&color=000000"
                                                alt="Home Icon"
                                            />
                                            <p>{dataJSON.sidebarItems[1].item}</p>
                                        </Link>
                    
                                        <Link 
                                            className="p-3 flex gap-2 items-center hover:bg-primary hover:pl-11 delay-100 transition-all ease-linear"
                                            to="/analytics"
                                        >
                                            <img
                                                className="w-[30px]"
                                                src="https://img.icons8.com/?size=100&id=15&format=png&color=000000"
                                                alt="Analytics Icon"
                                            />
                                            <p>{dataJSON.sidebarItems[2].item}</p>
                                        </Link>
                    
                                        <Link 
                                            className="p-3 flex gap-2 items-center hover:bg-primary hover:pl-11 delay-100 transition-all ease-linear"
                                            to="/history"
                                        >
                                            <img
                                                className="w-[30px]"
                                                src="https://img.icons8.com/?size=100&id=58761&format=png&color=000000"
                                                alt="History Icon"
                                            />
                                            <p>{dataJSON.sidebarItems[3].item}</p>
                                        </Link>
                                    </div>
                                    <div className="p-2 border m-2 items-center justify-between rounded-lg flex flex-col gap-2">
                                        {userData ? (
                                            <p className="font-bold text-xs md:text-xl">{userData.name}</p>
                                        ) : null}
                                        <button onClick={handleLogout} className="btn w-full btn-secondary">Logout</button>
                                    </div>
                                </ul>
                ) : (
                    <ul className="menu bg-primary text-base-content rounded-r-xl justify-between   h-screen   w-64 ">
                    <div className="flex flex-col gap-2 justify-start bg-primary rounded-tr-xl ">
                        <div className="flex gap-2 items-center rounded-tr-xl border-b-2 p-2">
                            <LogoApp className="w-[100px]"/>
                            <p className="font-bold">Cash Flow </p>
                        </div>
                    <Link 
                        className="p-3 flex gap-2 items-center hover:bg-primary hover:pl-11 delay-100 transition-all ease-linear"
                        to="/"
                    >
                        <img
                            className="w-[30px]"
                            src="https://img.icons8.com/?size=100&id=73&format=png&color=000000"
                            alt="Home Icon"
                        />
                        <p>{dataJSON.sidebarItems[0].item}</p>
                    </Link>
                    </div>
                    <div className="flex flex-col gap-2 w-full border p-2 rounded-lg items-center">
                        <p className="text-2xl font-bold">Login or Register</p>
                        <Link 
                            className="w-full"
                            to="/login">
                            <button className="btn w-full btn-secondary">Login</button>
                        </Link>
                        <Link 
                            className="w-full"
                            to="/register">
                            <button className="btn w-full btn-secondary">Register</button>
                        </Link>                
                    </div>
                    </ul>
                )}
            </div>
            </div>
            <p className="font-bold block sm:hidden p-2 ">Hallo world</p>
        </div>

    )
    
}