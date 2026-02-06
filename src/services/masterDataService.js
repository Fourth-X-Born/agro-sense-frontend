const getDistricts = async () => {
    const response = await api.get("/districts");
    return response.data.data;
};

const getCrops = async () => {
    const response = await api.get("/crops");
    return response.data.data;
};

export default {
    getDistricts,
    getCrops
};
