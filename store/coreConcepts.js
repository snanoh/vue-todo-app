export default {
  namespaced: true,
  // Data
  state: () => ({
    a: 123,
    b: []
  }),
  // Computed
  getters: {
    someGetter1 (state, mapGetters) {
      return state.a + 1
    },
    someGetter2 (state, getters) {
      return state.a + getters.someGetter1
    }
  },
  mutations: {
    someMutation (state, playload) {
      state.a = 789
      state.b.push(payload)
    }
  },
  actions: {
    someAction ({ state, getters, commit, dispatch }, payload) {
      state.a = 789 // error
      state.b.push(payload) // error
      commit('someMutation', payload)
    },
    someAction2 (context, payload) {
      context.commit('someMutation')
      context.dispatch('someAction1', payload)
    }
  }
}
