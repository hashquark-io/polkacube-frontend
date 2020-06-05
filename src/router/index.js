import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { MsgClose } from '@/methods/message'
import { loadConfig } from '@/config'

import Polka from '@/views/polka/polka.vue'
import PolkaDetail from '@/views/polkaDetail/polkaDetail.vue'
import PolkaStrategy from '@/views/polkaStrategy/polkaStrategy.vue'
import PolkaProposal from '@/views/polkaProposal/polkaProposal.vue'
import Wrap from '@/views/polkaWallet/wrap.vue'

import Notfound from '@/views/404/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/polkadot-cc1'
  },
  {
    path: '/(polkadot-cc1|kusama)',
    name: 'polka',
    component: Polka
  },
  {
    path: '/(polkadot-cc1|kusama)/detail',
    name: 'polkaDetail',
    component: PolkaDetail
  },
  {
    path: '/(polkadot-cc1|kusama)/strategy/:identity?',
    name: 'polkaStrategy',
    component: PolkaStrategy
  },
  {
    path: '/(polkadot-cc1|kusama)/proposal',
    name: 'polkaProposal',
    component: PolkaProposal
  },
  {
    path: '/(polkadot-cc1|kusama)/account',
    name: 'polkaWalletAccount',
    component: Wrap
  },
  {
    path: '/(polkadot-cc1|kusama)/staking',
    name: 'polkaWalletStaking',
    component: Wrap
  },
  {
    path: '/*',
    name: 'notfound',
    component: Notfound
  }
]

const router = new VueRouter({
  routes
})

const init = network => {
  Vue.ls.clear()
  loadConfig(network)
  window.socket?.close()
  window.socket = null
  store.commit('resetApiStatus')
  store.commit('forceUpdate')
}
router.beforeEach((to, from, next) => {
  const prevNetwork = from.params.pathMatch
  const network = to.params.pathMatch
  if (network !== prevNetwork) {
    init(network)
  }
  document.querySelector('title').innerText = window.localeMsg[window._config.locale]['polkaTitle']
  document.querySelector('body').setAttribute('data-view', to.name)
  store.commit('setFromRoute', from)
  if (!to?.name?.includes('polkaWallet')) {
    MsgClose()
  }
  next()
})
router.afterEach(() => {
  window.scrollTo(0, 0)
})
export default router
