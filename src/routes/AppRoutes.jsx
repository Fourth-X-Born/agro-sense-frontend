import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import LandingPage from "../pages/LandingPage";
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import CropRiskPage from "../pages/CropRiskPage";
import WeatherPage from "../pages/WeatherPage";
import MarketPricesPage from "../pages/MarketPricesPage";
import CropGuidePage from "../pages/CropGuidePage";
import ProfileSettingsPage from "../pages/ProfileSettingsPage";

// Admin Pages
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminCropsPage from "../pages/admin/AdminCropsPage";
import AdminCropGuidePage from "../pages/admin/AdminCropGuidePage";
import AdminFarmersPage from "../pages/admin/AdminFarmersPage";
import AdminFertilizerPage from "../pages/admin/AdminFertilizerPage";
import AdminMarketPricesPage from "../pages/admin/AdminMarketPricesPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/crop-risk" element={<CropRiskPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/market-prices" element={<MarketPricesPage />} />
        <Route path="/crop-guide" element={<CropGuidePage />} />
        <Route path="/settings" element={<ProfileSettingsPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/crops" element={<AdminCropsPage />} />
      <Route path="/admin/crop-guides" element={<AdminCropGuidePage />} />
      <Route path="/admin/market-prices" element={<AdminMarketPricesPage />} />
      <Route path="/admin/fertilizer" element={<AdminFertilizerPage />} />
      <Route path="/admin/farmers" element={<AdminFarmersPage />} />
    </Routes>
  );
}

