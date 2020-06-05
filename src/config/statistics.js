//
//
window._hmt = window._hmt || []

// 测试环境的百度统计 ID
let BAIDUID = '0b300e2f6ded984f777d6162f01b2e83'

// eslint-disable-next-line no-undef
if (BUILD_ENV == 'stage') {
  // 预生产环境
  BAIDUID = '36635c8e83966536d44fc5105aaf4f33'
}

// eslint-disable-next-line no-undef
if (BUILD_ENV == 'build') {
  // 线上
  BAIDUID = 'fb2e63f858bebe64c8a786be22de17c9'
}

// 百度统计
;(function() {
  const hm = document.createElement('script')
  hm.src = `https://hm.baidu.com/hm.js?${BAIDUID}`
  const s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
})()
