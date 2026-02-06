import api from "./api";

const register = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};
