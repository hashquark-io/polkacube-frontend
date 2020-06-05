import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie'
import merge from 'deepmerge'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhCNLocale from 'element-ui/lib/locale/lang/zh-CN'
import zhTWLocale from 'element-ui/lib/locale/lang/zh-TW'
import jaLocale from 'element-ui/lib/locale/lang/ja'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)

let locale = Cookie.get('locale')
if (locale) {
  window._config.locale = locale
} else {
  locale = (window.navigator.language || window.navigator.browserLanguage).toLowerCase()
  window._config.locale = locale = locale.indexOf('zh') == 0 ? 'zh-TW' : locale.indexOf('ja') == 0 ? 'ja-JP' : 'en-US'
}

const elMessages = {
  'zh-CN': {
    ...zhCNLocale
  },
  'zh-TW': {
    ...zhTWLocale
  },
  'en-US': {
    ...enLocale
  },
  'ja-JP': {
    ...jaLocale
  }
}
function loadLocaleMessages() {
  const langs = require.context('./lang', true, /[a-z0-9-]+\.js$/i)
  const messages = {}
  langs.keys().forEach(key => {
    const matched = key.match(/([a-z0-9-]+)\./i)
    if (matched && matched.length > 1) {
      const lang = matched[1]
      messages[lang] = langs(key).default
    }
  })
  return messages
}

export const localeMsg = merge(loadLocaleMessages(), elMessages)

window.localeMsg = localeMsg
const i18n = new VueI18n({
  locale,
  fallbackLocale: 'en-US',
  messages: localeMsg,
  silentTranslationWarn: true
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
