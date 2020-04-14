<template>
  <div class="progress-bar-wrap" v-show="show">
    <div class="progress-bar">
      <div class="progress-bar-track"></div>
      <div class="progress bg-animate" :style="barStyle"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['show'],
  data() {
    return {
      progress: 0,
      isPending: false,
      speed: 2000,
      timer: null
    }
  },
  computed: {
    barStyle() {
      return {
        transform: `translate3d(${this.progress * 100}%, 0, 0)`,
        transition: `all ${this.speed}ms`
      }
    }
  },
  methods: {
    init() {
      this.speed = 2000
      this.progress = 0
      this.removeTimer()
    },
    start() {
      if (this.isPending) return
      this.isPending = true
      let work = () => {
        this.timer = setTimeout(() => {
          this.inc()
          work()
        }, this.speed)
      }
      setTimeout(() => {
        if (this.progress === 0) {
          this.progress = 0.7
          work()
        }
      }, 100)
    },
    inc() {
      this.speed = 200
      const n = this.progress
      let inc = 0
      if (n >= 0.0 && n < 0.85) {
        inc = 0.01
      } else if (n >= 0.85 && n < 0.9) {
        inc = 0.005
      } else {
        inc = 0
        return
      }
      this.set(n + inc)
    },
    set(val) {
      this.progress = val
    },
    removeTimer() {
      clearTimeout(this.timer)
      this.timer = null
    },

    finish() {
      return new Promise(resolve => {
        this.removeTimer()
        this.set(1)
        this.speed = 500
        setTimeout(() => {
          this.isPending = false
          resolve()
        }, 550)
      })
    }
  },
  watch: {
    show: 'init'
  }
}
</script>

<style lang="scss">
.progress-bar-wrap {
  margin-top: 80px;
  .progress-bar {
    margin: auto;
    position: relative;
    width: 243px;
    height: 27px;
    border-radius: 13px;
    overflow: hidden;
    .progress {
      position: absolute;
      left: -100%;
      top: 0;
      z-index: 5;
      width: 243px;
      height: 27px;
      background: url('../../assets/img/loading-item.png');
      background-size: 27px 27px;
      border-radius: 13px 0 0 13px;
      overflow: hidden;
      transition: all cubic-bezier(0, 1, 1, 0.975);
      will-change: transform;
    }
    .progress-bar-track {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      width: 243px;
      height: 27px;
      border-radius: 13px;
      border: 3px solid #5d89e6;
    }
    .bg-animate {
      animation: bgmove 4s linear infinite;
    }
    @keyframes bgmove {
      from {
        background-position: 0 0;
      }
      to {
        background-position: 100% 0;
      }
    }
  }
}
</style>
