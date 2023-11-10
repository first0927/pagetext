import { http } from "@/utils/http"

/*
获取个人信息

*/
export const getMemberProfileAPI = () => {
    return http({
        method:'GET',
        url:'/member/profile',
    })
}