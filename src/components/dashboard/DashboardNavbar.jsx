import React from "react";
import { Link, useLocation } from "react-router-dom";
import NotificationDropdown from "./NotificationDropdown";

const DashboardNavbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const navItems = [
        { path: "/dashboard", label: "Dashboard" },
        { path: "/crop-risk", label: "Crop Risk" },
        { path: "/weather", label: "Weather" },
        { path: "/market-prices", label: "Market Prices" },
        { path: "/crop-guide", label: "Crop Guide" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
            <div className="flex items-center justify-between max-w-[1200px] mx-auto px-6 py-3">
                {/* Logo */}
                <Link to="/dashboard" className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-[#131613] text-sm font-bold">Agro<span className="text-primary">Sense</span> AI</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`text-xs font-normal transition-colors ${currentPath === item.path
                                ? "text-[#131613] font-medium border-b-2 border-primary pb-1"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    {/* Notification Dropdown */}
                    <NotificationDropdown />

                    {/* Profile Avatar */}
                    <Link to="/settings" className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden hover:ring-2 hover:ring-primary/30 transition-all">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;

