import request from '@/utils/request'

// 用户登录
export function login(customerAccount, customerPassword) {
  return request({
    url: '/dealer/account/login?customerAccount=' + customerAccount + '&customerPassword=' + customerPassword,
    method: 'get',
    data: {}
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
