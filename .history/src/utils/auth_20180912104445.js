import Cookies from 'js-cookie'

const TokenKey = 'customerToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setCookie(cookie, token) {
  return Cookies.set(cookie, token)
}
export function getCookie(cookie) {
  return Cookies.get(cookie)
}

export function removeToken() {
  Cookies.remove('customerId')
  Cookies.remove('customerAccountId')
  return Cookies.remove(TokenKey)
}
