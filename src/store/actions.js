import * as types from './mutation-types'

export const setPosition = ({commit}, payload) => {
  commit(types.POSITION, payload)
}

export const setBounds = ({commit}, payload) => {
  commit(types.BOUNDS, payload)
}

export const setPokeDex = ({commit}, payload) => {
  commit(types.POKEDEX, payload)
}

export const setPokeList = ({commit}, payload) => {
  commit(types.POKELIST, payload)
}
