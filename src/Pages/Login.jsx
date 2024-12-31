import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LayoutsAuth from "../Layouts/LayoutsAuth";
import { Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [theme] = useState(localStorage.getItem("theme") || "Business");

    useEffect(() => {
        // Set the theme on the <html> tag whenever the theme changes
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme); // Save the selected theme to localStorage
    }, [theme]);

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const savedData = localStorage.getItem("dataRegisterUsers");

        
        if (savedData) {
            const savedRegister = JSON.parse(savedData);
            if (
                savedRegister.email === login.email &&
                savedRegister.password === login.password
            ) {
                console.log("Login successful!");
                setError("");
                // Redirect to home page
                navigate("/");  // Ensure this redirects properly
                window.location.reload();
            } else {
                setError("Invalid email or password");
            }
        } else {
            setError("No registered user found");
        }
    };

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    return (
        <LayoutsAuth>
            <div className="max-w-sm p-6 border rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-primary mb-6">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={login.email}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={login.password}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                    <button type="submit" className="btn btn-primary w-full">Login</button>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </form>
                <Link to="/register" className="text-center block mt-4">Don't have an account? Register</Link>
            </div>
        </LayoutsAuth>
    );
}
