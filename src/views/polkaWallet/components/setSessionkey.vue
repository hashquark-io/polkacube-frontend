<template>
  <div class="dialog-wallet set-session-key">
    <p class="title">{{ $t('polkaDialog.SetSessionKey') }}</p>

    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.StashAccount') }}</p>

    <account-info :accountId="accountId" :hideTransferrable="true" />

    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.ControllerAccount') }}</p>

    <account-info :accountId="controllerId" :hideTransferrable="true" />

    <p class="sub-title">Session Key</p>
    <div class="dialog-input-wrap">
      <input
        type="text"
        class="input"
        :value="sessionKey"
        @input="formatInp"
        maxlength="1024"
        :placeholder="$t('polkaDialog.EnterSessionKey')"
      />
    </div>

    <div :class="['btn-send', !canClick && 'disabled']" @click="canClick && setSessionKey()">
      {{ $t('polkaDialog.Confirm') }}
    </div>
  </div>
</template>
<script>
import accountInfo from './accountInfo'

import { makeExtrinsicCall } from '@/methods/polkaUtils'

const EMPTY_PROOF = new Uint8Array()
export default {
  components: {
    accountInfo
  },
  props: ['stake'],
  data() {
    return {
      sessionKey: '',
      accountId: this.stake.stakingAccount.accountId,
      controllerId: this.stake.stakingAccount.controllerId
    }
  },
  computed: {
    canClick() {
      return this.sessionKey !== ''
    }
  },
  methods: {
    isSelected(account) {
      return account.address === this.controllerId
    },
    setSessionKey() {
      this.$emit('closeDialog')
      makeExtrinsicCall({
        tx: 'session.setKeys',
        params: [this.sessionKey, EMPTY_PROOF],
        accountId: this.controllerId
      })
    },
    formatInp(e) {
      let val = e.target.value
      val = val.replace(/[^\da-zA-Z]+/g, '')
      this.sessionKey = e.target.value = val
    }
  }
}
</script>
