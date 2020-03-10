import Vue from 'vue'
import VueRouter from 'vue-router'
import locales from '@/i18n/locales'
import Polka from '@/views/polka/polka.vue'
import PolkaDetail from '@/views/polkaDetail/polkaDetail.vue'
import PolkaProposal from '@/views/polkaProposal/polkaProposal.vue'

import Notfound from '@/views/404/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/polka'
  },

  {
    path: '/polka',
    name: 'polka',
    component: Polka
  },
  {
    path: '/polka/detail',
    name: 'polkaDetail',
    component: PolkaDetail
  },
  {
    path: '/polka/proposal',
    name: 'polkaProposal',
    component: PolkaProposal
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

router.beforeEach((to, from, next) => {
  document.querySelector('title').innerText = locales[window._config.locale]['title']
  next()
})
router.afterEach(() => {
  window.scrollTo(0, 0)
})
export default router
