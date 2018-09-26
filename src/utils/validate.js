/**
 * Created by jiachenpan on 16/11/18.
 */
import validator from 'validator'

/* 不为空*/
export function isNoEmpty(str) {
  return !validator.isEmpty(str)
}

/* 判断不为空*/
export var isvalidNoEmpty = [{
  required: true,
  trigger: 'blur',
  validator: function(rule, value, callback) {
    if (validator.isEmpty(value)) {
      callback(new Error('该字段不为空'))
    } else {
      callback()
    }
  }
}]

// 合法URL
export var isvalidURL = [{
  required: true,
  trigger: 'blur',
  validator: function(rule, value, callback) {
    if (validator.isURL(value)) {
      callback()
    } else {
      callback(new Error('url地址不合法.'))
    }
  }
}]

// 合法邮箱
export var isvalidEmail = [{
  required: true,
  trigger: 'blur',
  validator: function(rule, value, callback) {
    if (validator.isEmail(value)) {
      callback()
    } else {
      callback(new Error('邮箱地址不合法.'))
    }
  }
}]
