<i18n src="./locale.json"></i18n>
<template>
  <div>
    <div class="referendums-comp-wrap" v-if="!isMobile">
      <img src="@/assets/img/dot.png" alt class="img-dot" />
      <div class="top">
        <div class="title">{{ $t('title') }}</div>
      </div>
      <div class="table-comp-wrap">
        <el-table
          v-loading="loading"
          :showHeader="false"
          :data="tableData"
          cell-class-name="table-body-cell"
          row-class-name="table-row-class"
          ref="table"
        >
          <el-table-column align="center" :width="78">
            <template slot-scope="scope">
              <span class="table-col-1">{{ scope.row.index }}</span>
            </template>
          </el-table-column>
          <el-table-column :width="634">
            <template slot-scope="scope">
              <div class="table-col-2">
                <div class="proposal-hash-wrap">
                  <p class="title">{{ scope.row.detail ? $t('tableTitle')[1][0] : $t('tableTitle')[1][1] }}</p>
                  <div class="hash">
                    <span>{{ scope.row.hash }}</span>
                  </div>
                </div>
                <div class="proposal-info" v-if="scope.row.detail">
                  <div class="summary" @click="scope.row.showRroposal = !scope.row.showRroposal">
                    <p class="section-method">{{ scope.row.detail.section }}.{{ scope.row.detail.method }}</p>
                    <img
                      src="@/assets/img/icon-arrow-down-2.png"
                      style="width:12px;height:12px;"
                      :class="['icon', scope.row.showRroposal && 'icon-rotate']"
                    />
                  </div>
                  <div v-show="scope.row.showRroposal" class="detail">
                    <div class="row" v-for="(item, ind) in scope.row.detail.args" :key="ind">
                      <div class="avatar">
                        <Identicon :size="32" :theme="'polkadot'" :value="item.value" v-if="item.identity" />
                      </div>

                      <div class="content">
                        <div class="grey-2">{{ item.name }}</div>
                        <div class="num">
                          <div>{{ item.value }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="totalBondedKsm" :label="$t('tableTitle')[2]" align="left">
            <template slot-scope="scope">
              <div>
                <p class="grey-1">{{ $t('tableTitle')[2] }}</p>
                <p>{{ scope.row.remainingBlocksFormat }} {{ $t('blocks') }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="commission" :label="$t('tableTitle')[3]" align="left" v-if="!isMobile">
            <template slot-scope="scope">
              <div>
                <p class="grey-1">{{ $t('tableTitle')[3] }}</p>
                <p>#{{ scope.row.enactBlockFormat }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="eraPoint" align="left">
            <template slot-scope="scope">
              <div>
                <p class="grey-1">{{ $t('tableTitle')[4] }}({{ scope.row.voteCountAye }})</p>
                <p>{{ scope.row.votedBalanceAyeFormat }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="height" align="left">
            <template slot-scope="scope">
              <div>
                <p class="grey-1">{{ $t('tableTitle')[5] }}({{ scope.row.voteCountNay }})</p>
                <p>{{ scope.row.votedBalanceNayFormat }}</p>
              </div>
            </template>
          </el-table-column>
          <div class="empty" slot="empty">
            <img src="@/assets/img/nodata.png" alt="" v-if="dataLoaded" />
            <p v-if="dataLoaded">{{ $t('emptyText') }}</p>
          </div>
        </el-table>
      </div>
    </div>
    <div class="referendums-comp-wrap" v-if="isMobile" v-loading.fullscreen.lock="loading && isMobile && !isMounted">
      <div class="referendums-comp-h5" v-if="dataLoaded && tableData.length != 0">
        <div class="row" v-for="(item, ind) in tableData" :key="ind">
          <div class="top">
            <div class="index">{{ item.index }}</div>
            <div class="proposal-hash-wrap">
              <p class="title">{{ item.detail ? $t('tableTitle')[1][0] : $t('tableTitle')[1][1] }}</p>
              <div class="hash ellipsis">{{ item.hash }}</div>
              <div class="proposal-info" v-if="item.detail">
                <div class="summary" @click="item.showRroposal = !item.showRroposal">
                  <p class="section-method">{{ item.detail.section }}.{{ item.detail.method }}</p>
                  <img
                    src="@/assets/img/icon-arrow-down-2.png"
                    style="width:12px;height:12px;"
                    :class="['icon', item.showRroposal && 'icon-rotate']"
                  />
                </div>
                <div v-show="item.showRroposal" class="detail">
                  <div class="item" v-for="(t, ind) in item.detail.args" :key="ind">
                    <div class="avatar">
                      <Identicon :size="32" :theme="'polkadot'" :value="t.value" v-if="t.identity" />
                    </div>

                    <div class="content">
                      <div class="grey-2">{{ t.name }}</div>
                      <div class="num ellipsis">{{ t.value }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bot">
            <div>
              <p class="color-grey-1">{{ $t('tableTitle')[2] }}</p>
              <p>{{ item.remainingBlocksFormat }} {{ $t('blocks') }}</p>
            </div>
            <div>
              <p class="color-grey-1">{{ $t('tableTitle')[3] }}</p>
              <p>#{{ item.enactBlockFormat }}</p>
            </div>
            <div>
              <p class="color-grey-1">{{ $t('tableTitle')[4] }}({{ item.voteCountAye }})</p>
              <p>{{ item.votedBalanceAyeFormat }}</p>
            </div>
            <div>
              <p class="color-grey-1">{{ $t('tableTitle')[5] }}({{ item.voteCountNay }})</p>
              <p>{{ item.votedBalanceNayFormat }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="empty" v-if="dataLoaded && tableData.length === 0">
        <img src="@/assets/img/nodata.png" alt="" />
        <p>{{ $t('emptyText') }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Identicon from '@polkadot/vue-identicon'
export default {
  components: {
    Identicon
  },
  data() {
    return {
      name: 'referendums',
      loading: true,
      dataLoaded: false,
      isMounted: false,
      timer: null,
      waitTime: 60000,

      tableData: []
    }
  },
  computed: {},
  mounted() {
    this.queryData()
    this.startTimer()
    this.dealTableStyle()
  },
  methods: {
    dealTableStyle() {
      setTimeout(() => {
        const table = document.querySelectorAll('.el-table__body-wrapper table')
        Array.from(table).forEach(t => {
          t && (t.style.width = '')
        })
      }, 0)
    },
    queryData() {
      this.loading = this.tableData.length === 0
      this.axios.get(window._config.url.referendums).then(res => {
        this.tableData = res.map(t => ((t.showRroposal = false), t))
        this.isMounted = this.dataLoaded = true
        this.loading = false
      })
    },

    startTimer() {
      this.endTimer()
      this.timer = setInterval(() => {
        this.queryData()
      }, this.waitTime)
    },
    endTimer() {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  beforeDestroy() {
    this.endTimer()
  }
}
</script>
<style src="./referendums.scss" lang="scss"></style>
