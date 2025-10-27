<!-- src/components/TheHeader.vue -->
<template>
  <header class="bg-white shadow-md">
    <div class="relative h-32 md:h-40 bg-gray-800">
      <img src="https://images.unsplash.com/photo-1528219339983-356a64467120?q=80&w=2070&auto-format&fit=crop" alt="Map Background" class="w-full h-full object-cover filter brightness-50">
      <div class="absolute top-0 left-0 right-0 h-16">
        <nav class="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8 text-white">
          <div class="flex items-center space-x-4 md:space-x-6">
            <a href="#" class="text-2xl font-bold tracking-wider" style="text-shadow: 1px 1px 3px rgba(0,0,0,0.7);">YourBrand</a>
            <div class="hidden md:flex items-baseline space-x-4 lg:space-x-6">
              <a href="#" class="font-semibold hover:text-gray-200 transition">首页</a>
              <a href="#" class="text-gray-300 hover:text-gray-100 transition">发现</a>
              <a href="#" class="text-gray-300 hover:text-gray-100 transition">附近</a>
              <a href="#" class="hidden lg:inline text-gray-300 hover:text-gray-100 transition">商城</a>
              <a href="#" class="hidden lg:inline text-gray-300 hover:text-gray-100 transition">会员</a>
            </div>
          </div>
          <div class="flex-grow mx-4 md:mx-6 max-w-xl">
            <div class="relative">
              <input type="search" placeholder="搜索..." class="w-full py-2 pl-10 pr-4 bg-white/20 text-white placeholder-gray-300 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ion-icon name="search-outline" class="text-gray-200"></ion-icon>
              </div>
            </div>
          </div>
          
          <!-- 右侧用户功能区 - Vue 动态绑定 -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            
            <!-- 状态一：未登录 (v-if) -->
            <div v-if="!authStore.isAuthenticated">
              <RouterLink to="/login" class="bg-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition flex items-center space-x-2">
                <ion-icon name="person-circle-outline" class="text-xl"></ion-icon>
                <span>登录 / 注册</span>
              </RouterLink>
            </div>

            <!-- 状态二：已登录 (v-else) -->
            <div v-else class="flex items-center space-x-2 sm:space-x-4">
              <a href="#" class="hidden sm:inline-flex p-2 rounded-full hover:bg-white/20 transition"><ion-icon name="mail-outline" class="text-2xl"></ion-icon></a>
              <a href="#" class="hidden md:inline-flex p-2 rounded-full hover:bg-white/20 transition"><ion-icon name="flash-outline" class="text-2xl"></ion-icon></a>
              <a href="#" class="hidden lg:inline-flex p-2 rounded-full hover:bg-white/20 transition"><ion-icon name="bookmark-outline" class="text-2xl"></ion-icon></a>
              <button id="post-button" class="bg-blue-600 px-3 sm:px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition flex items-center space-x-2">
                <ion-icon name="add-outline" class="text-xl"></ion-icon>
                <span class="hidden lg:block">发布点评</span>
              </button>
              <a id="logout-button" href="#" @click.prevent="authStore.logout()">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User Avatar" class="w-10 h-10 rounded-full border-2 border-transparent hover:border-blue-400 transition">
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <!-- 第二导航栏 -->
    <section class="bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center space-x-8 h-14 border-b border-gray-200">
          <!-- 组 1: 核心 Tab -->
          <div class="flex items-center space-x-4 text-base">
            <button class="flex items-center space-x-2 px-3 py-2 text-blue-600 border-b-2 border-blue-600 font-semibold">
              <ion-icon name="flame-outline" class="text-xl"></ion-icon>
              <span>热门</span>
            </button>
            <button class="flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-blue-600 transition">
              <ion-icon name="pencil-outline" class="text-xl"></ion-icon>
              <span>用户创作</span>
            </button>
          </div>
          
          <!-- 组 2: 分类链接 -->
          <div class="hidden md:flex items-center space-x-6 text-gray-700 font-medium text-base">
            <a href="#" class="flex items-center space-x-1 hover:text-blue-600 transition"><ion-icon name="restaurant-outline"></ion-icon><span>美食</span></a>
            <a href="#" class="flex items-center space-x-1 hover:text-blue-600 transition"><ion-icon name="film-outline"></ion-icon><span>电影</span></a>
            <a href="#" class="flex items-center space-x-1 hover:text-blue-600 transition"><ion-icon name="airplane-outline"></ion-icon><span>旅行</span></a>
            <a href="#" class="flex items-center space-x-1 hover:text-blue-600 transition"><ion-icon name="cart-outline"></ion-icon><span>购物</span></a>
            <a href="#" class="flex items-center space-x-1 hover:text-blue-600 transition"><ion-icon name="bed-outline"></ion-icon><span>酒店</span></a>
            <a href="#" class="flex items-center space-x-1 hover:text-blue-600 transition"><ion-icon name="ellipsis-horizontal-circle-outline"></ion-icon><span>更多</span></a>
          </div>
        </div>
      </div>
    </section>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>