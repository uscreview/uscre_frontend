<template>
  <body class="bg-gradient-to-br from-blue-50 to-blue-200 min-h-screen flex items-start md:items-center justify-center p-4">
    <div v-if="token" class="bg-white w-full max-w-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl">
      <div class="text-center mb-6 sm:mb-8">
        <h1 class="text-3xl font-bold text-gray-900">设置新密码</h1>
        <p class="text-gray-500 mt-2">请输入您的新密码。</p>
      </div>
      <form @submit.prevent="handleResetPassword" class="space-y-4 sm:space-y-6">
        <input type="hidden" :value="token">
        <div>
          <label for="new-password" class="block text-sm font-medium text-gray-700 mb-1">新密码</label>
          <input v-model="newPassword" type="password" id="new-password" class="block w-full rounded-lg border border-gray-400 focus:border-gray-900 focus:outline-none transition py-3 px-4" required>
        </div>
        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-1">确认新密码</label>
          <input v-model="confirmPassword" type="password" id="confirm-password" class="block w-full rounded-lg border border-gray-400 focus:border-gray-900 focus:outline-none transition py-3 px-4" required>
        </div>
        <p v-if="errorMessage" class="text-sm text-red-600 !mt-2">{{ errorMessage }}</p>
        <button type="submit" class="flex w-full justify-center rounded-lg bg-blue-600 px-3 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 !mt-6">确认重置密码</button>
      </form>
    </div>
    <div v-else>
      <p class="text-red-600 text-center font-bold">错误：无效的重置链接。</p>
    </div>
  </body>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const newPassword = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const token = ref(null);

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  // 从 URL 查询参数中获取 token
  token.value = route.query.token;
});

const handleResetPassword = async () => {
  errorMessage.value = '';
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = '两次输入的密码不一致。';
    return;
  }
  try {
    const result = await authStore.resetPassword(token.value, newPassword.value);
    alert(result.message);
    router.push('/login');
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>