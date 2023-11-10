import FySwiper from '@/components/FySwiper.vue'
import FyGuess from '@/components/FyGuess.vue'

declare module 'vue' {
  export interface GlobalComponents {
    FySwiper: typeof FySwiper
    FyGuess: typeof FyGuess
  }
}

// 组件实例类型
export type FyGuessInstance = InstanceType<typeof FyGuess>