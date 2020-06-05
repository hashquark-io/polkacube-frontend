<template>
  <div class="dialog-wallet dialog-voting">
    <p class="title">{{ $t('polkaDialog.voteTitle') }}</p>
    <div class="referendums-info">
      <div class="table-col-1 table-cell">
        {{ referendum.index }}
      </div>
      <div class="table-col-2 table-cell">
        <div class="proposal-hash-wrap">
          <p class="title">
            {{ referendum.detail ? $t('referendumsComp.tableTitle')[1][0] : $t('referendumsComp.tableTitle')[1][1] }}
          </p>
          <div class="hash">
            <span>{{ referendum.hash }}</span>
          </div>
        </div>
        <div class="proposal-info" v-if="referendum.detail">
          <div class="summary" @click="referendum.showRroposal = !referendum.showRroposal">
            <p class="section-method">{{ referendum.detail.section }}.{{ referendum.detail.method }}</p>
            <img
              src="@/assets/img/icon-arrow-down-2.png"
              style="width:12px;height:12px;"
              :class="['icon', referendum.showRroposal && 'icon-rotate']"
            />
          </div>
          <div v-show="referendum.showRroposal" class="detail">
            <div class="row" v-for="(t, ind) in referendum.detail.args" :key="ind">
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
    </div>
    <p class="color-1" style="margin:16px 0 11px;">{{ $t('polkaDialog.voteAccount') }}</p>

    <account-info :accountId="accountId" :canDrop="true" :hideTransferrable="true" @selected="selectedAccountId" />

    <div class="btn-group">
      <div :class="['agree', 'btn', isAgree && 'active']" @click="toggle(true)">
        <img src="@/assets/img/icon-hand.png" alt="" v-if="isAgree" />
        <img src="@/assets/img/icon-hand-2.png" alt="" v-else />
        {{ $t('polkaDialog.Aye') }}
      </div>
      <div :class="['oppose', 'btn', !isAgree && 'active']" @click="toggle(false)">
        <img src="@/assets/img/icon-hand.png" alt="" class="rotate" v-if="!isAgree" />
        <img src="@/assets/img/icon-hand-2.png" alt="" class="rotate" v-else />
        {{ $t('polkaDialog.Nay') }}
      </div>
    </div>

    <p class="sub-title vote-desc">
      <span>{{ $t('polkaDialog.voteAmount') }}</span>
      <span>
        <span>{{ $t('polkaDialog.voteBalance') }}</span>
        <span class="amount">{{ votingBalanceFormat }}</span>
      </span>
    </p>
    <div class="dialog-input-wrap">
      <input
        ref="inputAmount"
        type="text"
        class="input"
        :value="balance"
        @input="formatInp"
        :placeholder="$t('polkaDialog.PleaseEnterAmount')"
      />
      <span class="input-suffix">{{ units }}</span>
    </div>

    <p class="color-1" style="margin:16px 0 11px;">{{ $t('polkaDialog.lockupPeriod') }}</p>

    <el-select v-model="conviction" popper-class="reward-method-popover" class="reward-method-select">
      <el-option v-for="item in convictionOpts" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>

    <div :class="['btn-send', !canClick && 'disabled']" @click="canClick && vote()">
      {{ $t('polkaDialog.vote') }}
    </div>
  </div>
</template>
<script>
import accountInfo from '@/views/polkaWallet/components/accountInfo'
import Identicon from '@polkadot/vue-identicon'

import { formatInp } from '@/methods/util'
import { getValuesFromString, makeExtrinsicCall, polkaApi as api } from '@/methods/polkaUtils'

const CONVICTIONS = [1, 2, 4, 8, 16, 32].map((lock, index) => [index + 1, lock])

