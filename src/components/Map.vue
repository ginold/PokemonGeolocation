<template>
  <gmap-map :center="center"
            :zoom="7" map-type-id="terrain"
            style="width:100%; height: 200px;"
            :options="options">

    <gmap-marker
            v-for="(pokemon, index) in importedMarkers"
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
import importedMarkers from '../assets/dummyPoints'
let styles = require('../assets/mapsStyle.json')
// export default -> import xxx, export var = {} -> import {xxx}

export default {
  name: 'google-map',
  data () {
    return {
      center: {lat: 48.2135769, lng: 15.6315828},
      importedMarkers, // shorthand for xxx: xxx
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
  }
}

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCXLTZzA2g8vvTXAFGb-a5k_h-m5CKA5jk'
  }
})
</script>

<style>

</style>
