<template>
  <div :v-for="p in pokemon">{{p.lat}}</div>
</template>

<script>
import importedMarkers from '../assets/dummyPoints'

export default {
  name: 'list',
  data () {
    return {
      pokemon: importedMarkers
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
