import Vue from 'vue'
import { Message } from 'element-ui'

Vue.prototype.$msg = Message

export function Msg(msg, option = {}) {
  changeNavZindex(true)
  Message({
    message: msg,
    onClose() {
      changeNavZindex(false)
    },
    ...option
  })
}
export function MsgClose() {
  Message.closeAll()
}

Vue.prototype.$msg.error = function(msg) {
  changeNavZindex(true)
  Message({
    type: 'error',
    message: msg,
    onClose() {
      changeNavZindex(false)
    }
  })
}

Vue.prototype.$msg.success = function(msg) {
  changeNavZindex(true)
  Message({
    type: 'success',
    message: msg,
    onClose() {
      changeNavZindex(false)
    }
  })
}

// 让信息提示从 navi 下面滑出
function changeNavZindex(isSet) {
  let cls = window._config.isMobile ? '.navi-mobile' : '.navi-pc'
  let el = document.querySelector(cls)
  let msgDom = document.querySelectorAll('.el-message')

  if (isSet) {
    if (!msgDom.length) {
      if (el) {
        el.style.zIndex = 3000
      }
    }
  } else {
    if (msgDom.length == 1) {
      setTimeout(function() {
        if (el) {
          el.style.zIndex = null
        }
      }, 500)
    }
  }
}
