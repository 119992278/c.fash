import { login, logout, getAccountAuthority } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    authority: {
      authority1: '',
      authority2: '',
      authority3: ''
    },
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_AUTOHRITY: (state, roles) => {

    },
    SET_AUTOHRITY1: (state, authority) => {
      state.authority.authority1 = authority
    },
    SET_AUTOHRITY2: (state, authority) => {
      state.authority.authority2 = authority
    },
    SET_AUTOHRITY3: (state, authority) => {
      state.authority.authority3 = authority
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.customerToken)
          commit('SET_TOKEN', data.customerToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户权限
    GetAccountAuthority({ commit, state }) {
      return new Promise((resolve, reject) => {
        getAccountAuthority(state.token).then(response => {
          const data = response.data
          if (data.authority1 && data.authority2 && data.authority3) {
            commit('SET_AUTOHRITY1', data.authority1)
            commit('SET_AUTOHRITY2', data.authority2)
            commit('SET_AUTOHRITY3', data.authority3)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
