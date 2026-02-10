import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFooter from "../components/dashboard/DashboardFooter";
import dataService from "../services/dataService";

export default function CropRiskPage() {
    // Form state
    const [selectedDistrictId, setSelectedDistrictId] = useState(null);
    const [selectedCropId, setSelectedCropId] = useState(null);
    const [selectedGrowthStage, setSelectedGrowthStage] = useState("Vegetative Phase");

    // Data from API
    const [districts, setDistricts] = useState([]);
    const [crops, setCrops] = useState([]);

    // Analysis state
    const [loading, setLoading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    // Growth stages (static for now)
    const growthStages = ["Germination", "Seedling", "Vegetative Phase", "Flowering", "Grain Filling", "Maturity"];

    // Load crops and districts on mount
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [cropsRes, districtsRes] = await Promise.all([
                    dataService.getCrops(),
                    dataService.getDistricts()
                ]);

                if (cropsRes.success && cropsRes.data) {
                    setCrops(cropsRes.data);
                    if (cropsRes.data.length > 0) {
                        setSelectedCropId(cropsRes.data[0].id);
                    }
                }

                if (districtsRes.success && districtsRes.data) {
                    setDistricts(districtsRes.data);
                    // Find Polonnaruwa as default or use first
                    const polonnaruwa = districtsRes.data.find(d => d.name === "Polonnaruwa");
                    setSelectedDistrictId(polonnaruwa?.id || districtsRes.data[0]?.id);
                }
            } catch (err) {
                console.error("Error loading data:", err);
                setError("Failed to load crops and districts");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Handle risk analysis
    const handleAnalyze = async () => {
        if (!selectedCropId || !selectedDistrictId) {
            setError("Please select both crop and district");
            return;
        }

        setAnalyzing(true);
        setError(null);

        try {
            // Get farmerId from localStorage if logged in
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const farmerId = user.id || null;

            const response = await dataService.analyzeRisk(selectedCropId, selectedDistrictId, farmerId);

            if (response.success && response.data) {
                setAnalysisResult(response.data);
                setLastUpdated(new Date());
            } else {
                setError(response.message || "Analysis failed");
            }
        } catch (err) {
            console.error("Risk analysis error:", err);
            setError("Failed to analyze risk. Please try again.");
        } finally {
            setAnalyzing(false);
        }
    };

    // Helper functions
    const getSelectedDistrictName = () => {
        const district = districts.find(d => d.id === selectedDistrictId);
        return district?.name || "Select District";
    };

    const getSelectedCropName = () => {
        const crop = crops.find(c => c.id === selectedCropId);
        return crop?.name || "Select Crop";
    };

    const getRiskColor = (level) => {
        switch (level?.toUpperCase()) {
            case "LOW": return { bg: "bg-green-100", text: "text-green-600", icon: "check_circle" };
            case "MEDIUM": return { bg: "bg-orange-100", text: "text-orange-600", icon: "warning" };
            case "HIGH": return { bg: "bg-red-100", text: "text-red-600", icon: "error" };
            default: return { bg: "bg-gray-100", text: "text-gray-600", icon: "help" };
        }
    };

    const formatDate = (date) => {
        if (!date) return "Not analyzed yet";
        return new Date(date).toLocaleString("en-US", {
            month: "short", day: "numeric", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        });
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
                        Real-time intelligence for <span className="text-primary font-medium">{getSelectedDistrictName()}</span> • {getSelectedCropName()} Cultivation
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 animate-fade-in-down">
                        <span className="material-symbols-outlined text-red-500 text-sm">error</span>
                        <span className="text-xs text-red-600">{error}</span>
                        <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
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
                                    value={selectedDistrictId || ""}
                                    onChange={(e) => setSelectedDistrictId(Number(e.target.value))}
                                    disabled={loading}
                                    className="w-full h-9 px-3 rounded-lg border border-gray-200 text-xs text-gray-700 focus:outline-none focus:border-primary bg-white hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                                >
                                    {loading ? (
                                        <option>Loading...</option>
                                    ) : (
                                        districts.map((d) => (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        ))
                                    )}
                                </select>
                            </div>

                            {/* Select Crop */}
                            <div className="mb-4">
                                <label className="text-[10px] font-medium text-[#131613] block mb-1">Select Crop</label>
                                <select
                                    value={selectedCropId || ""}
                                    onChange={(e) => setSelectedCropId(Number(e.target.value))}
                                    disabled={loading}
                                    className="w-full h-9 px-3 rounded-lg border border-gray-200 text-xs text-gray-700 focus:outline-none focus:border-primary bg-white hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                                >
                                    {loading ? (
                                        <option>Loading...</option>
                                    ) : (
                                        crops.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))
                                    )}
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
                                disabled={analyzing || loading || !selectedCropId || !selectedDistrictId}
                                className="w-full h-9 bg-primary text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 mb-4 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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

                            <p className="text-[9px] text-gray-400 text-center">Last updated: {formatDate(lastUpdated)}</p>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Current Conditions */}
                        <div>
                            <div className="flex items-center justify-between mb-3 animate-fade-in-down delay-200">
                                <h3 className="font-semibold text-sm text-[#131613]">Current Conditions</h3>
                                <span className={`text-[10px] font-medium ${analysisResult ? "text-primary animate-pulse" : "text-gray-400"}`}>
                                    {analysisResult ? "Live Data" : "Awaiting Analysis"}
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
                                        {analysisResult ? `${Math.round(analysisResult.avgTempC)}°C` : "--"}
                                    </p>
                                    <p className="text-[10px] text-gray-400">Temperature</p>
                                </div>

                                {/* Rain Estimate */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-blue-400 text-lg">water_drop</span>
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                                            analysisResult?.totalRainMmNext7Days > 50 ? "text-orange-500 bg-orange-50" : "text-green-500 bg-green-50"
                                        }`}>
                                            {analysisResult?.totalRainMmNext7Days > 50 ? "High" : "Normal"}
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-[#131613]">
                                        {analysisResult ? `${Math.round(analysisResult.totalRainMmNext7Days)}mm` : "--"}
                                    </p>
                                    <p className="text-[10px] text-gray-400">Rain Estimate (7d)</p>
                                </div>

                                {/* Risk Score */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-400">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-purple-400 text-lg">speed</span>
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                                            analysisResult?.riskScore >= 60 ? "text-red-500 bg-red-50" : 
                                            analysisResult?.riskScore >= 30 ? "text-orange-500 bg-orange-50" : "text-green-500 bg-green-50"
                                        }`}>
                                            {analysisResult?.riskScore >= 60 ? "High" : analysisResult?.riskScore >= 30 ? "Medium" : "Low"}
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-[#131613]">
                                        {analysisResult ? `${analysisResult.riskScore}/100` : "--"}
                                    </p>
                                    <p className="text-[10px] text-gray-400">Risk Score</p>
                                </div>

                                {/* Risk Level */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`material-symbols-outlined text-lg ${getRiskColor(analysisResult?.riskLevel).text}`}>
                                            {getRiskColor(analysisResult?.riskLevel).icon}
                                        </span>
                                        <span className="text-[9px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">Level</span>
                                    </div>
                                    <p className={`text-lg font-bold ${getRiskColor(analysisResult?.riskLevel).text}`}>
                                        {analysisResult?.riskLevel || "--"}
                                    </p>
                                    <p className="text-[10px] text-gray-400">Risk Level</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Analysis Result */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 animate-fade-in-up delay-300 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-sm text-[#131613]">AI Analysis Result</h3>
                                <span className="text-[10px] text-gray-400">
                                    <span className="material-symbols-outlined text-xs align-middle mr-0.5">psychology</span>
                                    {analysisResult ? `Score: ${analysisResult.riskScore}%` : "Awaiting Analysis"}
                                </span>
                            </div>

                            {!analysisResult ? (
                                <div className="text-center py-8 text-gray-400">
                                    <span className="material-symbols-outlined text-4xl mb-2 block">search</span>
                                    <p className="text-sm">Select crop and district, then click "Analyze Crop Risk"</p>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row md:items-start gap-4">
                                    {/* Risk Badge */}
                                    <div className="flex flex-col items-center gap-1">
                                        <div className={`flex items-center gap-1.5 px-4 py-2 ${getRiskColor(analysisResult.riskLevel).bg} ${getRiskColor(analysisResult.riskLevel).text} rounded-full`}>
                                            <span className="material-symbols-outlined text-sm">{getRiskColor(analysisResult.riskLevel).icon}</span>
                                            <span className="text-xs font-semibold">{analysisResult.riskLevel} Risk</span>
                                        </div>
                                        <span className="text-[9px] text-gray-400">
                                            {analysisResult.riskLevel === "HIGH" ? "Immediate Action" : analysisResult.riskLevel === "MEDIUM" ? "Action Required" : "Monitor"}
                                        </span>
                                    </div>

                                {/* Analysis Text */}
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-[#131613] mb-2">
                                        Risk Assessment for {analysisResult.cropName} in {analysisResult.districtName}
                                    </h4>
                                    <div className="text-xs text-gray-500 leading-relaxed space-y-1">
                                        {analysisResult.explanation?.map((exp, idx) => (
                                            <p key={idx}>• {exp}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>

                        {/* Advisory & Recommendations */}
                        <div className="animate-fade-in-up delay-500">
                            <h3 className="font-semibold text-sm text-[#131613] mb-3">Advisory & Recommendations</h3>
                            
                            {!analysisResult ? (
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center text-gray-400">
                                    <span className="material-symbols-outlined text-3xl mb-2 block">tips_and_updates</span>
                                    <p className="text-sm">Recommendations will appear after analysis</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {analysisResult.recommendations?.map((rec, idx) => {
                                        // Predefined styles for each recommendation card
                                        const cardStyles = [
                                            { border: "border-l-blue-400", bg: "bg-blue-100", text: "text-blue-500", labelBg: "bg-blue-50", icon: "water" },
                                            { border: "border-l-green-400", bg: "bg-green-100", text: "text-green-500", labelBg: "bg-green-50", icon: "nutrition" },
                                            { border: "border-l-orange-400", bg: "bg-orange-100", text: "text-orange-500", labelBg: "bg-orange-50", icon: "vaccines" },
                                            { border: "border-l-teal-400", bg: "bg-teal-100", text: "text-teal-500", labelBg: "bg-teal-50", icon: "eco" },
                                            { border: "border-l-purple-400", bg: "bg-purple-100", text: "text-purple-500", labelBg: "bg-purple-50", icon: "thermostat" },
                                            { border: "border-l-cyan-400", bg: "bg-cyan-100", text: "text-cyan-500", labelBg: "bg-cyan-50", icon: "agriculture" },
                                        ];
                                        const style = cardStyles[idx % cardStyles.length];
                                        
                                        return (
                                            <div key={idx} className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 border-l-3 ${style.border} hover:shadow-md transition-all duration-300 hover:-translate-y-1`}>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className={`w-8 h-8 rounded-full ${style.bg} flex items-center justify-center`}>
                                                        <span className={`material-symbols-outlined ${style.text} text-base`}>{style.icon}</span>
                                                    </div>
                                                    <span className={`text-[8px] ${style.text} font-semibold ${style.labelBg} px-2 py-0.5 rounded-full uppercase tracking-wider`}>
                                                        Tip {idx + 1}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-gray-600 leading-relaxed">
                                                    {rec}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Regional Satellite View */}
                        <div className="animate-fade-in-up delay-700">
                            <p className="text-[10px] text-gray-400 mb-1">Regional Satellite View</p>
                            <h3 className="font-semibold text-sm text-primary mb-3">
                                {analysisResult ? `${analysisResult.districtName} Agricultural Zone` : `${getSelectedDistrictName()} Agricultural Zone`}
                            </h3>
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-64 hover:shadow-md transition-shadow">
                                <iframe
                                    src={`https://www.google.com/maps?q=${encodeURIComponent(getSelectedDistrictName() + ", Sri Lanka")}&output=embed`}
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
