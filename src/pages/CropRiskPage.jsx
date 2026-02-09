import React, { useState, useEffect } from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFooter from "../components/dashboard/DashboardFooter";
import api from "../services/api";

export default function CropRiskPage() {
    const [selectedDistrictId, setSelectedDistrictId] = useState("");
    const [selectedCropId, setSelectedCropId] = useState("");
    const [selectedGrowthStage, setSelectedGrowthStage] = useState("Vegetative Phase");

    const [districts, setDistricts] = useState([]);
    const [crops, setCrops] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [riskResult, setRiskResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [weatherLoading, setWeatherLoading] = useState(false);
    const [error, setError] = useState(null);

    const growthStages = ["Germination", "Seedling", "Vegetative Phase", "Flowering", "Grain Filling", "Maturity"];

    // Fetch districts and crops on mount
    useEffect(() => {
        const fetchMasterData = async () => {
            try {
                const [districtsRes, cropsRes] = await Promise.all([
                    api.get('/districts'),
                    api.get('/crops')
                ]);
                setDistricts(districtsRes.data || []);
                setCrops(cropsRes.data || []);

                // Set defaults if available
                if (districtsRes.data?.length > 0) {
                    setSelectedDistrictId(districtsRes.data[0].id);
                }
                if (cropsRes.data?.length > 0) {
                    setSelectedCropId(cropsRes.data[0].id);
                }
            } catch (err) {
                console.error('Error fetching master data:', err);
                setError('Failed to load districts and crops');
            }
        };
        fetchMasterData();
    }, []);

    // Fetch weather when district changes - also clear old risk results
    useEffect(() => {
        if (!selectedDistrictId) return;

        // Clear old risk results when district changes
        setRiskResult(null);
        setError(null);

        const fetchWeather = async () => {
            setWeatherLoading(true);
            try {
                const res = await api.get(`/weather?districtId=${selectedDistrictId}`);
                setWeatherData(res.data);
            } catch (err) {
                console.error('Error fetching weather:', err);
                setWeatherData(null);
            } finally {
                setWeatherLoading(false);
            }
        };
        fetchWeather();
    }, [selectedDistrictId]);

    // Clear risk results when crop changes
    useEffect(() => {
        setRiskResult(null);
        setError(null);
    }, [selectedCropId]);

    // Handle Analyze button click
    const handleAnalyze = async () => {
        if (!selectedDistrictId || !selectedCropId) {
            setError('Please select both district and crop');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await api.post('/risk/analyze', {
                districtId: selectedDistrictId,
                cropId: selectedCropId
            });
            setRiskResult(res.data);
        } catch (err) {
            console.error('Error analyzing risk:', err);
            setError('Failed to analyze crop risk. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Get selected district name
    const getSelectedDistrictName = () => {
        const district = districts.find(d => d.id === selectedDistrictId);
        return district?.name || 'Selected District';
    };

    // Get selected crop name
    const getSelectedCropName = () => {
        const crop = crops.find(c => c.id === selectedCropId);
        return crop?.name || 'Selected Crop';
    };

    // Get risk badge color
    const getRiskColor = (level) => {
        switch (level?.toUpperCase()) {
            case 'LOW': return 'bg-green-100 text-green-600';
            case 'MEDIUM': return 'bg-orange-100 text-orange-600';
            case 'HIGH': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
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
                        Real-time intelligence for <span className="text-primary font-medium">{getSelectedDistrictName()}</span> • {getSelectedCropName()}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                    </div>
                )}

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
                                    value={selectedDistrictId}
                                    onChange={(e) => setSelectedDistrictId(Number(e.target.value))}
                                    className="w-full h-9 px-3 rounded-lg border border-gray-200 text-xs text-gray-700 focus:outline-none focus:border-primary bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <option value="">Select a district</option>
                                    {districts.map((d) => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Select Crop */}
                            <div className="mb-4">
                                <label className="text-[10px] font-medium text-[#131613] block mb-1">Select Crop</label>
                                <select
                                    value={selectedCropId}
                                    onChange={(e) => setSelectedCropId(Number(e.target.value))}
                                    className="w-full h-9 px-3 rounded-lg border border-gray-200 text-xs text-gray-700 focus:outline-none focus:border-primary bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <option value="">Select a crop</option>
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

                            {/* Analyze Button */}
                            <button
                                onClick={handleAnalyze}
                                disabled={loading || !selectedDistrictId || !selectedCropId}
                                className="w-full h-9 bg-primary text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 mb-4 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {loading ? (
                                    <>
                                        <span className="animate-spin">⏳</span>
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
                                {riskResult ? `Last analyzed: ${new Date().toLocaleString()}` : 'Click to analyze risk'}
                            </p>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Current Conditions */}
                        <div>
                            <div className="flex items-center justify-between mb-3 animate-fade-in-down delay-200">
                                <h3 className="font-semibold text-sm text-[#131613]">Current Conditions</h3>
                                <span className="text-primary text-[10px] font-medium animate-pulse">
                                    {weatherLoading ? 'Loading...' : 'Live Data'}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {/* Temperature */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-orange-400 text-lg">thermostat</span>
                                        <span className="text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Avg</span>
                                    </div>
                                    <p className="text-lg font-bold text-[#131613]">
                                        {weatherData?.main?.temp ? `${Math.round(weatherData.main.temp)}°C` : '--°C'}
                                    </p>
                                    <p className="text-[10px] text-gray-400">Temperature</p>
                                </div>

                                {/* Humidity */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-blue-400 text-lg">humidity_percentage</span>
                                        <span className="text-[9px] text-green-500 bg-green-50 px-1.5 py-0.5 rounded">
                                            {weatherData?.main?.humidity > 70 ? 'High' : 'Normal'}
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-[#131613]">
                                        {weatherData?.main?.humidity ? `${Math.round(weatherData.main.humidity)}%` : '--%'}
                                    </p>
                                    <p className="text-[10px] text-gray-400">Humidity</p>
                                </div>

                                {/* Weather Condition */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-400">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-cyan-400 text-lg">cloud</span>
                                        <span className="text-[9px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded capitalize">
                                            {weatherData?.weather?.[0]?.main || 'Weather'}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-[#131613] capitalize truncate">
                                        {weatherData?.weather?.[0]?.description || 'Loading...'}
                                    </p>
                                    <p className="text-[10px] text-gray-400">Condition</p>
                                </div>

                                {/* Wind Speed */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-teal-400 text-lg">air</span>
                                        <span className="text-[9px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                            {weatherData?.weather?.[0]?.main || 'N/A'}
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-[#131613]">
                                        {weatherData?.wind?.speed ? `${Math.round(weatherData.wind.speed * 3.6)}km/h` : '--km/h'}
                                    </p>
                                    <p className="text-[10px] text-gray-400">Wind Speed</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Analysis Result */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 animate-fade-in-up delay-300 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-sm text-[#131613]">AI Analysis Result</h3>
                                <span className="text-[10px] text-gray-400">
                                    <span className="material-symbols-outlined text-xs align-middle mr-0.5">psychology</span>
                                    {riskResult ? `Risk Score: ${riskResult.riskScore}%` : 'Click Analyze to see results'}
                                </span>
                            </div>

                            {riskResult ? (
                                <div className="flex flex-col md:flex-row md:items-start gap-4">
                                    {/* Risk Badge */}
                                    <div className="flex flex-col items-center gap-1">
                                        <div className={`flex items-center gap-1.5 px-4 py-2 rounded-full ${getRiskColor(riskResult.riskLevel)}`}>
                                            <span className="material-symbols-outlined text-sm">
                                                {riskResult.riskLevel === 'LOW' ? 'check_circle' : 'warning'}
                                            </span>
                                            <span className="text-xs font-semibold">{riskResult.riskLevel} Risk</span>
                                        </div>
                                        <span className="text-[9px] text-gray-400">
                                            {riskResult.riskLevel === 'HIGH' ? 'Immediate Action Required' :
                                                riskResult.riskLevel === 'MEDIUM' ? 'Action Required' : 'Conditions Favorable'}
                                        </span>
                                    </div>

                                    {/* Analysis Text */}
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-[#131613] mb-2">
                                            {riskResult.cropName} in {riskResult.districtName}
                                        </h4>
                                        {riskResult.explanation?.length > 0 && (
                                            <ul className="text-xs text-gray-500 leading-relaxed list-disc pl-4">
                                                {riskResult.explanation.map((exp, idx) => (
                                                    <li key={idx}>{exp}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-400">
                                    <span className="material-symbols-outlined text-4xl mb-2">analytics</span>
                                    <p className="text-sm">Select parameters and click "Analyze Crop Risk" to see AI analysis</p>
                                </div>
                            )}
                        </div>

                        {/* Advisory & Recommendations */}
                        {riskResult?.recommendations?.length > 0 && (
                            <div className="animate-fade-in-up delay-500">
                                <h3 className="font-semibold text-sm text-[#131613] mb-3">Advisory & Recommendations</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {riskResult.recommendations.slice(0, 6).map((rec, idx) => {
                                        // Card styles with category-specific colors and icons
                                        const cardConfig = [
                                            { gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', border: 'border-blue-200', icon: 'water_drop', title: 'Irrigation' },
                                            { gradient: 'from-green-500 to-emerald-500', bg: 'bg-green-50', border: 'border-green-200', icon: 'bug_report', title: 'Pest & Disease' },
                                            { gradient: 'from-amber-500 to-yellow-500', bg: 'bg-amber-50', border: 'border-amber-200', icon: 'compost', title: 'Fertilizer' },
                                            { gradient: 'from-purple-500 to-violet-500', bg: 'bg-purple-50', border: 'border-purple-200', icon: 'agriculture', title: 'Crop Care' },
                                            { gradient: 'from-orange-500 to-red-500', bg: 'bg-orange-50', border: 'border-orange-200', icon: 'cloud', title: 'Weather Action' },
                                            { gradient: 'from-teal-500 to-green-500', bg: 'bg-teal-50', border: 'border-teal-200', icon: 'verified', title: 'Risk Action' },
                                        ];
                                        const config = cardConfig[idx];

                                        // Extract description without the emoji prefix
                                        const description = rec.replace(/^[^\s]+\s/, '');

                                        return (
                                            <div
                                                key={idx}
                                                className={`${config.bg} rounded-xl border ${config.border} p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
                                            >
                                                {/* Header with icon and title */}
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                                                        <span className="material-symbols-outlined text-white text-lg">{config.icon}</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-sm text-gray-800">{config.title}</h4>
                                                        <span className="text-[10px] text-gray-500">Recommendation {idx + 1}</span>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
                                                    {description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Regional Satellite View */}
                        <div className="animate-fade-in-up delay-700">
                            <p className="text-[10px] text-gray-400 mb-1">Regional Satellite View</p>
                            <h3 className="font-semibold text-sm text-primary mb-3">{getSelectedDistrictName()} Agricultural Zone</h3>
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-64 hover:shadow-md transition-shadow">
                                <iframe
                                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58585959864!2d81.00022565!3d7.9403022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afb456e05e5af8f%3A0x8f4e5a9b5e8f1c0!2s${encodeURIComponent(getSelectedDistrictName())}!5e0!3m2!1sen!2slk!4v1234567890`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={`${getSelectedDistrictName()} Map`}
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
