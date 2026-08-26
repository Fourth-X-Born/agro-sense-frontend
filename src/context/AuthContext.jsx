import { useCallback, useEffect, useState } from "react";
import authService from "../services/authService";
import { AuthContext } from "./authContextObject";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => authService.getCurrentUser());

    const refreshUser = useCallback(() => {
        setUser(authService.getCurrentUser());
    }, []);

    useEffect(() => {
        window.addEventListener("storage", refreshUser);
        window.addEventListener("userUpdated", refreshUser);
        return () => {
            window.removeEventListener("storage", refreshUser);
            window.removeEventListener("userUpdated", refreshUser);
        };
    }, [refreshUser]);

    const login = async (email, password) => {
        const response = await authService.login(email, password);
        refreshUser();
        return response;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
