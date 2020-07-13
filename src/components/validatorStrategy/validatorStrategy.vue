<template>
  <div class="validator-strategy">
    <div class="title">
      <span @click="$router.replace(`/${network}/strategy`)">{{ $t('validatorStrategyComp.title') }}</span>
      <span>> {{ $t('validatorStrategyComp.subTitle') }}</span>
    </div>
    <div class="card">
      <p class="card-title">{{ $t('validatorStrategyComp.inputTitle', [units]) }}</p>
      <div class="card-input-wrap">
        <img class="icon" src="@/assets/img/calc.png" alt />
        <input
          type="text"
          class="input"
          :placeholder="$t('validatorStrategyComp.inputPlaceholder')"
          @input="formatInp"
          ref="inp"
        />
        <el-button
          type="primary"
          :class="['btn', !+amount && 'disabled']"
          :disabled="!+amount"
          @click="showProgressBar"
          v-if="!isMobile"
          >{{ $t('validatorStrategyComp.btn') }}</el-button
        >
      </div>
      <el-button type="primary" :class="['btn', !+amount && 'disabled']" @click="showProgressBar" v-if="isMobile">{{
        $t('validatorStrategyComp.btn')
      }}</el-button>

      <progress-bar ref="progressBar" :show="isCalc" />

      <div class="card-tips" v-show="!noData && showResult && !isMobile">
        <div class="daily-income">
          <div class="left">
            <p class="main-color fontw5 m-t-7">{{ $t('validatorStrategyComp.cardLabel')[0] }}</p>
            <p class="grey" style="width: 450px;">{{ $t('validatorStrategyComp.cardLabel')[1] }}</p>
          </div>
          <div class="right">
            <p class="orange fontw5 m-b-7 f-24">
              <span v-if="info.dailyRevenue">{{ info.dailyRevenue.slice(0, -3) }}</span>
              <span v-else>--</span>
              <span class="f-16" v-if="info.dailyRevenue">{{ units }}</span>
            </p>
            <p class="main-color">{{ $t('validatorStrategyComp.cardLabel')[2] }}</p>
          </div>
        </div>
        <div class="year-income">
          <p class="orange fontw5 m-b-7 f-24" v-if="info.annualRate">{{ info.annualRate }}</p>
          <p class="orange fontw5 m-b-7 f-24" v-else>--</p>
          <p class="main-color">{{ $t('validatorStrategyComp.cardLabel')[3] }}</p>
        </div>
      </div>

      <div class="card-tips" v-show="!noData && showResult && isMobile">
        <div class="top">
          <p class="main-color fontw5">{{ $t('validatorStrategyComp.cardLabel')[0] }}</p>
          <p class="grey">{{ $t('validatorStrategyComp.cardLabel')[1] }}</p>
        </div>
        <div class="income">
          <div class="daily-income">
            <p class="orange fontw5 f-24">
              <span v-if="info.dailyRevenue">{{ info.dailyRevenue.slice(0, -3) }}</span>
              <span v-else>--</span>
              <span class="f-16" v-if="info.dailyRevenue">{{ units }}</span>
            </p>
            <p class="main-color">{{ $t('validatorStrategyComp.cardLabel')[2] }}</p>
          </div>
          <div class="year-income">
            <p class="orange fontw5 m-b-7 f-24" v-if="info.annualRate">{{ info.annualRate }}</p>
            <p class="orange fontw5 m-b-7 f-24" v-else>--</p>
            <p class="main-color">{{ $t('validatorStrategyComp.cardLabel')[3] }}</p>
          </div>
        </div>
      </div>

      <div class="no-data" v-if="noData && showResult">
        <span v-text="$t('validatorStrategyComp.tips2')"></span>
        <router-link to="/polka/strategy/nominator">{{ $t('validatorStrategyComp.link') }}</router-link>
        <span>{{ $t('validatorStrategyComp.punctuation') }}</span>
      </div>

      <div v-if="!noData && showResult" class="result">
        <p>
          {{ $t('validatorStrategyComp.resultLabel')[0] }}
          <span class="f-24">{{ info.totalNumber }}</span>
        </p>
        <div v-if="isMobile">
          <p style="float: left; margin-top: 10px;">{{ $t('validatorStrategyComp.resultLabel')[1] }}</p>
          <p class="f-24" style="float: left;">{{ thousandth(info.averageBonded, 3) }} {{ units }}</p>
          <p class="clear"></p>
        </div>
        <div v-else>
          {{ $t('validatorStrategyComp.resultLabel')[1] }}
          <span class="f-24">{{ thousandth(info.averageBonded, 3) }} {{ units }}</span>
        </div>
        <p class="tips">{{ $t('validatorStrategyComp.tips1') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import progressBar from '@/components/progressbar/progressbar'
import { formatInp } from '@/methods/util'

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
        this.$msg.error(this.$t('validatorStrategyComp.invalideNum'))
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
            this.$msg.error(this.$t('validatorStrategyComp.timeout'))
          })
        }
      )
    },
    formatInp(e) {
      this.amount = e.target.value = formatInp(e.target.value, 6)
    }
  }
}
</script>
<style src="./validatorStrategy.scss" lang="scss"></style>
