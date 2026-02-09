import api from './api';

const masterDataService = {
    getDistricts: async () => {
        try {
            const response = await api.get('/districts');
            // Check if the response matches the ApiResponse wrapper structure
            if (response.data && response.data.success) {
                return response.data.data;
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching districts:", error);
            throw error;
        }
    },
    getCrops: async () => {
        try {
            const response = await api.get('/crops');
            if (response.data && response.data.success) {
                return response.data.data;
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching crops:", error);
            throw error;
        }
    }
};

export default masterDataService;
