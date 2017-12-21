<template>
  <div id="pokemon-app">
    <header class="md-toolbar md-theme-default">
      <h1>PGMon+ 17</h1>
      
      <md-menu md-align-trigger md-size="small"
      md-direction="bottom-start" 
        v-if="getAuthtoken">
      <md-button
          md-menu-trigger
          class="md-icon-button">
        <md-icon class="logged">account_circle</md-icon>
      </md-button>
        <md-menu-content>
            <md-menu-item @click="submitLogout">
              Logout</md-menu-item>
        </md-menu-content>
      </md-menu>
      <router-link tag="md-button" 
          class="md-icon-button"
          v-else
          :to="{name:'login'}">
          <md-icon>account_circle</md-icon>
      </router-link>
    </header>

    <main>
      <transition name="component-fade" mode="out-in">
      <!-- keep the switched-out components in memory so that you can preserve their state or avoid re-rendering -->

      <!-- to always show a "fresh" Add.vue, exclude it from keep-alive-->
        <keep-alive exclude="add">
          <router-view></router-view>
        </keep-alive>
      </transition>

      <div class="map-list-switch">
        <router-link tag="md-button" class="md-icon-button md-raised"
          v-if="$route.name === 'map'"
          :to="{name: 'list'}">
          <md-icon>list</md-icon>
        </router-link>

        <router-link tag="md-button" class="md-icon-button md-raised"
          v-if="$route.name === 'list'"
          :to="{name: 'map'}">
          <md-icon>map</md-icon>
        </router-link>
      </div>

      <router-link tag="md-button" class="add md-fab md-fab-bottom-right"
        v-if="$route.name === 'map' || $route.name === 'list'"
        :to="{name: 'add'}">
        <md-icon>add</md-icon>
      </router-link>

    </main>

  </div>
</template>

<script>
  import NotFound from './components/NotFound'
  import * as PokemonMap from './components/Map'
  import List from './components/List'
  import Add from './components/Add'
  import Login from './components/Login'
  import Register from './components/Register'
  import PokemonDialog from './components/PokemonDialog'

  import {
    mapActions,
    mapGetters
  } from 'vuex'

  export default {
    name: 'app',
    components: {
      List, PokemonMap, NotFound, Add, Login, Register, PokemonDialog
    },
    computed: {
      ...mapGetters([
        'getAuthtoken'
      ])
    },
    methods: {
      ...mapActions([
        'submitLogout'
      ])
    }
  }
</script>

<style lang="scss">
  main {
    margin: 0 !important;
    height: 100%;
  }
  body {
    color: black;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  .logged { 
    color: lightgreen !important;
  }
  #pokemon-app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: calc(100% - 8vh); /*header height */
  }

  header {
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
    padding: 10px 20px !important;
    display: flex;
    justify-content: space-between;
    height: 8vh;
    min-height: auto !important;
    position: relative !important;
    background-color: #e6b408 !important;

    i.md-icon {
      font-size: 2em;
    }

    a:hover {
        text-decoration: none !important;
    }

    h1, i.md-icon {
      color: sienna;
    }
  }


  header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
  }

  .map-list-switch {
    position: fixed;
    top: 72px;
    right: 0px;
  }
  .map-list-switch button.md-button {
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: white;

    &:hover {
      background-color: #eee !important;
    }
  }
  .md-fab.md-button {
    right: inherit;
    left: 40px;
  }
  .add {
    position: fixed;
  }
  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .md-toolbar {
    flex: 0 0;
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
    z-index: 2;
  }
  main {
    flex: 1 1;
    display: flex;
    justify-content: center;
    position: relative;
    margin-top: 64px;
  }

  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter,
  .component-fade-leave-to {
    opacity: 0;
  }

</style>
