<template>
  <md-whiteframe md-elevation="1" class="form map-modal">
    <h1 class="md-headline">Add Pokémon</h1>
    <form novalidate @submit.stop.prevent="submit">
      <md-input-container
        :class="{'md-input-invalid': $v.pokemon.$error}"
      >
        <label>Pokédex Name</label>
        <md-autocomplete @input="!$v.pokemon.$touch()" v-model.trim="pokemon" :fetch="fetchPokemons" md-dense>
        </md-autocomplete>
        <span class="md-error" v-if="!$v.pokemon.minLength"
        >Type at least {{$v.pokemon.$params.minLength.min}} characters</span>
        <span class="md-error" v-else-if="!$v.pokemon.isValid"
        >Pokemon name should be a string.</span>        
        <span class="md-error" v-else-if="!$v.pokemon.notFound"
        >Pokemon not found.</span>
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
import {minLength, and} from 'vuelidate/lib/validators'
export default {
  name: 'add',
  data () {
    return {
      pokemon: null
    }
  },
  validations: {
    pokemon: {
      notFound: function (value) {
        console.log(this.getPokeList, value)
        // cast to boolean
        return !!this.getPokeList.find(item => String(item.name).includes(value))
      },
      isValid: function (val) {
        return isNaN(val)
      },
      minLength: minLength(3),
      and
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