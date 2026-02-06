import api from "./api";

const getDistricts = async () => {
    const response = await api.get("/districts");
    return response.data;
};

export default {
    getDistricts,
};
