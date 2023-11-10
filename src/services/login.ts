import type { LoginResult } from "@/types/member"
import { http } from "@/utils/http"

type LoginParams = {
    code:string
    encryptedData:string
    iv:string
}
/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxminAPI = (data:LoginParams)=>{
    return http<LoginResult>({
        method:'POST',
        url:'/login/wxMin',
        data,
    })
}

/**
 * 小程序登录内测
 * @param data 请求参数
 */
 export const postLoginWxminSimpleAPI = (phoneNumber:string)=>{
    return http<LoginResult>({
        method:'POST',
        url:'/login/wxMin/simple',
        data:{
            phoneNumber
        }
    })
}