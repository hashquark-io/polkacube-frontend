<template>
  <div class="dialog-wallet receive-reward">
    <p class="title">{{ $t('polkaDialog.Payout') }}</p>

    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.account') }}</p>
    <account-info :accountId="accountId" :hideTransferrable="true" :canDrop="true" @selected="selectedAccountId" />

    <div class="reward-destination">
      <span class="color-1 label">{{ $t('polkaDialog.RewardDestination') }}</span>
      <span class="color-main">{{ $t(`polkaStake.${stake.stakingAccount.rewardDestination}`) }}</span>
    </div>
    <div class="rewards">
      <span class="color-1 label">{{ $t('polkaDialog.PendingReward') }}</span>
      <div class="amount">
        <p style="font-weight:500;">
          <span>{{ stake.rewardInfo.stashTotalFormat }}</span>
          <span class="split-line">|</span>
          <span class="era-length">{{ eraLength }}{{ $t('polkaStake.Eras') }}</span>
          <span class="split-line">|</span>
          <span>{{ eraStr }}</span>
        </p>
      </div>
    </div>

    <div class="tips-fee">
      <span class="label">{{ $t('polkaDialog.Fees') }}</span>
      <span class="color-main">0.001 {{ units }}</span>
    </div>
    <div class="btn-send" @click="receive">
      {{ $t('polkaDialog.Confirm') }}
    </div>
  </div>
</template>
<script>
import accountInfo from './accountInfo'
import { makeExtrinsicCall, polkaApi as api, createErasString } from '@/methods/polkaUtils'

function createExtrinsic(api, payout) {
  if (Array.isArray(payout)) {
    if (payout.length === 1) {
      return createExtrinsic(api, payout[0])
    }

    return api.tx.utility.batch(
      payout.reduce(
        (calls, { eras, validatorId }) =>
          calls.concat(...eras.map(({ era }) => api.tx.staking.payoutStakers(validatorId, era))),
        []
      )
    )
  }

  const { eras, validatorId } = payout

  return eras.length === 1
    ? api.tx.staking.payoutStakers(validatorId, eras[0].era)
    : api.tx.utility.batch(eras.map(({ era }) => api.tx.staking.payoutStakers(validatorId, era)))
}

export default {
  components: {
    accountInfo
  },
  props: ['stake'],
  data() {
    return {
      accountId: this.$store.state.accounts[0]?.address
    }
  },
  computed: {
    eraRange() {
      const rewards = this.stake.rewardInfo?.rewards.flat()
      const start = rewards[0].era
      const end = rewards[rewards.length - 1].era
      return `${start} - ${end}`
    },
    eraLength() {
      return this.stake.rewardInfo?.rewards[0].length
    },
    eraStr() {
      const rewards = this.stake.rewardInfo?.rewards[0]
      return rewards ? createErasString(rewards.map(t => t.era)) : '--'
    }
  },
  methods: {
    selectedAccountId(accountId) {
      this.accountId = accountId
    },
    setExtrinsic() {
      const validators = this.stake.rewardInfo?.validators
      return validators && createExtrinsic(api, validators)
    },
    receive() {
      this.$emit('closeDialog')
      const extrinsic = this.setExtrinsic()
      extrinsic &&
        makeExtrinsicCall({
          tx: 'utility.batch',
          extrinsic,
          accountId: this.accountId
        })
    }
  }
}
</script>
<style lang="scss">
html.desktop .dialog-wallet.receive-reward {
  .rewards {
    display: flex;
  }
  .reward-destination {
    margin: 10px 0;
  }
  .era-length {
    display: inline-block;
  }
  .split-line {
    color: $color-3;
    margin: 0 5px;
  }
  .label {
    margin-right: 24px;
  }
}
</style>
