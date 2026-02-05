import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const dropdownRef = useRef(null);

  const districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDistrictOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-screen bg-[#f6f8f6] flex flex-col overflow-hidden">
      {/* Language Selector */}
      <div className="flex justify-end px-4 py-2">
        <button className="flex items-center gap-1 text-[10px] text-gray-600 hover:text-gray-800">
          <span className="material-symbols-outlined text-sm">language</span>
          <span>English</span>
          <span className="material-symbols-outlined text-xs">expand_more</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="flex w-full max-w-[720px] bg-white rounded-lg shadow-lg overflow-visible">
          {/* Left Panel - Image */}
          <div className="hidden md:flex w-[38%] relative rounded-l-lg overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmmGx_UK2Sn0RjgbliD7Mhm8e5NPtL46cRSRmXqCkhXQq78dK83dXaB_6sZTNkfsf6T1tZP6CzhtfY5LR1fPjJqJCMcXt5mjRDgBlfs5nXQc2-yo345Bk671vUXSdYdjKDh03LVhZdjzrxYCe6YQih-p6GjyLtbEOUc6GpUUW7Y1aRNxGM17AavPmsTAUMRv_rciHAV73HT_H8M-a9zNSaaeSbg5JpLMDkFV2AR3qq4c5mGGi6OhdNLquWWpIUHhbIJXwJoDsoNpU")'
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="relative z-10 flex flex-col justify-between p-4 h-full">
              <div className="flex items-center gap-1">
                <span className="text-white text-xs font-bold">Agro<span className="text-green-400">Sense</span> AI</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-white text-lg font-bold leading-tight">
                  Empowering Sri Lankan Agriculture
                </h2>
                <p className="text-gray-200 text-[10px] leading-relaxed">
                  Join the smart farming revolution. Get localized AI advice for better harvests.
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-4 h-1 rounded-full bg-white"></div>
                  <div className="w-1 h-1 rounded-full bg-white/50"></div>
                  <div className="w-1 h-1 rounded-full bg-white/50"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="flex-1 p-5 rounded-r-lg bg-white">
            {/* Header */}
            <div className="text-center mb-3">
              <h1 className="text-base font-bold text-[#131613]">Create your account</h1>
              <p className="text-gray-500 text-[10px] mt-0.5">Start your journey to smarter farming today.</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-3">
              <Link to="/login" className="flex-1 text-center py-1.5 text-[10px] font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent">
                Login
              </Link>
              <div className="flex-1 text-center py-1.5 text-[10px] font-medium text-primary border-b-2 border-primary">
                Register
              </div>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-2.5">
              {/* Full Name */}
              <div className="flex flex-col gap-0.5">
                <label className="text-[9px] font-medium text-[#131613]">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">person</span>
                  <input
                    type="text"
                    placeholder="e.g. Sunil Perera"
                    className="w-full h-8 pl-8 pr-3 rounded border border-gray-300 text-[10px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* District - Custom Dropdown */}
              <div className="flex flex-col gap-0.5">
                <label className="text-[9px] font-medium text-[#131613]">District</label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDistrictOpen(!districtOpen)}
                    className="w-full h-8 pl-8 pr-7 rounded border border-gray-300 text-[10px] text-left focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white cursor-pointer flex items-center"
                  >
                    <span className="material-symbols-outlined absolute left-2 text-gray-400 text-sm">location_on</span>
                    <span className={selectedDistrict ? "text-gray-700" : "text-gray-500"}>
                      {selectedDistrict || "Select your farming district"}
                    </span>
                    <span className="material-symbols-outlined absolute right-2 text-gray-400 text-sm">expand_more</span>
                  </button>

                  {districtOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-50 max-h-40 overflow-y-auto">
                      {districts.map((district) => (
                        <div
                          key={district}
                          onClick={() => {
                            setSelectedDistrict(district);
                            setDistrictOpen(false);
                          }}
                          className="px-3 py-1.5 text-[10px] text-gray-700 hover:bg-primary/10 cursor-pointer"
                        >
                          {district}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-[8px] text-gray-400">We use this to provide localized weather and soil alerts.</p>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-0.5">
                <label className="text-[9px] font-medium text-[#131613]">Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">mail</span>
                  <input
                    type="email"
                    placeholder="e.g. person@gmail.com"
                    className="w-full h-8 pl-8 pr-3 rounded border border-gray-300 text-[10px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-0.5">
                <label className="text-[9px] font-medium text-[#131613]">Password</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-2 text-gray-400 text-sm">lock</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    className="w-full h-8 pl-8 pr-8 rounded border border-gray-300 text-[10px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 flex items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full h-8 mt-1 rounded bg-primary text-white text-[10px] font-medium flex items-center justify-center gap-1 hover:bg-primary/90 transition-colors"
              >
                Register Account
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-2 my-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-[8px] text-gray-400 uppercase tracking-wider">Or continue with</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Google Button */}
            <button className="w-full h-8 rounded border border-gray-300 text-[10px] font-medium text-[#131613] flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors">
              <svg className="w-3 h-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>

            {/* Terms */}
            <p className="text-center text-[8px] text-gray-400 mt-3">
              By clicking Register, you agree to our{" "}
              <a href="#" className="text-primary font-medium hover:underline">Terms</a>
              {" "}and{" "}
              <a href="#" className="text-primary font-medium hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-2 text-[8px] text-gray-400">
        © 2026 AgroSense AI. All rights reserved.
      </div>
    </div>
  );
}
