import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { marketPriceAPI } from "../services/api";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFooter from "../components/dashboard/DashboardFooter";

export default function MarketPricesPage() {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Filter state
    const [searchTerm, setSearchTerm] = useState("");
    const [regionFilter, setRegionFilter] = useState("All Regions");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");
    const [sortBy, setSortBy] = useState("Default");

    // Fetch market prices on mount
    useEffect(() => {
        const fetchMarketPrices = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await marketPriceAPI.getAll();
                if (response.success && response.data) {
                    // Map API response to display format
                    const mappedProducts = response.data.map(item => ({
                        id: item.id,
                        name: item.cropName || item.crop?.name || 'Unknown Crop',
                        price: item.pricePerKg || item.price || 0,
                        lastWeek: item.previousPrice || (item.pricePerKg ? item.pricePerKg - 10 : 0),
                        change: item.changePercentage || 0,
                        category: item.cropCategory || item.crop?.category || 'General',
                        region: item.districtName || item.district?.name || 'Unknown',
                        unit: item.unit || 'kg',
                        image: getCropImage(item.cropName || item.crop?.name)
                    }));
                    setProducts(mappedProducts);
                    setFilteredProducts(mappedProducts);
                }
            } catch (err) {
                console.error("Error fetching market prices:", err);
                setError("Failed to load market prices");
                // Fallback to mock data
                setProducts(mockProducts);
                setFilteredProducts(mockProducts);
            } finally {
                setLoading(false);
            }
        };

        fetchMarketPrices();
    }, []);

    // Apply filters
    useEffect(() => {
        let result = [...products];

        // Search filter
        if (searchTerm) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Region filter
        if (regionFilter !== "All Regions") {
            result = result.filter(p => p.region === regionFilter);
        }

        // Category filter
        if (categoryFilter !== "All Categories") {
            result = result.filter(p => p.category === categoryFilter);
        }

        // Sort
        if (sortBy === "Price: Low to High") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Price: High to Low") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === "Change: Highest") {
            result.sort((a, b) => b.change - a.change);
        }

        setFilteredProducts(result);
    }, [searchTerm, regionFilter, categoryFilter, sortBy, products]);

    // Get unique regions and categories for filter dropdowns
    const regions = ["All Regions", ...new Set(products.map(p => p.region).filter(Boolean))];
    const categories = ["All Categories", ...new Set(products.map(p => p.category).filter(Boolean))];

    return (
        <div className="min-h-screen bg-[#f6f8f6] flex flex-col">
            {/* Dashboard Navbar */}
            <DashboardNavbar />

            {/* Main Content */}
            <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-6 animate-fade-in-up">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#131613]">Market Prices</h1>
                        <p className="text-gray-500 text-sm">
                            Today's agricultural market prices across Sri Lanka
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        Last updated: {new Date().toLocaleTimeString()}
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                    {/* Search Bar */}
                    <div className="relative flex-1">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search crops..."
                            className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary bg-white"
                        />
                    </div>

                    {/* Region Filter */}
                    <select
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                        className="h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-primary min-w-[140px]"
                    >
                        {regions.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>

                    {/* Category Filter */}
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-primary min-w-[140px]"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-primary min-w-[160px]"
                    >
                        <option>Default</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Change: Highest</option>
                    </select>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
                            <p className="text-gray-500 mt-2">Loading market prices...</p>
                        </div>
                    </div>
                ) : error && products.length === 0 ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <span className="material-symbols-outlined text-4xl text-red-400">error</span>
                            <p className="text-gray-500 mt-2">{error}</p>
                        </div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <span className="material-symbols-outlined text-4xl text-gray-400">search_off</span>
                            <p className="text-gray-500 mt-2">No products match your search</p>
                        </div>
                    </div>
                ) : (
                    /* Products Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id || index}
                                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group animate-scale-in"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Product Image */}
                                <div className="h-32 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-sm font-semibold text-[#131613]">{product.name}</h3>
                                            <p className="text-[10px] text-gray-400">{product.region}</p>
                                        </div>
                                        <span className="text-[10px] text-primary font-medium bg-primary/10 px-2 py-0.5 rounded">
                                            {product.category}
                                        </span>
                                    </div>

                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-lg font-bold text-[#131613]">
                                                Rs. {product.price}
                                                <span className="text-xs font-normal text-gray-400">/{product.unit}</span>
                                            </p>
                                            <p className="text-[10px] text-gray-400">
                                                Last week: Rs. {product.lastWeek}
                                            </p>
                                        </div>
                                        <div className={`flex items-center gap-0.5 text-xs font-medium ${product.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            <span className="material-symbols-outlined text-sm">
                                                {product.change >= 0 ? 'trending_up' : 'trending_down'}
                                            </span>
                                            {product.change >= 0 ? '+' : ''}{product.change}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Results count */}
                {!loading && filteredProducts.length > 0 && (
                    <div className="mt-6 text-center text-xs text-gray-400">
                        Showing {filteredProducts.length} of {products.length} products
                    </div>
                )}
            </main>

            {/* Footer */}
            <DashboardFooter />
        </div>
    );
}

// Helper function to get crop image
function getCropImage(cropName) {
    const images = {
        'Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'Paddy': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'Tomato': 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'Carrot': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f82ber49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'Onion': 'https://images.unsplash.com/photo-1587049352847-81a56d773cae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'Cabbage': 'https://images.unsplash.com/photo-1594282486552-05a582aef510?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'Beans': 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'Chili': 'https://images.unsplash.com/photo-1583119022894-919a68a3f22b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    };

    // Try exact match first
    if (images[cropName]) return images[cropName];

    // Try partial match
    for (const [key, url] of Object.entries(images)) {
        if (cropName?.toLowerCase().includes(key.toLowerCase())) {
            return url;
        }
    }

    // Default image
    return 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
}

// Fallback mock products
const mockProducts = [
    { id: 1, name: "Rice (Samba)", price: 220, lastWeek: 210, change: 5, category: "Cereals", region: "Polonnaruwa", unit: "kg", image: getCropImage("Rice") },
    { id: 2, name: "Tomato", price: 180, lastWeek: 200, change: -10, category: "Vegetables", region: "Dambulla", unit: "kg", image: getCropImage("Tomato") },
    { id: 3, name: "Carrot", price: 250, lastWeek: 260, change: -4, category: "Vegetables", region: "Nuwara Eliya", unit: "kg", image: getCropImage("Carrot") },
    { id: 4, name: "Green Chili", price: 320, lastWeek: 300, change: 7, category: "Vegetables", region: "Jaffna", unit: "kg", image: getCropImage("Chili") },
    { id: 5, name: "Onion (Big)", price: 280, lastWeek: 290, change: -3, category: "Vegetables", region: "Matale", unit: "kg", image: getCropImage("Onion") },
    { id: 6, name: "Potato", price: 190, lastWeek: 180, change: 6, category: "Vegetables", region: "Badulla", unit: "kg", image: getCropImage("Potato") },
    { id: 7, name: "Cabbage", price: 120, lastWeek: 130, change: -8, category: "Vegetables", region: "Nuwara Eliya", unit: "kg", image: getCropImage("Cabbage") },
    { id: 8, name: "Beans", price: 240, lastWeek: 230, change: 4, category: "Vegetables", region: "Badulla", unit: "kg", image: getCropImage("Beans") },
];
