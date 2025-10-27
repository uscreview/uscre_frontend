<template>
  <div class="bg-gray-100">
    <TheHeader />

    <!-- 主内容区 -->
    <main class="container mx-auto">
        <section class="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 md:p-6">
            
            <!-- 左侧：首页推荐 -->
            <div class="md:col-span-7">
                <div class="relative w-full aspect-video bg-gray-300 rounded-xl flex items-center justify-center shadow-lg">
                    <div class="text-center text-gray-500">
                        <h2 class="text-3xl font-bold">首页推荐</h2>
                        <p class="mt-2">这里将是一个动态的轮播图</p>
                    </div>
                    <button class="absolute left-4 p-2 bg-white/50 rounded-full hover:bg-white transition"><ion-icon name="chevron-back-outline"></ion-icon></button>
                    <button class="absolute right-4 p-2 bg-white/50 rounded-full hover:bg-white transition"><ion-icon name="chevron-forward-outline"></ion-icon></button>
                </div>
            </div>

            <!-- 右侧：用户专属推荐 -->
            <div class="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <a href="#" class="group">
                    <div class="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-2"><img src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1887&auto-format&fit=crop" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Card thumbnail"></div>
                    <h3 class="font-medium text-gray-800 text-sm leading-snug group-hover:text-blue-600">洋人丢的电子垃圾，都去哪了？</h3>
                    <p class="text-xs text-gray-500 mt-1">@影视飓风</p>
                </a>
                <a href="#" class="group">
                    <div class="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-2"><img src="https://images.unsplash.com/photo-1543536448-d209d2d13a1c?q=80&w=1974&auto-format&fit=crop" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Card thumbnail"></div>
                    <h3 class="font-medium text-gray-800 text-sm leading-snug group-hover:text-blue-600">天气之肘</h3>
                    <p class="text-xs text-gray-500 mt-1">@请叫我小严子</p>
                </a>
                <a href="#" class="group">
                    <div class="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-2"><img src="https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1974&auto-format&fit=crop" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Card thumbnail"></div>
                    <h3 class="font-medium text-gray-800 text-sm leading-snug group-hover:text-blue-600">戒掉洗发水后，我的头发厚到要打薄</h3>
                    <p class="text-xs text-gray-500 mt-1">@活不投机课粒多</p>
                </a>
                <a href="#" class="group">
                    <div class="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-2"><img src="https://images.unsplash.com/photo-1614732414446-e3425d094567?q=80&w=1964&auto-format&fit=crop" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Card thumbnail"></div>
                    <h3 class="font-medium text-gray-800 text-sm leading-snug group-hover:text-blue-600">《无敌摆烂》大合集</h3>
                    <p class="text-xs text-gray-500 mt-1">@在下李玄</p>
                </a>
                <a href="#" class="group">
                    <div class="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-2"><img src="https://images.unsplash.com/photo-1555939594-d7cb561ad1?q=80&w=387&auto-format&fit=crop" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Card thumbnail"></div>
                    <h3 class="font-medium text-gray-800 text-sm leading-snug group-hover:text-blue-600">城南最棒的烧烤，没有之一！</h3>
                    <p class="text-xs text-gray-500 mt-1">@美食家小王</p>
                </a>
                <a href="#" class="group">
                    <div class="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-2"><img src="https://images.unsplash.com/photo-1534430480872-740462a4e2b2?q=80&w=580&auto-format&fit=crop" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Card thumbnail"></div>
                    <h3 class="font-medium text-gray-800 text-sm leading-snug group-hover:text-blue-600">周末两天一夜，海边度假攻略</h3>
                    <p class="text-xs text-gray-500 mt-1">@旅行的意义</p>
                </a>
            </div>
            
        </section>
    </main>
  </div>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue';
</script>