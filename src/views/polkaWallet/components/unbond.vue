<template>
  <div class="dialog-wallet unbond">
    <p class="title">{{ $t('polkaDialog.UnbondFunds') }}</p>

    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.StashAccount') }}</p>

    <account-info :accountId="accountId" :hideTransferrable="true" />

    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.ControllerAccount') }}</p>

    <account-info :accountId="controllerId" :hideTransferrable="true" />

    <p class="sub-title unboud-desc">
      <span>
        {{ $t('polkaDialog.UnbondAmount') }}
      </span>
      <span>
        <span>{{ $t('polkaDialog.bonded') }}</span>
        <span class="amount">{{ stake.bondedBalanceFormat }}</span>
      </span>
    </p>
    <div class="dialog-input-wrap">
      <input
        ref="inputAmount"
        type="text"
        class="input"
        :value="unboudAmount"
        @input="formatInp"
        :placeholder="$t('polkaDialog.PleaseEnterAmount')"
      />
      <span class="input-suffix">{{ units }}</span>
    </div>

    <div :class="['btn-send', !canClick && 'disabled']" @click="canClick && unbond()">
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
      controllerId: this.stake.stakingAccount.controllerId,
      unboudAmount: ''
    }
  },
  computed: {
    canClick() {
      return this.unboudAmount !== '' && this.unboudAmount > 0
    }
  },
  methods: {
    unbond() {
      this.$emit('closeDialog')
      makeExtrinsicCall({
        tx: 'staking.unbond',
        params: [getValuesFromString(this.unboudAmount)],
        accountId: this.controllerId
      })
    },

    formatInp(e) {
      this.unboudAmount = e.target.value = formatInp(e.target.value)
    }
  }
}
</script>
<style lang="scss">
html.desktop .dialog-wallet.unbond {
  .unboud-desc {
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
