// src/stores/auth.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { api } from '@/services/api.js'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('uscreToken') || null);
  
  const isAuthenticated = computed(() => !!token.value);

  function setToken(newToken) {
    token.value = newToken;
    if (newToken) {
      localStorage.setItem('uscreToken', newToken);
    } else {
      localStorage.removeItem('uscreToken');
    }
  }

  async function login(email, password) {
    const result = await api.login(email, password);
    setToken(result.token);
    await router.push('/');
    return result;
  }
  
  async function handleOAuthLogin() {
      console.log(`[MOCK] Simulating successful OAuth login...`);
      setToken('fake-jwt-token-for-oauth-testing'); 
      await router.push('/');
  }

  function logout() {
    setToken(null);
    router.replace('/login');
  }

  async function register(username, email, password) {
    return api.register(username, email, password);
  }

  async function forgotPassword(email) {
    return api.forgotPassword(email);
  }

  async function resetPassword(token, newPassword) {
    return api.resetPassword(token, newPassword);
  }

  return {
    token,
    isAuthenticated,
    setToken,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    handleOAuthLogin,
  };
});