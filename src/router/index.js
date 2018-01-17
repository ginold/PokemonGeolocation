import * as PokemonMap from '../components/Map'
import List from '../components/List'
import NotFound from '../components/NotFound'
import Add from '../components/Add'
import Login from '../components/Login'
import Register from '../components/Register'
import VueRouter from 'vue-router'
import store from '../store'

// can be a JS file, just write 'export'
export const router = new VueRouter({
  routes: [
    { path: '/register', component: Register, name: 'register', meta: {requires: 'visitor'} },
    { path: '/login', component: Login, name: 'login', meta: {requires: 'visitor'} },
    { path: '/', component: PokemonMap, name: 'home' },
    { path: '/map',
      component: PokemonMap,
      name: 'map',
      meta: {requires: 'visitor'},
      children: [{name: 'map/add', path: 'add', component: Add, meta: {requires: 'visitor'}}]
    },
    { path: '/list', component: List, name: 'list', meta: {requires: 'auth'} },
    { path: '*', component: NotFound } // * for not found routes
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requires === 'auth')) {
    if (!store.getters.getAuthtoken) next('/login')
  } else {
    next()
  }
})
