<template>
  <div id="pokemon-app">
    <header class="md-toolbar md-theme-default">
        <h1>PGMon+ 17</h1>
        <button class="md-button md-icon-button md-theme-default" type="button">
          <i class="md-icon md-theme-default material-icons">account_circle</i>
          <md-ink-ripple />
      </button>
    </header>

    <main>
      <list></list>
      <not-found></not-found>
      <pokemon-map></pokemon-map>
    </main>

  </div>
</template>

<script>
  import NotFound from './components/NotFound'
  import * as PokemonMap from './components/Map'
  import List from './components/List'

  export default {
    name: 'app',
    components: {
      List, PokemonMap, NotFound
    }
  }
</script>

<style>
  main {
    height: 100%;
    padding-top: 20px;
    padding-left: 20px;
    margin: 0 !important;
    background-color: green;

  }
  body {
    color: black;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  #pokemon-app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }

  main {
    text-align: center;
    margin-top: 40px;
  }

  header {
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
    padding: 10px 20px !important;
    display: flex;
    justify-content: space-between;
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
</style>
