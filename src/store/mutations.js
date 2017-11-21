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
  }
}
