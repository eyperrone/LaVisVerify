import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    landing: '',
    certificate: '',
    error: {status: false, message: ''},
    loading: false,
    tab: 0
  },
  mutations: {
    async setState (state, payload) {
      state[payload.variable] = payload.value
    },
    async setErrors (state, payload) {
      state.error = payload
    },
    async setLoading (state, payload) {
      state.loading = payload
    },
  },
  actions: {
    setState (context, payload) {
      context.commit('setState', payload)
    },
    setErrors (context, payload) {
      context.commit('setErrors', payload)
    },
    setLoading (context, payload) {
      context.commit('setLoading', payload)
    }
  },
  getters: {
    getTab (state) {
      return state.tab
    },
    getLanding (state) {
      return state.landing
    },
    getLoading (state) {
      return state.loading
    },
    getErrors (state) {
      return state.error
    },
    getCertificate (state) {
      return state.certificate
    }
  },
  modules: {
  }
})
