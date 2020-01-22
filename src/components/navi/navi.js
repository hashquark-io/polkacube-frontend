export default {
  name: 'navi',
  data() {
    const chainTypes = Object.entries(this.$t('chainTypes')).map(([k, v]) => [k, v])
    return {
      isMenuDropdown: false,
      isSubMenuDropdown: [true],
      isLangMenuDropdown: false,
      chainTypes
    }
  },
  computed: {
    chainType() {
      const chainTypeArr = this.chainTypes.find(t => this.$route.path.includes(t[0]))
      return chainTypeArr ? chainTypeArr[1] : ''
    },
    language() {
      if (this.locale === 'en-US') return 'EN'
      return this.locale.includes('CN') ? '简中' : '繁中'
    }
  },

  methods: {
    toggleMenu(status) {
      this.isMenuDropdown = status
    },
    toggleSubMenu(ind) {
      this.isSubMenuDropdown[ind] = !this.isSubMenuDropdown[ind]
      this.$forceUpdate()
    },
    toggleLangMenu() {
      this.isLangMenuDropdown = !this.isLangMenuDropdown
    },
    menuItemClick() {
      this.isMenuDropdown = false
    },

    switchLanguage(lang) {
      if (this.locale === lang) {
        return
      }

      this.cookie.remove('locale') // 删除老的cookie

      const domain = document.domain
        .split('.')
        .slice(-2)
        .join('.')
      this.cookie.set('locale', lang, {
        expires: 3650,
        domain
      })
      window.location.reload()
    }
  }
}
