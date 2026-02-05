import React from "react";
import { Link } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFooter from "../components/dashboard/DashboardFooter";

export default function WeatherPage() {
    const forecast = [
        { day: "Today", icon: "sunny", high: 24, low: 18 },
        { day: "Wed", icon: "rainy", high: 22, low: 17 },
        { day: "Thu", icon: "partly_cloudy_day", high: 21, low: 16 },
        { day: "Fri", icon: "cloud", high: 26, low: 19 },
        { day: "Sat", icon: "sunny", high: 27, low: 20 },
        { day: "Sun", icon: "partly_cloudy_day", high: 23, low: 18 },
        { day: "Mon", icon: "sunny", high: 22, low: 18 },
    ];

    return (
        <div className="min-h-screen bg-[#f6f8f6] flex flex-col">
            {/* Dashboard Navbar */}
            <DashboardNavbar />

            {/* Main Content */}
            <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-6">
                {/* Main Weather Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                    {/* Main Weather Card */}
                    <div className="lg:col-span-2 relative rounded-2xl overflow-hidden min-h-[220px]">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: 'url("https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")'
                            }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
                        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-5xl font-bold text-white mb-1">24°C</h1>
                                    <p className="text-white text-lg font-medium">Partly Cloudy</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-white text-sm font-medium">Oct 24, 2023</p>
                                    <p className="text-white/70 text-xs">Tuesday</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-white/80 text-xs mb-4 max-w-md">
                                    Current conditions in Nuwara Eliya. Moderate winds from the NW. Ideal conditions for afternoon tea plucking.
                                </p>
                                <div className="flex gap-2">
                                    <button className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors">
                                        <span className="material-symbols-outlined text-sm">description</span>
                                        Full Report
                                    </button>
                                    <button className="flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur text-white text-xs font-medium rounded-lg hover:bg-white/30 transition-colors">
                                        Radar Map
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Weather Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Humidity */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
                            <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-1">
                                <span className="material-symbols-outlined text-xs">humidity_percentage</span>
                                Humidity
                            </div>
                            <p className="text-xl font-bold text-[#131613]">82%</p>
                            <p className="text-[10px] text-gray-400">High moisture</p>
                        </div>

                        {/* Wind */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
                            <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-1">
                                <span className="material-symbols-outlined text-xs">air</span>
                                Wind
                            </div>
                            <p className="text-xl font-bold text-[#131613]">15 <span className="text-sm font-normal">km/h</span></p>
                            <p className="text-[10px] text-gray-400">North-West</p>
                        </div>

                        {/* Precipitation */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
                            <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-1">
                                <span className="material-symbols-outlined text-xs">water_drop</span>
                                Precipitation
                            </div>
                            <p className="text-xl font-bold text-[#131613]">10%</p>
                            <p className="text-[10px] text-gray-400">Low chance</p>
                        </div>

                        {/* UV Index */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
                            <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-1">
                                <span className="material-symbols-outlined text-xs">sunny</span>
                                UV Index
                            </div>
                            <p className="text-xl font-bold text-[#131613]">6.0</p>
                            <p className="text-[10px] text-gray-400">Moderate</p>
                        </div>
                    </div>
                </div>

                {/* 7-Day Forecast */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">calendar_today</span>
                            <span className="font-semibold text-sm text-[#131613]">7-Day Forecast</span>
                        </div>
                        <a href="#" className="text-primary text-xs font-medium hover:underline">View Monthly</a>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {forecast.map((day, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center p-3 rounded-xl ${index === 0 ? 'bg-gray-50 border border-gray-200' : ''}`}
                            >
                                <span className="text-xs font-medium text-gray-600 mb-2">{day.day}</span>
                                <span className={`material-symbols-outlined text-2xl mb-2 ${day.icon === 'sunny' ? 'text-amber-400' :
                                    day.icon === 'rainy' ? 'text-blue-400' :
                                        day.icon === 'cloud' ? 'text-gray-400' :
                                            'text-orange-300'
                                    }`}>{day.icon}</span>
                                <p className="text-sm font-bold text-[#131613]">{day.high}°<span className="text-gray-400 font-normal">/{day.low}°</span></p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Weather Alerts & Farming Recommendations */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Weather Alerts */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-orange-500 text-lg">warning</span>
                            <span className="font-semibold text-sm text-[#131613]">Weather Alerts</span>
                        </div>

                        <div className="space-y-3">
                            {/* Heavy Rainfall Warning */}
                            <div className="bg-red-500 rounded-xl p-4 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-lg">thunderstorm</span>
                                    <span className="text-sm font-semibold">Heavy Rainfall Warning</span>
                                </div>
                                <p className="text-xs text-white/90 leading-relaxed mb-3">
                                    Expected rainfall &gt;100mm in the next 24 hours. Risk of localized flooding in low-lying tea estates.
                                </p>
                                <span className="inline-block px-2 py-1 bg-white/20 text-[10px] font-medium rounded">
                                    Until 6:00 PM Tomorrow
                                </span>
                            </div>

                            {/* Landslide Watch */}
                            <div className="bg-orange-400 rounded-xl p-4 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-lg">landslide</span>
                                    <span className="text-sm font-semibold">Landslide Watch</span>
                                </div>
                                <p className="text-xs text-white/90 leading-relaxed">
                                    Soil saturation levels are high. Be vigilant near steep slopes and cutting areas.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Farming Recommendations */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold text-sm text-[#131613]">Farming Recommendations</span>
                            <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-full">AI Generated • Just now</span>
                        </div>

                        <div className="space-y-3">
                            {/* Tea Cultivation */}
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4">
                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1587049352847-81a56d773cae?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                        alt="Tea leaves"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[9px] text-primary font-medium bg-primary/10 px-1.5 py-0.5 rounded">Tea Cultivation</span>
                                        <span className="text-[9px] text-red-500 font-medium">High Priority</span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-[#131613] mb-1">Delay Fertilizer Application</h4>
                                    <p className="text-[10px] text-gray-500 leading-relaxed mb-2">
                                        Due to the forecasted heavy rainfall (Warning Level Red), applying fertilizer now will result in runoff and wastage. Wait until the precipitation chance drops below 40% on Friday.
                                    </p>
                                    <a href="#" className="text-primary text-[10px] font-medium flex items-center gap-0.5 hover:underline">
                                        Read More <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                    </a>
                                </div>
                            </div>

                            {/* Vegetables */}
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4">
                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                        alt="Vegetables"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[9px] text-green-600 font-medium bg-green-100 px-1.5 py-0.5 rounded">Vegetables</span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-[#131613] mb-1">Prepare Drainage Canals</h4>
                                    <p className="text-[10px] text-gray-500 leading-relaxed mb-2">
                                        Ensure all field drainage canals are cleared of debris. Stagnant water from upcoming rains can increase the risk of fungal diseases like Blight in carrot and potato crops.
                                    </p>
                                    <a href="#" className="text-primary text-[10px] font-medium flex items-center gap-0.5 hover:underline">
                                        View Drainage Guide <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                    </a>
                                </div>
                            </div>

                            {/* Pest Control */}
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4">
                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                        alt="Leafy greens"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[9px] text-blue-600 font-medium bg-blue-100 px-1.5 py-0.5 rounded">Pest Control</span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-[#131613] mb-1">Monitor for Slugs</h4>
                                    <p className="text-[10px] text-gray-500 leading-relaxed">
                                        High humidity (82%) favors slug activity. Inspect leafy greens early morning. Use organic repellents if infestation is spotted.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <DashboardFooter />
        </div>
    );
}
