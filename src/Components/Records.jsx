import React, { useEffect, useState } from "react";
import Overview from "./Overview";

export default function Records() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        // Set the theme on the <html> tag whenever the theme changes
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme); // Save the selected theme to localStorage
    }, [theme]);

    const handleThemeChange = (event) => {
        setTheme(event.target.value); // Update the theme when a new option is selected
    };

    return (
        <div  className="p-2 flex flex-col justify-start gap-2 h-screen w-full">
            <div className="w-full flex justify-between items-center">
                <p className="font-bold badge badge-primary">Records</p>
                <select
                    className="select select-primary rounded-full select-xs"
                    value={theme}
                    onChange={handleThemeChange}
                >
                    <option disabled selected>
                        Themes
                    </option>
                    <option value="light">Light</option>
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
                    <option value="aqua">Aqua</option>
                    <option value="lofi">Lofi</option>
                    <option value="pastel">Pastel</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="wireframe">Wireframe</option>
                    <option value="black">Black</option>
                    <option value="luxury">Luxury</option>
                    <option value="dracula">Dracula</option>
                    <option value="cmyk">CMYK</option>
                    <option value="autumn">Autumn</option>
                    <option value="business">Business</option>
                    <option value="acid">Acid</option>
                    <option value="lemonade">Lemonade</option>
                    <option value="night">Night</option>
                    <option value="coffee">Coffee</option>
                    <option value="winter">Winter</option>
                    <option value="dim">Dim</option>
                    <option value="nord">Nord</option>
                    <option value="sunset">Sunset</option>
                </select>
            </div>

            <div className=" text-secondary-content w-full p-1 min-h-[100px] bg-primary border border-primary rounded-lg flex-col flex gap-2 justify-start items-start">
                <p>With CashFlow, Take Charge of Your Money and Achieve Your Dreams</p>
                <p className="text-md md:text-[1.5rem] font-extrabold">Ready to take control of your finances today?</p>
            </div>

            <Overview />
        </div>
    );
}
