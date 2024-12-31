import React from "react";
import { Children } from "react";

export default function LayoutsAuth({children}) {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            {children}
        </div>
    )
}