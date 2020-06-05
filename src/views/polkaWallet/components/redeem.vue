<template>
  <div class="dialog-wallet redeem">
    <p class="title">
      <span class="send">{{ $t('polkaDialog.RedeemUnbondedFunds') }}</span>
    </p>
    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.account') }}</p>

    <div class="account-wrap">
      <div class="account">
        <div class="left">
          <Identicon :size="38" :theme="'polkadot'" :value="account.address" class="avatar" />
        </div>
        <div class="right">
          <div class="top">
            <div class="name">{{ account.name }}</div>
            <div v-if="account.balancesAll">
              <span class="label">{{ $t('polkaDialog.Redeemable') }}</span>
              <span class="value">{{ account.balancesAll.redeemableFormat }}</span>
            </div>
          </div>
          <div class="address">{{ account.address }}</div>
        </div>
      </div>
    </div>

    <div class="btn-send" @click="sendTransaction">
      {{ $t('polkaDialog.Redeem') }}
    </div>
  </div>
</template>
<script>
import { makeExtrinsicCall } from '@/methods/polkaUtils'
import Identicon from '@polkadot/vue-identicon'

export default {
  components: {
    Identicon
  },
  props: ['accountId', 'stake'],
  computed: {
    account() {
      return (
        this.$store.state.accounts.find(t => t.address === this.accountId) || {
          name: this.$t('polkaDialog.account'),
          address: this.accountId,
          balancesAll: {
            redeemableFormat: this.stake.redeemableFormat
          }
        }
      )
    }
  },
  methods: {
    sendTransaction() {
      this.$emit('closeDialog')
      let txSuccessCb
      if (this.$route.name === 'polkaWalletStaking') {
        txSuccessCb = () => this.$store.dispatch('queryStakeList')
      }
      makeExtrinsicCall({
        tx: 'staking.withdrawUnbonded',
        accountId: this.accountId,
        txSuccessCb
      })
    }
  }
}
</script>
