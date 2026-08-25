import { adminApi } from './api';

// Admin Service for CRUD operations
const adminService = {
    // ==================== CROPS ====================
    getCrops: async () => {
        const response = await adminApi.get('/admin/crops');
        return response;
    },

    createCrop: async (cropData) => {
        const response = await adminApi.post('/admin/crops', cropData);
        return response;
    },

    updateCrop: async (id, cropData) => {
        const response = await adminApi.put(`/admin/crops/${id}`, cropData);
        return response;
    },

    deleteCrop: async (id) => {
        const response = await adminApi.delete(`/admin/crops/${id}`);
        return response;
    },

    // ==================== DISTRICTS ====================
    getDistricts: async () => {
        const response = await adminApi.get('/admin/districts');
        return response;
    },

    createDistrict: async (districtData) => {
        const response = await adminApi.post('/admin/districts', districtData);
        return response;
    },

    updateDistrict: async (id, districtData) => {
        const response = await adminApi.put(`/admin/districts/${id}`, districtData);
        return response;
    },

    deleteDistrict: async (id) => {
        const response = await adminApi.delete(`/admin/districts/${id}`);
        return response;
    },

    // ==================== MARKET PRICES ====================
    getMarketPrices: async () => {
        const response = await adminApi.get('/admin/market-prices');
        return response;
    },

    createMarketPrice: async (priceData) => {
        const response = await adminApi.post('/admin/market-prices', priceData);
        return response;
    },

    updateMarketPrice: async (id, priceData) => {
        const response = await adminApi.put(`/admin/market-prices/${id}`, priceData);
        return response;
    },

    deleteMarketPrice: async (id) => {
        const response = await adminApi.delete(`/admin/market-prices/${id}`);
        return response;
    },

    // ==================== FERTILIZERS ====================
    getFertilizers: async () => {
        const response = await adminApi.get('/admin/fertilizers');
        return response;
    },

    createFertilizer: async (fertilizerData) => {
        const response = await adminApi.post('/admin/fertilizers', fertilizerData);
        return response;
    },

    updateFertilizer: async (id, fertilizerData) => {
        const response = await adminApi.put(`/admin/fertilizers/${id}`, fertilizerData);
        return response;
    },

    deleteFertilizer: async (id) => {
        const response = await adminApi.delete(`/admin/fertilizers/${id}`);
        return response;
    },

    // ==================== GROWTH STAGES ====================
    getGrowthStages: async () => {
        const response = await adminApi.get('/admin/growth-stages');
        return response;
    },

    // ==================== CROP GUIDES ====================
    getCropGuides: async () => {
        const response = await adminApi.get('/admin/crop-guidelines');
        return response;
    },

    createCropGuide: async (guideData) => {
        const response = await adminApi.post('/admin/crop-guidelines', guideData);
        return response;
    },

    updateCropGuide: async (id, guideData) => {
        const response = await adminApi.put(`/admin/crop-guidelines/${id}`, guideData);
        return response;
    },

    deleteCropGuide: async (id) => {
        const response = await adminApi.delete(`/admin/crop-guidelines/${id}`);
        return response;
    },

    // ==================== FARMERS ====================
    getFarmers: async () => {
        const response = await adminApi.get('/admin/farmers');
        return response;
    },

    // ==================== CONTACT MESSAGES ====================
    getContactMessages: async () => {
        const response = await adminApi.get('/admin/contact-messages');
        return response;
    },

    getContactMessageStats: async () => {
        const response = await adminApi.get('/admin/contact-messages/stats');
        return response;
    },

    getContactMessage: async (id) => {
        const response = await adminApi.get(`/admin/contact-messages/${id}`);
        return response;
    },

    updateContactMessage: async (id, data) => {
        const response = await adminApi.put(`/admin/contact-messages/${id}`, data);
        return response;
    },

    deleteContactMessage: async (id) => {
        const response = await adminApi.delete(`/admin/contact-messages/${id}`);
        return response;
    },
};

export default adminService;
