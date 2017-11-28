import * as types from './mutation-types'
import * as http from '../http'
import * as pokemonNames from '../../static/pokemon-names.json'

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
    let pokemonsToReturn = []
    let pokemonSight = response.data.location.pokemon
    // we need to get the english name to show the appropriate sprite
    // local language 6 = deutsch, 7 = english
    for (let p of pokemonSight) {
      let foundPokemon = pokemonNames.find(function (obj) { return obj.name === p.name })

      if (foundPokemon) {
        let pokemonId = Object(foundPokemon).pokemon_species_id
        let englishPokemon = pokemonNames.find(function (obj) {
          return obj.pokemon_species_id === pokemonId && obj.local_language_id === 7
        })
        p.name = Object(englishPokemon).name
        pokemonsToReturn.push(p)
      }
    }
    commit(types.POKELIST, pokemonsToReturn)
  })
}
