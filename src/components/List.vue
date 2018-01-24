<template>
  <md-whiteframe id="list" md-elevation="1" class="form map-modal">
    <h1 class="md-headline">Pokemon List</h1>
    <md-table v-if="getPokeList.length > 0">
      <md-table-row>
        <md-table-head>Sighting no.</md-table-head>
        <md-table-head>Pokemon name</md-table-head>
      </md-table-row>

      <md-table-row v-for="(pokemon, index) in getPokeList">
        <md-table-cell>{{pokemon.name}}</md-table-cell>
        <md-table-cell>{{pokemon.sighting_id}}</md-table-cell>
      </md-table-row>
    </md-table>
    <p v-else>There are no pokemons</p>
      <div class="buttons">
        <router-link tag="md-button":to="{name: 'map'}">Back to Map</router-link>
      </div>
  </md-whiteframe>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'list',
  computed: {
    ...mapGetters([
      'getPokeList'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
</style>
