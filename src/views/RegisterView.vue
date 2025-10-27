<template>
  <body class="bg-gradient-to-br from-blue-50 to-blue-200 min-h-screen flex items-start md:items-center justify-center p-4">
    <div class="bg-white w-full max-w-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl">
      <div v-if="!registrationSuccess" id="form-container">
        <div class="text-center mb-6 sm:mb-8">
          <h1 class="text-3xl font-bold text-gray-900">创建您的账户</h1>
          <p class="text-gray-500 mt-2">只需几步，即可开始</p>
        </div>
        <form @submit.prevent="handleRegister" class="space-y-4 sm:space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input v-model="username" type="text" id="username" class="block w-full rounded-lg border border-gray-400 focus:border-gray-900 focus:outline-none transition py-3 px-4" required>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱地址</label>
            <input v-model="email" type="email" id="email" class="block w-full rounded-lg border border-gray-400 focus:border-gray-900 focus:outline-none transition py-3 px-4" required>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input v-model="password" type="password" id="password" class="block w-full rounded-lg border border-gray-400 focus:border-gray-900 focus:outline-none transition py-3 px-4" required>
          </div>
          <div>
            <label for="password-confirm" class="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
            <input v-model="passwordConfirm" type="password" id="password-confirm" class="block w-full rounded-lg border border-gray-400 focus:border-gray-900 focus:outline-none transition py-3 px-4" required>
          </div>
          <p v-if="passwordError" class="text-sm text-red-600 !mt-2">{{ passwordError }}</p>
          <button type="submit" class="flex w-full justify-center rounded-lg bg-blue-600 px-3 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 !mt-6">注 册</button>
        </form>
        <hr class="my-4 sm:my-6 border-t border-gray-200">
        <div class="text-center"><p class="text-sm text-gray-600">已有账户？ <RouterLink to="/login" class="font-medium text-blue-600 hover:text-blue-500 hover:underline">立即登录</RouterLink></p></div>
      </div>
      <div v-else class="text-center">
        <svg class="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h2 class="mt-4 text-xl font-semibold text-gray-800">注册成功！</h2>
        <p class="mt-2 text-gray-600">正在为您跳转到登录页面...</p>
      </div>
    </div>
  </body>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const username = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const passwordError = ref('');
const registrationSuccess = ref(false);

const router = useRouter();
const authStore = useAuthStore();

const handleRegister = async () => {
  passwordError.value = '';
  if (password.value !== passwordConfirm.value) {
    passwordError.value = '两次输入的密码不一致，请重新输入！';
    return;
  }
  try {
    await authStore.register(username.value, email.value, password.value);
    registrationSuccess.value = true;
    setTimeout(() => {
      router.push('/login');
    }, 2500);
  } catch (error) {
    alert(`注册失败: ${error.message}`);
  }
};
</script>