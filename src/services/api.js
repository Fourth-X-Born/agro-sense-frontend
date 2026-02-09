import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        return Promise.reject(new Error(message));
    }
);

// Auth APIs
export const authAPI = {
    login: (email, password) => api.post('/auth/login', { identifier: email, password }),
    register: (data) => api.post('/auth/register', data),
};

// Master Data APIs
export const masterDataAPI = {
    getDistricts: () => api.get('/districts'),
    getCrops: () => api.get('/crops'),
};

// Weather APIs
export const weatherAPI = {
    getWeather: (districtId) => api.get(`/weather?districtId=${districtId}`),
    getAlerts: (districtId) => api.get(`/weather/alerts?districtId=${districtId}`),
};

// Market Price APIs
export const marketPriceAPI = {
    getAll: () => api.get('/market-prices'),
    getByCrop: (cropId) => api.get(`/market-prices?cropId=${cropId}`),
    getByDistrict: (districtId) => api.get(`/market-prices?districtId=${districtId}`),
};

// Fertilizer APIs
export const fertilizerAPI = {
    getAll: () => api.get('/fertilizers'),
    getByCrop: (cropId) => api.get(`/fertilizers?cropId=${cropId}`),
};

// Profile APIs
export const profileAPI = {
    get: (farmerId) => api.get(`/profile/get?farmerId=${farmerId}`),
    update: (farmerId, data) => api.put(`/profile/update?farmerId=${farmerId}`, data),
};

// Risk APIs
export const riskAPI = {
    analyze: (data) => api.post('/risk/analyze', data),
    getHistory: (farmerId) => api.get(`/risk/history?farmerId=${farmerId}`),
};

export default api;
