import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFooter from "../components/dashboard/DashboardFooter";
import cropRiskService from "../api/cropRiskService";

import authService from "../services/authService";

export default function CropRiskPage() {
    const user = authService.getCurrentUser();
    const [selectedDistrict, setSelectedDistrict] = useState(user ? user.district : "Polonnaruwa");
    const [selectedCrop, setSelectedCrop] = useState(user && user.crop ? user.crop : "Paddy (Rice)");
    const [selectedGrowthStage, setSelectedGrowthStage] = useState("Vegetative Phase");
    const [risks, setRisks] = useState([]);
    const [loading, setLoading] = useState(false);

    const districts = [
        "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
        "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
        "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
        "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
        "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
    ];

    const crops = ["Paddy (Rice)", "Vegetables", "Fruits", "Tea", "Coconut", "Rubber"];
    const growthStages = ["Germination", "Seedling", "Vegetative Phase", "Flowering", "Grain Filling", "Maturity"];

    // Fetch crop risks from API
    useEffect(() => {
        const fetchRisks = async () => {
            try {
                setLoading(true);
                const data = await cropRiskService.getRisks({
                    district: selectedDistrict,
                    crop: selectedCrop
                });
                setRisks(data || []);
            } catch (err) {
                console.error("Failed to fetch crop risks:", err);
                setRisks([]);
            } finally {
                setLoading(false);
            }
        };
        fetchRisks();
    }, [selectedDistrict, selectedCrop]);

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
                        Real-time intelligence for <span className="text-primary font-medium">{selectedDistrict} District</span> • Paddy Cultivation
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
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                    className="w-full h-9 px-3 rounded-lg border border-gray-200 text-xs text-gray-700 focus:outline-none focus:border-primary bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    {districts.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Select Crop */}
                            <div className="mb-4">
                                <label className="text-[10px] font-medium text-[#131613] block mb-1">Select Crop</label>
                                <select
                                    value={selectedCrop}
                                    onChange={(e) => setSelectedCrop(e.target.value)}
                                    className="w-full h-9 px-3 rounded-lg border border-gray-200 text-xs text-gray-700 focus:outline-none focus:border-primary bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    {crops.map((c) => (
                                        <option key={c} value={c}>{c}</option>
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
                            <button className="w-full h-9 bg-primary text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 mb-4 group">
                                <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">search</span>
                                Analyze Crop Risk
                            </button>

                            <p className="text-[9px] text-gray-400 text-center">Last updated: Jan 17, 2026 14:30 AM</p>
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
                                    <p className="text-lg font-bold text-[#131613]">31°C</p>
                                    <p className="text-[10px] text-gray-400">Temperature</p>
                                </div>

                                {/* Humidity */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-blue-400 text-lg">humidity_percentage</span>
                                        <span className="text-[9px] text-green-500 bg-green-50 px-1.5 py-0.5 rounded">+12%</span>
                                    </div>
                                    <p className="text-lg font-bold text-[#131613]">85%</p>
                                    <p className="text-[10px] text-gray-400">Humidity</p>
                                </div>

                                {/* Precipitation */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-400">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-cyan-400 text-lg">water_drop</span>
                                        <span className="text-[9px] text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">High</span>
                                    </div>
                                    <p className="text-lg font-bold text-[#131613]">24mm</p>
                                    <p className="text-[10px] text-gray-400">Precipitation</p>
                                </div>

                                {/* Wind Speed */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-scale-in delay-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-teal-400 text-lg">air</span>
                                        <span className="text-[9px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">SW</span>
                                    </div>
                                    <p className="text-lg font-bold text-[#131613]">18km/h</p>
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
                                    Model Confidence: 92%
                                </span>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                {/* Risk Badge */}
                                <div className="flex flex-col items-center gap-1 animate-pulse">
                                    <div className="flex items-center gap-1.5 px-4 py-2 bg-orange-100 text-orange-600 rounded-full">
                                        <span className="material-symbols-outlined text-sm">warning</span>
                                        <span className="text-xs font-semibold">Medium Risk</span>
                                    </div>
                                    <span className="text-[9px] text-gray-400">Action Required</span>
                                </div>

                                {/* Analysis Text */}
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-[#131613] mb-2">Fungal Disease Susceptibility Detected</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        Due to consistent high humidity (&gt;80%) and predicted rainfall over the next 48 hours, there is an elevated risk of Blast disease in the current vegetative stage. Immediate preventive measures are recommended.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Advisory & Recommendations */}
                        <div className="animate-fade-in-up delay-500">
                            <h3 className="font-semibold text-sm text-[#131613] mb-3">Advisory & Recommendations</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {/* Suspend Irrigation */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 border-l-3 border-l-blue-400 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-blue-500 text-base">water</span>
                                        </div>
                                        <span className="text-[8px] text-blue-500 font-semibold bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Irrigation</span>
                                    </div>
                                    <h4 className="text-xs font-semibold text-[#131613] mb-1">Suspend Irrigation</h4>
                                    <p className="text-[10px] text-gray-500 leading-relaxed mb-3">
                                        Soil moisture levels are sufficient. With incoming rain, suspend artificial irrigation for 3 days to prevent waterlogging.
                                    </p>
                                    <a href="#" className="text-primary text-[10px] font-medium flex items-center gap-0.5 hover:underline group">
                                        View Schedule <span className="material-symbols-outlined text-xs group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                                    </a>
                                </div>

                                {/* Delay Urea Application */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 border-l-3 border-l-green-400 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-green-500 text-base">nutrition</span>
                                        </div>
                                        <span className="text-[8px] text-green-500 font-semibold bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Nutrients</span>
                                    </div>
                                    <h4 className="text-xs font-semibold text-[#131613] mb-1">Delay Urea Application</h4>
                                    <p className="text-[10px] text-gray-500 leading-relaxed mb-3">
                                        High rainfall may cause leaching. Delay Nitrogen application until weather stabilizes to ensure maximum absorption.
                                    </p>
                                    <a href="#" className="text-primary text-[10px] font-medium flex items-center gap-0.5 hover:underline group">
                                        Adjust Plan <span className="material-symbols-outlined text-xs group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                                    </a>
                                </div>

                                {/* Preventive Spraying */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 border-l-3 border-l-orange-400 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-orange-500 text-base">vaccines</span>
                                        </div>
                                        <span className="text-[8px] text-orange-500 font-semibold bg-orange-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Mitigation</span>
                                    </div>
                                    <h4 className="text-xs font-semibold text-[#131613] mb-1">Preventive Spraying</h4>
                                    <p className="text-[10px] text-gray-500 leading-relaxed mb-3">
                                        Apply recommended fungicide within 24 hours to prevent Blast spore germination on wet leaves.
                                    </p>
                                    <a href="#" className="text-primary text-[10px] font-medium flex items-center gap-0.5 hover:underline group">
                                        See Products <span className="material-symbols-outlined text-xs group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Regional Satellite View */}
                        <div className="animate-fade-in-up delay-700">
                            <p className="text-[10px] text-gray-400 mb-1">Regional Satellite View</p>
                            <h3 className="font-semibold text-sm text-primary mb-3">{selectedDistrict} Agricultural Zone B</h3>
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-64 hover:shadow-md transition-shadow">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58585959864!2d81.00022565!3d7.9403022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afb456e05e5af8f%3A0x8f4e5a9b5e8f1c0!2sPolonnaruwa!5e0!3m2!1sen!2slk!4v1234567890"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Polonnaruwa Map"
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
