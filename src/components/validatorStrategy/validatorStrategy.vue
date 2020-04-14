<i18n src="./locale.json"></i18n>
<template>
  <div class="validator-strategy">
    <div class="title">
      <span @click="$router.replace('/polka/strategy')">{{ $t('title') }}</span>
      <span>> {{ $t('subTitle') }}</span>
    </div>
    <div class="card">
      <p class="card-title">{{ $t('inputTitle') }}</p>
      <div class="card-input-wrap">
        <img class="icon" src="@/assets/img/calc.png" alt />
        <input type="text" class="input" :placeholder="$t('inputPlaceholder')" @input="formatInp" ref="inp" />
        <el-button
          type="primary"
          :class="['btn', !+amount && 'disabled']"
          :disabled="!+amount"
          @click="showProgressBar"
          v-if="!isMobile"
          >{{ $t('btn') }}</el-button
        >
      </div>
      <el-button type="primary" :class="['btn', !+amount && 'disabled']" @click="showProgressBar" v-if="isMobile">{{
        $t('btn')
      }}</el-button>

      <progress-bar ref="progressBar" :show="isCalc" />

      <div class="card-tips" v-show="!noData && showResult && !isMobile">
        <div class="daily-income">
          <div class="left">
            <p class="main-color fontw5 m-t-7">{{ $t('cardLabel')[0] }}</p>
            <p class="grey" style="width: 450px;">{{ $t('cardLabel')[1] }}</p>
          </div>
          <div class="right">
            <p class="orange fontw5 m-b-7 f-24">
              {{ info.dailyRevenue && info.dailyRevenue.slice(0, -3) }}
              <span class="f-16">KSM</span>
            </p>
            <p class="main-color">{{ $t('cardLabel')[2] }}</p>
          </div>
        </div>
        <div class="year-income">
          <p class="orange fontw5 m-b-7 f-24">{{ info.annualRate }}</p>
          <p class="main-color">{{ $t('cardLabel')[3] }}</p>
        </div>
      </div>

      <div class="card-tips" v-show="!noData && showResult && isMobile">
        <div class="top">
          <p class="main-color fontw5">{{ $t('cardLabel')[0] }}</p>
          <p class="grey">{{ $t('cardLabel')[1] }}</p>
        </div>
        <div class="income">
          <div class="daily-income">
            <p class="orange fontw5 f-24">
              {{ info.dailyRevenue && info.dailyRevenue.slice(0, -3) }}
              <span class="f-16">KSM</span>
            </p>
            <p class="main-color">{{ $t('cardLabel')[2] }}</p>
          </div>
          <div class="year-income">
            <p class="orange fontw5 f-24">{{ info.annualRate }}</p>
            <p class="main-color">{{ $t('cardLabel')[3] }}</p>
          </div>
        </div>
      </div>

      <div class="no-data" v-if="noData && showResult">
        <span v-text="$t('tips2')"></span>
        <router-link to="/polka/strategy/nominator">{{ $t('link') }}</router-link>
        <span>{{ $t('punctuation') }}</span>
      </div>

      <div v-if="!noData && showResult" class="result">
        <p>
          {{ $t('resultLabel')[0] }}
          <span class="f-24">{{ info.totalNumber }}</span>
        </p>
        <div v-if="isMobile">
          <p style="float: left; margin-top: 10px;">{{ $t('resultLabel')[1] }}</p>
          <p class="f-24" style="float: left;">{{ thousandth(info.averageBonded, 3) }} KSM</p>
          <p class="clear"></p>
        </div>
        <div v-else>
          {{ $t('resultLabel')[1] }}
          <span class="f-24">{{ thousandth(info.averageBonded, 3) }} KSM</span>
        </div>
        <p class="tips">{{ $t('tips1') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import progressBar from '@/components/progressbar/progressbar'

export default {
  components: {
    progressBar
  },
  data() {
    return {
      isCalc: false,
      noData: false,
      showResult: false,

      info: {},
      amount: ''
    }
  },
  mounted() {
    this.$refs.inp.focus()
  },
  methods: {
    showProgressBar() {
      this.startCalc()
    },
    calcTime() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
    axiosTimeout() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('time out')
        }, 10000)
      })
    },
    calc() {
      return Promise.all([this.axios.get(`${window._config.url.node}/${this.amount}`), this.calcTime()])
    },

    startCalc() {
      const progressIns = this.$refs.progressBar
      if (!this.amount || this.amount <= 0 || progressIns.isPending) return
      if (this.amount > 10000000) {
        this.$message.error(this.$t('invalideNum'))
        return
      }
      this.isCalc = true
      this.showResult = false
      progressIns.start()
      Promise.race([this.calc(), this.axiosTimeout()]).then(
        ([data]) => {
          this.info = data
          progressIns.finish().then(() => {
            this.isCalc = false
            this.noData = !this.info.totalNumber
            this.showResult = true
          })
        },
        err => {
          console.warn(err)
          progressIns.finish().then(() => {
            this.isCalc = false
            this.$message.error(this.$t('timeout'))
          })
        }
      )
    },
    formatInp(e) {
      let val = e.target.value
      val = val.replace(/[^\d.]/g, '') //清除“数字”和“.”以外的字符
      val = val.replace(/\.{2,}/g, '.') //只保留第一个. 清除多余的
      val = val
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      // eslint-disable-next-line no-useless-escape
      val = val.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3') //只能输入6位小数
      //如果没有小数点，不能为类似 01、02的金额
      // if (val.indexOf(".") < 0 && val != "") {
      //   val = parseFloat(val);
      // }
      this.amount = e.target.value = val
    }
  }
}
</script>
<style src="./validatorStrategy.scss" lang="scss"></style>
