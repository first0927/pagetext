/** 小程序登录 登录用户信息 */
export type LoginResult = {
    /** 账户名 */
    accout: string
    /** 头像  */
    avatar: string
    /** 用户id  */
    id: number
    /** 昵称 */
    nickname?: string
    /** 手机号 */
    mobile: string
    /** 登录凭证 */
    token: string
  }