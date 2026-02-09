import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminFarmersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Mock data for farmers
    const allFarmers = [
        { id: "#F-1024", name: "Rajesh Kumar", email: "rajesh.k@example.com", phone: "+91 98765 43210", district: "Thanjavur", crop: "Paddy", cropColor: "bg-green-100 text-green-700" },
        { id: "#F-1025", name: "Anita Desai", email: "anita.desai@example.com", phone: "+91 98989 89898", district: "Coimbatore", crop: "Tea", cropColor: "bg-yellow-100 text-yellow-700" },
        { id: "#F-1026", name: "Suresh Menon", email: "suresh.m@example.com", phone: "+91 87654 32109", district: "Kottayam", crop: "Rubber", cropColor: "bg-orange-100 text-orange-700" },
        { id: "#F-1027", name: "Vikram Singh", email: "vikram.s@example.com", phone: "+91 76543 21098", district: "Ludhiana", crop: "Wheat", cropColor: "bg-amber-100 text-amber-700" },
        { id: "#F-1028", name: "Priya Patel", email: "priya.p@example.com", phone: "+91 65432 10987", district: "Surat", crop: "Cotton", cropColor: "bg-blue-100 text-blue-700" },
        { id: "#F-1029", name: "Amit Sharma", email: "amit.s@example.com", phone: "+91 54321 09876", district: "Jaipur", crop: "Maize", cropColor: "bg-purple-100 text-purple-700" },
        { id: "#F-1030", name: "Lakshmi Nair", email: "lakshmi.n@example.com", phone: "+91 43210 98765", district: "Thrissur", crop: "Coconut", cropColor: "bg-teal-100 text-teal-700" },
        { id: "#F-1031", name: "Ravi Reddy", email: "ravi.r@example.com", phone: "+91 32109 87654", district: "Hyderabad", crop: "Chili", cropColor: "bg-red-100 text-red-700" },
    ];

    const itemsPerPage = 5;
    const totalItems = 248; // Mock total for display

    // Filter farmers based on search
    const filteredFarmers = allFarmers.filter(
        (farmer) =>
            farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            farmer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            farmer.district.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Paginate farmers
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedFarmers = filteredFarmers.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredFarmers.length / itemsPerPage);

    return (
        <AdminLayout>
            <div className="animate-fade-in">
                {/* Header */}
                <div className="mb-6 animate-fade-in-up">
                    <h1 className="text-2xl font-bold text-[#131613]">Farmers</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        View registered farmers and their primary crop information.
                    </p>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm animate-fade-in-up delay-100">
                    {/* Search and Controls */}
                    <div className="p-4 flex items-center justify-between gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1 max-w-md">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search farmers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-gray-500">tune</span>
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-gray-500">download</span>
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-t border-b border-gray-100 bg-gray-50/50">
                                    <th className="text-left py-3 px-5 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="text-left py-3 px-5 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="text-left py-3 px-5 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="text-left py-3 px-5 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="text-left py-3 px-5 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        District
                                    </th>
                                    <th className="text-left py-3 px-5 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Primary Crop
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedFarmers.map((farmer, index) => (
                                    <tr
                                        key={farmer.id}
                                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors animate-fade-in"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <td className="py-4 px-5 text-sm text-gray-500">{farmer.id}</td>
                                        <td className="py-4 px-5 text-sm font-medium text-[#131613]">{farmer.name}</td>
                                        <td className="py-4 px-5 text-sm text-gray-500">{farmer.email}</td>
                                        <td className="py-4 px-5 text-sm text-gray-500">{farmer.phone}</td>
                                        <td className="py-4 px-5 text-sm text-gray-500">{farmer.district}</td>
                                        <td className="py-4 px-5">
                                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${farmer.cropColor}`}>
                                                {farmer.crop}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 flex items-center justify-between border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredFarmers.length)} of{" "}
                            {totalItems} results
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
