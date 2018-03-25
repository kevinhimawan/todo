import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    projects: [],
    todo: []
  },
  mutations: {
    changeproject (state, payload) {
      state.projects = payload
    },
    changetodo (state, payload) {
      state.todo = payload
    }
  }
})

export default store
