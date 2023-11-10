import type { FyGuessInstance } from "@/types/components"
import { ref } from "vue"

/** 
* 猜你喜欢组合式函数
*/
// 

export const useGuessList = () => {
    // ref 猜你喜欢的实例/*  */
    const guessRef = ref<FyGuessInstance>()
    // 滚动触底
    const onScrolltolower = () => {
        guessRef.value?.getMore()
    }
    return {
        guessRef,onScrolltolower
    }
}
