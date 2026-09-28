import request from './request'

export interface LoginResult {
  userInfo: {
    id: number
    username: string
    email: string
    nickname: string
    displayName: string
    [key: string]: unknown
  }
  token: string
  roleType: string
}

/** 登录 */
export function login(username: string, password: string) {
  return request.post<never, LoginResult>('/user/login', { username, password })
}

/** 注册 */
export interface RegisterPayload {
  username: string
  email: string
  nickname?: string
  phone?: string
  password: string
  confirmPassword: string
  /** 性别（1 男 2 女），接口必填但 UI 暂未提供，默认传 1 */
  gender: number
  /** 权限（默认传1） */
  userType: number
}

export function register(data: RegisterPayload) {
  return request.post('/user/add', data)
}

/** 退出登录 */
export function logout() {
  return request.post('/user/logout')
}
