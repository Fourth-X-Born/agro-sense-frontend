import api from "./api";

const register = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

export default {
    register,
};
