<template>
  <div class="income-slash-chart-comp-wrap">
    <img src="@/assets/img/dot.png" alt class="img-dot" v-if="!isMobile" />
    <div class="top" v-if="!isMobile">
      <div class="title">{{ $t('incomeSlashChartComp.title') }}</div>
    </div>
    <div class="chart-wrap" v-loading="chartLoading">
      <div class="chart" ref="chart"></div>
    </div>
  </div>
</template>
<script>
import { chartOption } from './chartOption'
import { deepClone } from '@/methods/util'
export default {
  data() {
    return {
      name: 'incomeSlashChart',
      accountAddr: this.$route.query.id,
      chartLoading: true
    }
  },
  mounted() {
    this.queryChartData()
  },
  methods: {
    queryChartData() {
      this.axios.get(`${window._config.url.slashReward}?accountAddr=${this.accountAddr}`).then(data => {
        this.chartLoading = false
        this.initChart(data)
      })
    },
    initChart(data) {
      const option = deepClone(chartOption)
      option.legend.data = Object.values(this.$t('incomeSlashChartComp.legend'))
      option.xAxis.data = data.map(t => t.currentEra)

      const data1 = data.map(t => t.reward)
      const data2 = data.map(t => t.slash)
      const data3 = data.map(t => t.avg)

      if (data.length >= 2) {
        this.calcMaxMin([...data1, ...data2, ...data3], option, 0)
      }
      option.series[0].data = data1
      option.series[0].name = this.$t('incomeSlashChartComp.legend')[0]
      option.series[1].data = data2
      option.series[1].name = this.$t('incomeSlashChartComp.legend')[1]
      option.series[2].data = data3
      option.series[2].name = this.$t('incomeSlashChartComp.legend')[2]
      if (this.isMobile) {
        option.legend.left = 15
        option.legend.top = 15
        option.legend.bottom = undefined
        option.grid.top = 100
        option.grid.left = 16
      }
      const chart = window.echarts.init(this.$refs.chart)
      chart.setOption(option)
    },
    calcMaxMin(data, option, ind) {
      if (data.every(t => t === undefined)) return
      const max = Math.max(...data.filter(t => t !== undefined))
      const min = Math.min(...data.filter(t => t !== undefined))
      const interval = (max - min) / 3
      if (Math.abs(interval) > 0 && min - interval >= 0) {
        option.yAxis[ind].min = min - interval
        option.yAxis[ind].max = max + interval
        option.yAxis[ind].interval = interval
      }
      if (Math.abs(interval) === 0) {
        const val = data[0]
        option.yAxis[ind].min = 0
        option.yAxis[ind].max = +val + val / 4
        option.yAxis[ind].interval = val / 4
      }
      if (min - interval < 0) {
        option.yAxis[ind].min = 0
        option.yAxis[ind].max = max + max / 4
        option.yAxis[ind].interval = max / 4
      }
    }
  },
  watch: {
    locale: 'queryChartData'
  }
}
</script>
<style src="./incomeSlashChart.scss" lang="scss"></style>
