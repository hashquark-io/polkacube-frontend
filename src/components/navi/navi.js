const transferPathToNetwork = path => {
  return {
    kusama: 'Kusama',
    'polkadot-cc1': 'Polkadot CC1'
  }[path]
}

const transferNetworkToPath = network => {
  return {
    Kusama: 'kusama',
    'Polkadot CC1': 'polkadot-cc1'
  }[network]
}

export default {
  name: 'navi',
  data() {
    return {
      isMenuDropdown: false,
      isSubMenuDropdown: [true],
      isLangMenuDropdown: false,
      isNetworkMenuDropdown: false
    }
  },
  computed: {
    language() {
      if (this.locale === 'en-US') return 'EN'
      return this.locale.includes('CN') ? '简中' : '繁中'
    },
    curNetwork() {
      return transferPathToNetwork(this.network)
    }
  },

  methods: {
    toggleMenu() {
      this.isMenuDropdown = !this.isMenuDropdown
      this.isLangMenuDropdown = false
      this.isNetworkMenuDropdown = false
    },
    toggleSubMenu(ind) {
      this.isSubMenuDropdown[ind] = !this.isSubMenuDropdown[ind]
      this.$forceUpdate()
    },
    toggleLangMenu() {
      this.isLangMenuDropdown = !this.isLangMenuDropdown
      this.isMenuDropdown = false
      this.isNetworkMenuDropdown = false
    },
    toggleNetworkMenu() {
      this.isNetworkMenuDropdown = !this.isNetworkMenuDropdown
      this.isMenuDropdown = false
      this.isLangMenuDropdown = false
    },
    menuItemClick() {
      this.isMenuDropdown = false
      this.isLangMenuDropdown = false
      this.isNetworkMenuDropdown = false
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
      this.$root.$i18n.locale = window._config.locale = lang
      document.querySelector('html').setAttribute('lang', lang)
      document.querySelector('title').innerText = window.localeMsg[window._config.locale]['polkaTitle']
    },
    path(path) {
      return `/${this.network}${path}`
    },
    active(routeList) {
      return routeList.includes(this.$route.name)
    },
    toggleNet(network) {
      if (network === this.curNetwork) return
      this.isNetworkMenuDropdown = false
      this.$router.push(`/${transferNetworkToPath(network)}`)
    }
  }
}
