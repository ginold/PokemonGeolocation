import * as PokemonMap from '../components/Map'
import List from '../components/List'
import NotFound from '../components/NotFound'

import VueRouter from 'vue-router'

// can be a JS file, just write 'export'
export const router = new VueRouter({
  routes: [
    { path: '/', component: PokemonMap },
    { path: '/map', component: PokemonMap },
    { path: '/list', component: List },
    { path: '*', component: NotFound } // * for not found routes
  ]
})
