import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhCNLocale from 'element-ui/lib/locale/lang/zh-CN'
import zhTWLocale from 'element-ui/lib/locale/lang/zh-TW'
import ElementLocale from 'element-ui/lib/locale'
import locales from './locales'

Vue.use(VueI18n)

let locale = Cookie.get('locale')
if (locale) {
  window._config.locale = locale
} else {
  locale = (window.navigator.language || window.navigator.browserLanguage).toLowerCase()
  window._config.locale = locale = locale.indexOf('zh') == 0 ? 'zh-CN' : 'en-US'
}

const i18n = new VueI18n({
  locale,
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': {
      ...locales['zh-CN'],
      ...zhCNLocale
    },
    'zh-TW': {
      ...locales['zh-TW'],
      ...zhTWLocale
    },
    'en-US': {
      ...locales['en-US'],
      ...enLocale
    }
  },
  silentTranslationWarn: true
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
