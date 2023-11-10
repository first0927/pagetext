<script setup lang="ts">
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home';
import { BannerItem, CategoryItem, HotItem } from '@/types/home';

// uniapp微信小程序引入生命周期
import { onLoad } from '@dcloudio/uni-app';
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue';
import { ref } from 'vue';
import PageSkeleton from './components/PageSkeleton.vue'
import { useGuessList } from '@/composables';
// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
// 获取分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHotList = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}
// 骨架屏展示
const isLoading = ref(false)
// 小程序生命周期 页面加载
onLoad(async () => {
  isLoading.value = true
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHotList()]);
  isLoading.value = false
})
const { guessRef, onScrolltolower } = useGuessList()
// 下拉刷新是否被触发
const istriggered = ref(false)
// 自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  // 开始动画
  istriggered.value = true
  // 重置猜你喜欢的数据
  guessRef.value.resetData()
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHotList(), guessRef.value?.getMore()])
  // 关闭动画
  istriggered.value = false
}
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <scroll-view refresher-enabled @refresherrefresh="onRefresherrefresh" :refresher-triggered="istriggered" scroll-y
    class="scroll-view" @scrolltolower="onScrolltolower">
    <!-- 骨架屏 -->
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 自定义组件轮播图 ---自动导入 -->
      <FySwiper :list="bannerList" />
      <!-- 分类面板 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢 -->
      <FyGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
}
</style>
