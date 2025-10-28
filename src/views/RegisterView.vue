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
          <p v-if="errorMessage" class="text-sm text-red-600 !mt-2">{{ errorMessage }}</p>
          <button type="submit" :disabled="isSubmitting" class="flex w-full justify-center rounded-lg bg-blue-600 px-3 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 disabled:bg-blue-400 !mt-6">
            {{ isSubmitting ? '注册中...' : '注 册' }}
          </button>
        </form>
        <hr class="my-4 sm:my-6 border-t border-gray-200">
        <div class="text-center"><p class="text-sm text-gray-600">已有账户？ <RouterLink to="/login" class="font-medium text-blue-600 hover:text-blue-500 hover:underline">立即登录</RouterLink></p></div>
      </div>
       <div v-else class="text-center py-8">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
            </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">请验证您的邮箱</h2>
        <p class="text-gray-600 mb-6">
            我们已向 <strong>{{ email }}</strong> 发送了一封验证邮件。
            <br>请查收邮件并点击其中的链接以激活您的账户。
        </p>
        <div class="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 mb-8">
            <ion-icon name="information-circle-outline" class="align-middle mr-1 text-lg"></ion-icon>
            在验证完成之前，您将无法登录。
        </div>
        <RouterLink to="/login" class="text-blue-600 hover:text-blue-800 font-medium">
            已完成验证？返回登录
        </RouterLink>
      </div>
    </div>
  </body>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'; // 删除了 useRouter 因为不再需要自动跳转
import { useAuthStore } from '@/stores/auth';
import { isStrongPassword, PASSWORD_RULE_MESSAGE } from '@/utils/validators';

const username = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

// [修正 1] 使用单一、正确的错误信息变量
const errorMessage = ref(''); 

const registrationSuccess = ref(false);
const isSubmitting = ref(false);

const authStore = useAuthStore();

const handleRegister = async () => {
  // 每次点击都先清空旧的错误信息
  errorMessage.value = ''; 

  // --- 验证逻辑 ---
  if (password.value !== passwordConfirm.value) {
    errorMessage.value = '两次输入的密码不一致，请重新输入！';
    return; // 提前退出
  }

  if (!isStrongPassword(password.value)) {
    errorMessage.value = PASSWORD_RULE_MESSAGE;
    return; // 提前退出
  }
  
  // --- 开始提交 ---
  isSubmitting.value = true;

  try {
    await authStore.register(username.value, email.value, password.value);
    // [修正 2] 注册成功，只更新状态以显示成功界面，不再自动跳转
    registrationSuccess.value = true;
  } catch (error) {
    errorMessage.value = `注册失败: ${error.message}`;
  } finally {
    // [修正 3] 无论成功或失败，最后都结束提交状态
    isSubmitting.value = false;
  }
};
</script>