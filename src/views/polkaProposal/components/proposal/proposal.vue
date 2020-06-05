<template>
  <div>
    <div class="proposal-comp-wrap" v-if="!isMobile">
      <img src="@/assets/img/dot.png" alt class="img-dot" />
      <div class="top">
        <div class="title">{{ $t('proposalComp.title') }}</div>
      </div>
      <div class="table-comp-wrap" v-loading="loading">
        <div class="item" v-for="(item, ind) in proposal" :key="ind">
          <div class="table-col-1 table-cell">
            {{ item.index }}
          </div>
          <div class="table-col-2 table-cell">
            <div class="proposal-hash-wrap">
              <p class="title">
                {{ item.detail ? $t('proposalComp.tableTitle')[1][0] : $t('proposalComp.tableTitle')[1][1] }}
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
            <p class="color-1">{{ $t('proposalComp.tableTitle')[2] }}</p>
            <p>{{ item.balanceFormat }}</p>
          </div>
          <div class="table-col-4 table-cell">
            <p class="title" @click="item.showSeconds = !item.showSeconds" style="cursor:pointer;">
              <img
                src="@/assets/img/icon-arrow-down-2.png"
                alt=""
                style="width: 12px;"
                :class="['icon', item.showSeconds && 'icon-rotate']"
              />
              {{ $t('proposalComp.tableTitle')[3] }} ({{ item.seconds.length }})
            </p>
            <div class="second-hash" v-if="item.showSeconds">
              <p v-for="(second, k) in item.seconds" :key="k" class="second-item">
                <Identicon :size="24" :theme="'polkadot'" :value="second" style="height: 24px;" />
                <span class="hash">{{ second.slice(0, 6) }}...</span>
              </p>
            </div>
          </div>
          <div class="table-col-5 table-cell">
            <div style="margin-right: 5px;">
              <p>
                <judgement-popover
                  :identity="item.identity"
                  :imgStyle="imgStyle"
                  v-if="Object.keys(item.identity).length > 0"
                />
                <span class="f-14 color-main">{{
                  (item.identity.display && `${item.identity.display.slice(0, 13)}...`) ||
                    $t('proposalComp.tableTitle')[4]
                }}</span>
              </p>
              <p class="color-1 text-right id-text">
                {{ item.proposer && `${item.proposer.slice(0, 16)}...` }}
              </p>
            </div>
            <Identicon :size="36" :theme="'polkadot'" :value="item.proposer" style="height: 36px;" />
          </div>
          <div class="table-col-6 table-cell" v-if="isPolkaApiReady">
            <div class="btn" @click="toggleDialog(item, true)">{{ $t('proposalComp.Second') }}</div>
          </div>
        </div>
        <div class="empty" v-if="dataLoaded && proposal.length === 0">
          <img src="@/assets/img/nodata.png" alt="" />
          <p>{{ $t('referendumsComp.emptyText') }}</p>
        </div>
      </div>
    </div>
    <el-dialog title="" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="curReferendum = null">
      <seconding @closeDialog="closeDialog" :proposal="curProposal" :updateInfo="queryData" v-if="curProposal" />
    </el-dialog>
    <div class="proposal-comp-wrap" v-if="isMobile" v-loading.fullscreen.lock="loading && isMobile && !isMounted">
      <div class="proposal-comp-h5" v-if="dataLoaded && proposal.length != 0">
        <div class="row" v-for="(item, ind) in proposal" :key="ind">
          <div class="top">
            <div class="index">{{ item.index }}</div>
            <div class="proposal-hash-wrap">
              <p class="title">
                {{ item.detail ? $t('proposalComp.tableTitle')[1][0] : $t('proposalComp.tableTitle')[1][1] }}
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
              <p class="color-1">{{ $t('proposalComp.tableTitle')[2] }}</p>
              <p>{{ item.balanceFormat }}</p>
            </div>
            <div v-if="item.seconds.length > 0">
              <p class="title" @click="item.showSeconds = !item.showSeconds" style="cursor:pointer;">
                {{ $t('proposalComp.tableTitle')[3] }} ({{ item.seconds.length }})
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
                  <span class="f-14 color-main ellipsis">{{
                    item.identity.display || $t('proposalComp.tableTitle')[4]
                  }}</span>
                </p>
                <p class="color-1 id-text ellipsis">
                  {{ item.proposer }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="empty" v-if="dataLoaded && proposal.length === 0">
        <img src="@/assets/img/nodata.png" alt="" />
        <p>{{ $t('proposalComp.emptyText') }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Identicon from '@polkadot/vue-identicon'
import judgementPopover from '@/components/judgementPopover/judgementPopover.vue'
import seconding from '../seconding'
import { polkaApi } from '@/methods/polkaUtils'

export default {
  components: {
    Identicon,
    judgementPopover,
    seconding
  },
  data() {
    return {
      name: 'proposal',
      loading: true,
      dataLoaded: false,
      isMounted: false,
      timer: null,
      waitTime: 60000,
      proposal: [],
      imgStyle: {
        width: '13px',
        margin: '0 5px'
      },
      dialogVisible: false,
      curProposal: null,
      isPolkaApiReady: false
    }
  },
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
      this.loading = this.proposal.length === 0
      this.axios.get(window._config.url.proposals).then(res => {
        this.proposal = res.map(t => {
          const prev = this.proposal.find(k => t.index === k.index)
          t.showRroposal = prev?.showRroposal || false
          t.showSeconds = prev?.showSeconds || false
          return t
        })
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
    },
    toggleDialog(cur, visible) {
      this.curProposal = { ...cur, showRroposal: false }
      this.dialogVisible = visible
    },
    closeDialog() {
      this.dialogVisible = false
      this.curProposal = null
    }
  },
  beforeDestroy() {
    this.endTimer()
  }
}
</script>
<style src="./proposal.scss" lang="scss"></style>
