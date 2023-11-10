import { GoodsItem } from "./global"

// 首页-广告区域类型数据
export interface BannerItem  {
    hrefUrl: string
    id: string
    imgUrl: string
    type: number
}

// 首页前台类目数据类型
export type CategoryItem = {
    icon:string
    id:string
    name:string
}

// 首页-热门数据

export type HotItem = {
    alt:string
    id:string
    pictures:string[]
    target:string
    title:string
    type:number|string
}

// 猜你喜欢-商品类型
// export interface GuessItem {
//     // 商品描述
//     desc:string
//     // 商品折扣
//     discount:number
//     // id
//     id:string
//     // 商品名称
//     name:string
//     // 商品已下单数量
//     orederNum:number
//     // 商品图片
//     picture:string
//     // 商品价格
//     price:number
// }

export type GuessItem = GoodsItem