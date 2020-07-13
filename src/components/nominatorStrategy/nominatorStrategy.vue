<template>
  <div class="nominator-strategy">
    <div class="title">
      <span @click="$router.replace(`/${network}/strategy`)">{{ $t('nominatorStrategyComp.title') }}</span>
      <span>> {{ $t('nominatorStrategyComp.subTitle') }}</span>
    </div>
    <div class="card">
      <p class="card-title">{{ $t('nominatorStrategyComp.inputTitle', [units]) }}</p>
      <div class="card-input-wrap">
        <img class="icon" src="@/assets/img/calc.png" alt />
        <input
          type="text"
          class="input"
          :placeholder="$t('nominatorStrategyComp.inputPlaceholder')"
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
          >{{ $t('nominatorStrategyComp.btn') }}</el-button
        >
      </div>

      <el-button type="primary" :class="['btn', !+amount && 'disabled']" @click="showProgressBar" v-if="isMobile">{{
        $t('nominatorStrategyComp.btn')
      }}</el-button>

      <progress-bar ref="progressBar" :show="isCalc" />

      <div class="card-tips" v-show="showResult && !isMobile">
        <div class="daily-income">
          <div class="left">
            <p class="main-color fontw5 m-t-7">{{ $t('nominatorStrategyComp.cardLabel')[0] }}</p>
            <p class="grey" style="width: 450px;">{{ $t('nominatorStrategyComp.cardLabel')[1] }}</p>
          </div>
          <div class="right">
            <p class="orange fontw5 m-b-7 f-24">
              <span v-if="info.dailyRevenue">{{ info.dailyRevenue.slice(0, -3) }}</span>
              <span v-else>--</span>
              <span class="f-16" v-if="info.dailyRevenue">{{ units }}</span>
            </p>
            <p class="main-color">{{ $t('nominatorStrategyComp.cardLabel')[2] }}</p>
          </div>
        </div>
        <div class="year-income">
          <p class="orange fontw5 m-b-7 f-24" v-if="info.annualRate">{{ info.annualRate }}</p>
          <p class="orange fontw5 m-b-7 f-24" v-else>--</p>
          <p class="main-color">{{ $t('nominatorStrategyComp.cardLabel')[3] }}</p>
        </div>
      </div>

      <div class="card-tips" v-show="showResult && isMobile">
        <div class="top">
          <p class="main-color fontw5">{{ $t('nominatorStrategyComp.cardLabel')[0] }}</p>
          <p class="grey">{{ $t('nominatorStrategyComp.cardLabel')[1] }}</p>
        </div>
        <div class="income">
          <div class="daily-income">
            <p class="orange fontw5 f-24">
              <span v-if="info.dailyRevenue">{{ info.dailyRevenue.slice(0, -3) }}</span>
              <span v-else>--</span>
              <span class="f-16" v-if="info.dailyRevenue">{{ units }}</span>
            </p>
            <p class="main-color">{{ $t('nominatorStrategyComp.cardLabel')[2] }}</p>
          </div>
          <div class="year-income">
            <p class="orange fontw5 m-b-7 f-24" v-if="info.annualRate">{{ info.annualRate }}</p>
            <p class="orange fontw5 m-b-7 f-24" v-else>--</p>
            <p class="main-color">{{ $t('nominatorStrategyComp.cardLabel')[3] }}</p>
          </div>
        </div>
      </div>

      <div class="table-comp-wrap" v-show="showResult">
        <el-table
          :data="info.validatorList || []"
          :empty-text="dataLoaded ? $t('nominatorStrategyComp.emptyText') : ' '"
          header-cell-class-name="table-header-cell"
          cell-class-name="table-body-cell"
          @row-click="toDetail"
        >
          <el-table-column
            prop="validatorAddr"
            :label="$t('nominatorStrategyComp.tableTitle')[0]"
            :width="isMobile ? '' : 430"
          >
            <template slot-scope="scope">
              <div class="table-col-1">
                <Identicon :size="28" :theme="'polkadot'" :value="scope.row.validatorAddress" />
                <div class="name-address">
                  <div :class="{ grey: !scope.row.validatorName }">
                    <judgement-popover
                      :identity="scope.row.validatorName"
                      v-if="Object.keys(scope.row.validatorName).length > 0"
                    />
                    {{
                      (scope.row.validatorName && scope.row.validatorName.display) ||
                        $t('nominatorStrategyComp.validatorName')
                    }}
                  </div>
                  <div>{{ isMobile ? strSlice(scope.row.validatorAddress) : scope.row.validatorAddress }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="totalBonded"
            :label="$t('nominatorStrategyComp.tableTitle')[1]"
            :width="130"
            align="right"
          >
            <template slot-scope="scope">
              <el-popover placement="top-start" trigger="hover" :content="popverText(scope.row)">
                <span slot="reference" class="table-body-cell pointer">{{ scope.row.totalBonded }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="commission"
            :label="$t('nominatorStrategyComp.tableTitle')[2]"
            align="right"
            :width="110"
            v-if="!isMobile"
          ></el-table-column>
          <el-table-column
            prop="eraRevenue"
            :label="$t('nominatorStrategyComp.tableTitle')[3]"
            align="right"
            v-if="!isMobile"
          ></el-table-column>
          <el-table-column
            prop="dailyRevenue"
            :label="$t('nominatorStrategyComp.tableTitle')[4]"
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
import { formatInp } from '@/methods/util'

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
        this.$msg.error(this.$t('nominatorStrategyComp.invalideNum'))
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
            this.$msg.error(this.$t('nominatorStrategyComp.timeout'))
          })
        }
      )
    },
    popverText({ selfBonded, nominationBonded }) {
      return `${selfBonded}(+${nominationBonded})`
    },
    toDetail({ validatorAddress }) {
      const ind = this.info.validatorList.findIndex(row => row.validatorAddress === validatorAddress)
      this.$router.push(`/${this.network}/detail?id=${validatorAddress}&ind=${ind}`)
    },
    formatInp(e) {
      this.amount = e.target.value = formatInp(e.target.value, 6)
    }
  }
}
</script>
<style src="./nominatorStrategy.scss" lang="scss"></style>
