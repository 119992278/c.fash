/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  // const valid_map = ['admin', 'editor', '13560409747']
  // return valid_map.indexOf(str.trim()) >= 0
  return str.length >= 3
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 判断不为空*/
export var isvalidNoEmpty = [{
  required: true,
  trigger: 'blur',
  validator: function(rule, value, callback) {
    if (value === '') {
      callback(new Error('该字段不为空'))
    } else {
      callback()
    }
  }
}]

export var isvalidURL = [{
  required: true,
  trigger: 'blur',
  validator: function(rule, value, callback) {
    if (!validateURL(value)) {
      callback(new Error('url地址不合法.'))
    } else {
      callback()
    }
  }
}]
