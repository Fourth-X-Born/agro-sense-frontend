import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFooter from "../components/dashboard/DashboardFooter";
import dataService from "../services/dataService";

export default function MarketPricesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDistrictId, setSelectedDistrictId] = useState("");
    const [selectedCropId, setSelectedCropId] = useState("");
    const [sortBy, setSortBy] = useState("Trending");

    const [marketPrices, setMarketPrices] = useState([]);
    const [crops, setCrops] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fallback images for crops
    const cropImages = {
        "Rice": "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "Onion": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "Carrot": "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "Potato": "https://growhoss.com/cdn/shop/articles/potato_ecdbb7b2-3914-4edb-818d-eb6abfc66627_460x@2x.jpg?v=1761159166",
        "Beans": "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "Cabbage": "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "Tomato": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "Chili": "https://casadeamor.in/cdn/shop/articles/vipul-borade-FvvgvCO-0gI-unsplash.jpg?v=1649308066&width=1100",
        "default": "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        fetchMarketPrices();
    }, [selectedCropId, selectedDistrictId]);

    const fetchInitialData = async () => {
        try {
            const [cropsRes, districtsRes] = await Promise.all([
                dataService.getCrops(),
                dataService.getDistricts(),
            ]);
            if (cropsRes.success) setCrops(cropsRes.data || []);
            if (districtsRes.success) setDistricts(districtsRes.data || []);
        } catch (err) {
            console.error("Error fetching initial data:", err);
        }
    };

    const fetchMarketPrices = async () => {
        try {
            setLoading(true);
            const response = await dataService.getMarketPrices(
                selectedCropId || null,
                selectedDistrictId || null
            );
            if (response.success) {
                setMarketPrices(response.data || []);
            }
        } catch (err) {
            console.error("Error fetching market prices:", err);
            setMarketPrices([]);
        } finally {
            setLoading(false);
        }
    };

    const getCropImage = (cropName) => {
        for (const key of Object.keys(cropImages)) {
            if (cropName?.toLowerCase().includes(key.toLowerCase())) {
                return cropImages[key];
            }
        }
        return cropImages.default;
    };

    const getCategoryColor = (cropName) => {
        const name = cropName?.toLowerCase() || "";
        if (name.includes("rice") || name.includes("paddy") || name.includes("wheat")) return "bg-amber-100 text-amber-700";
        if (name.includes("potato") || name.includes("yam")) return "bg-orange-100 text-orange-700";
        if (name.includes("chili") || name.includes("pepper")) return "bg-red-100 text-red-700";
        return "bg-green-100 text-green-700";
    };

    // Filter prices based on search
    const filteredPrices = marketPrices.filter(price => {
        const cropName = price.cropName || price.crop?.name || "";
        return cropName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Sort prices
    const sortedPrices = [...filteredPrices].sort((a, b) => {
        switch (sortBy) {
            case "Price Low": return a.price - b.price;
            case "Price High": return b.price - a.price;
            case "Name": return (a.cropName || "").localeCompare(b.cropName || "");
            default: return 0;
        }
    });

    return (
        <div className="min-h-screen bg-[#f6f8f6] flex flex-col">
            <DashboardNavbar />

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
                            {/* District */}
                            <div className="relative">
                                <select
                                    value={selectedDistrictId}
                                    onChange={(e) => setSelectedDistrictId(e.target.value)}
                                    className="h-10 pl-8 pr-8 rounded-lg bg-white border border-gray-200 text-xs text-gray-600 focus:outline-none focus:border-primary appearance-none cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <option value="">All Districts</option>
                                    {districts.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                                <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">location_on</span>
                                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">expand_more</span>
                            </div>

                            {/* Crop Filter */}
                            <div className="relative">
                                <select
                                    value={selectedCropId}
                                    onChange={(e) => setSelectedCropId(e.target.value)}
                                    className="h-10 pl-8 pr-8 rounded-lg bg-white border border-gray-200 text-xs text-gray-600 focus:outline-none focus:border-primary appearance-none cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <option value="">All Crops</option>
                                    {crops.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                                <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">eco</span>
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

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-16">
                        <span className="material-symbols-outlined animate-spin text-3xl text-primary">progress_activity</span>
                    </div>
                )}

                {/* No Data State */}
                {!loading && sortedPrices.length === 0 && (
                    <div className="text-center py-16">
                        <span className="material-symbols-outlined text-4xl text-gray-300">inventory_2</span>
                        <p className="text-gray-400 mt-2">No market prices found</p>
                    </div>
                )}

                {/* Product Grid */}
                {!loading && sortedPrices.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {sortedPrices.map((price, index) => {
                            const cropName = price.cropName || price.crop?.name || "Unknown";
                            const districtName = price.districtName || price.district?.name || "";
                            return (
                                <div
                                    key={price.id || index}
                                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Image */}
                                    <div className="relative h-36 overflow-hidden">
                                        <img
                                            src={getCropImage(cropName)}
                                            alt={cropName}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                            onError={(e) => { e.target.src = cropImages.default; }}
                                        />
                                        <span className={`absolute top-2 right-2 text-[9px] font-medium px-2 py-1 rounded shadow-sm ${getCategoryColor(cropName)}`}>
                                            {districtName}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <h3 className="text-sm font-semibold text-[#131613] mb-2">{cropName}</h3>
                                        <div className="flex items-baseline gap-1 mb-3">
                                            <span className="text-xl font-bold text-primary">{parseFloat(price.price).toFixed(2)} LKR</span>
                                            <span className="text-xs text-gray-400">/kg</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] text-gray-400">Date</p>
                                                <p className="text-xs text-gray-600">
                                                    {price.date ? new Date(price.date).toLocaleDateString() : "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Data Source */}
                <div className="text-center py-4 animate-fade-in delay-500">
                    <p className="text-xs text-gray-400">
                        Data Source: <span className="text-primary">Hector Kobbekaduwa Agrarian Research and Training Institute (HARTI)</span>.
                    </p>
                </div>
            </main>

            <DashboardFooter />
        </div>
    );
}
