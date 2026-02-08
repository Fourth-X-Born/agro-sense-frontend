import api from './axiosConfig';

export const marketPriceService = {
    async getPrices(filters = {}) {
        const params = new URLSearchParams();
        if (filters.district) params.append('district', filters.district);
        if (filters.crop) params.append('crop', filters.crop);
        if (filters.date) params.append('date', filters.date);

        const response = await api.get(`/api/market-prices?${params.toString()}`);
        return response.data;
    },

    async addPrice(priceData) {
        const response = await api.post('/api/market-prices', priceData);
        return response.data;
    },
};

export default marketPriceService;
