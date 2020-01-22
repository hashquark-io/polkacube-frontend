import Identicon from '@polkadot/vue-identicon'
import slash from '@/components/slash/slash.vue'
import nominator from '@/components/nominator/nominator.vue'
import VueSticky from 'vue-sticky'

export default {
  components: {
    Identicon,
    slash,
    nominator
  },
  directives: {
    sticky: VueSticky
  },
  data() {
    return {
      activeInd: 0,
      info: {}
    }
  },
  computed: {
    rank() {
      const rank = Number(this.$route.query.ind) + 1
      return 'NO. ' + (!isNaN(rank) ? rank : '--')
    }
  },
  mounted() {
    this.queryData()
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
    initChart() {
      const chart = window.echarts.init(this.$refs.chart)
      const option = {
        title: {
          show: true,
          left: 135,
          top: 77,
          textAlign: 'center',
          text: ['{a| }\n', `{b| ${this.$t('chart')[0]} (KSM)}`].join(''),
          textStyle: {
            rich: {
              a: {
                fontSize: 14,
                fontWeight: 600,
                color: '#002264',
                lineHeight: 20
              },
              b: {
                fontSize: 10,
                color: '#7E8AA3',
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
          radius: ['50%', '75%'],
          center: [140, 100],
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
        option.series.radius = ['57%', '85%']
        option.series.center = [106, 106]
        option.title.left = 105
        option.title.top = 90
        option.title.textStyle.rich.a.fontSize = 16
        option.title.textStyle.rich.b.fontSize = 12
      }
      chart.setOption(option)
    },
    switchTab(ind) {
      if (ind === this.activeInd) return
      this.activeInd = ind
      if ((document.body.scrollTop || document.documentElement.scrollTop) > 772) {
        document.body.scrollTop = document.documentElement.scrollTop = 772
      }
    }
  }
}
