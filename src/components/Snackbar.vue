<template>
	<md-snackbar ref="snackbarRef"
	  :md-position="'bottom center'" md-duration="4000">
		<span>{{this.message}}</span>
	</md-snackbar>
</template>

<script>
export default {
  name: 'snackbar',
  data () {
    return {
      message: ''
    }
  },
  methods: {
    open (message) {
      this.message = message
      this.$refs.snackbarRef.open()
    }
  }
}
</script>
