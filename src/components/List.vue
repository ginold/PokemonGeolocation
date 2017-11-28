<template>
  <div id="list">
  	<table>
  		<thead>
  			<tr>
  				<th>Sighting</th>
  				<th>Pokemon</th>
  			</tr>
  		</thead>
  		<tbody>
  			<tr v-for="(pokemon, index) in getPokeList">
  				<td>{{pokemon.sighting_id}}</td>
  				<td>{{pokemon.name}}</td>
  			</tr>
  		</tbody>
  	</table>
  </div>
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
	#list {
		background-color: white;
	}
	#list table {
			width: 100%;
	}
	#list td {
			text-align: center;
	}
</style>
