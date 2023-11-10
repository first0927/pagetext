/**
// 添加拦截器
// 拦截request 请求
// 拦截uploadFile 文件上传
// TODO:
// 1.非http开头需拼接地址
// 2.请求超时
// 3.添加小程序端请求头标识
// 4.添加token请求头标识
*/

import { useMemberStore } from "@/stores"

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const httpInterceptor = {
    // 拦截前
    invoke(options: UniApp.RequestOptions) {
        // 1.非http开头需拼接地址
        if (!options.url.startsWith('http')) {
            options.url = baseURL + options.url
        }
        // 2.请求超时 默认1分钟
        options.timeout = 10000
        // 3.添加小程序端请求头标识
        options.header = {
            ...options.header,
            'source-client': 'miniapp'
        }
        // 4.添加token请求头标识
        const memberStore = useMemberStore()
        const token = memberStore.profile?.token
        if (token) {
            options.header.Authorization = token
        }
    }
}
// 拦截request请求
uni.addInterceptor("request", httpInterceptor)
// 拦截uploadFile 文件上传
uni.addInterceptor("uploadFile", httpInterceptor)


// 请求函数
//  @param UniApp.RequestOptions
//  @returns Promise 对象
// 1.返回Promise对象

// 2.请求成功
//  2.1 提取核心数据 res.data
//  2.2 添加类型，支持泛型
// 3.请求失败
//  3.1 网络错误 - 提示用户换网络
//  3.2 401错误 - 清理用户信息，跳转到登录页
//  3.3 其他错误 - 根据后端错误信息提示



// 请求函数http
//  @param UniApp.RequestOptions
//  @returns Promise 对象
// 1.返回Promise对象

// 2.2 添加类型，支持泛型
// 定义接口
interface Data<T> {
    code: string,
    msg: string,
    result: T
}
export const http = <T>(options: UniApp.RequestOptions): Promise<Data<T>> => {
    return new Promise<Data<T>>((resolve, reject) => {
        // return new Promise<{a:1}>((resolve,reject)=>{
        uni.request({
            ...options,
            // 请求成功
            success(res) {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    // 2.1 提取核心数据 res.data
                    resolve(res.data as Data<T>)
                } else if (res.statusCode === 401) {
                    // 401错误 清理用户信息，跳转到登录页
                    const memberStore = useMemberStore()
                    memberStore.clearProfile()
                    // 跳转到登录页
                    uni.navigateTo({ url: '/page/login/login' })
                    reject(res)
                } else {
                    // 其他错误 
                    // uni-ui的弹窗提示
                    uni.showToast({
                        title: (res.data as Data<T>).msg || '请求错误',
                        icon: 'none',
                    })
                    reject(res)
                }

            },
            fail(error) {
                uni.showToast({
                    icon: 'none',
                    title: '网络错误'
                })
                reject(error)
            }
        })
    })
}

