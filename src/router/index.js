import * as PokemonMap from '../components/Map'
import List from '../components/List'
import NotFound from '../components/NotFound'
import Add from '../components/Add'
import Login from '../components/Login'
import VueRouter from 'vue-router'

// can be a JS file, just write 'export'
export const router = new VueRouter({
  routes: [
    { path: '/login', component: Login, name: 'login' },
    { path: '/add', component: Add, name: 'add' },
    { path: '/', component: PokemonMap, name: 'home' },
    { path: '/map', component: PokemonMap, name: 'map' },
    { path: '/list', component: List, name: 'list' },
    { path: '*', component: NotFound } // * for not found routes
  ]
})
