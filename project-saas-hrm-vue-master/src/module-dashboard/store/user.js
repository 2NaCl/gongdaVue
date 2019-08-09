import {login, logout, profile} from '@/api/base/frame'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    level: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    approvals: {}
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar || 'http://or45inefq.bkt.clouddn.com/itheima-avatar.png'
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LEVEL: (state, level) => {
      state.level = level
    },
    SET_APPROVALS: (state, approvals) => {
      state.approvals = approvals
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({commit}, userInfo) {
      const username = userInfo.studentId.trim()
      return new Promise((resolve, reject) => {
        login({
            studentId: username,
            password: userInfo.password
          }).then(response => {
            const data = response.data.data
            commit('SET_TOKEN', data)
            setToken(data)
            resolve()
        }).catch(error => {
          reject(error)
        })
      })
      // commit('SET_TOKEN', {username: 'wsm'})
      // setToken({username: 'wsm'})

    },

    // 获取用户信息
    GetUserInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        profile().then(response => {
          const data = response.data.data
          console.log(data);
          commit('SET_ROLES', data.roles ? data.roles : {menus: [], points: []})
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.company)
          commit('SET_APPROVALS', data.approvals)
          commit('SET_LEVEL', data.level)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }

  }
}

export default user
