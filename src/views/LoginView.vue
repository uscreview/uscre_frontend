<template>
  <body class="bg-gradient-to-br from-blue-50 to-blue-200 min-h-screen flex items-start md:items-center justify-center p-4">
    <div class="bg-white w-full max-w-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl">
      <div class="text-center mb-6 sm:mb-8">
        <h1 class="text-3xl font-bold text-gray-900">欢迎回来</h1>
        <p class="text-gray-500 mt-2">请登录您的帐户</p>
      </div>
      <form @submit.prevent="handleLogin" class="space-y-4 sm:space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱地址</label>
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.161V6a2 2 0 00-2-2H3z" /><path d="M19 8.839l-7.447 3.724a.25.25 0 01-.106 0L4 8.839V14a2 2 0 002 2h10a2 2 0 002-2V8.839z" /></svg></div>
            <input v-model="email" type="email" id="email" class="block w-full rounded-lg py-3 pl-10 border border-gray-400 focus:border-gray-900 focus:outline-none transition" placeholder="请输入您的邮箱" required>
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" /></svg></div>
            <input v-model="password" type="password" id="password" class="block w-full rounded-lg py-3 pl-10 border border-gray-400 focus:border-gray-900 focus:outline-none transition" placeholder="请输入您的密码" required>
          </div>
        </div>
        <div class="flex items-center justify-between pt-2">
            <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>
            <RouterLink to="/forgot-password" class="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline ml-auto">忘记密码？</RouterLink>
        </div>
        <button type="submit" class="flex w-full justify-center rounded-lg bg-blue-600 px-3 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700">登 录</button>
      </form>
      <div class="my-4 sm:my-6 flex items-center"><div class="flex-grow border-t border-gray-200"></div><span class="mx-4 text-sm text-gray-400">或</span><div class="flex-grow border-t border-gray-200"></div></div>
      <!-- Google 登录链接 -->
      <a 
        :href="googleLoginUrl" 
        @click.prevent="handleOAuthClick('google')"
        class="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-3 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
      >
        <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
          <path fill="#FF3D00" d="M6.306,14.691l6.057,4.71c2.29-1.93,5.166-3.039,8.637-3.039c6.627,0,12,5.373,12,12c0,0.854-0.094,1.684-0.274,2.493l6.766,0.001C43.957,27.08,44,25.541,44,24c0-11.045-8.955-20-20-20C17.734,4,12.556,6.342,8.65,10.033L6.306,14.691z"/>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
          <path fill="#1976D2" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,36.54,44,30.836,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
        </svg>
        使用 Google 账号登录
      </a>

      <!-- GitHub 登录链接 -->
      <a 
        :href="githubLoginUrl" 
        @click.prevent="handleOAuthClick('github')"
        class="mt-4 flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-3 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
      >
        <svg class="h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        使用 GitHub 账号登录
      </a>
      <hr class="my-4 sm:my-6 border-t border-gray-200">
      <div class="text-center"><p class="text-sm text-gray-600">还没有帐户？ <RouterLink to="/register" class="font-medium text-blue-600 hover:text-blue-500 hover:underline">立即注册</RouterLink></p></div>
    </div>
  </body>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { MOCK_API, BASE_URL } from '@/services/api.js';

// --- 1. 邮箱/密码登录相关的状态 ---
const email = ref('');
const password = ref('');
const errorMessage = ref('');

// --- 2. OAuth 登录相关的状态 ---
const googleLoginUrl = ref(`${BASE_URL}/auth/google/login`);
const githubLoginUrl = ref(`${BASE_URL}/auth/github/login`); // 假设 GitHub 接口路径
const isMockMode = ref(MOCK_API);

// --- 3. 获取 Pinia Store 实例 ---
const authStore = useAuthStore();

// --- 4. 邮箱/密码登录的处理函数 ---
const handleLogin = async () => {
  errorMessage.value = '';
  try {
    await authStore.login(email.value, password.value);
  } catch (error) {
    errorMessage.value = error.message;
  }
};

// --- 5. OAuth 登录的处理函数 ---
const handleOAuthClick = (provider) => {
  if (isMockMode.value) {
    authStore.handleOAuthLogin();
  } else {
    if (provider === 'google') {
      window.location.href = googleLoginUrl.value;
    } else if (provider === 'github') {
      window.location.href = githubLoginUrl.value;
    }
  }
};
</script>