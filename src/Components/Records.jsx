import React, { useEffect, useState } from "react";
import Overview from "./Overview";

export default function Records() {
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
    

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "business");
    useEffect(() => {
        // Set the theme on the <html> tag whenever the theme changes
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme); // Save the selected theme to localStorage
    }, [theme]);

    const handleThemeChange = (event) => {
        setTheme(event.target.value); // Update the theme when a new option is selected
    };

    return (
        <div className="p-2 flex flex-col justify-start gap-2 h-screen w-full">
            <div className="w-full flex justify-between items-center">
                <p className="badge badge-primary">Records</p>
                <select
                    className="select select-primary rounded-full select-xs"
                    value={theme} // This ensures the selected theme is controlled by React
                    onChange={handleThemeChange}
                >
                    <option value="" disabled>Themes</option> {/* Remove 'selected' and use 'value' here */}
                    <option value="light">Light</option>
                    <option value="black">Black</option>
                    <option defaultValue={"business"} value="business">Business</option>
                    <option value="dark">Dark</option>
                    <option value="cupcake">Cupcake</option>
                    <option value="bumblebee">Bumblebee</option>
                    <option value="emerald">Emerald</option>
                    <option value="corporate">Corporate</option>
                    <option value="synthwave">Synthwave</option>
                    <option value="retro">Retro</option>
                    <option value="cyberpunk">Cyberpunk</option>
                    <option value="valentine">Valentine</option>
                    <option value="halloween">Halloween</option>
                    <option value="garden">Garden</option>
                    <option value="forest">Forest</option>
                    <option value="pastel">Pastel</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="wireframe">Wireframe</option>
                    <option value="luxury">Luxury</option>
                    <option value="dracula">Dracula</option>
                    <option value="cmyk">CMYK</option>
                    <option value="autumn">Autumn</option>
                    <option value="acid">Acid</option>
                    <option value="lemonade">Lemonade</option>
                    <option value="night">Night</option>
                    <option value="winter">Winter</option>
                    <option value="nord">Nord</option>
                    <option value="sunset">Sunset</option>
                </select>
            </div>

            <div className="bg-primary w-full p-2 h-max md:min-h-[120px]  rounded-lg flex-col flex gap-2 justify-start items-start">
            {isAuthenticated && userData ? (
                <p className="text-xs md:text-2xl">Hi {userData.name}</p>
            ) : null}

                <p className="text-xs md:text-2xl font-extrabold">Ready to take control of your finances today?</p>
                <p className="text-xs md:text-lg">With <span className="font-extrabold">CashFlow</span>, Take Charge of Your Money and Achieve Your Dreams</p>
            </div>

            <Overview />
        </div>
    );
}
