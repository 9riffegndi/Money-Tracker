import LayoutsAuth from "../Layouts/LayoutsAuth";
import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Register() {
    const navigate = useNavigate();
    const [theme ] = useState(localStorage.getItem("theme") || "Business");

    useEffect(() => {
        // Set the theme on the <html> tag whenever the theme changes
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme); // Save the selected theme to localStorage
    }, [theme]);


    
    const [dataUserRegister, setdataUserRegister] = useState({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        // Check if data is in localStorage on initial load
        const savedRegister = localStorage.getItem("dataRegisterUsers");
        if (savedRegister) {
            setdataUserRegister(JSON.parse(savedRegister));
        }
    }, []);


    const handleRegister = (e) => {
        e.preventDefault();
        setdataUserRegister({ ...dataUserRegister, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Check if any field is empty
        if (
            !dataUserRegister.name.trim() || 
            !dataUserRegister.email.trim() || 
            !dataUserRegister.password.trim()
        ) {
            alert("Please fill in all fields");
            return; // Stop further execution
        }
    
        // Save data to localStorage and proceed
        localStorage.setItem("dataRegisterUsers", JSON.stringify(dataUserRegister));
        alert("Register success");
        console.log("Register success", dataUserRegister);
        navigate("/login");
    };
    



    return (
        <LayoutsAuth>
            <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-primary">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={dataUserRegister.name}
                        onChange={handleRegister}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={dataUserRegister.email}
                        onChange={handleRegister}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={dataUserRegister.password}
                        onChange={handleRegister}
                        className="input input-bordered w-full"
                    />
                    <button type="submit" className="btn btn-primary w-full">Register</button>
                </form>
                <Link to="/login" className="text-center block mt-4">Already have an account? Login</Link>

            </div>
        </LayoutsAuth>
    );
}
