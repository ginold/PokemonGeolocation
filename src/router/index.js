import * as PokemonMap from '../components/map'
import List from '../components/list'
import NotFound from '../components/notfound'

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
