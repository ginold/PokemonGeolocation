<template>
<div class="map-container">
  <pokemon-dialog ref="pokemonDialog"></pokemon-dialog>  
  <gmap-map 
    :center="getPosition"
    :zoom="18" map-type-id="terrain"
    style="width:100%; height: 200px;"
    ref="googleMap"
    @bounds_changed="setBounds"
    :options="options">
    <gmap-marker
        :position="getPosition"
        :z-index="999"
        :icon="{url: require('../assets/img/player.png')}"
        >
    </gmap-marker>
    <gmap-marker
        v-for="(pokemon, index) in getPokeList"
        :position="pokemon.position"
        :clickable="true"
        @click="openPokemonDialog(pokemon, $event)"
        :draggable="false"
        :z-index="index"
        :key="index"
        :icon="{url: require('../assets/img/pokemon-thumbnails/'+ pokemon.name.toLowerCase() + '.png')}"
        >
    </gmap-marker>
  </gmap-map>
  </div>
</template>

<script>

import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'
import debounce from 'lodash.debounce'
import PokemonDialog from './PokemonDialog'
// export default -> import xxx, export var = {} -> import {xxx}

import {mapActions, mapGetters} from 'vuex'

// the mapActions helper which maps component methods to store.dispatch calls (requires root store injection)

// The mapGetters helper simply maps store getters to local computed properties

export default {
  name: 'google-map',
  data () {
    return {
      options: {
        styles: this.setMapStyle(),
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }
    }
  },
  components: {
    pokemonDialog: PokemonDialog
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
    setMapStyle () {
      let hours = (new Date()).getHours()
      if (hours >= 7 && hours <= 18) {
        return require('../assets/mapStyleDay.json')
      } else {
        return require('../assets/mapStyleNight.json')
      }
    },
    getPixelFromMarker ($event) {
      console.log(this.$refs.googleMap.$mapObject)
      let map = this.$refs.googleMap.$mapObject
      let scale = Math.pow(2, map.getZoom())
      let proj = map.getProjection()
      let bounds = map.getBounds()
      let nwObj = {
        lat: bounds.getNorthEast().lat,
        lng: bounds.getSouthWest().lng
      }
      let nw = proj.fromLatLngToPoint(nwObj)
      let point = proj.fromLatLngToPoint($event.latLng)
      let pointPixel = {
        x: Math.floor((point.x - nw.x) * scale),
        y: Math.floor((point.y - nw.y) * scale)
      }

      return pointPixel
    },
    openPokemonDialog (pokemon, $event) {
      let click = this.getPixelFromMarker($event)
      this.$refs.pokemonDialog.open(pokemon, click)
    }
  },
  recenter () {
    this.$refs.googleMap.resizePreserveCenter()
  },
  created () {
    this.setPosition()
    window.addEventListener('resize', debounce(() => {
      this.recenter
    }, 100))
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
  .map-container {
    width: 100%;
  }
</style>
