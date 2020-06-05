import validator from '@/components/validator/validator.vue'
import income from '@/components/income/income.vue'
import slash from '@/components/slash/slash.vue'

import { thousandth, loadSocket } from '@/methods/util'
import VueSticky from 'vue-sticky'
export default {
  components: {
    validator,
    income,
    slash
  },
  directives: {
    sticky: VueSticky
  },
  data() {
    return {
      activeInd: 0,
      polkaInfo: {
        height: ''
      },
      timer1: null,
      timer2: null
    }
  },

  computed: {
    eporchProgress() {
      const { sessionProgress, sessionLength } = this.polkaInfo
      return sessionProgress ? `${(sessionProgress * 100) / sessionLength}%` : 0
    },
    eraProgress() {
      const { eraProgress, eraLength } = this.polkaInfo
      return eraProgress ? `${(eraProgress * 100) / eraLength}%` : 0
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    loadSocket(this.network)
    this.initSocket()
    this.startTimer()
    this.queryToken()
    this.queryTokenValidator()
    this.queryFinalizeNumber()
  },
  methods: {
    isActive(ind) {
      return this.activeInd === ind
    },
    initSocket() {
      let id = Math.random()
      const self = this
      window.socket.on('finalizedHeaderChange', function(data) {
        self.polkaInfo.height = `${thousandth(data.height)}`
        window.socket.emit('server', id)
      })
    },
    queryToken() {
      this.axios.get(`${window._config.url.token}`).then(res => {
        this.polkaInfo = {
          ...this.polkaInfo,
          ...res
        }
      })
    },
    queryTokenValidator() {
      this.axios.get(`${window._config.url.tokenValidator}`).then(res => {
        this.polkaInfo = {
          ...this.polkaInfo,
          ...res
        }
      })
    },
    queryFinalizeNumber() {
      this.axios.get(`${window._config.url.finalizeNumber}`).then(({ finalized }) => {
        this.polkaInfo.height = thousandth(finalized)
      })
    },
    switchTab(ind) {
      if (ind === this.activeInd) return
      this.activeInd = ind
      if ((document.body.scrollTop || document.documentElement.scrollTop) > 536) {
        document.body.scrollTop = document.documentElement.scrollTop = 536
      }
    },
    startTimer() {
      this.timer1 = setInterval(() => {
        this.queryToken()
      }, 60000)
      this.timer2 = setInterval(() => {
        this.queryTokenValidator()
      }, 10000)
    },

    loadc(comp) {
      console.log('show', comp)
    }
  },

  beforeDestroy() {
    clearInterval(this.timer1)
    clearInterval(this.timer2)
    this.timer1 = null
    this.timer2 = null
    window.socket?.close()
    window.socket = null
  }
}
