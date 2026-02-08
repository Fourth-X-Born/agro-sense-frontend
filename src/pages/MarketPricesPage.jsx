import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFooter from "../components/dashboard/DashboardFooter";
import marketPriceService from "../api/marketPriceService";

export default function MarketPricesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [region, setRegion] = useState("All");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Trending");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Default fallback data
    const defaultProducts = [
        {
            name: "Rice (Samba)",
            price: 220,
            lastWeek: 210,
            change: 5,
            category: "Cereals",
            image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Big Onions",
            price: 350,
            lastWeek: 357,
            change: -2,
            category: "Vegetables",
            image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Carrots",
            price: 180,
            lastWeek: 180,
            change: 0,
            category: "Vegetables",
            image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Potatoes",
            price: 280,
            lastWeek: 277,
            change: 1,
            category: "Tubers",
            image: "https://growhoss.com/cdn/shop/articles/potato_ecdbb7b2-3914-4edb-818d-eb6abfc66627_460x@2x.jpg?v=1761159166"
        },
        {
            name: "Green Beans",
            price: 310,
            lastWeek: 287,
            change: 8,
            category: "Vegetables",
            image: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Cabbage",
            price: 150,
            lastWeek: 158,
            change: -5,
            category: "Vegetables",
            image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Tomatoes",
            price: 190,
            lastWeek: 186,
            change: 2,
            category: "Vegetables",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Green Chilies",
            price: 400,
            lastWeek: 400,
            change: 0,
            category: "Spices",
            image: "https://casadeamor.in/cdn/shop/articles/vipul-borade-FvvgvCO-0gI-unsplash.jpg?v=1649308066&width=1100"
        }
    ];

    // Fetch prices from API
    useEffect(() => {
        const fetchPrices = async () => {
            try {
                setLoading(true);
                const filters = {};
                if (region !== "All") filters.district = region;
                const data = await marketPriceService.getPrices(filters);
                // If API returns data, map it to display format; otherwise use defaults
                if (data && data.length > 0) {
                    const mappedData = data.map(item => ({
                        name: item.cropName,
                        price: item.price,
                        lastWeek: item.price, // API doesn't have lastWeek, use same
                        change: 0,
                        category: "Vegetables",
                        image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                        district: item.districtName
                    }));
                    setProducts(mappedData);
                } else {
                    setProducts(defaultProducts);
                }
            } catch (err) {
                console.error("Failed to fetch prices:", err);
                setProducts(defaultProducts); // Fallback to default data
            } finally {
                setLoading(false);
            }
        };
        fetchPrices();
    }, [region]);

    const getCategoryColor = (cat) => {
        switch (cat) {
            case "Cereals": return "bg-amber-100 text-amber-700";
            case "Vegetables": return "bg-green-100 text-green-700";
            case "Tubers": return "bg-orange-100 text-orange-700";
            case "Spices": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-[#f6f8f6] flex flex-col">
            {/* Dashboard Navbar */}
            <DashboardNavbar />

            {/* Main Content */}
            <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-6 animate-fade-in-up">
                {/* Page Title */}
                <div className="mb-6 animate-fade-in-left">
                    <h1 className="text-2xl font-bold text-[#131613]">Market Prices</h1>
                    <p className="text-primary text-sm">Daily updates from major economic centers across Sri Lanka</p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6 animate-scale-in delay-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row gap-3">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search for crops like Rice, Carrots..."
                                className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-primary transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex gap-2">
                            {/* Region */}
                            <div className="relative">
                                <select
                                    value={region}
                                    onChange={(e) => setRegion(e.target.value)}
                                    className="h-10 pl-8 pr-8 rounded-lg bg-white border border-gray-200 text-xs text-gray-600 focus:outline-none focus:border-primary appearance-none cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <option value="All">Region: All</option>
                                    <option value="Colombo">Colombo</option>
                                    <option value="Dambulla">Dambulla</option>
                                    <option value="Kandy">Kandy</option>
                                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                                </select>
                                <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">location_on</span>
                                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">expand_more</span>
                            </div>

                            {/* Category */}
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="h-10 pl-8 pr-8 rounded-lg bg-white border border-gray-200 text-xs text-gray-600 focus:outline-none focus:border-primary appearance-none cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <option value="All">Category: All</option>
                                    <option value="Vegetables">Vegetables</option>
                                    <option value="Cereals">Cereals</option>
                                    <option value="Tubers">Tubers</option>
                                    <option value="Spices">Spices</option>
                                </select>
                                <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">category</span>
                                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">expand_more</span>
                            </div>

                            {/* Sort */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="h-10 pl-8 pr-8 rounded-lg bg-white border border-gray-200 text-xs text-gray-600 focus:outline-none focus:border-primary appearance-none cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <option value="Trending">Sort: Trending</option>
                                    <option value="Price Low">Price: Low to High</option>
                                    <option value="Price High">Price: High to Low</option>
                                    <option value="Name">Name: A-Z</option>
                                </select>
                                <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">sort</span>
                                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">expand_more</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Image */}
                            <div className="relative h-36 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                                    }}
                                />
                                <span className={`absolute top-2 right-2 text-[9px] font-medium px-2 py-1 rounded shadow-sm ${getCategoryColor(product.category)}`}>
                                    {product.category}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-[#131613] mb-2">{product.name}</h3>
                                <div className="flex items-baseline gap-1 mb-3">
                                    <span className="text-xl font-bold text-primary">{product.price} LKR</span>
                                    <span className="text-xs text-gray-400">/kg</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] text-gray-400">Last Week</p>
                                        <p className="text-xs text-gray-600">{product.lastWeek} LKR</p>
                                    </div>
                                    <span className={`flex items-center gap-0.5 text-xs font-medium px-2 py-1 rounded ${product.change > 0 ? 'bg-green-50 text-green-600' :
                                        product.change < 0 ? 'bg-red-50 text-red-600' :
                                            'bg-gray-50 text-gray-500'
                                        }`}>
                                        {product.change > 0 && <span className="material-symbols-outlined text-xs">trending_up</span>}
                                        {product.change < 0 && <span className="material-symbols-outlined text-xs">trending_down</span>}
                                        {product.change === 0 && <span className="material-symbols-outlined text-xs">remove</span>}
                                        {product.change > 0 ? '+' : ''}{product.change}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Data Source */}
                <div className="text-center py-4 animate-fade-in delay-500">
                    <p className="text-xs text-gray-400">
                        Data Source: <span className="text-primary">Hector Kobbekaduwa Agrarian Research and Training Institute (HARTI)</span>.
                    </p>
                </div>
            </main>

            {/* Footer */}
            <DashboardFooter />
        </div>
    );
}
