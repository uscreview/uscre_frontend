<template>
  <body class="bg-gradient-to-br from-blue-50 to-blue-200 min-h-screen flex items-start md:items-center justify-center p-4">
    <div class="bg-white w-full max-w-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl">
      <div class="text-center mb-6 sm:mb-8">
        <h1 class="text-3xl font-bold text-gray-900">忘记密码？</h1>
        <p class="text-gray-500 mt-2">输入您的邮箱，我们将向您发送重置链接。</p>
      </div>
      <form @submit.prevent="handleForgotPassword" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱地址</label>
          <input v-model="email" type="email" id="email" class="block w-full rounded-lg border border-gray-400 focus:border-gray-900 focus:outline-none transition py-3 px-4" required>
        </div>
        <div>
          <div v-if="successMessage" class="text-center text-sm text-green-600 mb-4">{{ successMessage }}</div>
          <button type="submit" :disabled="isSubmitting" class="flex w-full justify-center rounded-lg bg-blue-600 px-3 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 disabled:bg-blue-400">
            {{ isSubmitting ? '发送中...' : '发送重置链接' }}
          </button>
        </div>
      </form>
      <hr class="my-4 sm:my-6 border-t border-gray-200">
      <div class="text-center">
        <p class="text-sm text-gray-600">
          记起密码了？ 
          <RouterLink to="/login" class="font-medium text-blue-600 hover:text-blue-500 hover:underline">返回登录</RouterLink>
        </p>
      </div>
    </div>
  </body>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const successMessage = ref('');
const isSubmitting = ref(false);
const authStore = useAuthStore();

const handleForgotPassword = async () => {
  successMessage.value = '';
  isSubmitting.value = true;
  try {
    const result = await authStore.forgotPassword(email.value);
    successMessage.value = result.message;
  } catch (error) {
    // 即使出错，也显示通用成功信息以防范用户枚举攻击
    successMessage.value = '如果该邮箱已注册，您将很快收到邮件。';
  } finally {
    isSubmitting.value = false;
  }
};
</script>