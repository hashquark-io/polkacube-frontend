<template>
  <div class="dialog-wallet boud-more">
    <p class="title">{{ $t('polkaDialog.BondMoreFunds') }}</p>

    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.StashAccount') }}</p>

    <account-info :accountId="accountId" />

    <p class="sub-title">
      {{ $t('polkaDialog.BondAmount') }}
    </p>
    <div class="dialog-input-wrap">
      <input
        ref="inputAmount"
        type="text"
        class="input"
        :value="stakeAmount"
        @input="formatInp"
        maxlength="16"
        :placeholder="$t('polkaDialog.PleaseEnterAmount')"
      />
      <span class="input-suffix">{{ units }}</span>
    </div>

    <div :class="['btn-send', !canClick && 'disabled']" @click="canClick && bondMore()">
      {{ $t('polkaDialog.Confirm') }}
    </div>
  </div>
</template>
<script>
import accountInfo from './accountInfo'

import { formatInp } from '@/methods/util'
import { getValuesFromString, makeExtrinsicCall } from '@/methods/polkaUtils'

export default {
  components: {
    accountInfo
  },
  props: ['stake'],
  data() {
    return {
      accountId: this.stake.stakingAccount.accountId,
      stakeAmount: ''
    }
  },
  computed: {
    canClick() {
      return this.stakeAmount !== '' && this.stakeAmount > 0
    }
  },
  methods: {
    bondMore() {
      this.$emit('closeDialog')
      makeExtrinsicCall({
        tx: 'staking.bondExtra',
        params: [getValuesFromString(this.stakeAmount)],
        accountId: this.accountId
      })
    },
    formatInp(e) {
      this.stakeAmount = e.target.value = formatInp(e.target.value)
    }
  }
}
</script>
