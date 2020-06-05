<template>
  <div class="wrap-comp">
    <div class="header" v-if="!loading">
      <div :class="[componentName === 'polkaWalletAccount' && 'active']" @click="toggleTab('account')">
        {{ $t('polkaWallet.tabs')[0] }}
      </div>
      <div :class="[componentName === 'polkaWalletStaking' && 'active']" @click="toggleTab('staking')">
        {{ $t('polkaWallet.tabs')[1] }}
      </div>
    </div>
    <component :is="componentName" v-if="!loading" />
    <div class="polkaApi-connect-loading" v-if="loading">
      <div class="content">
        <img src="@/assets/img/loading.png" alt="" class="loading-img" />
        <p class="tip-1">{{ $t('polkaWallet.connecting') }}</p>
        <p class="tip-2">{{ $t('polkaWallet.tips') }}</p>
        <a
          href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd"
          ref="noopener noreferrer"
          target="_blank"
          >polkadot-js extension</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import polkaWalletAccount from './myAccount/myAccount.vue'
import polkaWalletStaking from './staking/staking.vue'
import { injectedPromise, loadPolkaApi } from '@/methods/polkaUtils'
import { isWeb3Injected } from '@polkadot/extension-dapp'

import { mapState } from 'vuex'

export default {
  components: {
    polkaWalletAccount,
    polkaWalletStaking
  },
  data() {
    return {
      componentName: 'polkaWalletAccount',
      isWaitingInjected: true
    }
  },
  computed: {
    ...mapState(['isApiConnected', 'isAccountLoaded']),
    loading() {
      return !this.isApiConnected || this.isWaitingInjected || !isWeb3Injected || !this.isAccountLoaded
    }
  },
  beforeMount() {
    if (this.isMobile) {
      this.$router.replace('/404')
      return
    }
    this.componentName = this.$route.name
    this.loadPolkaApi()
  },
  methods: {
    toggleTab(route) {
      this.$router.push(route)
    },
    loadPolkaApi() {
      injectedPromise().then(() => (this.isWaitingInjected = false))
      loadPolkaApi(this.network)
      this.$store.dispatch('startUpdateBalances')
    }
  },
  watch: {
    $route() {
      this.componentName = this.$route.name
    }
  },
  beforeDestroy() {
    this.$store.dispatch('closeUpdateBalances')
  }
}
</script>
<style lang="scss">
html.desktop {
  .wrap-comp {
    position: relative;
    margin: auto;
    width: 1200px;
    min-height: 400px;
  }
  .polkaApi-connect-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 400px;
    .content {
      text-align: center;
      color: $color-main;
      .tip-1 {
        margin: 33px 0 24px;
      }
      .tip2 {
        margin-bottom: 12px;
      }
      & > a {
        color: $color-2;
        border-bottom: 1px solid $color-2;
      }
    }
    .loading-img {
      width: 72px;
      animation: loading 2s infinite linear;
    }
  }
  .header {
    padding: 54px 0 40px;
    min-height: 50px;
    display: flex;
    align-items: flex-end;

    & > div {
      position: relative;
      margin-right: 24px;
      font-size: 20px;
      font-weight: 600;
      color: $color-1;
      line-height: 28px;
      cursor: pointer;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -4px;
        width: 38px;
        height: 4px;
        background: linear-gradient(270deg, rgba(243, 243, 248, 1) 0%, rgba(226, 228, 239, 1) 100%);
      }
    }
    .active {
      line-height: 50px;
      font-size: 36px;
      color: $color-main;
    }
    .active::after {
      background: $color-2;
    }
  }
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
