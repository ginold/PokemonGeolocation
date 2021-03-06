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
  transitionDuration: 500,
  isNight: false,
  pokeDex: [],
  pokeList: [],
  authtoken: localStorage.getItem('xauth'),
  loginPassed: null,
  snackbarMessage: '',
  history: {previous: '', preprevious: ''}
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug
})
