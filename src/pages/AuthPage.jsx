import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { masterDataAPI } from "../services/api";
import ricePlantImg from "../assets/images/rice-plant-white-background-vector-eps-10_638232-733-removebg-preview.png";

export default function AuthPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { login, register, isAuthenticated } = useAuth();
    const isLogin = location.pathname === "/login";

    // Form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // District state
    const [districtOpen, setDistrictOpen] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const dropdownRef = useRef(null);

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    // Fetch districts on mount
    useEffect(() => {
        const fetchDistricts = async () => {
            setLoadingDistricts(true);
            try {
                const response = await masterDataAPI.getDistricts();
                if (response.success && response.data) {
                    setDistricts(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch districts:", err);
                // Fallback to hardcoded districts if API fails
                setDistricts([
                    { id: 1, name: "Ampara" }, { id: 2, name: "Anuradhapura" }, { id: 3, name: "Badulla" },
                    { id: 4, name: "Batticaloa" }, { id: 5, name: "Colombo" }, { id: 6, name: "Galle" },
                    { id: 7, name: "Gampaha" }, { id: 8, name: "Hambantota" }, { id: 9, name: "Jaffna" },
                    { id: 10, name: "Kalutara" }, { id: 11, name: "Kandy" }, { id: 12, name: "Kegalle" },
                    { id: 13, name: "Kilinochchi" }, { id: 14, name: "Kurunegala" }, { id: 15, name: "Mannar" },
                    { id: 16, name: "Matale" }, { id: 17, name: "Matara" }, { id: 18, name: "Monaragala" },
                    { id: 19, name: "Mullaitivu" }, { id: 20, name: "Nuwara Eliya" }, { id: 21, name: "Polonnaruwa" },
                    { id: 22, name: "Puttalam" }, { id: 23, name: "Ratnapura" }, { id: 24, name: "Trincomalee" },
                    { id: 25, name: "Vavuniya" }
                ]);
            } finally {
                setLoadingDistricts(false);
            }
        };
        fetchDistricts();
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDistrictOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Clear error when switching forms
    useEffect(() => {
        setError("");
    }, [isLogin]);

    const switchToLogin = () => navigate("/login");
    const switchToRegister = () => navigate("/register");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!selectedDistrict) {
            setError("Please select your district");
            return;
        }

        setLoading(true);

        try {
            await register({
                name: fullName,
                email,
                password,
                districtId: selectedDistrict.id,
            });
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-[#f6f8f6] flex items-center justify-center overflow-hidden relative p-6">
            {/* Animated Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Subtle gradient ambient */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

                {/* Left Side Plants - Dense cluster */}
                <div className="absolute left-0 bottom-0 flex items-end">
                    <img src={ricePlantImg} alt="" className="h-[280px] opacity-35"
                        style={{ animation: 'sway 2.5s ease-in-out infinite', transformOrigin: 'bottom center' }} />
                    <img src={ricePlantImg} alt="" className="h-[220px] opacity-28 -ml-8"
                        style={{ animation: 'sway 3.2s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.3s' }} />
                    <img src={ricePlantImg} alt="" className="h-[180px] opacity-22 -scale-x-100 -ml-6"
                        style={{ animation: 'sway 2.8s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.7s' }} />
                    <img src={ricePlantImg} alt="" className="h-[250px] opacity-30 -ml-10"
                        style={{ animation: 'sway 3.5s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.5s' }} />
                    <img src={ricePlantImg} alt="" className="h-[160px] opacity-20 -scale-x-100 -ml-5"
                        style={{ animation: 'sway 2.4s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.9s' }} />
                    <img src={ricePlantImg} alt="" className="h-[200px] opacity-25 -ml-7"
                        style={{ animation: 'sway 3.8s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.2s' }} />
                    <img src={ricePlantImg} alt="" className="h-[140px] opacity-18 -scale-x-100 -ml-4"
                        style={{ animation: 'sway 2.6s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '1.1s' }} />
                    <img src={ricePlantImg} alt="" className="h-[120px] opacity-15 -ml-3"
                        style={{ animation: 'sway 3.1s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.4s' }} />
                    <img src={ricePlantImg} alt="" className="h-[100px] opacity-12 -scale-x-100 -ml-2"
                        style={{ animation: 'sway 4.0s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.8s' }} />
                </div>

                {/* Right Side Plants - Dense cluster */}
                <div className="absolute right-0 bottom-0 flex items-end flex-row-reverse">
                    <img src={ricePlantImg} alt="" className="h-[260px] opacity-32 -scale-x-100"
                        style={{ animation: 'sway 2.7s ease-in-out infinite', transformOrigin: 'bottom center' }} />
                    <img src={ricePlantImg} alt="" className="h-[200px] opacity-26 -mr-8"
                        style={{ animation: 'sway 3.3s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.4s' }} />
                    <img src={ricePlantImg} alt="" className="h-[240px] opacity-30 -scale-x-100 -mr-9"
                        style={{ animation: 'sway 2.9s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.6s' }} />
                    <img src={ricePlantImg} alt="" className="h-[170px] opacity-22 -mr-6"
                        style={{ animation: 'sway 3.6s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.2s' }} />
                    <img src={ricePlantImg} alt="" className="h-[190px] opacity-24 -scale-x-100 -mr-7"
                        style={{ animation: 'sway 2.5s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.8s' }} />
                    <img src={ricePlantImg} alt="" className="h-[150px] opacity-20 -mr-5"
                        style={{ animation: 'sway 4.2s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.1s' }} />
                    <img src={ricePlantImg} alt="" className="h-[220px] opacity-28 -scale-x-100 -mr-8"
                        style={{ animation: 'sway 3.0s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '1.0s' }} />
                    <img src={ricePlantImg} alt="" className="h-[130px] opacity-16 -mr-4"
                        style={{ animation: 'sway 3.4s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.5s' }} />
                    <img src={ricePlantImg} alt="" className="h-[110px] opacity-14 -scale-x-100 -mr-3"
                        style={{ animation: 'sway 2.8s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.9s' }} />
                </div>
            </div>
            {/* Language Selector - Positioned Absolute */}
            <div className="absolute top-4 right-6 z-20">
                <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-800 transition-colors">
                    <span className="material-symbols-outlined text-base">language</span>
                    <span>English</span>
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
            </div>

            {/* Main Card - Centered */}
            <div className="flex w-full max-w-[800px] bg-white rounded-xl shadow-xl overflow-visible animate-scale-in">
                {/* Left Panel - Image */}
                <div className="hidden md:flex w-[40%] relative rounded-l-xl overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmmGx_UK2Sn0RjgbliD7Mhm8e5NPtL46cRSRmXqCkhXQq78dK83dXaB_6sZTNkfsf6T1tZP6CzhtfY5LR1fPjJqJCMcXt5mjRDgBlfs5nXQc2-yo345Bk671vUXSdYdjKDh03LVhZdjzrxYCe6YQih-p6GjyLtbEOUc6GpUUW7Y1aRNxGM17AavPmsTAUMRv_rciHAV73HT_H8M-a9zNSaaeSbg5JpLMDkFV2AR3qq4c5mGGi6OhdNLquWWpIUHhbIJXwJoDsoNpU")'
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="relative z-10 flex flex-col justify-between p-5 h-full">
                        <div className="flex items-center gap-1.5">
                            <span className="text-white text-sm font-bold">Agro<span className="text-primary">Sense</span> AI</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-white text-xl font-bold leading-tight transition-all duration-500">
                                {isLogin ? "Welcome Back, Farmer!" : "Empowering Sri Lankan Agriculture"}
                            </h2>
                            <p className="text-gray-200 text-xs leading-relaxed transition-all duration-500">
                                {isLogin
                                    ? "Access your personalized farming insights and continue growing smarter."
                                    : "Join the smart farming revolution. Get localized AI advice for better harvests."
                                }
                            </p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <div className="w-5 h-1 rounded-full bg-white"></div>
                                <div className="w-1 h-1 rounded-full bg-white/50"></div>
                                <div className="w-1 h-1 rounded-full bg-white/50"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="flex-1 p-6 rounded-r-xl bg-white">
                    {/* Header */}
                    <div className="text-center mb-6">
                        {/* Mobile/Form Logo */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <span className="text-[#131613] text-sm font-bold">Agro<span className="text-primary">Sense</span> AI</span>
                            {/* Logo Text Only */}
                        </div>

                        <h1 className="text-xl font-bold text-[#131613] transition-all duration-300">
                            {isLogin ? "Welcome back" : "Create your account"}
                        </h1>
                        <p className="text-gray-500 text-xs mt-1 transition-all duration-500">
                            {isLogin ? "Sign in to continue your farming journey." : "Start your journey to smarter farming today."}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-xs text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-4">
                        <button
                            onClick={switchToLogin}
                            className={`flex-1 text-center py-2 text-xs font-medium border-b-2 transition-all duration-500 ${isLogin
                                ? "text-primary border-primary"
                                : "text-gray-500 hover:text-gray-700 border-transparent"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={switchToRegister}
                            className={`flex-1 text-center py-2 text-xs font-medium border-b-2 transition-all duration-500 ${!isLogin
                                ? "text-primary border-primary"
                                : "text-gray-500 hover:text-gray-700 border-transparent"
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Form Container with Animation - Fixed height for consistency */}
                    <div className="relative overflow-hidden h-[350px]">
                        {/* Login Form */}
                        <div className={`h-full transition-all duration-500 ease-in-out ${isLogin
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-full absolute inset-0 pointer-events-none"
                            }`}>
                            {isLogin && (
                                <form onSubmit={handleLogin} className="flex flex-col justify-center h-full gap-4">
                                    {/* Email */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-medium text-[#131613]">Email</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">mail</span>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="e.g. person@gmail.com"
                                                required
                                                className="w-full h-9 pl-9 pr-3 rounded-lg border-2 border-gray-300 text-xs focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-medium text-[#131613]">Password</label>
                                        <div className="relative flex items-center">
                                            <span className="material-symbols-outlined absolute left-3 text-gray-400 text-base">lock</span>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter your password"
                                                required
                                                className="w-full h-9 pl-9 pr-9 rounded-lg border-2 border-gray-300 text-xs focus:outline-none focus:border-primary"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 flex items-center justify-center text-gray-400 hover:text-gray-600"
                                            >
                                                <span className="material-symbols-outlined text-base">
                                                    {showPassword ? "visibility_off" : "visibility"}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Forgot Password */}
                                    <div className="flex justify-end -mt-2">
                                        <a href="#" className="text-[11px] text-primary font-medium hover:underline">
                                            Forgot password?
                                        </a>
                                    </div>

                                    {/* Login Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-9 rounded-lg bg-primary text-white text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="animate-spin material-symbols-outlined text-base">progress_activity</span>
                                                Signing in...
                                            </>
                                        ) : (
                                            <>
                                                Login
                                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Register Form */}
                        <div className={`transition-all duration-500 ease-in-out ${!isLogin
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-full absolute inset-0 pointer-events-none"
                            }`}>
                            {!isLogin && (
                                <form onSubmit={handleRegister} className="flex flex-col gap-3">
                                    {/* Full Name */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-medium text-[#131613]">Full Name</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">person</span>
                                            <input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="e.g. Sunil Perera"
                                                required
                                                className="w-full h-9 pl-9 pr-3 rounded-lg border-2 border-gray-300 text-xs focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    {/* District - Custom Dropdown */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-medium text-[#131613]">District</label>
                                        <div className="relative" ref={dropdownRef}>
                                            <button
                                                type="button"
                                                onClick={() => setDistrictOpen(!districtOpen)}
                                                disabled={loadingDistricts}
                                                className="w-full h-9 pl-9 pr-8 rounded-lg border-2 border-gray-300 text-xs text-left focus:outline-none focus:border-primary bg-white cursor-pointer flex items-center"
                                            >
                                                <span className="material-symbols-outlined absolute left-3 text-gray-400 text-base">location_on</span>
                                                <span className={selectedDistrict ? "text-gray-700" : "text-gray-500"}>
                                                    {loadingDistricts ? "Loading districts..." : (selectedDistrict?.name || "Select your farming district")}
                                                </span>
                                                <span className="material-symbols-outlined absolute right-3 text-gray-400 text-base">expand_more</span>
                                            </button>

                                            {districtOpen && (
                                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto">
                                                    {districts.map((district) => (
                                                        <div
                                                            key={district.id}
                                                            onClick={() => {
                                                                setSelectedDistrict(district);
                                                                setDistrictOpen(false);
                                                            }}
                                                            className="px-3 py-1.5 text-xs text-gray-700 hover:bg-primary/10 cursor-pointer"
                                                        >
                                                            {district.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-[10px] text-gray-400">We use this to provide localized weather and soil alerts.</p>
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-medium text-[#131613]">Email</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">mail</span>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="e.g. person@gmail.com"
                                                required
                                                className="w-full h-9 pl-9 pr-3 rounded-lg border-2 border-gray-300 text-xs focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-medium text-[#131613]">Password</label>
                                        <div className="relative flex items-center">
                                            <span className="material-symbols-outlined absolute left-3 text-gray-400 text-base">lock</span>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Create a secure password"
                                                required
                                                className="w-full h-9 pl-9 pr-9 rounded-lg border-2 border-gray-300 text-xs focus:outline-none focus:border-primary"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 flex items-center justify-center text-gray-400 hover:text-gray-600"
                                            >
                                                <span className="material-symbols-outlined text-base">
                                                    {showPassword ? "visibility_off" : "visibility"}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Register Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-9 mt-1 rounded-lg bg-primary text-white text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="animate-spin material-symbols-outlined text-base">progress_activity</span>
                                                Creating account...
                                            </>
                                        ) : (
                                            <>
                                                Register Account
                                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-2 my-4">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Or continue with</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    {/* Google Button */}
                    <button className="w-full h-9 rounded-lg border border-gray-300 text-xs font-medium text-[#131613] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                    </button>

                    {/* Bottom Link */}
                    <p className="text-center text-[11px] text-gray-400 mt-3">
                        {isLogin ? (
                            <>
                                Don't have an account?{" "}
                                <button onClick={switchToRegister} className="text-primary font-medium hover:underline">Sign up</button>
                            </>
                        ) : (
                            <>
                                By clicking Register, you agree to our{" "}
                                <a href="#" className="text-primary font-medium hover:underline">Terms</a>
                                {" "}and{" "}
                                <a href="#" className="text-primary font-medium hover:underline">Privacy Policy</a>
                            </>
                        )}
                    </p>
                </div>
            </div>

            {/* Footer - Absolute Bottom */}
            <div className="absolute bottom-2 left-0 right-0 text-center text-[11px] text-gray-400">
                © 2026 <span className="font-semibold"><span className="text-gray-500">Agro</span><span className="text-primary">Sense</span> AI</span>. All rights reserved.
            </div>
        </div>
    );
}
