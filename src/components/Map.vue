<template>
  <gmap-map :center="getPosition"
            :zoom="18" map-type-id="terrain"
            style="width:100%; height: 200px;"
            ref="googleMap"
            @bounds_changed="setBounds"
            :options="options">
    <gmap-marker
            :position="getPosition"
            z-index="999"
    >
    </gmap-marker>
    <gmap-marker
            v-for="(pokemon, index) in getPokeList"
            :position="pokemon"
            :clickable="false"
            :draggable="false"
            :z-index="index"
            :key="index">
    </gmap-marker>
  </gmap-map>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'
import * as http from '../http'
let styles = require('../assets/mapsStyle.json')
// export default -> import xxx, export var = {} -> import {xxx}
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'google-map',
  data () {
    return {
      options: {
        styles: styles,
        draggable: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'getPokeList',
      'getPosition'
    ])
  },
  methods: {
    ...mapActions([
      'setBounds',
      'setPosition'
    ]),
    getPokemons (bounds) {
      console.log(bounds)
      http.getPokemonList(bounds).then((data) => {
        let pokemons = data.data.location.pokemon

        for (let p of pokemons) {
          console.log(p)
          this.pokemons.push(p.position)
        }
      })
    }
  },
  recenter () {
    this.$refs.googleMap.resizePreserveCenter()
  },
  created () {
    this.setPosition()

    window.addEventListener('resize', this.recenter)
  }
}

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCXLTZzA2g8vvTXAFGb-a5k_h-m5CKA5jk'
  }
})
</script>

<style>
  .vue-map-container {
    height: 92vh !important;
  }
</style>
