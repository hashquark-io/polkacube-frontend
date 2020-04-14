<i18n src="./locale.json"></i18n>
<template>
  <div class="nominator-strategy">
    <div class="title">
      <span @click="$router.replace('/polka/strategy')">{{ $t('title') }}</span>
      <span>> {{ $t('subTitle') }}</span>
    </div>
    <div class="card">
      <p class="card-title">{{ $t('inputTitle') }}</p>
      <div class="card-input-wrap">
        <img class="icon" src="@/assets/img/calc.png" alt />
        <input
          type="text"
          class="input"
          :placeholder="$t('inputPlaceholder')"
          :value="amount"
          @input="formatInp"
          ref="inp"
        />
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

      <div class="card-tips" v-show="showResult && !isMobile">
        <div class="daily-income">
          <div class="left">
            <p class="main-color fontw5 m-t-7">{{ $t('cardLabel')[0] }}</p>
            <p class="grey" style="width: 450px;">{{ $t('cardLabel')[1] }}</p>
          </div>
          <div class="right">
            <p class="orange fontw5 m-b-7 f-24">
              {{ info.dailyRevenue && info.dailyRevenue.slice(0, -3) }}
              <span class="f-16" v-if="info.dailyRevenue">KSM</span>
            </p>
            <p class="main-color">{{ $t('cardLabel')[2] }}</p>
          </div>
        </div>
        <div class="year-income">
          <p class="orange fontw5 m-b-7 f-24" v-if="info.annualRate">{{ info.annualRate }}</p>
          <p class="main-color">{{ $t('cardLabel')[3] }}</p>
        </div>
      </div>

      <div class="card-tips" v-show="showResult && isMobile">
        <div class="top">
          <p class="main-color fontw5">{{ $t('cardLabel')[0] }}</p>
          <p class="grey">{{ $t('cardLabel')[1] }}</p>
        </div>
        <div class="income">
          <div class="daily-income">
            <p class="orange fontw5 f-24">
              {{ info.dailyRevenue && info.dailyRevenue.slice(0, -3) }}
              <span class="f-16" v-if="info.dailyRevenue">KSM</span>
            </p>
            <p class="main-color">{{ $t('cardLabel')[2] }}</p>
          </div>
          <div class="year-income">
            <p class="orange fontw5 f-24" v-if="info.annualRate">{{ info.annualRate }}</p>
            <p class="main-color">{{ $t('cardLabel')[3] }}</p>
          </div>
        </div>
      </div>

      <div class="table-comp-wrap" v-show="showResult">
        <el-table
          :data="info.validatorList || []"
          :empty-text="dataLoaded ? $t('emptyText') : ' '"
          header-cell-class-name="table-header-cell"
          cell-class-name="table-body-cell"
          @row-click="toDetail"
        >
          <el-table-column prop="validatorAddr" :label="$t('tableTitle')[0]" :width="isMobile ? '' : 430">
            <template slot-scope="scope">
              <div class="table-col-1">
                <Identicon :size="28" :theme="'polkadot'" :value="scope.row.validatorAddress" />
                <div class="name-address">
                  <div :class="{ grey: !scope.row.validatorName }">
                    <judgement-popover
                      :identity="scope.row.validatorName"
                      v-if="Object.keys(scope.row.validatorName).length > 0"
                    />
                    {{ (scope.row.validatorName && scope.row.validatorName.display) || $t('validatorName') }}
                  </div>
                  <div>{{ isMobile ? strSlice(scope.row.validatorAddress) : scope.row.validatorAddress }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="totalBonded" :label="$t('tableTitle')[1]" :width="130" align="right">
            <template slot-scope="scope">
              <el-popover placement="top-start" trigger="hover" :content="popverText(scope.row)">
                <span slot="reference" class="table-body-cell pointer">{{ scope.row.totalBonded }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="commission"
            :label="$t('tableTitle')[2]"
            align="right"
            :width="110"
            v-if="!isMobile"
          ></el-table-column>
          <el-table-column
            prop="eraRevenue"
            :label="$t('tableTitle')[3]"
            align="right"
            v-if="!isMobile"
          ></el-table-column>
          <el-table-column
            prop="dailyRevenue"
            :label="$t('tableTitle')[4]"
            align="right"
            :width="156"
            v-if="!isMobile"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import progressBar from '@/components/progressbar/progressbar'
import Identicon from '@polkadot/vue-identicon'
import judgementPopover from '@/components/judgementPopover/judgementPopover.vue'

export default {
  components: {
    progressBar,
    Identicon,
    judgementPopover
  },
  data() {
    return {
      dataLoaded: false,

      info: {},
      tableData: [{}],

      isCalc: false,
      showResult: false,

      amount: ''
    }
  },

  mounted() {
    this.$refs.inp.focus()
    this.initCacheData()
  },
  methods: {
    initCacheData() {
      const { path } = this.$store.state.fromRoute
      const { info, amount } = this.$store.state.nominatorStrategyInfo
      console.log(path, info)

      if (path === '/polka/detail' && info) {
        this.info = info
        this.amount = amount
        this.isCalc = false
        this.showResult = true
      } else {
        this.$store.commit('setNominatorStrategyInfo', {})
      }
    },
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
      return Promise.all([this.axios.get(`${window._config.url.nomination}/${this.amount}`), this.calcTime()])
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
          this.$store.commit('setNominatorStrategyInfo', {
            info: data,
            amount: this.amount
          })
          progressIns.finish().then(() => {
            this.isCalc = false
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
    popverText({ selfBonded, nominationBonded }) {
      return `${selfBonded}(+${nominationBonded})`
    },
    toDetail({ validatorAddress }) {
      const ind = this.info.validatorList.findIndex(row => row.validatorAddress === validatorAddress)
      this.$router.push(`/polka/detail?id=${validatorAddress}&ind=${ind}`)
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
<style src="./nominatorStrategy.scss" lang="scss"></style>
