import proposal from './components/proposal/proposal.vue'
import referendums from './components/referendums/referendums.vue'

import { loadSocket } from '@/methods/util'
import VueSticky from 'vue-sticky'
export default {
  components: {
    proposal,
    referendums
  },
  directives: {
    sticky: VueSticky
  },
  data() {
    return {
      activeInd: 0,
      polkaInfo: {
        progress: 0
      },
      timer1: null
    }
  },

  computed: {
    curProgress() {
      const { progress, launchPeriod } = this.polkaInfo
      return progress ? `${(progress * 100) / launchPeriod}%` : 0
    }
  },
  mounted() {
    this.initSocket()
    this.queryData()
    this.startTimer()
  },
  methods: {
    isActive(ind) {
      return this.activeInd === ind
    },
    initSocket() {
      // eslint-disable-next-line no-undef
      loadSocket(this.network)
      let id = Math.random()
      const self = this
      window.socket.on('finalizedHeaderChange', function(data) {
        const { launchPeriod } = self.polkaInfo
        self.polkaInfo.progress = (data.height % launchPeriod) + 1
        window.socket.emit('server', id)
      })
    },
    queryData() {
      this.axios.get(`${window._config.url.overview}`).then(res => {
        this.polkaInfo = res
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
      this.timer1 = setInterval(() => {}, 60000)
    }
  },

  beforeDestroy() {
    clearInterval(this.timer1)
    this.timer1 = null
    window.socket?.close()
    window.socket = null
  }
}
