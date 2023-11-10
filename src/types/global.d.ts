// 通用分页结果类型
export interface PageReasult<T>{
    items:T[]
    // 总条数
    conuts:number
    // 当前页码
    page:number
    // 总页数
    pageSize:number
    // 当前页展示数据条数
    pages:number
}
// 通用分页参数类型
export type PageParams = {
    // 默认1
    page?:number
    pageSize?:number
}
// 通用商品类型
export type GoodsItem = {
    /** 商品描述*/ 
    desc:string
    /**商品折扣 */
    discount:number
    /**id*/
    id:string
    /**商品名称*/
    name:string
    /**商品已下单数量*/
    orederNum:number
    /**商品图片*/
    picture:string
    /**商品价格*/
    price:number 
}