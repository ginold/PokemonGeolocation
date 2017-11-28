import axios from 'axios'

const t0m = axios.create({
  baseURL: 'https://out.t0m.at/'
})

const local = axios.create({
  baseURL: '//'
})

export function getPokemonList ({north, east, south, west}) {
  return t0m.get('/pokemon/list/' + [north, east, south, west].join(','))
}

export function getPokeDex () {
  return local.get('/static/pokedex.json')
}

export function getPokeNames () {
  return local.get('/static/pokemon-names.json')
}

export function postPokemon ({pokedex_id, lat, lng}) { // eslint-disable-line camelcase
  return t0m.post('/pokemon/list', {
    pokedex_id,
    position: { lat, lng }
  })
}

export function postLogin ({email, password}) {
  return t0m.post('/login', {
    email, password
  })
}
