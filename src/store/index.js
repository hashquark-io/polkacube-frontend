import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

window.store = new Vuex.Store({
  state: {
    fromRoute: {},
    nominatorStrategyInfo: []
  },

  mutations: {
    setNominatorStrategyInfo(state, val) {
      state.nominatorStrategyInfo = val
    },
    setFromRoute(state, val) {
      state.fromRoute = val
    }
  },
  actions: {}
})

export default window.store
