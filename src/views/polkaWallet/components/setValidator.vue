<template>
  <div class="dialog-wallet set-validator">
    <p class="title">{{ $t('polkaDialog.SetValidator') }}</p>
    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.StashAccount') }}</p>

    <account-info :accountId="accountId" :hideTransferrable="true" />

    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.ControllerAccount') }}</p>

    <account-info :accountId="controllerId" :hideTransferrable="true" />

    <p class="sub-title">{{ $t('polkaDialog.SetCommissionRate') }}</p>
    <div class="dialog-input-wrap">
      <input
        ref="inputAmount"
        type="text"
        class="input"
        :value="commission"
        @input="formatInp"
        :placeholder="$t('polkaDialog.PleaseEnterAmount')"
      />
      <span class="input-suffix">%</span>
    </div>

    <div :class="['btn-send', !canClick && 'disabled']" @click="canClick && setSessionKey()">
      {{ $t('polkaDialog.Validate') }}
    </div>
  </div>
</template>
<script>
import BN from 'bn.js'
import accountInfo from './accountInfo'
import { makeExtrinsicCall } from '@/methods/polkaUtils'
const COMM_MUL = new BN(10000000)
const ZERO = new BN(0)
export default {
  components: {
    accountInfo
  },
  props: ['stake'],
  data() {
    return {
      accountId: this.stake.stakingAccount.accountId,
      controllerId: this.stake.stakingAccount.controllerId,
      commission: ''
    }
  },
  computed: {
    canClick() {
      return this.commission !== ''
    }
  },
  methods: {
    setSessionKey() {
      this.$emit('closeDialog')
      makeExtrinsicCall({
        tx: 'staking.validate',
        params: [{ commission: (this.commission ? new BN(this.commission) : ZERO).mul(COMM_MUL) }],
        accountId: this.controllerId
      })
    },
    formatInp(e) {
      let val = e.target.value
      val = val.replace(/[^\d]+/g, '')
      if (val > 100) {
        e.target.value = this.commission
        return
      }
      this.commission = e.target.value = val
    }
  }
}
</script>
