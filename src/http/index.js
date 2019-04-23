import axios from 'axios'
import store from '../store'

const t0m = axios.create({
  baseURL: 'https://out.t0m.at/'
})

const local = axios.create({
  baseURL: '//'
})

t0m.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (store.getters.getAuthtoken) {
    config.headers = {
      'X-Auth-Token': store.getters.getAuthtoken
    }
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
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

export function postPokemon ({pokedex_id}) { // eslint-disable-line camelcase
  return t0m.post('/pokemon/list', {
    pokedex_id,
    position: { lat: store.getters.getPosition.lat, lng: store.getters.getPosition.lng }
  })
}

export function postLogin ({email, password}) {
  return t0m.post('/login', {
    email, password
  })
}

export function postRegister ({name, email, password}) {
  return t0m.post('/registration', {
    name, email, password
  })
}
