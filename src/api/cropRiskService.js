import api from './axiosConfig';

export const cropRiskService = {
    async getRisks(filters = {}) {
        const params = new URLSearchParams();
        if (filters.crop) params.append('crop', filters.crop);
        if (filters.district) params.append('district', filters.district);
        if (filters.severity) params.append('severity', filters.severity);

        const response = await api.get(`/api/crop-risks?${params.toString()}`);
        return response.data;
    },

    async addRisk(riskData) {
        const response = await api.post('/api/crop-risks', riskData);
        return response.data;
    },
};

export default cropRiskService;
