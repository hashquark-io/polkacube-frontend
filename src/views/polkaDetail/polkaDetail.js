import Identicon from '@polkadot/vue-identicon'
import slash from '@/components/slash/slash.vue'
import nominator from '@/components/nominator/nominator.vue'
import blockChart from '@/components/blockChart/blockChart.vue'
import incomeSlashChart from '@/components/incomeSlashChart/incomeSlashChart.vue'
import VueSticky from 'vue-sticky'

import { throttle } from '@/methods/util'

const refNameList = ['validator', 'nominator', 'slash', 'blockChart', 'incomeSlashChart']
const img1 = require('@/assets/img/icon-judge-1.png')
const img2 = require('@/assets/img/icon-judge-2.png')
const img3 = require('@/assets/img/icon-judge-3.png')
const img4 = require('@/assets/img/icon-judge-4.png')
const img5 = require('@/assets/img/icon-judge-5.png')
const img6 = require('@/assets/img/icon-judge-6.png')

export default {
  components: {
    Identicon,
    slash,
    nominator,
    blockChart,
    incomeSlashChart
  },
  directives: {
    sticky: VueSticky
  },
  data() {
    return {
      activeInd: 0,
      info: {},
      imgStyle: {
        width: '18px',
        margin: '0 10px 0 0'
      },
      navList: [],
      imgs: [img1, img2, img3, img4, img5, img6],
      identityInfo: {},
      showJudgement: false
    }
  },
  computed: {
    rank() {
      const rank = Number(this.$route.query.ind) + 1
      return 'NO. ' + (!isNaN(rank) ? rank : '--')
    },
    curImg() {
      return this.identityInfo.judgementsNum ? this.imgs[this.identityInfo.judgementsNum] : img1
    }
  },
  beforeMount() {
    this.navList = Object.values(this.$t('navPc')).map((t, i) => {
      return {
        text: t,
        active: false,
        refName: refNameList[i]
      }
    })
  },
  mounted() {
    this.queryData()
    this.queryIdentity()
    if (!this.isMobile) {
      this.loadActiveNav()
      window.addEventListener('scroll', this.scrollFunc, false)
    }
  },
  methods: {
    isActive(ind) {
      return this.activeInd === ind
    },
    queryData() {
      this.axios.get(`${window._config.url.validator}/${this.$route.query.id}`).then(res => {
        this.info = res
        this.initChart()
      })
    },
    queryIdentity() {
      this.axios.get(`${window._config.url.identity}/${this.$route.query.id}`).then(res => {
        let identityInfo = null
        this.showJudgement = res && Object.keys(res).length > 0
        if (res.judgements && res.judgements.length > 0) {
          try {
            const judgementsText = {
              0: 'Unknown',
              1: 'Reasonable',
              2: 'Known Good',
              3: 'Out of Date',
              4: 'Low Quality',
              5: 'Erroneous'
            }
            identityInfo = {
              judgements: true,
              judgementsNum: res.judgements.length,
              judgementsDesc: this.$t(judgementsText[res.judgements.length])
            }
          } catch {
            identityInfo = {
              judgements: false
            }
          }
        } else {
          identityInfo = {
            judgements: false
          }
        }
        const judgementInfoList = ['display', 'legal', 'email', 'web', 'twitter', 'riot']
        identityInfo.list = res
          ? judgementInfoList.map(key => [key, res[key]]).filter(([k, v]) => !!v && k !== 'judgements' && k !== 'other')
          : []

        this.identityInfo = identityInfo
      })
    },
    loadActiveNav() {
      const windowHeight = window.outerHeight
      let activeRef = ''
      for (let t of refNameList) {
        if (this.$refs[t]) {
          const { top, height } = this.$refs[t].getBoundingClientRect()
          if (top < windowHeight / 2 && top > -height / 2) {
            activeRef = t
            break
          }
        }
      }
      if (activeRef) {
        this.navList.forEach(t => (t.active = false))
        this.navList.find(t => t.refName === activeRef).active = true
      }
    },
    scrollFunc: throttle(function() {
      this.loadActiveNav()
    }, 300),

    initChart() {
      const chart = window.echarts.init(this.$refs.chart)
      const option = {
        title: {
          show: true,
          left: 95,
          top: 77,
          textAlign: 'center',
          text: ['{a| }\n', `{b| ${this.$t('chart')[0]} (KSM)}`].join(''),
          textStyle: {
            rich: {
              a: {
                fontSize: 14,
                fontWeight: 600,
                color: '#1c1f44',
                lineHeight: 20
              },
              b: {
                fontSize: 10,
                color: '#76788f',
                lineHeight: 14
              }
            }
          }
        },

        tooltip: {
          show: false
        },
        color: ['#BEC6D5', '#3B72E1'],
        series: {
          radius: ['51%', '75%'],
          center: [100, 100],
          type: 'pie',
          data: [1, 3],
          label: {
            show: false
          }
        }
      }
      option.title.text = [`{a|${this.info.totalBondedKsm.slice(0, -3)}}\n`, `{b| ${this.$t('chart')[0]} (KSM)}`].join(
        ''
      )
      option.series.data = [
        {
          value: this.info.selfBonded,
          name: this.$t('chart')[1]
        },
        {
          value: this.info.nominatorsBonded,
          name: this.$t('chart')[2]
        }
      ]
      if (this.isMobile) {
        option.series.radius = ['60%', '85%']
        option.series.center = [106, 106]
        option.title.left = 102
        option.title.top = 90
        option.title.textStyle.rich.a.fontSize = 16
        option.title.textStyle.rich.b.fontSize = 12
      }
      chart.setOption(option)
    },
    switchTab(ind) {
      if (ind === this.activeInd) return
      this.activeInd = ind
      const stickyTop = this.$refs.tableH5Wrap ? this.$refs.tableH5Wrap.offsetTop : 0
      if ((document.body.scrollTop || document.documentElement.scrollTop) > stickyTop) {
        document.body.scrollTop = document.documentElement.scrollTop = stickyTop
      }
    },
    navJump({ refName }) {
      this.$nextTick(() => {
        this.$refs[refName].scrollIntoView({ behavior: 'smooth' })
      })
    }
  },
  beforeDestroy() {
    if (!this.isMobile) {
      window.removeEventListener('scroll', this.scrollFunc)
    }
  }
}
