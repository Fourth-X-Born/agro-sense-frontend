import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('agrosense_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('agrosense_user');
            }
        }
        setLoading(false);
    }, []);

    // Save user to localStorage when it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('agrosense_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('agrosense_user');
        }
    }, [user]);

    const login = async (email, password) => {
        const response = await authAPI.login(email, password);
        if (response.success && response.data) {
            setUser(response.data);
            return response.data;
        }
        throw new Error(response.message || 'Login failed');
    };

    const register = async (userData) => {
        const response = await authAPI.register(userData);
        if (response.success && response.data) {
            setUser(response.data);
            return response.data;
        }
        throw new Error(response.message || 'Registration failed');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('agrosense_user');
    };

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
