// assets/js/api.js

/**
 * ====================================================================
 * API 模拟开关 (Master Switch)
 * ====================================================================
 * 设置为 true:  用于前端独立测试，所有 API 请求将被拦截并返回假数据。
 * 设置为 false: 用于正式对接，所有 API 请求将发送到真实的后端服务器。
 */
const MOCK_API = true; // <-- 切换此值以启用/禁用模拟模式

// 后端 API 的基础 URL，请根据实际情况修改
const BASE_URL = 'http://142.171.3.159:8082/api/v1';

/**
 * 通用的 API 请求函数 (内部使用)
 */
async function _fetchAPI(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const defaultHeaders = { 'Content-Type': 'application/json' };
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

/**
 * 导出一个包含所有 API 请求函数的对象。
 */
export const api = {
    /**
     * 登录请求
     */
    login: async (email, password) => {
        if (MOCK_API) {
            console.log(`[MOCK] Simulating login for: ${email}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (email === 'test@example.com' && password === 'password123') {
                return Promise.resolve({
                    code: 0,
                    message: 'login successful (mocked)',
                    token: 'fake-jwt-token-for-testing-12345'
                });
            } else {
                return Promise.reject(new Error('Invalid credentials, incorrect email or password'));
            }
        }
        // 真实 API 调用 (发送原始密码)
        return _fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },

    /**
     * 注册请求
     */
    register: async (username, email, password) => {
        if (MOCK_API) {
            console.log(`[MOCK] Simulating registration for: ${username}`);
            await new Promise(resolve => setTimeout(resolve, 1500));
            return Promise.resolve({ code: 0, message: 'User created successfully (mocked)' });
        }
        return _fetchAPI('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
        });
    },

    /**
     * 忘记密码请求
     */
    forgotPassword: async (email) => {
        if (MOCK_API) {
            console.log(`[MOCK] Simulating forgot password for: ${email}`);
            await new Promise(resolve => setTimeout(resolve, 1500));
            return Promise.resolve({
                message: '如果该邮箱已注册，您将很快收到一封重置密码的邮件。'
            });
        }
        return _fetchAPI('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    },
    
    /**
     * 重置密码请求
     */
    resetPassword: async (token, newPassword) => {
        if (MOCK_API) {
            console.log(`[MOCK] Simulating reset password with token: ${token}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return Promise.resolve({ message: 'Password has been reset successfully (mocked).' });
        }
        return _fetchAPI('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({ token, newPassword }),
        });
    },

    /**
     * 获取第三方登录配置
     */
    getOAuthConfig: async () => {
        if (MOCK_API) {
            console.log('[MOCK] Providing fake OAuth config.');
            return Promise.resolve({
                google: { clientId: 'fake-google-client-id', authUrl: '#' },
                github: { clientId: 'fake-github-client-id', authUrl: '#' }
            });
        }
        return _fetchAPI('/auth/oauth-config', { method: 'GET' });
    }
};