export default {
  components: {
    accountInfo,
    Identicon
  },
  props: ['referendum', 'updateInfo'],
  data(vm) {
    const { accounts } = vm.$store.state
    return {
      accountId: accounts[0]?.address,
      isAgree: true,
      balance: '',
      convictionOpts: [],
      conviction: 0,
      isCurrentVote: true
    }
  },
  computed: {
    canClick() {
      return this.balance !== '' && this.balance > 0
    },
    accounts() {
      return this.$store.state.accounts
    },
    votingBalanceFormat() {
      return this.accounts.find(t => t.address === this.accountId)?.balancesAll?.votingBalanceFormat
    }
  },
  beforeMount() {
    this.loadConvictionOpts()
  },
  mounted() {
    this.isCurrentVote = !!api?.query.democracy.votingOf
  },
  methods: {
    loadConvictionOpts() {
      if (!api) return
      const enact =
        (((api.consts.democracy.enactmentPeriod.toNumber() * api.consts.timestamp.minimumPeriod.toNumber()) / 1000) *
          2) /
        60 /
        60 /
        24
      const convictionOptsDefault = [
        {
          value: 0,
          label: this.$t('polkaDialog.convictionOptsDefault')
        }
      ]
      this.convictionOpts = convictionOptsDefault.concat(
        ...CONVICTIONS.map(([value, lock]) => ({
          label: this.$t('polkaDialog.convictionOpts', [value, lock, (enact * lock).toFixed(0)]),
          value
        }))
      )
    },
    toggle(flag) {
      this.isAgree = flag
    },
    formatInp(e) {
      this.balance = e.target.value = formatInp(e.target.value)
    },
    selectedAccountId(accountId) {
      this.accountId = accountId
    },
    vote() {
      const { index } = this.referendum
      const { isAgree: aye, conviction, balance } = this
      const params = this.isCurrentVote
        ? [index, { Standard: { balance: getValuesFromString(balance), vote: { aye, conviction } } }]
        : [index, { aye, conviction }]
      this.$emit('closeDialog')
      makeExtrinsicCall({
        tx: 'democracy.vote',
        params,
        accountId: this.accountId,
        txSuccessCb: () => this.updateInfo()
      })
    }
  },
  watch: {
    locale: 'loadConvictionOpts'
  }
}
</script>
<style lang="scss">
html.desktop .dialog-voting {
  color: $color-main;
  min-height: 300px;
  padding-bottom: 30px;
  .title {
    margin-bottom: 24px;
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
  }
  .referendums-info {
    display: flex;
    background: $color-5;
    padding-top: 5px;
    .table-col-1 {
      width: 38px;
      margin: 0 10px 0 0;
      text-align: center;
      font-size: 22px;
      font-weight: 300;
      color: $color-main;
      line-height: 30px;
    }
    .table-col-2 {
      font-size: 12px;
      flex: 1;
      position: relative;
      padding-bottom: 20px;
      .proposal-hash-wrap {
        .title {
          margin-bottom: 3px;
          font-size: 12px;
          color: #babbc4;
          line-height: 17px;
        }
        .hash {
          display: flex;
          justify-content: space-between;
          color: $color-main;
          margin-bottom: 10px;
          line-height: 17px;
          .btn {
            color: #5f6eff;
          }
        }
      }
      .proposal-info {
        margin-right: 15px;
        padding: 0 4px;
        border-top: 1px solid #e1e3e6;
        background: #fff;
        .summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 10px 10px 0;
          cursor: pointer;
        }
        .section-method {
          font-size: 14px;
          font-weight: 500;
          color: $color-main;
          line-height: 20px;
          cursor: pointer;
        }
        .detail {
          padding-bottom: 10px;
        }
        .row {
          display: flex;
          margin: 0 10px;
          background: #ffffff;
          border-radius: 2px;
          border-left: 2px solid rgba(186, 187, 196, 0.2);
          .avatar {
            margin: 14px 6px 0 8px;
            width: 32px;
          }
          .content {
            flex: 1;
            font-size: 12px;
            line-height: 17px;
            padding: 10px 15px 0 0;
            min-height: 54px;

            .num {
              margin-top: 3px;
              word-wrap: break-word;
              word-break: break-all;
            }
          }
        }
      }
    }
  }
  .btn-group {
    display: flex;
    margin-bottom: 18px;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 84px;
      height: 38px;
      border-radius: 4px;
      color: #fff;
      background: #dcdcdc;
      cursor: pointer;
      &.oppose {
        margin-left: 16px;
      }
      &.agree.active {
        background: #48cbbb;
      }

      &.oppose.active {
        background: #ff8870;
      }
      img {
        width: 16px;
        margin-right: 8px;
        &.rotate {
          transform: rotate(180deg);
        }
      }
    }
  }
  .vote-desc {
    display: flex;
    justify-content: space-between;
    .amount {
      color: $color-main;
      margin-left: 17px;
      font-weight: 500;
    }
  }
}
</style>
