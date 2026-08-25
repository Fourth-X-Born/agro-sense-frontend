import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Creates an axios instance that attaches the given localStorage token key
// as a Bearer token, and redirects to loginPath on 401. Farmer and admin
// sessions are kept fully separate (different tokens, different redirects)
// so an admin login never accidentally authenticates farmer requests or
// vice versa.
function createApiClient(tokenKey, userKey, loginPath) {
    const client = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    client.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem(tokenKey);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    client.interceptors.response.use(
        (response) => response.data,
        (error) => {
            console.error('API Error:', error.response?.data || error.message);

            if (error.response?.status === 401) {
                localStorage.removeItem(tokenKey);
                localStorage.removeItem(userKey);
                window.location.href = loginPath;
            }

            return Promise.reject(error.response?.data || error);
        }
    );

    return client;
}

// Farmer-facing client
const api = createApiClient('authToken', 'user', '/login');

// Admin-facing client — separate token/session from the farmer client above
export const adminApi = createApiClient('adminToken', 'admin', '/admin/login');

export default api;
