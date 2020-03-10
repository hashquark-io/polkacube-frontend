<i18n src="./locale.json"></i18n>
<template>
  <div>
    <div class="proposal-comp-wrap" v-if="!isMobile">
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
          <el-table-column
            prop="ind"
            :label="$t('tableTitle')[0]"
            align="center"
            v-if="!isMobile || true"
            :width="isMobile ? 60 : 78"
          >
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
          <el-table-column :width="130" align="right">
            <template slot-scope="scope">
              <div class="table-col-3">
                <p class="color-grey-1">{{ $t('tableTitle')[2] }}</p>
                <p>{{ scope.row.balanceFormat }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left" :width="137">
            <template slot-scope="scope">
              <div class="table-col-4" v-if="scope.row.seconds.length > 0">
                <p class="title" @click="scope.row.showSeconds = !scope.row.showSeconds" style="cursor:pointer;">
                  <img
                    src="@/assets/img/icon-arrow-down-2.png"
                    alt=""
                    style="width: 12px;"
                    :class="['icon', scope.row.showSeconds && 'icon-rotate']"
                  />
                  {{ $t('tableTitle')[3] }} ({{ scope.row.seconds.length }})
                </p>
                <div class="second-hash" v-if="scope.row.showSeconds">
                  <p v-for="second in scope.row.seconds" :key="second" class="second-item">
                    <Identicon :size="24" :theme="'polkadot'" :value="second" style="height: 24px;" />
                    <span class="hash">{{ second.slice(0, 6) }}...</span>
                  </p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left">
            <template slot-scope="scope">
              <div class="table-col-5">
                <div style="margin-right: 5px;">
                  <p>
                    <judgement-popover
                      :identity="scope.row.identity"
                      :imgStyle="imgStyle"
                      v-if="Object.keys(scope.row.identity).length > 0"
                    />
                    <span class="f-14 color-main">{{
                      (scope.row.identity.display && `${scope.row.identity.display.slice(0, 13)}...`) ||
                        $t('tableTitle')[4]
                    }}</span>
                  </p>
                  <p class="color-grey-1 text-right id-text">
                    {{ scope.row.proposer && `${scope.row.proposer.slice(0, 16)}...` }}
                  </p>
                </div>
                <Identicon :size="36" :theme="'polkadot'" :value="scope.row.proposer" style="height: 36px;" />
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
    <div class="proposal-comp-wrap" v-if="isMobile" v-loading.fullscreen.lock="loading && isMobile && !isMounted">
      <div class="proposal-comp-h5" v-if="dataLoaded && tableData.length != 0">
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
                      <div class="grey-2 ellipsis">{{ t.name }}</div>
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
              <p>{{ item.balanceFormat }}</p>
            </div>
            <div v-if="item.seconds.length > 0">
              <p class="title" @click="item.showSeconds = !item.showSeconds" style="cursor:pointer;">
                {{ $t('tableTitle')[3] }} ({{ item.seconds.length }})
              </p>
            </div>
            <div class="account-info">
              <Identicon :size="36" :theme="'polkadot'" :value="item.proposer" />
              <div>
                <p style="white-space:nowrap;">
                  <judgement-popover
                    :identity="item.identity"
                    :imgStyle="imgStyle"
                    v-if="Object.keys(item.identity).length > 0"
                  />
                  <span class="f-14 color-main ellipsis">{{ item.identity.display || $t('tableTitle')[4] }}</span>
                </p>
                <p class="color-grey-1 id-text ellipsis">
                  {{ item.proposer }}
                </p>
              </div>
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
import judgementPopover from '@/components/judgementPopover/judgementPopover.vue'
export default {
  components: {
    Identicon,
    judgementPopover
  },
  data() {
    return {
      name: 'proposal',
      loading: true,
      dataLoaded: false,
      isMounted: false,
      timer: null,
      waitTime: 60000,
      tableData: [],
      imgStyle: {
        width: '13px',
        margin: '0 5px'
      }
    }
  },
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
      this.axios.get(window._config.url.proposals).then(res => {
        this.tableData = res.map(t => ((t.showSeconds = t.showRroposal = false), t))
        this.loading = false
        this.isMounted = this.dataLoaded = true
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
<style src="./proposal.scss" lang="scss"></style>
