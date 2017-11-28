<template>
  <md-whiteframe md-elevation="1" class="form">
    <h1 class="md-headline">Add Pokémon</h1>
    <form novalidate @submit.stop.prevent="submit">
      <md-input-container
        :class="{'md-input-invalid': $v.pokedexId.$error}"
      >
        <label>Pokédex Id</label>
        <md-input
          v-model.trim="pokedexId"
          @input="!$v.pokedexId.$touch()"
        ></md-input>
        <span class="md-error"
          v-if="!$v.pokedexId.required"
        >Pokédex Id is a required field.</span>
        <span class="md-error"
          v-else-if="!$v.pokedexId.numeric"
        >Pokédex Id must be numeric.</span>

      </md-input-container>
      <div class="buttons">
        <router-link tag="md-button"
          :to="{name: 'map'}"
        >Back to Map</router-link>
        <md-button class="md-raised md-primary" type="submit" >Add</md-button>
      </div>
    </form>
  </md-whiteframe>
</template>

<script>

import {
  required,
  and, // Passes when all of provided validators passes.
  numeric
} from 'vuelidate/lib/validators'
import {mapActions} from 'vuex'

export default {
  name: 'add',
  data () {
    return {
      pokedexId: undefined
    }
  },
  validations: {
    pokedexId: {
      required,
      and,
      numeric
    }
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
      this.submitSighting(this.pokedexId)
    }
  }
}
</script>

<style style="scss" scoped>
.md-whiteframe {
  background-color: white;
}
.form {
  padding: 30px;
  margin: 16px;
  width: 400px;
  align-self: center;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  margin-right: -8px;
}
</style>
