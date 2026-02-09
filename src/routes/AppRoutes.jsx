import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import LandingPage from "../pages/LandingPage";
import AuthPage from "../pages/AuthPage";
import ProfileCompletionPage from "../pages/ProfileCompletionPage";
import DashboardPage from "../pages/DashboardPage";
import CropRiskPage from "../pages/CropRiskPage";
import WeatherPage from "../pages/WeatherPage";
import MarketPricesPage from "../pages/MarketPricesPage";
import CropGuidePage from "../pages/CropGuidePage";
import ProfileSettingsPage from "../pages/ProfileSettingsPage";

// Admin Pages
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminCropsPage from "../pages/admin/AdminCropsPage";
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
        <Route path="/complete-profile" element={<ProtectedRoute><ProfileCompletionPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/crop-risk" element={<ProtectedRoute><CropRiskPage /></ProtectedRoute>} />
        <Route path="/weather" element={<ProtectedRoute><WeatherPage /></ProtectedRoute>} />
        <Route path="/market-prices" element={<ProtectedRoute><MarketPricesPage /></ProtectedRoute>} />
        <Route path="/crop-guide" element={<ProtectedRoute><CropGuidePage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/crops" element={<AdminCropsPage />} />
      <Route path="/admin/market-prices" element={<AdminMarketPricesPage />} />
      <Route path="/admin/fertilizer" element={<AdminFertilizerPage />} />
      <Route path="/admin/farmers" element={<AdminFarmersPage />} />
    </Routes>
  );
}

