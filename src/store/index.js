import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
  position: {
    lat: 0,
    lng: 0
  },
  bounds: {
    east: 0,
    north: 0,
    south: 0,
    west: 0
  },
  pokeDex: [],
  pokeList: []
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug
})
