// 全局设定，各实例可以使用
export default {
  data() {
    return {
      locale: window._config.locale,
      isMobile: window._config.isMobile
    }
  },
  computed: {
    // domain 后缀
    envSuffix() {
      const suffix = {
        development: '',
        qa: '-qa',
        stage: '-stg',
        build: ''
      }
      // eslint-disable-next-line no-undef
      return suffix[APP_BUILD_ENV] || ''
    }
  },

  methods: {
    // 修复手机 safari 下 input[readonly="readonly"] 唤起输入法的 bug
    inputReadOnly$() {
      if (navigator.userAgent.toLowerCase().indexOf(' safari') > -1 && this.isMobile) {
        const el = document.querySelector('input[readonly="readonly"]')
        if (el) {
          el.style.userSelect = 'none'
          el.setAttribute('onfocus', 'blur()')
        }
      }
    }
  }
}
