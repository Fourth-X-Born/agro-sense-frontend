import { useCallback, useEffect, useState } from "react";
import adminAuthService from "../services/adminAuthService";
import { AdminAuthContext } from "./adminAuthContextObject";

export function AdminAuthProvider({ children }) {
    const [admin, setAdmin] = useState(() => adminAuthService.getCurrentAdmin());

    const refreshAdmin = useCallback(() => {
        setAdmin(adminAuthService.getCurrentAdmin());
    }, []);

    useEffect(() => {
        window.addEventListener("storage", refreshAdmin);
        return () => window.removeEventListener("storage", refreshAdmin);
    }, [refreshAdmin]);

    const login = async (email, password) => {
        const response = await adminAuthService.login(email, password);
        refreshAdmin();
        return response;
    };

    const logout = () => {
        adminAuthService.logout();
        setAdmin(null);
    };

    const value = {
        admin,
        isAuthenticated: !!admin,
        login,
        logout,
        refreshAdmin,
    };

    return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}
