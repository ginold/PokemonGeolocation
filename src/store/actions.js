import * as types from './mutation-types'
import * as http from '../http'

export const setPosition = ({commit}, payload) => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(payload => {
      const position = {
        lat: payload.coords.latitude,
        lng: payload.coords.longitude
      }
      commit(types.POSITION, position)
    }, () => {
      console.log('The Geolocation service failed')
    }, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    })
  } else {
    console.log('Your browser doesn\'t support geolocation.')
  }
}

export const setBounds = ({commit}, payload) => {
  console.log(payload)
  const bounds = {
    north: payload.f.f,
    east: payload.b.f,
    south: payload.f.b,
    west: payload.b.b
  }
  if (bounds.north !== bounds.south && bounds.east !== bounds.west) {
    commit(types.BOUNDS, bounds)
    setPokeList({commit}, bounds)
  }
}

export const setPokeDex = ({commit}, payload) => {
  commit(types.POKEDEX, payload)
}

export const setPokeList = ({commit}, payload) => {
  http.getPokemonList(payload)
  .then(response => {
    commit(types.POKELIST, response.data.location.pokemon)
  })
}
