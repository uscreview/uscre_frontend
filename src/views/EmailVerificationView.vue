
<template>
  <div class="bg-gradient-to-br from-blue-50 to-blue-200 min-h-screen flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl text-center">

      <!-- 状态一：验证成功 (URL 中有 success=true) -->
      <div v-if="isSuccess">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <svg class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">验证成功！</h2>
        <p class="text-gray-600 mb-8">您的账户已成功激活。现在您可以登录了。</p>
        <RouterLink to="/login" class="w-full flex justify-center rounded-lg bg-blue-600 px-3 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700">
          前往登录
        </RouterLink>
      </div>

      <!-- 状态二：验证失败 (URL 中有 error) -->
      <div v-else>
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <svg class="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">验证失败</h2>
        <p class="text-gray-600 mb-8">{{ errorMessage }}</p>
        <RouterLink to="/register" class="text-blue-600 hover:text-blue-800 font-medium">
          返回注册页面
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const route = useRoute();

const isSuccess = ref(false);
const errorMessage = ref('链接无效或已过期，请尝试重新注册。');

onMounted(() => {
  // 后端处理完验证后，会重定向到这个页面
  // 成功时，URL 应该是：/verify-email?success=true
  // 失败时，URL 应该是：/verify-email?error=错误信息描述
  if (route.query.success === 'true') {
    isSuccess.value = true;
  } else if (route.query.error) {
    isSuccess.value = false;
    // 将后端返回的错误信息解码并显示
    errorMessage.value = decodeURIComponent(route.query.error);
  } else {
    // 默认情况为失败
    isSuccess.value = false;
  }
});
</script>