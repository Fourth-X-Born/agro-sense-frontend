import api from "./api";

const getDistricts = async () => {
    const response = await api.get("/districts");
    return response.data.data;
};

export default {
    getDistricts,
};
