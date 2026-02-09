import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFooter from "../components/dashboard/DashboardFooter";
import dataService from "../services/dataService";

export default function WeatherPage() {
    const [weatherData, setWeatherData] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [weatherAlerts, setWeatherAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [forecastLoading, setForecastLoading] = useState(true);
    const [alertsLoading, setAlertsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get user's districtId from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const districtId = user.districtId || 1; // Default to 1 if not set

    useEffect(() => {
        const fetchAllWeatherData = async () => {
            // Fetch current weather
            try {
                setLoading(true);
                const response = await dataService.getWeather(districtId);
                if (response.success && response.data) {
                    setWeatherData(response.data);
                }
            } catch (err) {
                console.error("Error fetching weather:", err);
                setError("Failed to fetch weather data");
            } finally {
                setLoading(false);
            }

            // Fetch 7-day forecast
            try {
                setForecastLoading(true);
                const forecastResponse = await dataService.getForecast(districtId);
                if (forecastResponse.success && forecastResponse.data) {
                    setForecast(forecastResponse.data);
                }
            } catch (err) {
                console.error("Error fetching forecast:", err);
            } finally {
                setForecastLoading(false);
            }

            // Fetch weather alerts
            try {
                setAlertsLoading(true);
                const alertsResponse = await dataService.getWeatherAlerts(districtId);
                if (alertsResponse.success && alertsResponse.data) {
                    setWeatherAlerts(alertsResponse.data);
                }
            } catch (err) {
                console.error("Error fetching alerts:", err);
            } finally {
                setAlertsLoading(false);
            }
        };

        fetchAllWeatherData();
    }, [districtId]);

    // Helper function to get wind direction from degrees
    const getWindDirection = (deg) => {
        if (deg === undefined) return "N/A";
        const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
        const index = Math.round(deg / 45) % 8;
        return directions[index];
    };

    // Helper function to get humidity description
    const getHumidityDescription = (humidity) => {
        if (humidity >= 80) return "High moisture";
        if (humidity >= 60) return "Moderate moisture";
        if (humidity >= 40) return "Normal moisture";
        return "Low moisture";
    };

    // Helper function to get icon color class
    const getIconColor = (icon) => {
        switch (icon) {
            case 'sunny': return 'text-amber-400 animate-pulse-subtle';
            case 'rainy': return 'text-blue-400';
            case 'cloud': return 'text-gray-400';
            case 'thunderstorm': return 'text-purple-500';
            case 'ac_unit': return 'text-cyan-400';
            case 'foggy': return 'text-gray-300';
            default: return 'text-orange-300';
        }
    };

    // Helper function to get alert background color
    const getAlertBgColor = (severity) => {
        switch (severity) {
            case 'HIGH':
            case 'CRITICAL': return 'bg-red-500';
            case 'MEDIUM': return 'bg-orange-400';
            case 'LOW': return 'bg-green-500';
            default: return 'bg-gray-400';
        }
    };

    // Helper to format alert type for display
    const formatAlertType = (alertType) => {
        return alertType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    // Extract weather values
    const temperature = weatherData?.main?.temp ? Math.round(weatherData.main.temp) : "--";
    const humidity = weatherData?.main?.humidity || "--";
    const windSpeed = weatherData?.wind?.speed ? Math.round(weatherData.wind.speed * 3.6) : "--"; // Convert m/s to km/h
    const windDeg = weatherData?.wind?.deg;
    const weatherDescription = weatherData?.weather?.[0]?.description || "Loading...";
    const weatherMain = weatherData?.weather?.[0]?.main || "";

    // Get current date
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const dayString = today.toLocaleDateString('en-US', { weekday: 'long' });

    return (
        <div className="min-h-screen bg-[#f6f8f6] flex flex-col">
            {/* Dashboard Navbar */}
            <DashboardNavbar />

            {/* Main Content */}
            <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-6 animate-fade-in-up">
                {/* Main Weather Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                    {/* Main Weather Card */}
                    <div className="lg:col-span-2 relative rounded-2xl overflow-hidden min-h-[220px] shadow-lg animate-scale-in transition-transform hover:scale-[1.01] duration-500">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: 'url("https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")'
                            }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
                        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start animate-fade-in-down delay-100">
                                <div>
                                    <h1 className="text-5xl font-bold text-white mb-1">
                                        {loading ? "--" : `${temperature}°C`}
                                    </h1>
                                    <p className="text-white text-lg font-medium capitalize">
                                        {loading ? "Loading..." : weatherDescription}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-white text-sm font-medium">{dateString}</p>
                                    <p className="text-white/70 text-xs">{dayString}</p>
                                </div>
                            </div>

                            <div className="animate-fade-in-up delay-200">
                                <p className="text-white/80 text-xs mb-4 max-w-md">
                                    Current conditions in your district. {windDeg !== undefined ? `Winds from ${getWindDirection(windDeg)}.` : ''} Weather data updated in real-time.
                                </p>
                                <div className="flex gap-2">
                                    <button className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                                        <span className="material-symbols-outlined text-sm">description</span>
                                        Full Report
                                    </button>
                                    <button className="flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur text-white text-xs font-medium rounded-lg hover:bg-white/30 transition-all hover:-translate-y-0.5">
                                        Radar Map
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Weather Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Humidity */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in-up delay-100">
                            <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-1">
                                <span className="material-symbols-outlined text-xs">humidity_percentage</span>
                                Humidity
                            </div>
                            <p className="text-xl font-bold text-[#131613]">
                                {loading ? "--" : `${humidity}%`}
                            </p>
                            <p className="text-[10px] text-gray-400">
                                {loading ? "Loading..." : getHumidityDescription(humidity)}
                            </p>
                        </div>

                        {/* Wind */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in-up delay-200">
                            <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-1">
                                <span className="material-symbols-outlined text-xs">air</span>
                                Wind
                            </div>
                            <p className="text-xl font-bold text-[#131613]">
                                {loading ? "--" : windSpeed} <span className="text-sm font-normal">km/h</span>
                            </p>
                            <p className="text-[10px] text-gray-400">
                                {loading ? "Loading..." : getWindDirection(windDeg)}
                            </p>
                        </div>

                        {/* Precipitation - Note: OpenWeatherMap free tier doesn't provide precipitation probability */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in-up delay-300">
                            <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-1">
                                <span className="material-symbols-outlined text-xs">water_drop</span>
                                Precipitation
                            </div>
                            <p className="text-xl font-bold text-[#131613]">
                                {loading ? "--" : (weatherMain.toLowerCase().includes('rain') ? "High" : "Low")}
                            </p>
                            <p className="text-[10px] text-gray-400">
                                {loading ? "Loading..." : (weatherMain.toLowerCase().includes('rain') ? "Rain expected" : "No rain expected")}
                            </p>
                        </div>

                        {/* UV Index - Note: OpenWeatherMap free tier doesn't provide UV index, showing feels_like instead */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in-up delay-400">
                            <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-1">
                                <span className="material-symbols-outlined text-xs">sunny</span>
                                Feels Like
                            </div>
                            <p className="text-xl font-bold text-[#131613]">
                                {loading ? "--" : `${Math.round(weatherData?.main?.feels_like || temperature)}°C`}
                            </p>
                            <p className="text-[10px] text-gray-400">
                                {loading ? "Loading..." : "Apparent temperature"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 7-Day Forecast */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6 hover:shadow-md transition-shadow animate-fade-in-up delay-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">calendar_today</span>
                            <span className="font-semibold text-sm text-[#131613]">7-Day Forecast</span>
                        </div>
                        <a href="#" className="text-primary text-xs font-medium hover:underline">View Monthly</a>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {forecastLoading ? (
                            <div className="col-span-7 text-center py-8 text-gray-400">
                                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                <p className="text-sm mt-2">Loading forecast...</p>
                            </div>
                        ) : forecast.length === 0 ? (
                            <div className="col-span-7 text-center py-8 text-gray-400">
                                <span className="material-symbols-outlined">cloud_off</span>
                                <p className="text-sm mt-2">Forecast unavailable</p>
                            </div>
                        ) : (
                            forecast.map((day, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 hover:bg-gray-50 hover:scale-105 cursor-pointer ${index === 0 ? 'bg-gray-50 border border-gray-200 shadow-sm' : ''}`}
                                    style={{ animation: `fade-in-up 0.5s ease-out ${index * 100}ms backwards` }}
                                >
                                    <span className="text-xs font-medium text-gray-600 mb-2">{day.day}</span>
                                    <span className={`material-symbols-outlined text-2xl mb-2 ${getIconColor(day.icon)}`}>{day.icon}</span>
                                    <p className="text-sm font-bold text-[#131613]">{day.high}°<span className="text-gray-400 font-normal">/{day.low}°</span></p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Weather Alerts & Farming Recommendations */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Weather Alerts */}
                    <div className="animate-fade-in-left delay-500">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-orange-500 text-lg animate-pulse">warning</span>
                            <span className="font-semibold text-sm text-[#131613]">Weather Alerts</span>
                        </div>

                        <div className="space-y-3">
                            {alertsLoading ? (
                                <div className="bg-gray-100 rounded-xl p-4 text-center">
                                    <span className="material-symbols-outlined animate-spin text-gray-400">progress_activity</span>
                                    <p className="text-sm mt-2 text-gray-500">Loading alerts...</p>
                                </div>
                            ) : weatherAlerts.length === 0 ? (
                                <div className="bg-green-500 rounded-xl p-4 text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-lg">check_circle</span>
                                        <span className="text-sm font-semibold">All Clear</span>
                                    </div>
                                    <p className="text-xs text-white/90">No weather alerts at this time.</p>
                                </div>
                            ) : (
                                weatherAlerts.map((alert, index) => (
                                    <div
                                        key={index}
                                        className={`${getAlertBgColor(alert.severity)} rounded-xl p-4 text-white shadow-md hover:shadow-lg transition-all hover:scale-[1.02]`}
                                        style={{ animation: `fade-in-up 0.3s ease-out ${index * 100}ms backwards` }}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-lg">{alert.icon || 'warning'}</span>
                                            <span className="text-sm font-semibold">{formatAlertType(alert.alertType)}</span>
                                        </div>
                                        <p className="text-xs text-white/90 leading-relaxed mb-2">
                                            {alert.message}
                                        </p>
                                        {alert.precautions && alert.precautions.length > 0 && (
                                            <ul className="text-[10px] text-white/80 list-disc list-inside mb-2">
                                                {alert.precautions.slice(0, 2).map((precaution, i) => (
                                                    <li key={i}>{precaution}</li>
                                                ))}
                                            </ul>
                                        )}
                                        {alert.validUntil && (
                                            <span className="inline-block px-2 py-1 bg-white/20 text-[10px] font-medium rounded">
                                                {alert.validUntil}
                                            </span>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Farming Recommendations */}
                    <div className="lg:col-span-2 animate-fade-in-right delay-500">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold text-sm text-[#131613]">Farming Recommendations</span>
                            <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-full">AI Generated • Just now</span>
                        </div>

                        <div className="space-y-3">
                            {/* Tea Cultivation */}
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 hover:shadow-md transition-all duration-300 group">
                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1587049352847-81a56d773cae?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                        alt="Tea leaves"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[9px] text-primary font-medium bg-primary/10 px-1.5 py-0.5 rounded">Tea Cultivation</span>
                                        <span className="text-[9px] text-red-500 font-medium animate-pulse">High Priority</span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-[#131613] mb-1">Delay Fertilizer Application</h4>
                                    <p className="text-[10px] text-gray-500 leading-relaxed mb-2">
                                        Due to the forecasted heavy rainfall (Warning Level Red), applying fertilizer now will result in runoff and wastage. Wait until the precipitation chance drops below 40% on Friday.
                                    </p>
                                    <a href="#" className="text-primary text-[10px] font-medium flex items-center gap-0.5 hover:underline group-hover:translate-x-1 transition-transform inline-flex">
                                        Read More <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                    </a>
                                </div>
                            </div>

                            {/* Vegetables */}
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 hover:shadow-md transition-all duration-300 group">
                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                        alt="Vegetables"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                                    <a href="#" className="text-primary text-[10px] font-medium flex items-center gap-0.5 hover:underline group-hover:translate-x-1 transition-transform inline-flex">
                                        View Drainage Guide <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                    </a>
                                </div>
                            </div>

                            {/* Pest Control */}
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 hover:shadow-md transition-all duration-300 group">
                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                        alt="Leafy greens"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
