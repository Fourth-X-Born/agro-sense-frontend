import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { riskAPI, masterDataAPI, weatherAPI } from "../services/api";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFooter from "../components/dashboard/DashboardFooter";

export default function CropRiskPage() {
    const { user } = useAuth();
    const [districts, setDistricts] = useState([]);
    const [crops, setCrops] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [selectedGrowthStage, setSelectedGrowthStage] = useState("Vegetative Phase");

    const [loading, setLoading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [error, setError] = useState("");

    const [weatherData, setWeatherData] = useState(null);
    const [riskResult, setRiskResult] = useState(null);

    const growthStages = ["Germination", "Seedling", "Vegetative Phase", "Flowering", "Grain Filling", "Maturity"];

    // Fetch districts and crops on mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [districtsRes, cropsRes] = await Promise.all([
                    masterDataAPI.getDistricts(),
                    masterDataAPI.getCrops()
                ]);

                if (districtsRes.success && districtsRes.data) {
                    setDistricts(districtsRes.data);
                    // Set user's district as default
                    const userDistrictId = user?.districtId || user?.district?.id;
                    const userDistrict = districtsRes.data.find(d => d.id === userDistrictId);
                    setSelectedDistrict(userDistrict || districtsRes.data[0]);
                }

                if (cropsRes.success && cropsRes.data) {
                    setCrops(cropsRes.data);
                    setSelectedCrop(cropsRes.data[0]);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    // Fetch weather when district changes
    useEffect(() => {
        const fetchWeather = async () => {
            if (!selectedDistrict?.id) return;
            try {
                const response = await weatherAPI.getByDistrict(selectedDistrict.id);
                if (response.success && response.data) {
                    setWeatherData(response.data);
                }
            } catch (err) {
                console.error("Weather API error (non-blocking):", err);
                // Use fallback weather data - don't block the UI
                setWeatherData({
                    temperature: 28,
                    humidity: 75,
                    description: "Weather data unavailable",
                    windSpeed: 3.5
                });
            }
        };

        fetchWeather();
    }, [selectedDistrict]);

    const handleAnalyze = async () => {
        if (!selectedDistrict?.id || !selectedCrop?.id) {
            setError("Please select district and crop");
            return;
        }

        setAnalyzing(true);
        setError("");

        try {
            const response = await riskAPI.analyze({
                farmerId: user?.id,
                cropId: selectedCrop.id,
                districtId: selectedDistrict.id
            });

            if (response.success && response.data) {
                setRiskResult(response.data);
            } else {
                setError(response.message || "Analysis failed");
            }
        } catch (err) {
            setError(err.message || "Failed to analyze crop risk");
            console.error("Risk analysis error:", err);
        } finally {
            setAnalyzing(false);
        }
    };

    const getRiskBadgeColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-600';
            case 'medium': return 'bg-orange-100 text-orange-600';
            case 'low': return 'bg-green-100 text-green-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getRiskIcon = (level) => {
        switch (level?.toLowerCase()) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'check_circle';
            default: return 'help';
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
                    <h1 className="text-xl font-bold text-[#131613]">AI Crop Risk Assessment</h1>
                    <p className="text-gray-500 text-xs">
                        Real-time intelligence for <span className="text-primary font-medium">{selectedDistrict?.name || 'Your'} District</span> • {selectedCrop?.name || 'Crop'} Cultivation
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Sidebar - Analysis Parameters */}
                    <div className="lg:col-span-1 animate-fade-in-left delay-100">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sticky top-20">
                            <h3 className="font-semibold text-sm text-[#131613] mb-1">Analysis Parameters</h3>
                            <p className="text-[10px] text-gray-400 mb-4">Configure your assessment</p>

                            {/* Select District */}
                            <div className="mb-4">
                                <label className="text-[10px] font-medium text-[#131613] block mb-1">Select District</label>
                                <select
                                    value={selectedDistrict?.id || ""}
                                    onChange={(e) => {
                                        const district = districts.find(d => d.id === parseInt(e.target.value));
                                        setSelectedDistrict(district);
                                    }}
                                    className="w-full h-9 px-3 rounded-lg border border-gray-200 text-xs text-gray-700 focus:outline-none focus:border-primary bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    {districts.map((d) => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Select Crop */}
                            <div className="mb-4">
                                <label className="text-[10px] font-medium text-[#131613] block mb-1">Select Crop</label>
                                <select
                                    value={selectedCrop?.id || ""}
                                    onChange={(e) => {
                                        const crop = crops.find(c => c.id === parseInt(e.target.value));
                                        setSelectedCrop(crop);
                                    }}
                                    className="w-full h-9 px-3 rounded-lg border border-gray-200 text-xs text-gray-700 focus:outline-none focus:border-primary bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    {crops.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Growth Stage */}
                            <div className="mb-4">
                                <label className="text-[10px] font-medium text-[#131613] block mb-1">Growth Stage</label>
                                <select
                                    value={selectedGrowthStage}
                                    onChange={(e) => setSelectedGrowthStage(e.target.value)}
                                    className="w-full h-9 px-3 rounded-lg border border-gray-200 text-xs text-gray-700 focus:outline-none focus:border-primary bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    {growthStages.map((g) => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-xs text-red-600">{error}</p>
                                </div>
                            )}

                            {/* Analyze Button */}
                            <button
                                onClick={handleAnalyze}
                                disabled={analyzing || loading}
                                className="w-full h-9 bg-primary text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 mb-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {analyzing ? (
                                    <>
                                        <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">search</span>
                                        Analyze Crop Risk
                                    </>
                                )}
                            </button>

                            <p className="text-[9px] text-gray-400 text-center">
                                Last updated: {new Date().toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Current Conditions */}
                        <div>
                            <div className="flex items-center justify-between mb-3 animate-fade-in-down delay-200">
                                <h3 className="font-semibold text-sm text-[#131613]">Current Conditions</h3>
                                <span className="text-primary text-[10px] font-medium animate-pulse">Live Data</span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {/* Temperature */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-orange-400 text-lg">thermostat</span>
                                        <span className="text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Avg</span>
                                    </div>
                                    <p className="text-lg font-bold text-[#131613]">
                                        {weatherData?.temperature ? `${Math.round(weatherData.temperature)}°C` : '--°C'}
                                    </p>
                                    <p className="text-[10px] text-gray-400">Temperature</p>
                                </div>

                                {/* Humidity */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-blue-400 text-lg">humidity_percentage</span>
                                        <span className="text-[9px] text-green-500 bg-green-50 px-1.5 py-0.5 rounded">
                                            {weatherData?.humidity > 70 ? 'High' : 'Normal'}
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-[#131613]">
                                        {weatherData?.humidity ? `${weatherData.humidity}%` : '--%'}
                                    </p>
                                    <p className="text-[10px] text-gray-400">Humidity</p>
                                </div>

                                {/* Weather Description */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-400">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-cyan-400 text-lg">cloud</span>
                                        <span className="text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Now</span>
                                    </div>
                                    <p className="text-sm font-bold text-[#131613] truncate">
                                        {weatherData?.description || 'Loading...'}
                                    </p>
                                    <p className="text-[10px] text-gray-400">Conditions</p>
                                </div>

                                {/* Wind Speed */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-teal-400 text-lg">air</span>
                                        <span className="text-[9px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">km/h</span>
                                    </div>
                                    <p className="text-lg font-bold text-[#131613]">
                                        {weatherData?.windSpeed ? `${Math.round(weatherData.windSpeed * 3.6)}` : '--'}
                                    </p>
                                    <p className="text-[10px] text-gray-400">Wind Speed</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Analysis Result */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 animate-fade-in-up delay-300 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-sm text-[#131613]">AI Analysis Result</h3>
                                {riskResult && (
                                    <span className="text-[10px] text-gray-400">
                                        <span className="material-symbols-outlined text-xs align-middle mr-0.5">psychology</span>
                                        Model Confidence: {riskResult.confidence || 85}%
                                    </span>
                                )}
                            </div>

                            {!riskResult ? (
                                <div className="text-center py-8 text-gray-400">
                                    <span className="material-symbols-outlined text-4xl mb-2">analytics</span>
                                    <p className="text-xs">Click "Analyze Crop Risk" to get AI-powered risk assessment</p>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row md:items-start gap-4">
                                    {/* Risk Badge */}
                                    <div className="flex flex-col items-center gap-1">
                                        <div className={`flex items-center gap-1.5 px-4 py-2 rounded-full ${getRiskBadgeColor(riskResult.riskLevel)}`}>
                                            <span className="material-symbols-outlined text-sm">{getRiskIcon(riskResult.riskLevel)}</span>
                                            <span className="text-xs font-semibold">{riskResult.riskLevel || 'Unknown'} Risk</span>
                                        </div>
                                        <span className="text-[9px] text-gray-400">
                                            {riskResult.riskLevel === 'High' ? 'Immediate Action' :
                                                riskResult.riskLevel === 'Medium' ? 'Action Required' : 'Monitor'}
                                        </span>
                                    </div>

                                    {/* Analysis Text */}
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-[#131613] mb-2">
                                            {riskResult.title || 'Risk Analysis Complete'}
                                        </h4>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            {riskResult.description || riskResult.message || 'Analysis completed successfully. Review the recommendations below for optimal crop management.'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Advisory & Recommendations */}
                        {riskResult?.recommendations && riskResult.recommendations.length > 0 && (
                            <div className="animate-fade-in-up delay-500">
                                <h3 className="font-semibold text-sm text-[#131613] mb-3">Advisory & Recommendations</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {riskResult.recommendations.map((rec, index) => (
                                        <div
                                            key={index}
                                            className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 border-l-3 ${index === 0 ? 'border-l-blue-400' :
                                                index === 1 ? 'border-l-green-400' : 'border-l-orange-400'
                                                } hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
                                        >
                                            <h4 className="text-xs font-semibold text-[#131613] mb-1">{rec.title || rec}</h4>
                                            {rec.description && (
                                                <p className="text-[10px] text-gray-500 leading-relaxed">{rec.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Default Recommendations when no API result */}
                        {!riskResult && (
                            <div className="animate-fade-in-up delay-500">
                                <h3 className="font-semibold text-sm text-[#131613] mb-3">General Recommendations</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 border-l-3 border-l-blue-400 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-blue-500 text-base">water</span>
                                            </div>
                                            <span className="text-[8px] text-blue-500 font-semibold bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Irrigation</span>
                                        </div>
                                        <h4 className="text-xs font-semibold text-[#131613] mb-1">Monitor Water Levels</h4>
                                        <p className="text-[10px] text-gray-500 leading-relaxed">
                                            Check soil moisture regularly and adjust irrigation based on weather conditions.
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 border-l-3 border-l-green-400 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-green-500 text-base">nutrition</span>
                                            </div>
                                            <span className="text-[8px] text-green-500 font-semibold bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Nutrients</span>
                                        </div>
                                        <h4 className="text-xs font-semibold text-[#131613] mb-1">Follow Fertilizer Schedule</h4>
                                        <p className="text-[10px] text-gray-500 leading-relaxed">
                                            Apply fertilizers according to growth stage and soil requirements.
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 border-l-3 border-l-orange-400 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-orange-500 text-base">pest_control</span>
                                            </div>
                                            <span className="text-[8px] text-orange-500 font-semibold bg-orange-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Protection</span>
                                        </div>
                                        <h4 className="text-xs font-semibold text-[#131613] mb-1">Pest Monitoring</h4>
                                        <p className="text-[10px] text-gray-500 leading-relaxed">
                                            Regularly inspect crops for signs of pests and diseases.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Regional Satellite View */}
                        <div className="animate-fade-in-up delay-700">
                            <p className="text-[10px] text-gray-400 mb-1">Regional Satellite View</p>
                            <h3 className="font-semibold text-sm text-primary mb-3">{selectedDistrict?.name || 'Your'} Agricultural Zone</h3>
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-64 hover:shadow-md transition-shadow">
                                <iframe
                                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58585959864!2d81.00022565!3d7.9403022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afb456e05e5af8f%3A0x8f4e5a9b5e8f1c0!2s${encodeURIComponent(selectedDistrict?.name || 'Sri Lanka')}!5e0!3m2!1sen!2slk!4v1234567890`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="District Map"
                                ></iframe>
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
