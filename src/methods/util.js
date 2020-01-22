//
import Vue from 'vue'
import Big from 'big.js'

function format(num) {
  var reg = /\d{1,3}(?=(\d{3})+$)/g
  return `${num}`.replace(reg, '$&,')
}

// 加上千分位
const thousandth = function(v, num) {
  if (typeof v === 'object' || isNaN(+v)) return ''
  if (v === 0) return Big(v).toFixed(num)
  let val
  if (num) {
    val = (parseInt(v * Math.pow(10, num)) / Math.pow(10, num)).toFixed(num)
  } else {
    val = Big(v).toFixed()
  }
  const [left, right] = `${val}`.split('.')
  v = right ? [format(left), right].join('.') : format(left)
  return v
}

const Mathfloor = (v, num = 2) => {
  if (typeof v === 'object' || isNaN(+v)) return
  return (parseInt(v * Math.pow(10, num)) / Math.pow(10, num)).toFixed(num)
}

const debounce = function(func, wait, immediate) {
  // immediate默认为false
  var timeout, args, context, timestamp, result

  var later = function() {
    // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
    var last = +new Date() - timestamp

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function() {
    context = this
    args = arguments
    timestamp = +new Date()
    // 第一次调用该方法时，且immediate为true，则调用func函数
    var callNow = immediate && !timeout
    // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

function deepClone(obj, hash = new WeakMap()) {
  const objStr = Object.prototype.toString.call(obj)
  if (!(objStr === '[object Object]' || objStr === '[object Array]')) {
    return obj
  }
  // 查表
  if (hash.has(obj)) return hash.get(obj)

  let isArray = Array.isArray(obj)
  let cloneObj = isArray ? [] : {}
  // 哈希表设值
  hash.set(obj, cloneObj)

  let result = Object.keys(obj).map(key => {
    return {
      [key]: deepClone(obj[key], hash)
    }
  })
  return Object.assign(cloneObj, ...result)
}

const strSlice = (str, front = 6, behind = 4) => {
  if (typeof str !== 'string' || str.length === 0) return ''
  return str.slice(0, front) + '...' + str.slice(-behind)
}

Vue.prototype.thousandth = thousandth
Vue.prototype.Mathfloor = Mathfloor
Vue.prototype.strSlice = strSlice

export { format, thousandth, Mathfloor, debounce, deepClone, strSlice }
