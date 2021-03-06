//
import Vue from 'vue'
import Big from 'big.js'

export function format(num) {
  var reg = /\d{1,3}(?=(\d{3})+$)/g
  return `${num}`.replace(reg, '$&,')
}

// 加上千分位
export const thousandth = function(v, num) {
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

export const Mathfloor = (v, num = 2) => {
  if (typeof v === 'object' || isNaN(+v)) return
  return (parseInt(v * Math.pow(10, num)) / Math.pow(10, num)).toFixed(num)
}

export const debounce = function(func, wait, immediate) {
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
export const throttle = function(func, wait, options) {
  /* options的默认值
   *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
   *  options.leading = true;
   * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
   *  options.trailing = true;
   * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
   */
  var context, args, result
  var timeout = null
  var previous = 0
  if (!options) options = {}
  var later = function() {
    previous = options.leading === false ? 0 : new Date()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function() {
    var now = new Date()
    if (!previous && options.leading === false) previous = now
    // 计算剩余时间
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    // 当到达wait指定的时间间隔，则调用func函数
    // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
    if (remaining <= 0 || remaining > wait) {
      // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      // options.trailing=true时，延时执行func函数
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

export function deepClone(obj, hash = new WeakMap()) {
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

export const strSlice = (str, front = 6, behind = 4) => {
  if (typeof str !== 'string' || str.length === 0) return ''
  return str.slice(0, front) + '...' + str.slice(-behind)
}

Vue.prototype.thousandth = thousandth
Vue.prototype.Mathfloor = Mathfloor
Vue.prototype.strSlice = strSlice

export function formatInp(val, len = 3) {
  val = val.replace(/[^\d.]/g, '') //清除“数字”和“.”以外的字符
  val = val.replace(/\.{2,}/g, '.') //只保留第一个. 清除多余的
  val = val
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
  // eslint-disable-next-line prettier/prettier
  let pattern = ''
  eval(
    `pattern = /^(\\d+)\\.(${Array(len) //只能输入len位小数
      .fill('\\d')
      .join('')}).*$/`
  )
  // eslint-disable-next-line no-undef
  val = val.replace(pattern, '$1.$2')
  return val
}

export function arraySort(arr, orders) {
  arr.sort(function(a, b) {
    return sortByProps(a, b, orders)
  })
}
function sortByProps(a, b, orders) {
  let cps = [] // 存储排序属性比较结果。
  // 当return 的值大于0时当前比较的两项 交换位置 小于0不换 0不变
  if (orders && typeof orders === 'object') {
    for (let k in orders) {
      let asc = orders[k] === 'asc'
      if (a[k] > b[k]) {
        cps.push(asc ? 1 : -1)
        break
      } else if (a[k] === b[k]) {
        cps.push(0)
      } else {
        cps.push(asc ? -1 : 1)
        break
      }
    }
  }
  for (let j = 0; j < cps.length; j++) {
    if (cps[j]) {
      return cps[j]
    }
  }
  return 0
}

export function loadSocket(network) {
  // eslint-disable-next-line no-undef
  const path =
    // eslint-disable-next-line no-undef
    BUILD_ENV !== 'development'
      ? // eslint-disable-next-line no-undef
        `${network === 'kusama' ? POLKACUBE_SOCKET_PATH : POLKADOT_SOCKET_PATH}/socket.io`
      : '/socket.io'
  window.socket = window.socket || (window.socket = window.io(window.SOCKET_HOST, { path }))
}
