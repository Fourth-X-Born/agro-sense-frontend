import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import adminService from "../../services/adminService";

export default function AdminCropGuidePage() {
    const [formData, setFormData] = useState({
        cropId: "",
        season: "",
        growthStage: "",
        daysRange: "",
        waterDepth: "",
        temperature: "",
        guidelines: "",
        status: "Active",
    });

    const [cropGuides, setCropGuides] = useState([]);
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const seasons = ["Dry Season", "Wet Season"];
    const statuses = ["Active", "Inactive"];
    const growthStages = ["Seedling", "Vegetative", "Flowering", "Harvest"];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [guidesRes, cropsRes] = await Promise.all([
                adminService.getCropGuides(),
                adminService.getCrops(),
            ]);
            setCropGuides(guidesRes || []);
            setCrops(cropsRes || []);
            setError(null);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load data");
            setCropGuides([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            cropId: "",
            season: "",
            growthStage: "",
            daysRange: "",
            waterDepth: "",
            temperature: "",
            guidelines: "",
            status: "Active",
        });
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.cropId || !formData.season || !formData.growthStage || !formData.daysRange) {
            alert("Please fill in required fields (Crop, Season, Growth Stage, Days Range)");
            return;
        }

        try {
            setSubmitting(true);
            const payload = {
                cropId: parseInt(formData.cropId),
                season: formData.season,
                growthStage: formData.growthStage,
                daysRange: formData.daysRange,
                waterDepth: formData.waterDepth,
                temperature: formData.temperature,
                guidelines: formData.guidelines,
                status: formData.status,
            };

            if (editingId) {
                await adminService.updateCropGuide(editingId, payload);
            } else {
                await adminService.createCropGuide(payload);
            }

            resetForm();
            fetchData();
        } catch (err) {
            console.error("Error saving crop guide:", err);
            alert("Failed to save crop guide");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (guide) => {
        setFormData({
            cropId: guide.cropId || guide.crop?.id || "",
            season: guide.season || "",
            growthStage: guide.growthStage || "",
            daysRange: guide.daysRange || "",
            waterDepth: guide.waterDepth || "",
            temperature: guide.temperature || "",
            guidelines: guide.guidelines || "",
            status: guide.status || "Active",
        });
        setEditingId(guide.id);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this crop guide?")) return;
        try {
            await adminService.deleteCropGuide(id);
            fetchData();
        } catch (err) {
            console.error("Error deleting crop guide:", err);
            alert("Failed to delete");
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "active": return "bg-green-100 text-green-700";
            case "inactive": return "bg-gray-100 text-gray-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const getSeasonColor = (season) => {
        switch (season?.toLowerCase()) {
            case "dry season": return "bg-orange-100 text-orange-700";
            case "wet season": return "bg-blue-100 text-blue-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    // Filter crop guides based on search
    const filteredGuides = cropGuides.filter((guide) =>
        guide.cropName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.crop?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.growthStage?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="animate-fade-in">
                {/* Header */}
                <div className="mb-6 animate-fade-in-up">
                    <h1 className="text-2xl font-bold text-[#131613]">Crop Guides</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage growth stage guides and recommendations for different crops.
                    </p>
                </div>

                {/* Search and Controls */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6 animate-fade-in-up delay-100">
                    <div className="p-4 flex items-center justify-between gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1 max-w-md">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search crop guides..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={fetchData}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Refresh"
                            >
                                <span className="material-symbols-outlined text-gray-500">refresh</span>
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-gray-500">download</span>
                            </button>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="p-8 text-center text-gray-500">
                            <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
                            <p className="mt-2">Loading crop guides...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="p-8 text-center text-red-500">
                            <span className="material-symbols-outlined text-2xl">error</span>
                            <p className="mt-2">{error}</p>
                            <button onClick={fetchData} className="mt-2 text-primary hover:underline">
                                Try again
                            </button>
                        </div>
                    )}

                    {/* Table */}
                    {!loading && !error && (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-t border-b border-gray-100 bg-gray-50/50">
                                        <th className="text-left py-3 px-5 text-xs font-medium text-gray-400 uppercase tracking-wider">Crop</th>
                                        <th className="text-left py-3 px-5 text-xs font-medium text-gray-400 uppercase tracking-wider">Season</th>
                                        <th className="text-left py-3 px-5 text-xs font-medium text-gray-400 uppercase tracking-wider">Growth Stage</th>
                                        <th className="text-left py-3 px-5 text-xs font-medium text-gray-400 uppercase tracking-wider">Days</th>
                                        <th className="text-left py-3 px-5 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="text-right py-3 px-5 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredGuides.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="py-8 text-center text-gray-400">
                                                No crop guides found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredGuides.map((guide, index) => (
                                            <tr
                                                key={guide.id}
                                                className="border-b border-gray-50 hover:bg-gray-50 transition-colors animate-fade-in"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                            >
                                                <td className="py-4 px-5 text-sm font-medium text-[#131613]">
                                                    {guide.cropName || guide.crop?.name}
                                                </td>
                                                <td className="py-4 px-5">
                                                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getSeasonColor(guide.season)}`}>
                                                        {guide.season}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-5 text-sm text-gray-600">{guide.growthStage}</td>
                                                <td className="py-4 px-5 text-sm text-gray-500">{guide.daysRange}</td>
                                                <td className="py-4 px-5">
                                                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(guide.status)}`}>
                                                        {guide.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-5">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleEdit(guide)}
                                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                                                        >
                                                            <span className="material-symbols-outlined text-gray-400 text-lg group-hover:text-gray-600">
                                                                edit
                                                            </span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(guide.id)}
                                                            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                                        >
                                                            <span className="material-symbols-outlined text-gray-400 text-lg group-hover:text-red-500">
                                                                delete
                                                            </span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Add/Edit Form */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 animate-fade-in-up delay-200">
                    <div className="mb-5">
                        <h3 className="text-base font-bold text-[#131613]">
                            {editingId ? "Edit" : "Add New"} Crop Guide
                        </h3>
                        <p className="text-gray-400 text-xs mt-1">
                            Enter details for crop growth stage guidelines.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Row 1: Crop, Season, Growth Stage */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-2">Target Crop *</label>
                                <select
                                    name="cropId"
                                    value={formData.cropId}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Select Crop...</option>
                                    {crops.map((crop) => (
                                        <option key={crop.id} value={crop.id}>{crop.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-2">Season *</label>
                                <select
                                    name="season"
                                    value={formData.season}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Select Season...</option>
                                    {seasons.map((season) => (
                                        <option key={season} value={season}>{season}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-2">Growth Stage *</label>
                                <select
                                    name="growthStage"
                                    value={formData.growthStage}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Select Stage...</option>
                                    {growthStages.map((stage) => (
                                        <option key={stage} value={stage}>{stage}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Row 2: Days Range, Water Depth, Temperature, Status */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-2">Days Range *</label>
                                <input
                                    type="text"
                                    name="daysRange"
                                    placeholder="e.g. Day 0-14"
                                    value={formData.daysRange}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-2">Water Depth</label>
                                <input
                                    type="text"
                                    name="waterDepth"
                                    placeholder="e.g. 5 cm"
                                    value={formData.waterDepth}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-2">Temperature</label>
                                <input
                                    type="text"
                                    name="temperature"
                                    placeholder="e.g. 25-30°C"
                                    value={formData.temperature}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-2">Status *</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                                >
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Row 3: Guidelines */}
                        <div className="mb-6">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Guidelines</label>
                            <textarea
                                name="guidelines"
                                placeholder="Enter growth stage guidelines, recommendations, and best practices..."
                                value={formData.guidelines}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md btn-hover disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                                ) : (
                                    <span className="material-symbols-outlined text-lg">{editingId ? "save" : "add"}</span>
                                )}
                                {submitting ? "Saving..." : (editingId ? "Update Guide" : "Save Guide")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
