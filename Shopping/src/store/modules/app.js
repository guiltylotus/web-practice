import * as types from '../mutation-types'

// states
const state = {
  isAdmin: true,
  name: {
    username: null,
    displayName: null
  },
  menu: [
  ]
}

// mutations
const mutations = {
  [types.SET_ADMIN] (state, flag) {
    state.isAdmin = flag
  },

  [types.SET_NAME] (state, name) {
    state.name.username = name.username
    state.name.displayName = name.displayName
  }
}

export default {
  state,
  mutations
}
