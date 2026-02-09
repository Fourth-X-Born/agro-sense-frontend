import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { weatherAPI } from "../services/api";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFooter from "../components/dashboard/DashboardFooter";

export default function WeatherPage() {
    const { user } = useAuth();
    const [weather, setWeather] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const districtId = user?.districtId || user?.district?.id || 1;
    const districtName = user?.district?.name || user?.districtName || 'Your District';

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            setError("");
            try {
                // Fetch weather
                const weatherResponse = await weatherAPI.getWeather(districtId);
                if (weatherResponse.success && weatherResponse.data) {
                    setWeather(weatherResponse.data);
                }

                // Fetch alerts
                const alertsResponse = await weatherAPI.getAlerts(districtId);
                if (alertsResponse.success && alertsResponse.data) {
                    setAlerts(alertsResponse.data);
                }
            } catch (err) {
                console.error("Error fetching weather:", err);
                setError("Failed to load weather data");
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [districtId]);

    // Extract weather data from API response
    const rawWeather = weather?.rawWeatherData;
    const temperature = rawWeather?.main?.temp ? Math.round(rawWeather.main.temp) : 24;
    const humidity = rawWeather?.main?.humidity || 82;
    const windSpeed = rawWeather?.wind?.speed || 15;
    const weatherDesc = rawWeather?.weather?.[0]?.description || "Partly Cloudy";
    const weatherIcon = rawWeather?.weather?.[0]?.main?.toLowerCase() || "cloudy";

    // Current date
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const dayStr = today.toLocaleDateString('en-US', { weekday: 'long' });

    // Mock 7-day forecast (could be enhanced with actual forecast API)
    const forecast = [
        { day: "Today", icon: "sunny", high: temperature, low: temperature - 6 },
        { day: "Wed", icon: "rainy", high: temperature - 2, low: temperature - 7 },
        { day: "Thu", icon: "partly_cloudy_day", high: temperature - 3, low: temperature - 8 },
        { day: "Fri", icon: "cloud", high: temperature + 2, low: temperature - 5 },
        { day: "Sat", icon: "sunny", high: temperature + 3, low: temperature - 4 },
        { day: "Sun", icon: "partly_cloudy_day", high: temperature - 1, low: temperature - 6 },
        { day: "Mon", icon: "sunny", high: temperature - 2, low: temperature - 6 },
    ];

    return (
        <div className="min-h-screen bg-[#f6f8f6] flex flex-col">
            {/* Dashboard Navbar */}
            <DashboardNavbar />

            {/* Main Content */}
            <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-6 animate-fade-in-up">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
                            <p className="text-gray-500 mt-2">Loading weather data...</p>
                        </div>
                    </div>
                ) : (
                    <>
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
                                            <h1 className="text-5xl font-bold text-white mb-1">{temperature}°C</h1>
                                            <p className="text-white text-lg font-medium capitalize">{weatherDesc}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white text-sm font-medium">{dateStr}</p>
                                            <p className="text-white/70 text-xs">{dayStr}</p>
                                        </div>
                                    </div>

                                    <div className="animate-fade-in-up delay-200">
                                        <p className="text-white/80 text-xs mb-4 max-w-md">
                                            Current conditions in {districtName}. Wind speed: {windSpeed} km/h. {humidity}% humidity.
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
                                    <p className="text-xl font-bold text-[#131613]">{humidity}%</p>
                                    <p className="text-[10px] text-gray-400">{humidity > 70 ? 'High moisture' : 'Normal'}</p>
                                </div>

                                {/* Wind */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in-up delay-200">
                                    <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-1">
                                        <span className="material-symbols-outlined text-xs">air</span>
                                        Wind
                                    </div>
                                    <p className="text-xl font-bold text-[#131613]">{windSpeed} <span className="text-sm font-normal">km/h</span></p>
                                    <p className="text-[10px] text-gray-400">{windSpeed > 20 ? 'Strong' : 'Moderate'}</p>
                                </div>

                                {/* Feels Like */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in-up delay-300">
                                    <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-1">
                                        <span className="material-symbols-outlined text-xs">thermostat</span>
                                        Feels Like
                                    </div>
                                    <p className="text-xl font-bold text-[#131613]">{rawWeather?.main?.feels_like ? Math.round(rawWeather.main.feels_like) : temperature}°C</p>
                                    <p className="text-[10px] text-gray-400">Apparent temp</p>
                                </div>

                                {/* Pressure */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in-up delay-400">
                                    <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-1">
                                        <span className="material-symbols-outlined text-xs">speed</span>
                                        Pressure
                                    </div>
                                    <p className="text-xl font-bold text-[#131613]">{rawWeather?.main?.pressure || 1013}</p>
                                    <p className="text-[10px] text-gray-400">hPa</p>
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
                                {forecast.map((day, index) => (
                                    <div
                                        key={index}
                                        className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 hover:bg-gray-50 hover:scale-105 cursor-pointer ${index === 0 ? 'bg-gray-50 border border-gray-200 shadow-sm' : ''}`}
                                        style={{ animation: `fade-in-up 0.5s ease-out ${index * 100}ms backwards` }}
                                    >
                                        <span className="text-xs font-medium text-gray-600 mb-2">{day.day}</span>
                                        <span className={`material-symbols-outlined text-2xl mb-2 ${day.icon === 'sunny' ? 'text-amber-400 animate-pulse-subtle' :
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
                            <div className="animate-fade-in-left delay-500">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-orange-500 text-lg animate-pulse">warning</span>
                                    <span className="font-semibold text-sm text-[#131613]">Weather Alerts</span>
                                </div>

                                <div className="space-y-3">
                                    {alerts.length > 0 ? (
                                        alerts.map((alert, index) => (
                                            <div key={index} className={`rounded-xl p-4 text-white shadow-md hover:shadow-lg transition-all hover:scale-[1.02] ${alert.severity === 'HIGH' ? 'bg-red-500' :
                                                    alert.severity === 'MEDIUM' ? 'bg-orange-400' : 'bg-yellow-500'
                                                }`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="material-symbols-outlined text-lg">
                                                        {alert.alertType === 'RAIN' ? 'thunderstorm' :
                                                            alert.alertType === 'HEAT' ? 'sunny' : 'warning'}
                                                    </span>
                                                    <span className="text-sm font-semibold">{alert.title}</span>
                                                </div>
                                                <p className="text-xs text-white/90 leading-relaxed mb-3">
                                                    {alert.description}
                                                </p>
                                                <span className="inline-block px-2 py-1 bg-white/20 text-[10px] font-medium rounded">
                                                    {alert.severity} Priority
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="bg-green-500 rounded-xl p-4 text-white shadow-md">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                                <span className="text-sm font-semibold">All Clear</span>
                                            </div>
                                            <p className="text-xs text-white/90 leading-relaxed">
                                                No weather alerts for {districtName} at this time.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Farming Recommendations */}
                            <div className="lg:col-span-2 animate-fade-in-right delay-500">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-semibold text-sm text-[#131613]">Farming Recommendations</span>
                                    <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-full">AI Generated • Based on weather</span>
                                </div>

                                <div className="space-y-3">
                                    {/* Dynamic recommendations based on alerts */}
                                    {alerts.length > 0 && alerts[0]?.recommendations ? (
                                        alerts[0].recommendations.map((rec, index) => (
                                            <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 hover:shadow-md transition-all duration-300 group">
                                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-primary/10 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-primary text-3xl">eco</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-[9px] text-primary font-medium bg-primary/10 px-1.5 py-0.5 rounded">Recommendation</span>
                                                    </div>
                                                    <h4 className="text-sm font-semibold text-[#131613] mb-1">Weather-Based Advice</h4>
                                                    <p className="text-[10px] text-gray-500 leading-relaxed">{rec}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 hover:shadow-md transition-all duration-300 group">
                                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1587049352847-81a56d773cae?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                                        alt="Crops"
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-[9px] text-primary font-medium bg-primary/10 px-1.5 py-0.5 rounded">General</span>
                                                    </div>
                                                    <h4 className="text-sm font-semibold text-[#131613] mb-1">Continue Regular Maintenance</h4>
                                                    <p className="text-[10px] text-gray-500 leading-relaxed">
                                                        Weather conditions are favorable. Continue with regular crop maintenance and monitoring.
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>

            {/* Footer */}
            <DashboardFooter />
        </div>
    );
}
