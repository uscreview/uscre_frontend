// src/stores/auth.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { api } from '@/services/api.js'

export const useAuthStore = defineStore('auth', () => {
  // --- state ---
  const token = ref(localStorage.getItem('uscreToken') || null)
  const router = useRouter()

  // --- getters ---
  const isAuthenticated = computed(() => !!token.value)

  // --- actions ---
  function setToken(newToken) {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('uscreToken', newToken)
    } else {
      localStorage.removeItem('uscreToken')
    }
  }

  async function login(email, password) {
    const result = await api.login(email, password)
    if (result.code === 0 && result.token) {
      setToken(result.token)
      await router.push('/') // 登录成功后跳转到首页
      return result
    } else {
      throw new Error(result.message || '登录响应格式不正确')
    }
  }
  
  async function handleOAuthLogin() {
      console.log(`[MOCK] Simulating successful OAuth login...`);
      // 模拟一个假token来表示登录成功
      setToken('fake-jwt-token-for-oauth-testing'); 
      await router.push('/')
  }

  function logout() {
    setToken(null)
    // 刷新页面以确保所有状态重置
    window.location.href = '/login'; 
  }

  // 其他 API 的简单封装
  async function register(username, email, password) {
    return api.register(username, email, password)
  }

  async function forgotPassword(email) {
    return api.forgotPassword(email)
  }

  async function resetPassword(token, newPassword) {
    return api.resetPassword(token, newPassword)
  }
  
  async function getOAuthConfig() {
      return api.getOAuthConfig();
  }

  return {
    token,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    getOAuthConfig,
    handleOAuthLogin
  }
})