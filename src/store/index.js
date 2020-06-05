import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '@/methods/axios'
let timer = null
let isQuerying = false

Vue.use(Vuex)
window.store = new Vuex.Store({
  state: {
    isMobile: window.device?.type === 'mobile',
    fromRoute: {},
    nominatorStrategyInfo: [],
    accounts: [],
    stakeList: [],
    isApiConnected: false,
    isAccountLoaded: false,

    curTime: +new Date()
  },

  mutations: {
    setIsMobile(state, val) {
      state.isMobile = val
    },
    setNominatorStrategyInfo(state, val) {
      state.nominatorStrategyInfo = val
    },
    setFromRoute(state, val) {
      state.fromRoute = val
    },
    setAccounts(state, val) {
      state.accounts = val
    },
    setStakeList(state, val) {
      state.stakeList = val
    },
    setApiconnectedStatus(state, val) {
      state.isApiConnected = val
    },
    setAccountLoadedStatus(state, val) {
      state.isAccountLoaded = val
    },
    forceUpdate(state) {
      state.curTime = +new Date()
    },
    resetApiStatus(state) {
      state.isApiConnected = false
      state.isAccountLoaded = false
    }
  },
  actions: {
    startUpdateBalances({ dispatch }) {
      if (timer) return
      timer = setInterval(() => {
        if (isQuerying) return
        dispatch('queryBalances')
      }, 5000)
    },
    queryBalances({ state, commit }, allAddress) {
      isQuerying = true
      const { accounts } = state
      accounts.length > 0 &&
        Axios.get(`${window._config.url.allBalances}/${allAddress || accounts.map(t => t.address).join(',')}`)
          .then(res => {
            commit(
              'setAccounts',
              accounts.map((t, i) => ({ ...t, balancesAll: res[i] }))
            )
          })
          .finally(() => (isQuerying = false))
    },

    closeUpdateBalances() {
      clearInterval(timer)
      timer = null
    },
    async queryStakeList({ state, commit, dispatch }) {
      let stakeList = await Promise.all(state.accounts.map(t => dispatch('queryStake', t.address)))
      stakeList = stakeList.flat()
      stakeList = [...new Set(stakeList.map(t => t.stashId))].map(k => {
        return stakeList.find(j => j.stashId === k)
      })
      commit('setStakeList', stakeList)
    },
    // eslint-disable-next-line no-empty-pattern
    queryStake({}, address) {
      return Axios.get(`${window._config.url.stashes}/${address}`)
    }
  },
  getters: {}
})

export default window.store
