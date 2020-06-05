<template>
  <div class="dialog-wallet receive">
    <p class="title">
      <span class="send">{{ $t('polkaDialog.Receive') }}</span>
    </p>
    <div class="account-wrap">
      <div class="account">
        <div class="left">
          <Identicon :size="38" :theme="'polkadot'" :value="account.address" class="avatar" />
          <div>
            <div class="name">{{ account.name }}</div>
            <div class="address">
              {{ account.address }}
              <i
                class="address-copy"
                v-clipboard:copy="account.address"
                v-clipboard:error="onError"
                v-clipboard:success="onCopy"
              >
                <img class="img" src="@/assets/img/copy.svg" alt="" />
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="account-qrcode">
      <qrcode :value="account.address" :options="{ size: 144, background: '#F8F9FC', padding: 14 }"></qrcode>
    </div>
  </div>
</template>
<script>
import Identicon from '@polkadot/vue-identicon'
import VueClipboard from 'vue-clipboard2'
import VueQrcode from '@xkeshi/vue-qrcode'
import Vue from 'vue'
Vue.use(VueClipboard)
Vue.component(VueQrcode.name, VueQrcode)
export default {
  components: {
    Identicon
  },
  props: ['account'],
  methods: {
    onCopy() {
      this.$msg.success(this.$t('polkaDialog.CopySuccess'))
    },
    onError() {
      this.$msg.error(this.$t('polkaDialog.CopyFailed'))
    }
  }
}
</script>
