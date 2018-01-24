import * as types from './mutation-types'

export default {
  [types.POSITION] (state, payload) {
    state.position = payload
  },
  [types.BOUNDS] (state, payload) {
    state.bounds = payload
  },
  [types.POKELIST] (state, payload) {
    state.pokeList = payload
  },
  [types.POKEDEX] (state, payload) {
    state.pokeDex = payload
  },
  [types.LOGIN_PASSED] (state, payload) {
    state.loginPassed = payload
  },
  [types.AUTHTOKEN] (state, payload) {
    state.authtoken = payload
  },
  [types.SNACKBAR_MESSAGE] (state, payload) {
    state.snackbarMessage = payload
  },
  [types.IS_NIGHT] (state, payload) {
    state.isNight = payload
  },
  [types.HISTORY] (state, payload) {
    state.history = payload
  }
}
