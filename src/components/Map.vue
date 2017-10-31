<template>
  <gmap-map :center="center"
            :zoom="18" map-type-id="terrain"
            style="width:100%; height: 200px;"
            ref="googleMap"
            @bounds_changed="setBounds"
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
import * as http from '../http'
let styles = require('../assets/mapsStyle.json')
// export default -> import xxx, export var = {} -> import {xxx}

export default {
  name: 'google-map',
  data () {
    return {
      center: {lat: 0, lng: 0},
      importedMarkers, // shorthand for xxx: xxx
      bounds: {
        north: 0,
        east: 0,
        south: 0,
        west: 0
      },
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
  methods: {
    setPosition () {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(payload => {
          const center = {
            lat: payload.coords.latitude,
            lng: payload.coords.longitude
          }
          this.center = center
          console.log(center)
        }, () => {
          console.log('The Geolocation service failed')
        }, {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000
        })
      } else {
        console.log('Your browser doesn\'t support geolocation.')
      }
    },
    setBounds (coords) {
      let bounds = {
        north: coords.f.f,
        east: coords.b.f,
        south: coords.f.b,
        west: coords.b.b
      }
      this.bounds =  bounds
    }
  },
  created () {
    this.setPosition()
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
