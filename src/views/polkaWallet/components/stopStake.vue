<template>
  <div class="dialog-wallet stop-stake">
    <p class="title">{{ title }}</p>

    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.StashAccount') }}</p>

    <account-info :accountId="accountId" :hideTransferrable="true" />

    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.ControllerAccount') }}</p>

    <account-info :accountId="controllerId" :hideTransferrable="true" />

    <div class="btn-send" @click="stopStake">
      {{ $t('polkaDialog.Confirm') }}
    </div>
  </div>
</template>
<script>
import accountInfo from './accountInfo'

import { makeExtrinsicCall } from '@/methods/polkaUtils'

export default {
  components: {
    accountInfo
  },
  props: ['stake', 'title'],
  data() {
    return {
      accountId: this.stake.stakingAccount.accountId,
      controllerId: this.stake.stakingAccount.controllerId
    }
  },
  methods: {
    stopStake() {
      this.$emit('closeDialog')
      makeExtrinsicCall({
        tx: 'staking.chill',
        accountId: this.controllerId
      })
    }
  }
}
</script>
