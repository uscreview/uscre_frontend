<template>
  <div class="bg-gradient-to-br from-blue-50 to-blue-200 min-h-screen flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
      <h2 class="text-2xl font-bold text-gray-900">正在安全登录...</h2>
      <p class="text-gray-500 mt-2">正在完成授权，请稍候。</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  const token = route.query.token;
  const error = route.query.error;

  if (token && typeof token === 'string') {
    authStore.setToken(token);
    router.replace({ path: '/' });
  } else {
    alert(`第三方登录失败: ${decodeURIComponent(error || '未能获取到凭证。')}`);
    router.replace({ path: '/login' });
  }
});
</script>