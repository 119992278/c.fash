/**
 * Created by jiachenpan on 16/11/18.
 */
import i18n from '@/lang'
import dayjs from 'dayjs'
export function momentStampFormat(timestamp) {
  if (timestamp) {
    return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return '-'
  }
}
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

// 获取当月自然天数
export function getdynamicDate(time) {
  const amoDay = dayjs(time).endOf('month').format('DD')
  const amoMoon = dayjs(time).endOf('month').format('MM')
  const dynamic_date = []
  for (let i = 1; i <= amoDay; i++) {
    dynamic_date.push(amoMoon + '月' + i + '号')
  }
  return dynamic_date
}

// 判断为 空对象
export function isEmptyObject(obj) {
  for (var n in obj) { return false }
  return true
}

// 判断为 空对象
export function cleanCustomerId(customerId) {
  const _customerId = customerId === '0' ? null : customerId
  return _customerId
}

export function getAuthority3() {
  if (this.$store.state.user.authority.authority3 !== '') {
    return this.$store.state.user.authority.authority3.join(',')
  } else {
    return ''
  }
}

export function errorMsg(msg) {
  let msgStr = ''
  switch (msg) {
    case 2002:
      msgStr = i18n.t('login.passwordError')
      break
    case 2:
      break
    default:
      msgStr = msg
  }
  return msgStr
}
