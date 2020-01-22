import { debounce } from '@/methods/util'

export const tableRefresh = {
  data() {
    return {
      timer: null,

      loading: false,
      allLoaded: false,

      page: 1,
      pageSize: 100,
      waitTime: 60000
    }
  },
  mounted() {
    if (this.name === 'slash') {
      if (this.autoRefresh) {
        this.initTableListen()
        this.startTimer()
      }
    } else {
      this.initTableListen()
      this.startTimer()
    }
  },
  methods: {
    initTableListen() {
      const table = document.querySelector(`.${this.name}-comp-wrap .el-table__body-wrapper`)
      table && table.addEventListener('scroll', this.removeListen)
    },
    removeTableListen() {
      const table = document.querySelector(`.${this.name}-comp-wrap .el-table__body-wrapper`)
      table && table.removeEventListener('scroll', this.removeListen)
    },
    removeListen: debounce(
      function() {
        this.endTimer()
        this.removeTableListen()
      },
      500,
      true
    ),

    startTimer() {
      this.endTimer()
      this.timer = setInterval(() => {
        this.queryData(1)
      }, this.waitTime)
    },
    endTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
    refreshTimer() {
      this.startTimer()
    }
  },
  beforeDestroy() {
    this.removeTableListen()
    this.endTimer()
  }
}

export const tableResize = {
  data() {
    const tableHeight = window.innerHeight - 315 > 448 ? window.innerHeight - 315 : 448
    return {
      tableHeight
    }
  },
  mounted() {
    window.addEventListener('resize', this.resize, false)
  },
  methods: {
    resize() {
      this.tableHeight = window.innerHeight - 315 > 448 ? window.innerHeight - 315 : 448
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  }
}
