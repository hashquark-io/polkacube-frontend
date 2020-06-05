<template>
  <div class="dialog-wallet set-reward-destination">
    <p class="title">{{ $t('polkaDialog.SetRewardDestination') }}</p>
    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.StashAccount') }}</p>

    <account-info :accountId="accountId" :hideTransferrable="true" />

    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.ControllerAccount') }}</p>

    <account-info :accountId="controllerId" :hideTransferrable="true" />

    <p class="sub-title">{{ $t('polkaDialog.RewardDestination') }}</p>

    <el-select v-model="destination" placeholder="" popper-class="reward-method-popover" class="reward-method-select">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>

    <div class="btn-send" @click="changeReward">
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
  data() {
    return {
      accountId: this.stake.stakingAccount.accountId,
      controllerId: this.stake.stakingAccount.controllerId,
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
    }
  },
  methods: {
    changeReward() {
      this.$emit('closeDialog')
      makeExtrinsicCall({
        tx: 'staking.setPayee',
        params: [Number(this.destination)],
        accountId: this.controllerId
      })
    }
  }
}
</script>
