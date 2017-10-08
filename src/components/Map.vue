<template>
  <gmap-map
    :center="{lat:46, lng:6}"
    :zoom="7"
    map-type-id="terrain"
    style="width:100%; height: 200px;"
    :options="{styles: styles}"
  ></gmap-map>
</template>

<script>
  import * as VueGoogleMaps from 'vue2-google-maps'
  import Vue from 'vue'
  let styles = require('../assets/mapsStyle.json')

  export default {
    name: 'google-map',
    data () {
      return {
        styles: styles
      }
    }
  }

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCXLTZzA2g8vvTXAFGb-a5k_h-m5CKA5jk'
    }
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
