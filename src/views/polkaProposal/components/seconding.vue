<template>
  <div class="dialog-wallet dialog-seconding">
    <p class="title">{{ $t('polkaDialog.secondTitle') }}</p>
    <div class="proposal-info-wrap">
      <div class="table-col-1 table-cell">
        {{ proposal.index }}
      </div>
      <div class="table-col-2 table-cell">
        <div class="proposal-hash-wrap">
          <p class="title">
            {{ proposal.detail ? $t('proposalComp.tableTitle')[1][0] : $t('proposalComp.tableTitle')[1][1] }}
          </p>
          <div class="hash">
            <span>{{ proposal.hash }}</span>
          </div>
        </div>
        <div class="proposal-info" v-if="proposal.detail">
          <div class="summary" @click="proposal.showRroposal = !proposal.showRroposal">
            <p class="section-method">{{ proposal.detail.section }}.{{ proposal.detail.method }}</p>
            <img
              src="@/assets/img/icon-arrow-down-2.png"
              style="width:12px;height:12px;"
              :class="['icon', proposal.showRroposal && 'icon-rotate']"
            />
          </div>
          <div v-show="proposal.showRroposal" class="detail">
            <div class="row" v-for="(t, ind) in proposal.detail.args" :key="ind">
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
    <p class="color-1" style="margin:16px 0 11px;">{{ $t('polkaDialog.secondAccount') }}</p>

    <account-info :accountId="accountId" :canDrop="true" :hideTransferrable="true" @selected="selectedAccountId" />

    <div :class="['btn-send', !canClick && 'disabled']" @click="canClick && second()">
      {{ $t('polkaDialog.second') }}
    </div>
  </div>
</template>
<script>
import accountInfo from '@/views/polkaWallet/components/accountInfo'
import Identicon from '@polkadot/vue-identicon'

import { makeExtrinsicCall } from '@/methods/polkaUtils'

export default {
  components: {
    accountInfo,
    Identicon
  },
  props: ['proposal', 'updateInfo'],
  data(vm) {
    const { accounts } = vm.$store.state
    return {
      accountId: accounts[0]?.address
    }
  },
  computed: {
    canClick() {
      return !this.proposal.seconds.some(depositor => depositor === this.accountId)
    }
  },
  methods: {
    selectedAccountId(accountId) {
      this.accountId = accountId
    },
    second() {
      this.$emit('closeDialog')
      makeExtrinsicCall({
        tx: 'democracy.second',
        params: [this.proposal.index],
        accountId: this.accountId,
        txSuccessCb: () => this.updateInfo()
      })
    }
  }
}
</script>
<style lang="scss">
html.desktop .dialog-seconding {
  color: $color-main;
  min-height: 300px;
  padding-bottom: 30px;
  .title {
    margin-bottom: 24px;
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
  }
  .proposal-info-wrap {
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
      flex: 1;

      position: relative;
      padding-bottom: 20px;
      font-size: 12px;
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
}
</style>
