import authService from "../services/authService";

export default function ProfileSettingsPage() {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();
    const [activeTab, setActiveTab] = useState("profile");
    const [formData, setFormData] = useState({
        fullName: user ? user.name : "Ruwan Perera",
        email: user ? user.email : "ruwan.p@example.com",
        phone: user && user.phone ? user.phone : "77 123 4567",
        language: "English",
        district: user ? user.district : "Polonnaruwa",
        primaryCrop: user && user.crop ? user.crop : "Paddy (Rice)"
    });
    const [selectedSecondaryCrops, setSelectedSecondaryCrops] = useState(["Vegetables"]);

    const secondaryCropOptions = [
        { name: "Maize", icon: "grass" },
        { name: "Vegetables", icon: "nutrition" },
        { name: "Fruits", icon: "local_florist" },
        { name: "Spices", icon: "eco" }
    ];

    const toggleSecondaryCrop = (crop) => {
        if (selectedSecondaryCrops.includes(crop)) {
            setSelectedSecondaryCrops(selectedSecondaryCrops.filter(c => c !== crop));
        } else if (selectedSecondaryCrops.length < 3) {
            setSelectedSecondaryCrops([...selectedSecondaryCrops, crop]);
        }
    };

    const districts = [
        "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
        "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
        "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
        "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
        "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
    ];

    return (
        <div className="min-h-screen bg-[#f6f8f6] flex flex-col">
            {/* Dashboard Navbar */}
            <DashboardNavbar />

            {/* Page Header */}
            <div className="bg-gray-100 border-b border-gray-200">
                <div className="max-w-[1200px] mx-auto px-6 py-5">
                    <h1 className="text-xl font-bold text-[#131613]">Settings</h1>
                    <p className="text-gray-500 text-sm">Manage your account settings and preferences.</p>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-6 animate-fade-in-up">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Sidebar */}
                    <div className="lg:w-64 flex-shrink-0 animate-fade-in-left delay-100">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-20">
                            {/* Profile Header */}
                            <div className="p-4 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-[#131613]">{user ? user.name : "Ruwan Perera"}</p>
                                        <span className="text-[10px] text-primary font-medium">Pro Plan</span>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Menu */}
                            <div className="p-2">
                                <button
                                    onClick={() => setActiveTab("profile")}
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activeTab === "profile" ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-base">person</span>
                                    Profile
                                </button>
                                <button
                                    onClick={() => setActiveTab("farm")}
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activeTab === "farm" ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-base">agriculture</span>
                                    Farm Details
                                </button>
                                <button
                                    onClick={() => setActiveTab("security")}
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activeTab === "security" ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-base">lock</span>
                                    Security
                                </button>
                                <button
                                    onClick={() => setActiveTab("language")}
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activeTab === "language" ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-base">language</span>
                                    Language
                                </button>
                            </div>

                            {/* Logout */}
                            <div className="p-2 border-t border-gray-100">
                                <button
                                    onClick={() => navigate("/")}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-base">logout</span>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 animate-fade-in-right delay-200">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md">
                            {/* Content Header */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                <div>
                                    <h2 className="text-base font-bold text-[#131613]">Profile Information</h2>
                                    <p className="text-xs text-gray-500">Update your personal details and agricultural preferences.</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                        Cancel
                                    </button>
                                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors shadow-sm hover:shadow hover:-translate-y-0.5">
                                        Save Changes
                                    </button>
                                </div>
                            </div>

                            {/* Form Content */}
                            <div className="p-5 space-y-6">
                                {/* Personal Details */}
                                <div className="animate-fade-in-up delay-300">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-primary text-base">badge</span>
                                        <span className="text-sm font-semibold text-[#131613]">Personal Details</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Full Name */}
                                        <div>
                                            <label className="text-[10px] font-medium text-gray-500 block mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-xs text-[#131613] focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>

                                        {/* Email Address */}
                                        <div>
                                            <label className="text-[10px] font-medium text-gray-500 block mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-xs text-[#131613] focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>

                                        {/* Phone Number */}
                                        <div>
                                            <label className="text-[10px] font-medium text-gray-500 block mb-1">Phone Number</label>
                                            <div className="flex">
                                                <span className="h-10 px-3 flex items-center bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg text-xs text-gray-500">+94</span>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="flex-1 h-10 px-3 rounded-r-lg border border-gray-200 text-xs text-[#131613] focus:outline-none focus:border-primary transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Preferred Language */}
                                        <div>
                                            <label className="text-[10px] font-medium text-gray-500 block mb-1">Preferred Language</label>
                                            <select
                                                value={formData.language}
                                                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-xs text-[#131613] focus:outline-none focus:border-primary bg-white transition-colors"
                                            >
                                                <option value="Sinhala">Sinhala</option>
                                                <option value="Tamil">Tamil</option>
                                                <option value="English">English</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Agricultural Context */}
                                <div className="pt-4 border-t border-gray-100 animate-fade-in-up delay-500">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-primary text-base">trending_up</span>
                                        <span className="text-sm font-semibold text-[#131613]">Agricultural Context</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        {/* Farming District */}
                                        <div>
                                            <label className="text-[10px] font-medium text-gray-500 block mb-1">Farming District</label>
                                            <select
                                                value={formData.district}
                                                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-xs text-[#131613] focus:outline-none focus:border-primary bg-white transition-colors"
                                            >
                                                {districts.map(d => (
                                                    <option key={d} value={d}>{d}</option>
                                                ))}
                                            </select>
                                            <p className="text-[9px] text-gray-400 mt-1">This helps us provide localized weather and soil advisory.</p>
                                        </div>

                                        {/* Primary Crop */}
                                        <div>
                                            <label className="text-[10px] font-medium text-gray-500 block mb-1">Primary Crop</label>
                                            <select
                                                value={formData.primaryCrop}
                                                onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
                                                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-xs text-[#131613] focus:outline-none focus:border-primary bg-white transition-colors"
                                            >
                                                <option value="Paddy (Rice)">Paddy (Rice)</option>
                                                <option value="Vegetables">Vegetables</option>
                                                <option value="Tea">Tea</option>
                                                <option value="Coconut">Coconut</option>
                                                <option value="Rubber">Rubber</option>
                                            </select>
                                            <p className="text-[9px] text-primary mt-1 flex items-center gap-0.5">
                                                <span className="material-symbols-outlined text-xs">info</span>
                                                AI advisory will update based on this selection.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Secondary Crops */}
                                    <div>
                                        <label className="text-[10px] font-medium text-gray-500 block mb-2">Secondary Crops (Select up to 3)</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {secondaryCropOptions.map((crop) => (
                                                <button
                                                    key={crop.name}
                                                    onClick={() => toggleSecondaryCrop(crop.name)}
                                                    className={`relative p-4 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 ${selectedSecondaryCrops.includes(crop.name)
                                                        ? "border-primary bg-primary/5"
                                                        : "border-gray-200 hover:border-gray-300"
                                                        }`}
                                                >
                                                    {selectedSecondaryCrops.includes(crop.name) && (
                                                        <span className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center animate-scale-in">
                                                            <span className="material-symbols-outlined text-white text-xs">check</span>
                                                        </span>
                                                    )}
                                                    <span className={`material-symbols-outlined text-2xl mb-2 ${selectedSecondaryCrops.includes(crop.name) ? "text-primary" : "text-gray-400"
                                                        }`}>{crop.icon}</span>
                                                    <p className="text-xs font-medium text-[#131613]">{crop.name}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Security */}
                                <div className="pt-4 border-t border-gray-100 animate-fade-in-up delay-700">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-primary text-base">shield</span>
                                        <span className="text-sm font-semibold text-[#131613]">Security</span>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100">
                                        <div>
                                            <p className="text-xs font-medium text-[#131613]">Password</p>
                                            <p className="text-[10px] text-gray-400">Last changed 3 months ago</p>
                                        </div>
                                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-white transition-colors">
                                            Change Password
                                        </button>
                                    </div>
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
