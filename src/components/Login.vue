<template>
  <md-whiteframe md-elevation="1" class="form">
    <h1 class="md-headline">Login</h1>
    <form novalidate @submit.stop.prevent="submit" id="loginForm">
<!--     we need to call the function -> commit returns a value
 -->    <b class="error" v-show="getLoginPassed === 2">Something went wrong, please retry!</b>
      <md-input-container
        :class="{'md-input-invalid': $v.email.$error}"
      >
        <label>E-mail</label>
        <md-input autocomplete="email" name="id" v-model.trim="email" @input="!$v.email.$touch()"></md-input>
        <span class="md-error" v-if="!$v.email.required"
        >Email is a required field.</span>
        <span class="md-error" v-else-if="!$v.email.email"
        >Email must be an email.</span>

      </md-input-container>

      <md-input-container
        :class="{'md-input-invalid': $v.password.$error}"
      >
        <label>Password</label>
        <md-input autocomplete="password" name="password" v-model.trim="password" @input="!$v.password.$touch()"></md-input>
        <span class="md-error" v-if="!$v.password.required"
        >password is a required field.</span>
        <span class="md-error" v-else-if="!$v.password.minLength"
        >password must be at least 6 characters long.</span>

      </md-input-container>

      <div class="buttons">
        <router-link tag="md-button"
          :to="{name: 'register'}">Register</router-link>

        <router-link tag="md-button"
          :to="{name: 'map'}">Back to Map</router-link>
        <md-button class="md-raised md-primary" type="submit">Login</md-button>
      </div>
    </form>
  </md-whiteframe>
</template>

<script>

import {
  required,
  and, // Passes when all of provided validators passes.
  email,
  minLength
} from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      email: undefined,
      password: undefined,
      loginPassed: 0
    }
  },
  validations: {
    email: {
      required,
      and,
      email
    },
    password: {
      required,
      and,
      minLength: minLength(6)
    }
  },
  computed: {
    ...mapGetters([
      'getLoginPassed'
    ])
  },
  methods: {
    ...mapActions([
      'submitLogin'
    ]),
    submit (event) {
      // Sets the $dirty flag of the model and all its children to true recursively.
      this.$v.$touch()
      // $v model represents the current state of validation
      if (this.$v.$invalid) return
      this.submitLogin({email: this.email, password: this.password})
    },
    autologin () {
      navigator.credentials.get({
        password: true, // Obtain password credentials or not
        unmediated: true // autologin
      }).then(cred => {
        if (cred) this.submitLogin({email: cred.id, password: cred.password})
      })
    }
  },
  created () {
    if (navigator.credentials) this.autologin()
  }
}
</script>

<style style="scss" scoped>
.md-whiteframe {
  background-color: white;
}
.error {
  color: red;
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
