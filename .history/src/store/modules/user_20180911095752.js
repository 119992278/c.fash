import { login } from '@/api/login'
import { getAccountAuthority } from '@/api/dealer'
import { getToken, setToken, getCookie, removeToken } from '@/utils/auth'
import { setCookie } from '../../utils/auth'

const user = {
  state: {
    token: getToken(),
    customerId: getCookie('customerId'),
    customerAccountId: getCookie('customerAccountId'),
    authority: {},
    contactUser: '',
    iconUrl: '',
    roles: []
  },
  getters: {
    contactUser: state => state.contactUser,
    iconUrl: state => state.iconUrl,
    customerId: state => state.customerId,
    customerAccountId: state => state.customerAccountId
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token
    },
    SET_CUSTOMERID: (state, val) => {
      setCookie('customerId', val)
      state.customerId = val
    },
    get_CUSTOMERID: (state, val) => {
      return state.customerId
    },
    SET_CUSTOMERACCOUNTID: (state, val) => {
      setCookie('customerAccountId', val)
      state.customerAccountId = val
    },
    SET_NAME: (state, name) => {
      state.contactUser = name
    },
    SET_ICONURL: (state, iconUrl) => {
      state.iconUrl = iconUrl
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_AUTOHRITY: (state) => {
      state.authority = {}
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
          commit('SET_TOKEN', data.customerToken)
          commit('SET_CUSTOMERID', data.customerId)
          commit('SET_CUSTOMERACCOUNTID', data.customerAccountId)
          commit('SET_NAME', data.contactUser)
          commit('SET_ICONURL', data.iconUrl)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户权限
    GetAccountAuthority({ commit, state }) {
      return new Promise((resolve, reject) => {
        getAccountAuthority(state.customerAccountId).then(response => {
          const data = response.data
          if (data != null) {
            if (data.authority1 && data.authority2 && data.authority3) {
              commit('SET_AUTOHRITY1', data.authority1)
              commit('SET_AUTOHRITY2', data.authority2)
              commit('SET_AUTOHRITY3', data.authority3)
            }
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_NAME', '')
        commit('SET_ICONURL', '')
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeToken()
        resolve()
      })
    }
  }
}

export default user
