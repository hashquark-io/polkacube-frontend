<i18n src="./locale.json"></i18n>
<template>
  <div class="marquee">
    <div class="marquee-title">
      <img src="@/assets/img/notice.svg" alt class="img" />
    </div>
    <div class="marquee-box">
      <ul class="marquee-list" :class="{ 'marquee-top': animate }">
        <li v-for="(item, ind) in marqueeList" :key="ind">
          <span class="block-1">{{ item.height }}</span>
          <span class="block-2">
            <Identicon
              v-if="item.validatorAddr"
              style="width: 20px;height: 22px;margin-right: 5px;"
              :size="18"
              :theme="'polkadot'"
              :value="item.validatorAddr"
            />
            <span class="ellipsis">{{ item.validatorName !== null ? item.validatorName : $t('validatorName') }}</span>
          </span>
          <span class="block-3">{{ strSlice(item.validatorAddr, !isMobile ? 14 : 6) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Identicon from '@polkadot/vue-identicon'
export default {
  components: {
    Identicon
  },
  props: {
    marqueeList: {
      type: Array,
      default: function() {
        return [
          {
            validatorName: '',
            validatorAddr: '',
            height: ''
          }
        ]
      }
    }
  },
  data() {
    return {
      animate: false,
      timer: null
    }
  },
  mounted() {
    this.startMarquee()
  },
  methods: {
    startMarquee() {
      if (this.timer || this.marqueeList.length <= 1) return
      this.startMove()
      this.timer = setInterval(() => {
        if (this.marqueeList.length === 1) {
          clearInterval(this.timer)
          this.timer = null
          return
        }
        this.startMove()
      }, 2000)
    },
    startMove() {
      if (this.marqueeList.length === 1) return
      this.animate = true
      setTimeout(() => {
        this.marqueeList.shift()
        this.animate = false
      }, 1000)
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  watch: {
    marqueeList(val) {
      if (val.length > 1) {
        this.startMarquee()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
html.desktop {
  .marquee {
    width: 441px;
    .block-3 {
      padding-left: 20px;
    }
  }
}
html.mobile {
  .marquee {
    margin: 10px 15px;
    padding: 5px;
    border-radius: 10px;
  }
  .marquee-title {
    display: flex;
    align-items: center;
    margin: 0 10px;
    width: 20px;
    height: 30px;
    .img {
      width: 18px;
      height: 18px;
    }
  }
  .marquee-box {
    flex: 1;
  }
}
.marquee {
  display: flex;
  align-items: center;
  height: 30px;
  color: #002264;
  font-size: 12px;
  background: #f6f9ff;
  border-radius: 15px;
}

.marquee-title {
  display: flex;
  align-items: center;
  margin: 0 0 0 15px;
  width: 40px;
  height: 30px;
  background: transparent;
  .img {
    width: 18px;
    height: 18px;
  }
}
.marquee-box {
  display: block;
  position: relative;
  // width: 60%;
  flex-grow: 1;
  height: 30px;
  overflow: hidden;
  background: transparent;
}

.marquee-list {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  li {
    display: flex;
    align-items: center;
    span {
      height: 30px;
    }
  }
  .block-1 {
    width: 70px;
  }
  .block-2 {
    display: flex;
    align-items: center;
    margin-left: 20px;
    & > span {
      width: 80px;
    }
  }
  .block-3 {
    padding-left: 20px;
    flex: 1;
  }
}

.marquee-top {
  transition: all 1s;
  transform: translateY(-30px);
}

.marquee-list li {
  color: #002264;
  height: 30px;
  line-height: 30px;
}
</style>
