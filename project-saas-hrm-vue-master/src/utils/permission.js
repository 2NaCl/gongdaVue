import store from '@/store'

// 检查是否有权限
export function hasPermission(roles, route) {
  if (roles.menus && route.name) {
    // console.log(roles)
    // console.log(route)
    return roles.menus.some(role => {
      // console.log(route.name.toLowerCase())
      console.log(role.toLowerCase() === route.name.toLowerCase())
      return route.name.toLowerCase() === role.toLowerCase()
    })
  } else {
    return false
  }
}

// 检查是否有权限点
export function hasPermissionPoint(point) {
  let points = store.getters.roles.points
  if (points) {
    return points.some(it => it.toLowerCase() === point.toLowerCase())
  } else {
    return false
  }
}
