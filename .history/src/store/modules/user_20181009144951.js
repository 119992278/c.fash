import { login } from '@/api/login'
import { getAccountAuthority } from '@/api/dealer'
import { getToken, setToken, getCookie, removeToken } from '@/utils/auth'
import { setCookie } from '../../utils/auth'

const user = {
  state: {
    token: getToken(),
    customerId: getCookie('customerId'),
    customerAccountId: getCookie('customerAccountId'),
    contactUser: getCookie('contactUser'),
    authority: {},
    menuAuthority: getCookie('menuAuthority'),
    iconUrl: '',
    roles: []
  },
  getters: {
    contactUser: state => state.contactUser,
    iconUrl: state => state.iconUrl,
    customerId: state => state.customerId,
    customerCode: state => state.customerCode,
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
    SET_CUSTOMERCODE: (state, val) => {
      setCookie('customerCode', val)
      state.customerCode = val
    },
    SET_CUSTOMERACCOUNTID: (state, val) => {
      setCookie('customerAccountId', val)
      state.customerAccountId = val
    },
    SET_MENUAUTHOR: (state, val) => {
      setCookie('menuAuthority', val)
      state.menuAuthority = val
    },
    SET_CUSTOMERNAME: (state, name) => {
      setCookie('contactUser', name)
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
          commit('SET_CUSTOMERNAME', data.customerAccount)
          commit('SET_CUSTOMECODE', response.msg)
          commit('SET_ICONURL', data.iconUrl)
          commit('SET_MENUAUTHOR', data.authority)
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
            // if (data.authority1 && data.authority2 && data.authority3) {
            //   commit('SET_AUTOHRITY1', data.authority1.split(','))
            //   commit('SET_AUTOHRITY2', data.authority2.split(','))
            //   commit('SET_AUTOHRITY3', data.authority3.split(','))
            // }
            if (data.authority1 !== '') {
              commit('SET_AUTOHRITY1', data.authority1.split(','))
            } else {
              commit('SET_AUTOHRITY1', '')
            }
            if (data.authority2 !== '') {
              commit('SET_AUTOHRITY2', data.authority2.split(','))
            } else {
              commit('SET_AUTOHRITY2', '')
            }
            if (data.authority3 !== '') {
              commit('SET_AUTOHRITY3', data.authority3.split(','))
            } else {
              commit('SET_AUTOHRITY3', '')
            }
          }
          commit('SET_ROLES', ['SET_AUTOHRITY1', 'SET_AUTOHRITY2', 'SET_AUTOHRITY3'])
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_CUSTOMERNAME', '')
        commit('SET_ICONURL', '')
        commit('SET_MENUAUTHOR', '')
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
