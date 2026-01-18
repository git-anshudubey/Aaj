import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-primary",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ease-in-out hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}