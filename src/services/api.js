// src/services/api.js

export const MOCK_API = false; // 全局模拟开关

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export { BASE_URL };

async function _fetchAPI(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const token = localStorage.getItem('uscreToken');
    const defaultHeaders = { 'Content-Type': 'application/json' };

    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    options.headers = { ...defaultHeaders, ...options.headers };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            const errorMessage = data.error || data.message || `HTTP error! Status: ${response.status}`;
            throw new Error(errorMessage);
        }
        return data;
    } catch (error) {
        console.error(`API call to ${endpoint} failed:`, error.message);
        throw error;
    }
}

export const api = {
    login: async (email, password) => {
        if (MOCK_API) {
            console.log(`[MOCK] Simulating login for: ${email}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (email === 'test@example.com' && password === 'password123') {
                return { code: 0, message: 'login successful (mocked)', token: 'fake-jwt-token-for-testing-12345' };
            }
            throw new Error('Invalid credentials, incorrect email or password');
        }
        return _fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },

    register: async (username, email, password) => {
        if (MOCK_API) {
            console.log(`[MOCK] Simulating registration for: ${username}`);
            await new Promise(resolve => setTimeout(resolve, 1500));
            return { code: 0, message: 'User created successfully (mocked)' };
        }
        return _fetchAPI('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
        });
    },

    forgotPassword: async (email) => {
        if (MOCK_API) {
            console.log(`[MOCK] Simulating forgot password for: ${email}`);
            await new Promise(resolve => setTimeout(resolve, 1500));
            return { message: '如果该邮箱已注册，您将很快收到一封重置密码的邮件。' };
        }
        return _fetchAPI('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    },
    
    resetPassword: async (token, newPassword) => {
        if (MOCK_API) {
            console.log(`[MOCK] Simulating reset password with token: ${token}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { message: 'Password has been reset successfully (mocked).' };
        }
        return _fetchAPI('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({ token, newPassword }),
        });
    },
};