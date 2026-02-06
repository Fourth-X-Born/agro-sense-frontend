import React from "react";
import { Link } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFooter from "../components/dashboard/DashboardFooter";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f6f8f6] flex flex-col">
      {/* Dashboard Navbar */}
      <DashboardNavbar />

      {/* Main Content */}
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-6 animate-fade-in-up">
        {/* Greeting Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="animate-fade-in-left">
            <h1 className="text-2xl font-bold text-[#131613]">Ayubowan, Sunil!</h1>
            <p className="text-gray-500 text-sm">
              Here is your farming overview for today, <span className="text-primary font-medium">Tuesday, 24 Oct.</span>
            </p>
          </div>
          <div className="flex gap-2 mt-3 md:mt-0 animate-fade-in-right delay-100">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-sm text-gray-500">location_on</span>
              Polonnaruwa
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-sm text-amber-500">star</span>
              Paddy - Yala Season
            </div>
          </div>
        </div>

        {/* Weather Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Temperature */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in delay-100 card-hover">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-500 text-xl">sunny</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-xs">Temperature</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[#131613]">32°C</span>
                  <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-medium rounded-full">Good</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rainfall Chance */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in delay-200 card-hover">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-500 text-xl">rainy</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-xs">Rainfall Chance</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[#131613]">60%</span>
                  <span className="px-2 py-0.5 bg-orange-400 text-white text-[10px] font-medium rounded-full">Normal</span>
                  <span className="text-gray-400 text-[10px]">Light Showers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Humidity */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in delay-300 card-hover">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-500 text-xl">water_drop</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-xs">Humidity</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[#131613]">78%</span>
                  <span className="px-2 py-0.5 bg-orange-500 text-white text-[10px] font-medium rounded-full">Risky</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - AI Advisory */}
          <div className="lg:col-span-2 animate-fade-in-up delay-400">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg animate-pulse-subtle">add</span>
                  <span className="font-semibold text-sm text-[#131613]">AI Advisory Highlight</span>
                </div>
                <span className="px-2.5 py-1 bg-red-50 text-red-500 text-[10px] font-medium rounded-full border border-red-200 animate-pulse">
                  Urgent Action
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-[40%] h-48 md:h-auto overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Crop field"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-bold text-[#131613] mb-2">High Pest Risk Detected</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">
                    Based on the recent humidity levels of 78% and consistent cloud cover, our models predict a high risk of Brown Plant Hopper infestation in your area.
                  </p>

                  {/* Recommended Action */}
                  <div className="bg-amber-50 border-l-3 border-amber-400 p-3 rounded-r mb-4">
                    <p className="text-xs text-gray-700">
                      <span className="text-amber-600 font-semibold">Recommended Action:</span> Apply organic neem spray within the next 24 hours to prevent outbreak spread. Monitor water levels closely.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Link to="/crop-risk" className="px-4 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg btn-hover">
                      Read Full Analysis
                    </Link>
                    <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Market Trends */}
          <div className="space-y-4 animate-fade-in-up delay-500">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-lg">bolt</span>
                <span className="font-semibold text-sm text-[#131613]">Quick Actions</span>
              </div>

              <div className="space-y-3">
                <Link to="/crop-risk" className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all group card-interactive">
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-gray-600 text-lg">photo_camera</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-medium text-[#131613]">Analyze Crop Risk</p>
                    <p className="text-[10px] text-gray-400">Upload a photo for diagnosis</p>
                  </div>
                  <span className="material-symbols-outlined text-gray-400 text-sm group-hover:text-gray-600 group-hover:translate-x-1 transition-transform">chevron_right</span>
                </Link>

                <Link to="/market-prices" className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all group card-interactive">
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-gray-600 text-lg">shopping_cart</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-medium text-[#131613]">View Market Prices</p>
                    <p className="text-[10px] text-gray-400">Check current vegetable rates</p>
                  </div>
                  <span className="material-symbols-outlined text-gray-400 text-sm group-hover:text-gray-600 group-hover:translate-x-1 transition-transform">chevron_right</span>
                </Link>
              </div>
            </div>

            {/* Market Trends */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-sm text-[#131613]">Market Trends</span>
                <Link to="/market-prices" className="text-primary text-xs font-medium hover:underline">View All</Link>
              </div>

              <div className="space-y-3">
                {/* Tomato */}
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg">🍅</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-[#131613]">Tomato</p>
                    <p className="text-[10px] text-gray-400">Dambulla Market</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#131613]">Rs. 180</p>
                    <p className="text-[10px] text-green-500 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-xs">trending_up</span>
                      +5%
                    </p>
                  </div>
                </div>

                {/* Carrot */}
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg">🥕</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-[#131613]">Carrot</p>
                    <p className="text-[10px] text-gray-400">Nuwara Eliya</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#131613]">Rs. 220</p>
                    <p className="text-[10px] text-red-500 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-xs">trending_down</span>
                      -2%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Farming News */}
        <div className="mt-8 animate-fade-in-up delay-700">
          <h2 className="text-lg font-bold text-[#131613] mb-4">Latest Farming News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* News Card 1 */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 card-interactive card-hover">
              <div className="h-40 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Farming tractor"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4">
                <span className="text-primary text-[10px] font-medium">Government Scheme</span>
                <h3 className="text-sm font-semibold text-[#131613] mt-1 mb-2">New Fertilizer Subsidy Announced for Paddy Farmers</h3>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  The Ministry of Agriculture has released new guidelines for the Yala season subsidy...
                </p>
              </div>
            </div>

            {/* News Card 2 */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 card-interactive card-hover delay-100">
              <div className="h-40 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Soil health"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4">
                <span className="text-primary text-[10px] font-medium">Soil Health</span>
                <h3 className="text-sm font-semibold text-[#131613] mt-1 mb-2">5 Tips to Maintain Soil pH During Heavy Rains</h3>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  Heavy rainfall can drastically alter soil composition. Here is how you can manage...
                </p>
              </div>
            </div>

            {/* News Card 3 */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 card-interactive card-hover delay-200">
              <div className="h-40 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Tech update"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4">
                <span className="text-primary text-[10px] font-medium">Tech Update</span>
                <h3 className="text-sm font-semibold text-[#131613] mt-1 mb-2">AgriAI Mobile App Update v2.4 Released</h3>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  New offline capabilities for crop scanning and faster market price updates now available.
                </p>
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
