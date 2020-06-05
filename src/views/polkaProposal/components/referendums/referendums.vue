<template>
  <div>
    <div class="referendums-comp-wrap" v-if="!isMobile">
      <img src="@/assets/img/dot.png" alt class="img-dot" />
      <div class="top">
        <div class="title">{{ $t('referendumsComp.title') }}</div>
      </div>
      <div class="table-comp-wrap" v-loading="loading">
        <div class="item" v-for="(item, ind) in referendums" :key="ind">
          <div class="table-col-1 table-cell">
            {{ item.index }}
          </div>
          <div class="table-col-2 table-cell">
            <div class="proposal-hash-wrap">
              <p class="title">
                {{ item.detail ? $t('referendumsComp.tableTitle')[1][0] : $t('referendumsComp.tableTitle')[1][1] }}
              </p>
              <div class="hash">
                <span>{{ item.hash }}</span>
              </div>
            </div>
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
                <div class="row" v-for="(t, ind) in item.detail.args" :key="ind">
                  <div class="avatar">
                    <Identicon :size="32" :theme="'polkadot'" :value="t.value" v-if="t.identity" />
                  </div>

                  <div class="content">
                    <div class="grey-2">{{ t.name }}</div>
                    <div class="num">
                      {{ t.value }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="table-col-3 table-cell">
            <p class="grey-1">{{ $t('referendumsComp.tableTitle')[2] }}</p>
            <p>{{ item.remainingBlocksFormat }} {{ $t('referendumsComp.blocks') }}</p>
          </div>
          <div class="table-col-4 table-cell">
            <p class="grey-1">{{ $t('referendumsComp.tableTitle')[3] }}</p>
            <p>#{{ item.enactBlockFormat }}</p>
          </div>
          <div class="table-col-5 table-cell">
            <p class="grey-1">{{ $t('referendumsComp.tableTitle')[4] }}({{ item.voteCountAye }})</p>
            <p>{{ item.votedBalanceAyeFormat }}</p>
          </div>
          <div class="table-col-6 table-cell">
            <p class="grey-1">{{ $t('referendumsComp.tableTitle')[5] }}({{ item.voteCountNay }})</p>
            <p>{{ item.votedBalanceNayFormat }}</p>
          </div>
          <div class="table-col-7 table-cell" v-if="isPolkaApiReady">
            <div class="btn" @click="toggleDialog(item, true)">{{ $t('referendumsComp.Vote') }}</div>
          </div>
        </div>
        <div class="empty" v-if="dataLoaded && referendums.length === 0">
          <img src="@/assets/img/nodata.png" alt="" />
          <p>{{ $t('referendumsComp.emptyText') }}</p>
        </div>
      </div>
    </div>
    <el-dialog title="" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="curReferendum = null">
      <voting :referendum="curReferendum" @closeDialog="closeDialog" :updateInfo="queryData" v-if="curReferendum" />
    </el-dialog>

    <div class="referendums-comp-wrap" v-if="isMobile" v-loading.fullscreen.lock="loading && isMobile && !isMounted">
      <div class="referendums-comp-h5" v-if="dataLoaded && referendums.length != 0">
        <div class="row" v-for="(item, ind) in referendums" :key="ind">
          <div class="top">
            <div class="index">{{ item.index }}</div>
            <div class="proposal-hash-wrap">
              <p class="title">
                {{ item.detail ? $t('referendumsComp.tableTitle')[1][0] : $t('referendumsComp.tableTitle')[1][1] }}
              </p>
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
              <p class="color-1">{{ $t('referendumsComp.tableTitle')[2] }}</p>
              <p>{{ item.remainingBlocksFormat }} {{ $t('referendumsComp.blocks') }}</p>
            </div>
            <div>
              <p class="color-1">{{ $t('referendumsComp.tableTitle')[3] }}</p>
              <p>#{{ item.enactBlockFormat }}</p>
            </div>
            <div>
              <p class="color-1">{{ $t('referendumsComp.tableTitle')[4] }}({{ item.voteCountAye }})</p>
              <p>{{ item.votedBalanceAyeFormat }}</p>
            </div>
            <div>
              <p class="color-1">{{ $t('referendumsComp.tableTitle')[5] }}({{ item.voteCountNay }})</p>
              <p>{{ item.votedBalanceNayFormat }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="empty" v-if="dataLoaded && referendums.length === 0">
        <img src="@/assets/img/nodata.png" alt="" />
        <p>{{ $t('referendumsComp.emptyText') }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Identicon from '@polkadot/vue-identicon'
import voting from '../voting'
import { polkaApi } from '@/methods/polkaUtils'

export default {
  components: {
    Identicon,
    voting
  },
  data() {
    return {
      name: 'referendums',
      loading: true,
      dataLoaded: false,
      isMounted: false,
      timer: null,
      waitTime: 60000,

      referendums: [],

      dialogVisible: false,
      curReferendum: null,

      isPolkaApiReady: false
    }
  },
  computed: {},
  mounted() {
    this.checkApi()
    this.queryData()
    this.startTimer()
  },
  methods: {
    checkApi() {
      this.isPolkaApiReady = polkaApi?._isReady
    },
    queryData() {
      this.loading = this.referendums.length === 0
      this.axios.get(window._config.url.referendums).then(res => {
        this.referendums = res.map(t => {
          const prev = this.referendums.find(k => t.index === k.index)
          t.showRroposal = prev?.showRroposal || false
          return t
        })
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
    },
    toggleDialog(cur, visible) {
      this.curReferendum = { ...cur, showRroposal: false }
      this.dialogVisible = visible
    },
    closeDialog() {
      this.dialogVisible = false
      this.curReferendum = null
    }
  },
  beforeDestroy() {
    this.endTimer()
  }
}
</script>
<style src="./referendums.scss" lang="scss"></style>
