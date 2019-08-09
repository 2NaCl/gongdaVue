import {createAPI} from '@/utils/request'

export const list = data => createAPI('/sys/user', 'get', data)
export const simple = data => createAPI('/sys/user/simple', 'get', data)
export const add = data => createAPI('/sys/user', 'post', data)
export const update = data => createAPI(`/sys/user/${data.id}`, 'put', data)
export const remove = data => createAPI(`/sys/user/${data.id}`, 'delete', data)
export const detail = data => createAPI(`/sys/user/${data.id}`, 'get', data)
export const assignRoles = data => createAPI(`/sys/user/assignRoles`, 'put', data)

export const msg = data => createAPI('/sys/email', 'get', data)
export const agree = data => createAPI(`/sys/agree/${data.studentId}`, 'get', data)
export const disagree = data => createAPI(`/sys/error/${data.studentId}`, 'get', data)

export const upgrade = data => createAPI(`/sys/up/${data.studentId}`, 'post')
