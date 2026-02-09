import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fertilizerAPI, masterDataAPI } from "../services/api";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFooter from "../components/dashboard/DashboardFooter";

export default function CropGuidePage() {
    const { user } = useAuth();
    const [fertilizers, setFertilizers] = useState([]);
    const [crops, setCrops] = useState([]);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Growth stages (static data - could be fetched from API if available)
    const growthStages = [
        { name: "Seedling", days: "Day 0-14", status: "completed" },
        { name: "Tillering", days: "Day 15-35", status: "completed" },
        { name: "Panicle Initiation", days: "Day 36-50", status: "current" },
        { name: "Heading", days: "Day 51-65", status: "upcoming" },
        { name: "Flowering", days: "Day 66-80", status: "upcoming" },
        { name: "Ripening", days: "Day 81-100", status: "upcoming" },
        { name: "Harvesting", days: "Day 100+", status: "upcoming" },
    ];

    // Fetch crops and fertilizers
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError("");
            try {
                // Fetch crops
                const cropsResponse = await masterDataAPI.getCrops();
                if (cropsResponse.success && cropsResponse.data) {
                    setCrops(cropsResponse.data);
                    if (cropsResponse.data.length > 0) {
                        setSelectedCrop(cropsResponse.data[0]);
                    }
                }

                // Fetch fertilizers
                const fertResponse = await fertilizerAPI.getAll();
                if (fertResponse.success && fertResponse.data) {
                    setFertilizers(fertResponse.data);
                } else {
                    // Use fallback data
                    setFertilizers(fallbackFertilizers);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load data");
                setFertilizers(fallbackFertilizers);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter fertilizers by selected crop
    const filteredFertilizers = selectedCrop
        ? fertilizers.filter(f => f.cropId === selectedCrop.id || !f.cropId)
        : fertilizers;

    return (
        <div className="min-h-screen bg-[#f6f8f6] flex flex-col">
            {/* Dashboard Navbar */}
            <DashboardNavbar />

            {/* Main Content */}
            <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-6 animate-fade-in-up">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#131613]">Crop Guide</h1>
                        <p className="text-gray-500 text-sm">
                            Growth stages, fertilizer schedules, and water management
                        </p>
                    </div>

                    {/* Crop Selector */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Crop:</span>
                        <select
                            value={selectedCrop?.id || ""}
                            onChange={(e) => {
                                const crop = crops.find(c => c.id === parseInt(e.target.value));
                                setSelectedCrop(crop);
                            }}
                            className="h-9 px-3 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-primary"
                        >
                            {crops.map(crop => (
                                <option key={crop.id} value={crop.id}>{crop.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
                            <p className="text-gray-500 mt-2">Loading crop guide...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Growth Stages Timeline */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-primary text-lg">timeline</span>
                                <span className="font-semibold text-sm text-[#131613]">Growth Stages</span>
                                <span className="ml-auto text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                                    {selectedCrop?.name || 'Paddy'} - Yala Season
                                </span>
                            </div>

                            {/* Timeline */}
                            <div className="relative">
                                {/* Progress Line */}
                                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-500"
                                        style={{ width: '37%' }}
                                    ></div>
                                </div>

                                {/* Stage Markers */}
                                <div className="relative flex justify-between">
                                    {growthStages.map((stage, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center"
                                            style={{ width: `${100 / growthStages.length}%` }}
                                        >
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${stage.status === 'completed'
                                                        ? 'bg-primary text-white'
                                                        : stage.status === 'current'
                                                            ? 'bg-primary text-white ring-4 ring-primary/30 animate-pulse'
                                                            : 'bg-gray-200 text-gray-400'
                                                    }`}
                                            >
                                                {stage.status === 'completed' ? (
                                                    <span className="material-symbols-outlined text-sm">check</span>
                                                ) : stage.status === 'current' ? (
                                                    <span className="material-symbols-outlined text-sm">radio_button_checked</span>
                                                ) : (
                                                    <span className="text-xs font-bold">{index + 1}</span>
                                                )}
                                            </div>
                                            <p className={`mt-2 text-[10px] text-center font-medium ${stage.status === 'current' ? 'text-primary' : 'text-gray-600'
                                                }`}>
                                                {stage.name}
                                            </p>
                                            <p className="text-[9px] text-gray-400">{stage.days}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Fertilizer Schedule */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-lg">science</span>
                                            <span className="font-semibold text-sm text-[#131613]">Fertilizer Schedule</span>
                                        </div>
                                        <span className="text-[10px] text-gray-400">Recommended for your soil type</span>
                                    </div>

                                    {/* Fertilizer Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-xs">
                                            <thead>
                                                <tr className="bg-gray-50">
                                                    <th className="text-left p-3 font-medium text-gray-600 rounded-l-lg">Type</th>
                                                    <th className="text-left p-3 font-medium text-gray-600">Dosage</th>
                                                    <th className="text-left p-3 font-medium text-gray-600">Method</th>
                                                    <th className="text-left p-3 font-medium text-gray-600 rounded-r-lg">Timing</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredFertilizers.length > 0 ? (
                                                    filteredFertilizers.map((fert, index) => (
                                                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                            <td className="p-3">
                                                                <div className="flex items-center gap-2">
                                                                    <div className={`w-2 h-2 rounded-full ${fert.type?.includes('Nitrogen') || fert.name?.includes('Urea') ? 'bg-blue-500' :
                                                                            fert.type?.includes('Phosphorus') || fert.name?.includes('TSP') ? 'bg-orange-500' :
                                                                                fert.type?.includes('Potassium') || fert.name?.includes('MOP') ? 'bg-purple-500' :
                                                                                    'bg-green-500'
                                                                        }`}></div>
                                                                    <span className="font-medium text-[#131613]">{fert.name || fert.type}</span>
                                                                </div>
                                                            </td>
                                                            <td className="p-3 text-gray-600">{fert.dosage || fert.dosagePerAcre || 'As recommended'}</td>
                                                            <td className="p-3 text-gray-600">{fert.method || fert.applicationMethod || 'Broadcast'}</td>
                                                            <td className="p-3">
                                                                <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-medium rounded">
                                                                    {fert.timing || fert.applicationStage || 'As needed'}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="p-4 text-center text-gray-400">
                                                            No fertilizer recommendations available
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Water Management Tips */}
                            <div>
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-blue-500 text-lg">water_drop</span>
                                        <span className="font-semibold text-sm text-[#131613]">Water Management</span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="p-3 bg-blue-50 rounded-lg border-l-3 border-blue-400">
                                            <p className="text-xs font-medium text-blue-800 mb-1">Current Stage</p>
                                            <p className="text-[10px] text-blue-600">
                                                Maintain 5-7cm water level during panicle initiation. Critical for grain formation.
                                            </p>
                                        </div>

                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs font-medium text-gray-700 mb-1">Irrigation Schedule</p>
                                            <p className="text-[10px] text-gray-500">
                                                Irrigate every 3-4 days during dry periods. Reduce frequency during rainy weather.
                                            </p>
                                        </div>

                                        <div className="p-3 bg-amber-50 rounded-lg border-l-3 border-amber-400">
                                            <p className="text-xs font-medium text-amber-800 mb-1">⚠️ Warning</p>
                                            <p className="text-[10px] text-amber-600">
                                                Avoid water stress during flowering stage. Can reduce yield by 20-30%.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Tips */}
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mt-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-amber-500 text-lg">lightbulb</span>
                                        <span className="font-semibold text-sm text-[#131613]">Quick Tips</span>
                                    </div>

                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2 text-[10px] text-gray-600">
                                            <span className="material-symbols-outlined text-primary text-xs mt-0.5">check_circle</span>
                                            Apply fertilizers early morning or late evening
                                        </li>
                                        <li className="flex items-start gap-2 text-[10px] text-gray-600">
                                            <span className="material-symbols-outlined text-primary text-xs mt-0.5">check_circle</span>
                                            Don't apply fertilizers to dry soil
                                        </li>
                                        <li className="flex items-start gap-2 text-[10px] text-gray-600">
                                            <span className="material-symbols-outlined text-primary text-xs mt-0.5">check_circle</span>
                                            Split nitrogen applications for better absorption
                                        </li>
                                        <li className="flex items-start gap-2 text-[10px] text-gray-600">
                                            <span className="material-symbols-outlined text-primary text-xs mt-0.5">check_circle</span>
                                            Monitor plant color for nutrient deficiency signs
                                        </li>
                                    </ul>
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

// Fallback fertilizer data
const fallbackFertilizers = [
    { type: "Urea (Nitrogen)", dosage: "50 kg/acre", method: "Broadcast", timing: "Day 21" },
    { type: "TSP (Phosphorus)", dosage: "25 kg/acre", method: "Band placement", timing: "Day 0" },
    { type: "MOP (Potassium)", dosage: "30 kg/acre", method: "Broadcast", timing: "Day 45" },
    { type: "Zinc Sulphate", dosage: "5 kg/acre", method: "Foliar spray", timing: "Day 30" },
];
