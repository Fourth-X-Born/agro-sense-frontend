import api from './axiosConfig';

// Set to true to use mock data (when backend is not running)
const USE_MOCK = false;

export const authService = {
    async register(email, password, fullName, district) {
        if (USE_MOCK) {
            // Mock registration
            const mockUser = {
                token: 'mock-jwt-token',
                userName: fullName,
                userRole: 'USER'
            };
            localStorage.setItem('user', JSON.stringify(mockUser));
            return mockUser;
        }

        const response = await api.post('/api/auth/register', {
            email,
            password,
            fullName,
            district,
        });
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    async login(email, password) {
        if (USE_MOCK) {
            // Mock login - simulate successful login
            const mockUser = {
                token: 'mock-jwt-token',
                userName: email.split('@')[0], // Use email prefix as name
                userRole: 'USER'
            };
            localStorage.setItem('user', JSON.stringify(mockUser));
            return mockUser;
        }

        const response = await api.post('/api/auth/login', {
            email,
            password,
        });
        // Store user info including JWT token
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    logout() {
        localStorage.removeItem('user');
    },

    isAuthenticated() {
        return !!localStorage.getItem('user');
    },

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    getToken() {
        const user = this.getUser();
        return user ? user.token : null;
    }
};

export default authService;
