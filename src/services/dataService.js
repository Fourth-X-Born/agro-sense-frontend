import api from './api';

// Public Data Service for fetching data
const dataService = {
    // Get all crops (public)
    getCrops: async () => {
        const response = await api.get('/crops');
        return response;
    },

    // Get all districts (public)
    getDistricts: async () => {
        const response = await api.get('/districts');
        return response;
    },

    // Get market prices with optional filters (public endpoint)
    getMarketPrices: async (cropId = null, districtId = null) => {
        const params = new URLSearchParams();
        if (cropId) params.append('cropId', cropId);
        if (districtId) params.append('districtId', districtId);
        const query = params.toString();
        const url = query ? `/market-prices?${query}` : '/market-prices';
        const response = await api.get(url);
        return response;
    },

    // Get fertilizer recommendations with optional filters (public endpoint)
    getFertilizers: async (cropId = null, type = null) => {
        const params = new URLSearchParams();
        if (cropId) params.append('cropId', cropId);
        if (type) params.append('type', type);
        const query = params.toString();
        const url = query ? `/fertilizers?${query}` : '/fertilizers';
        const response = await api.get(url);
        return response;
    },

    // Get user profile
    getProfile: async (farmerId) => {
        const response = await api.get(`/profile/get?farmerId=${farmerId}`);
        return response;
    },

    // Update user profile
    updateProfile: async (farmerId, profileData) => {
        const response = await api.put(`/profile/update?farmerId=${farmerId}`, profileData);
        return response;
    },

    // ==================== CROP GUIDE ====================
    // Get crop guide by cropId (public endpoint)
    getCropGuide: async (cropId) => {
        const response = await api.get(`/crop-guide/${cropId}`);
        return response;
    },

    // ==================== WEATHER ====================
    // Get weather data for a district
    getWeather: async (districtId) => {
        const response = await api.get(`/weather?districtId=${districtId}`);
        return response;
    },

    // Get 7-day forecast for a district
    getForecast: async (districtId) => {
        const response = await api.get(`/weather/forecast?districtId=${districtId}`);
        return response;
    },

    // Get weather alerts for a district
    getWeatherAlerts: async (districtId) => {
        const response = await api.get(`/weather/alerts?districtId=${districtId}`);
        return response;
    },

    // ==================== RISK ANALYSIS ====================
    // Analyze crop risk based on crop and district
    analyzeRisk: async (cropId, districtId, farmerId = null) => {
        const response = await api.post('/risk/analyze', {
            cropId,
            districtId,
            farmerId
        });
        return response;
    },

    // Get risk analysis history for a farmer
    getRiskHistory: async (farmerId) => {
        const response = await api.get(`/risk/history?farmerId=${farmerId}`);
        return response;
    },

    // Upload profile photo
    uploadProfilePhoto: async (farmerId, file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post(`/profile/photo/upload?farmerId=${farmerId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    },

    // Delete profile photo
    deleteProfilePhoto: async (farmerId) => {
        const response = await api.delete(`/profile/photo/delete?farmerId=${farmerId}`);
        return response;
    },

    // Change password
    changePassword: async (farmerId, currentPassword, newPassword) => {
        const response = await api.put(`/profile/change-password?farmerId=${farmerId}`, {
            currentPassword,
            newPassword
        });
        return response;
    },
};

export default dataService;
