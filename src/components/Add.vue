<template>
  <md-whiteframe md-elevation="1" class="form map-modal">
    <h1 class="md-headline">Add Pokémon</h1>
    <form novalidate @submit.stop.prevent="submit">
      <md-input-container
        :class="{'md-input-invalid': !$v.pokemon.isValid}"
      >
        <label>Pokédex Id or Name</label>
        <md-autocomplete @input="!$v.pokemon.$touch()" v-model.trim="pokemon" :fetch="fetchPokemons" md-dense>
        </md-autocomplete>
        <span class="md-error" v-if="!$v.pokemon.isValid"
        >Invalid pokemon name.</span>

      </md-input-container>
      <div class="buttons">
        <router-link tag="md-button":to="{name: 'map'}">Back to Map</router-link>
        <md-button class="md-raised md-primary" type="submit">Add</md-button>
      </div>
    </form>
  </md-whiteframe>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'add',
  data () {
    return {
      pokemon: undefined
    }
  },
  validations: {
    pokemon: {
      isValid: function (value) {
        console.log(this.getPokeList, value)
        // cast to boolean
        return !!this.getPokeList.find(item => String(item.name).includes(value))
      }
    }
  },
  computed: {
    ...mapGetters([
      'getPokeList'
    ])
  },
  methods: {
    ...mapActions([
      'submitSighting'
    ]),
    submit (event) {
      // Sets the $dirty flag of the model and all its children to true recursively.
      this.$v.$touch()
      // $v model represents the current state of validation
      if (this.$v.$invalid) return
      this.submitSighting(this.getIdFromName(this.pokemon))
    },
    fetchPokemons (param) {
      return new Promise((resolve, reject) => {
        resolve(this.getPokeList.filter(item => {
          let returnValue = false
          if (/\d+/.test(param.q)) {
            returnValue = String(item.species_id).includes(param.q)
          } else {
            returnValue = item.name.toLowerCase().includes(param.q.toLowerCase())
          }
          return returnValue
        }))
      })
    },
    getIdFromName (name) {
      console.log(this.getPokeList.find(item => item.name === name))
    }
  }
}
</script>