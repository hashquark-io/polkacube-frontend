const color = '#BFBFBF'

export const chartOption = {
  color: ['#0028BC', '#FA6900', '#D4D9DF'],
  backgroundColor: '#fff',
  tooltip: {
    confine: true,
    show: true,
    trigger: 'axis',
    backgroundColor: '#FFF',
    textStyle: {
      color: '$color-1'
    },
    extraCssText: 'box-shadow:0px 6px 10px 0px rgba(0,0,0,0.2); padding: 10px 19px; line-height: 28px;'
  },
  legend: {
    right: 0,
    bottom: 15,
    icon: 'circle',
    textStyle: {
      padding: [0, 30, 0, 0]
    }
  },
  grid: {
    top: '50',
    left: '30',
    right: '30',
    bottom: '75',
    containLabel: true
  },
  xAxis: {
    offset: 20,
    axisLine: {
      lineStyle: {
        color
      }
    },
    axisTick: {
      alignWithLabel: true
    },
    type: 'category',
    boundaryGap: true
  },
  yAxis: [
    {
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLine: {
        show: false,
        lineStyle: {
          color
        }
      },
      axisLabel: {
        formatter(value) {
          if (Math.abs(value) >= 1000000) {
            return `${(value / 1000000).toFixed(2)}m`
          }
          if (Math.abs(value) >= 1000) {
            return `${(value / 1000).toFixed(2)}k`
          }
          return value.toFixed(2)
        }
      },
      type: 'value',
      boundaryGap: ['20%', '15%'],
      splitNumber: 4
    }
  ],
  series: [
    {
      name: '收益',
      type: 'line',
      data: []
    },
    {
      name: 'slash',
      type: 'line',
      data: []
    },
    {
      name: '全网平均数量',
      type: 'line',
      data: []
    }
  ]
}
