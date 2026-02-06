import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import ricePlantImg from "../assets/images/rice-plant-white-background-vector-eps-10_638232-733-removebg-preview.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await authService.login({
        identifier: formData.email,
        password: formData.password
      });
      // alert("Login successful!"); // Optional: Remove for smoother UX
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed: " + (error.response?.data?.message || "Invalid credentials"));
    }
  };

  return (
    <div className="h-screen bg-[#f6f8f6] flex items-center justify-center overflow-hidden relative p-6">
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        {/* Plants - Same as AuthPage/RegisterPage for consistency */}
        <div className="absolute left-0 bottom-0 flex items-end">
          <img src={ricePlantImg} alt="" className="h-[280px] opacity-35" style={{ animation: 'sway 2.5s ease-in-out infinite', transformOrigin: 'bottom center' }} />
          <img src={ricePlantImg} alt="" className="h-[200px] opacity-25 -ml-7" style={{ animation: 'sway 3.8s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.2s' }} />
        </div>
        <div className="absolute right-0 bottom-0 flex items-end flex-row-reverse">
          <img src={ricePlantImg} alt="" className="h-[260px] opacity-32 -scale-x-100" style={{ animation: 'sway 2.7s ease-in-out infinite', transformOrigin: 'bottom center' }} />
          <img src={ricePlantImg} alt="" className="h-[170px] opacity-22 -mr-6" style={{ animation: 'sway 3.6s ease-in-out infinite', transformOrigin: 'bottom center', animationDelay: '0.2s' }} />
        </div>
      </div>

      {/* Language Selector */}
      <div className="absolute top-4 right-6 z-20">
        <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-800 transition-colors">
          <span className="material-symbols-outlined text-base">language</span>
          <span>English</span>
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="flex w-full max-w-[800px] bg-white rounded-xl shadow-xl overflow-visible animate-scale-in">
        {/* Left Panel - Image */}
        <div className="hidden md:flex w-[40%] relative rounded-l-xl overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmmGx_UK2Sn0RjgbliD7Mhm8e5NPtL46cRSRmXqCkhXQq78dK83dXaB_6sZTNkfsf6T1tZP6CzhtfY5LR1fPjJqJCMcXt5mjRDgBlfs5nXQc2-yo345Bk671vUXSdYdjKDh03LVhZdjzrxYCe6YQih-p6GjyLtbEOUc6GpUUW7Y1aRNxGM17AavPmsTAUMRv_rciHAV73HT_H8M-a9zNSaaeSbg5JpLMDkFV2AR3qq4c5mGGi6OhdNLquWWpIUHhbIJXwJoDsoNpU")' }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="relative z-10 flex flex-col justify-between p-5 h-full">
            <div className="flex items-center gap-1.5">
              <span className="text-white text-sm font-bold">Agro<span className="text-primary">Sense</span> AI</span>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-white text-xl font-bold leading-tight">Welcome Back, Farmer!</h2>
              <p className="text-gray-200 text-xs leading-relaxed">Access your personalized farming insights and continue growing smarter.</p>
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
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-[#131613] text-sm font-bold">Agro<span className="text-primary">Sense</span> AI</span>
            </div>
            <h1 className="text-xl font-bold text-[#131613]">Welcome back</h1>
            <p className="text-gray-500 text-xs mt-1">Sign in to continue your farming journey.</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-4">
            <div className="flex-1 text-center py-2 text-xs font-medium border-b-2 text-primary border-primary">Login</div>
            <Link to="/register" className="flex-1 text-center py-2 text-xs font-medium border-b-2 text-gray-500 hover:text-gray-700 border-transparent">Register</Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#131613]">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">mail</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. person@gmail.com"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full h-9 pl-9 pr-9 rounded-lg border-2 border-gray-300 text-xs focus:outline-none focus:border-primary"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <span className="material-symbols-outlined text-base">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end -mt-2">
              <a href="#" className="text-[11px] text-primary font-medium hover:underline">Forgot password?</a>
            </div>

            <button type="submit" className="w-full h-9 rounded-lg bg-primary text-white text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-colors">
              Login <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </form>

          <p className="text-center text-[11px] text-gray-400 mt-3">
            Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </div>

      <div className="absolute bottom-2 left-0 right-0 text-center text-[11px] text-gray-400">
        © 2026 <span className="font-semibold"><span className="text-gray-500">Agro</span><span className="text-primary">Sense</span> AI</span>. All rights reserved.
      </div>
    </div>
  );
}
