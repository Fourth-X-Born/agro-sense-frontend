import React from "react";
import { Link } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFooter from "../components/dashboard/DashboardFooter";

export default function CropGuidePage() {
    const growthStages = [
        { name: "Seedling", days: "Day 0-14", status: "completed" },
        { name: "Vegetative", days: "Day 15-55 (Current)", status: "active" },
        { name: "Flowering", days: "Day 56-85", status: "upcoming" },
        { name: "Harvest", days: "Day 86-100", status: "upcoming" }
    ];

    const fertilizerData = [
        { type: "Urea (Nitrogen)", dosage: "50 kg", method: "Broadcast", timing: "Day 21" },
        { type: "MOP (Potassium)", dosage: "15 kg", method: "Band placement", timing: "Day 35" },
        { type: "Zinc Sulfate", dosage: "5 kg", method: "Foliar Spray", timing: "Day 40 (If deficiency)" }
    ];

    return (
        <div className="min-h-screen bg-[#f6f8f6] flex flex-col">
            {/* Dashboard Navbar */}
            <DashboardNavbar />

            {/* Main Content */}
            <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-6">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-[#131613]">Crop Guide: Paddy / Rice</h1>
                        <p className="text-gray-500 text-sm mt-1">Recommended fertilizer and growth schedule for Red Rice in the Dry Zone.</p>
                        <div className="flex items-center gap-1.5 mt-2">
                            <span className="material-symbols-outlined text-orange-400 text-sm">sunny</span>
                            <span className="text-orange-500 text-xs font-medium">Dry Season</span>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-xs font-medium text-[#131613] hover:bg-gray-50 transition-colors">
                        <span className="material-symbols-outlined text-base">download</span>
                        Download PDF
                    </button>
                </div>

                {/* Growth Stage Timeline */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between relative">
                        {/* Connection Lines */}
                        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
                        <div className="absolute top-4 left-0 w-1/4 h-0.5 bg-primary z-0"></div>

                        {growthStages.map((stage, index) => (
                            <div key={index} className="flex flex-col items-center relative z-10">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stage.status === "active" ? "bg-primary" :
                                    stage.status === "completed" ? "bg-primary" :
                                        "bg-gray-200"
                                    }`}>
                                    {stage.status === "completed" && (
                                        <span className="material-symbols-outlined text-white text-sm">check</span>
                                    )}
                                </div>
                                <p className={`text-xs font-medium mt-2 ${stage.status === "active" ? "text-primary" :
                                    stage.status === "completed" ? "text-primary" :
                                        "text-gray-400"
                                    }`}>{stage.name}</p>
                                <p className="text-[10px] text-gray-400">{stage.days}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Alert */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-500 text-lg">info</span>
                    <div>
                        <h4 className="text-sm font-semibold text-blue-800">Approaching Maximum Tillering</h4>
                        <p className="text-xs text-blue-700 leading-relaxed">
                            Your crop is entering the peak growth phase. Ensure water levels are maintained at 5cm depth for optimal nutrient uptake before the next fertilizer application.
                        </p>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stage Guidelines */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-sm font-bold text-[#131613]">Stage 2: Vegetative Growth Guidelines</h3>
                                    <p className="text-[10px] text-gray-400">Focus: Leaf development & Root strengthening</p>
                                </div>
                                <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">ACTIVE</span>
                            </div>

                            {/* Fertilizer Application */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-primary text-base">science</span>
                                    <span className="text-xs font-semibold text-[#131613]">Fertilizer Application</span>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="text-left text-[10px] font-medium text-gray-500 pb-2">Fertilizer Type</th>
                                                <th className="text-left text-[10px] font-medium text-gray-500 pb-2">Dosage (per acre)</th>
                                                <th className="text-left text-[10px] font-medium text-gray-500 pb-2">Method</th>
                                                <th className="text-left text-[10px] font-medium text-gray-500 pb-2">Timing</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fertilizerData.map((row, index) => (
                                                <tr key={index} className="border-b border-gray-50">
                                                    <td className="py-2.5 text-xs text-[#131613] font-medium">{row.type}</td>
                                                    <td className="py-2.5 text-xs text-gray-600">{row.dosage}</td>
                                                    <td className="py-2.5 text-xs text-gray-600">{row.method}</td>
                                                    <td className="py-2.5 text-xs text-gray-600">{row.timing}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Water Management */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-blue-500 text-base">water_drop</span>
                                    <span className="text-xs font-semibold text-[#131613]">Water Management</span>
                                </div>

                                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                                    During the vegetative stage, maintain a shallow water layer of about 2-5 cm. Drain the field for 1-2 days before fertilizer application to prevent runoff, then re-flood.
                                </p>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                                        <p className="text-xl font-bold text-blue-600">5 cm</p>
                                        <p className="text-[9px] text-blue-500 uppercase tracking-wider">Depth</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-3 text-center">
                                        <p className="text-xl font-bold text-green-600">pH 6.5</p>
                                        <p className="text-[9px] text-green-500 uppercase tracking-wider">Target Acidity</p>
                                    </div>
                                    <div className="bg-orange-50 rounded-lg p-3 text-center">
                                        <p className="text-xl font-bold text-orange-600">28°C</p>
                                        <p className="text-[9px] text-orange-500 uppercase tracking-wider">Avg Temp</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-4">
                        {/* Sustainable Practices */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                            <h3 className="text-sm font-bold text-[#131613] mb-4">Sustainable Practices</h3>

                            {/* Do's */}
                            <div className="mb-4">
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">DO'S</p>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-green-500 text-base mt-0.5">check_circle</span>
                                        <p className="text-xs text-gray-600">Apply fertilizer when the soil is moist but leaves are dry.</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-green-500 text-base mt-0.5">check_circle</span>
                                        <p className="text-xs text-gray-600">Scout for stem borer signs weekly.</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-green-500 text-base mt-0.5">check_circle</span>
                                        <p className="text-xs text-gray-600">Incorporate organic manure if available.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Don'ts */}
                            <div className="mb-4">
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">DON'TS</p>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-red-500 text-base mt-0.5">cancel</span>
                                        <p className="text-xs text-gray-600">Don't apply Urea if heavy rain is forecast within 24 hours.</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-red-500 text-base mt-0.5">cancel</span>
                                        <p className="text-xs text-gray-600">Avoid mixing pesticides with growth regulators without consulting.</p>
                                    </div>
                                </div>
                            </div>

                            <a href="#" className="text-primary text-xs font-medium flex items-center gap-1 hover:underline">
                                View All Guidelines <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </a>
                        </div>

                        {/* Expert Help Card */}
                        <div className="bg-primary rounded-xl p-4 text-white">
                            <h3 className="text-sm font-bold mb-2">Need Expert Help?</h3>
                            <p className="text-xs text-white/80 mb-4">
                                Contact Agricultural Experts From Expertise of Crop Management
                            </p>
                            <button className="w-full py-2 bg-white text-primary text-xs font-medium rounded-lg hover:bg-white/90 transition-colors">
                                Contact Now
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <DashboardFooter />
        </div>
    );
}
