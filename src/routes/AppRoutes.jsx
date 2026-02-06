import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import CropRiskPage from "../pages/CropRiskPage";
import WeatherPage from "../pages/WeatherPage";
import MarketPricesPage from "../pages/MarketPricesPage";
import CropGuidePage from "../pages/CropGuidePage";
import ProfileSettingsPage from "../pages/ProfileSettingsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/crop-risk" element={<CropRiskPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/market-prices" element={<MarketPricesPage />} />
        <Route path="/crop-guide" element={<CropGuidePage />} />
        <Route path="/settings" element={<ProfileSettingsPage />} />
      </Route>
    </Routes>
  );
}
