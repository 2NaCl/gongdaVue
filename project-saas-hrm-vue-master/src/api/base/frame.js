import {createAPI, createFormAPI} from '@/utils/request'

// 登录
export const login = data => createAPI('/sys/login', 'post', data)
// 获取用户信息
// export const reg = data => createAPI('/sys/reg','post',data)
export const profile = data => createAPI('/sys/profile', 'post', data)
export const registerStep1 = data => createAPI('/sys/registerStep1', 'post', data)
export const registerStep2 = data => createAPI('/sys/registerStep2', 'post', data)
export const regCode = data => createAPI('/frame/register/verification_code', 'post', data)
export const logout = data => createAPI('/frame/logout', 'post', data)
export const passwd = data => createAPI('/frame/passwd', 'post', data)
export const reg = data => createAPI('/sys/register', 'post', data)
