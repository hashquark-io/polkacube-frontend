<template>
  <div class="dialog-wallet set-controller">
    <p class="title">{{ $t('polkaDialog.SetControllerAccount') }}</p>

    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.StashAccount') }}</p>

    <account-info :accountId="accountId" :hideTransferrable="true" />

    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.ControllerAccount') }}</p>

    <account-info
      :accountId="controllerId"
      :canDrop="true"
      @selected="selectedControllerId"
      :hideTransferrable="true"
    />

    <div class="btn-send" @click="changeController">
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
  props: ['stake'],
  computed: {
    accounts() {
      return this.$store.state.accounts
    }
  },
  data() {
    return {
      accountId: this.stake.stakingAccount.accountId,
      controllerId: this.stake.stakingAccount.controllerId
    }
  },
  methods: {
    selectedControllerId(controllerId) {
      this.controllerId = controllerId
    },

    isSelected(account) {
      return account.address === this.account.address
    },
    changeController() {
      this.$emit('closeDialog')
      makeExtrinsicCall({
        tx: 'staking.setController',
        params: [this.controllerId],
        accountId: this.accountId
      })
    }
  }
}
</script>
