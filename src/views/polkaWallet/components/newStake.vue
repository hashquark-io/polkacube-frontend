<template>
  <div class="dialog-wallet new-stake">
    <p class="title">
      <span class="send">{{ $t('polkaDialog.NewStake') }}</span>
    </p>
    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.StashAccount') }}</p>

    <account-info :accountId="accountId" :canDrop="true" @selected="selectedAccountId" />

    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.ControllerAccount') }}</p>

    <account-info :accountId="controllerId" :canDrop="true" @selected="selectedControllerId" />

    <p class="sub-title">{{ $t('polkaDialog.BondAmount') }}</p>
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

    <p class="sub-title">{{ $t('polkaDialog.RewardDestination') }}</p>

    <el-select
      v-model="destination"
      placeholder="请选择"
      popper-class="reward-method-popover"
      class="reward-method-select"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>

    <div :class="['btn-send', !canClick && 'disabled']" @click="canClick && addNewStake()">
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
  data(vm) {
    const { accounts } = vm.$store.state
    return {
      stakeAmount: '',
      accountId: accounts[0]?.address,
      controllerId: accounts[0]?.address,

      destination: '0'
    }
  },
  computed: {
    options() {
      return [
        {
          value: '0',
          label: this.$t('polkaDialog.Staked')
        },
        {
          value: '1',
          label: this.$t('polkaDialog.Stash')
        },
        {
          value: '2',
          label: this.$t('polkaDialog.Controller')
        }
      ]
    },
    canClick() {
      return this.stakeAmount !== ''
    },
    stakeList() {
      return this.$store.state.stakeList
    },
    stashList() {
      return this.stakeList.map(t => t.stashId)
    },
    controllerList() {
      return this.stakeList.map(t => t.stakingAccount?.controllerId)
    }
  },

  methods: {
    selectedAccountId(accountId) {
      this.accountId = accountId
    },
    selectedControllerId(controllerId) {
      this.controllerId = controllerId
    },

    isSelected(account) {
      return account.address === this.account.address
    },
    addNewStake() {
      if (!this.validateAccount()) return
      this.$emit('closeDialog')
      makeExtrinsicCall({
        tx: 'staking.bond',
        params: [this.controllerId, getValuesFromString(this.stakeAmount), Number(this.destination)],
        accountId: this.accountId
      })
    },
    selectAccount(account) {
      this.account = account
    },
    selectControllerAccount(controllerAccount) {
      this.controllerAccount = controllerAccount
    },
    formatInp(e) {
      this.stakeAmount = e.target.value = formatInp(e.target.value)
    },
    validateAccount() {
      if (this.stashList.includes(this.accountId) || this.controllerList.includes(this.controllerId)) {
        this.$msg.error(this.$t('polkaDialog.errTips'))
        return false
      }
      return true
    }
  }
}
</script>
