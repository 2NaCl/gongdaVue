import {asyncRouterMap, constantRouterMap} from '@/router'
import {hasPermission} from '@/utils/permission'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */

// 根据用户角色 动态分配路由
function filterAsyncRouter(asyncRouterMap, level) {
    if (level === 'saasAdmin') {
      // let newRouter = asyncRouterMap.filter(router => router.name !== 'saas-clients')
      // console.log(asyncRouterMap)
      // console.log(newRouter)
      return asyncRouterMap
    } else {
      let newRouter = asyncRouterMap.filter(router => router.name !== 'message' &&
        router.name !== 'permissions' && router.name !== 'settings' && router.name !== 'departments')
      // console.log(newRouter)
      return newRouter
    }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const {level} = data
        // 动态构造权限列表
        let accessedRouters = filterAsyncRouter(asyncRouterMap, level)
        commit('SET_ROUTERS', accessedRouters)
        // console.log(data)
        // console.log(asyncRouterMap)
        // commit('SET_ROUTERS', asyncRouterMap) // 调试开启全部路由
        resolve()
      })
    }
  }
}

export default permission
