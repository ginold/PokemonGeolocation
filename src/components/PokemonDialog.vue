<template>
 <md-dialog :ref="pokemonDialogRef">
  <md-dialog-title>Pokemon Details</md-dialog-title>
  	 <section class="dialog-content">
  	 	<div>
    	 	<div>
    	 		<b>Name</b>
    	 		<p>{{pokemon.name}}</p>
    	 	</div>
    	 	<div>
    	 		<b>Pokedex ID</b>
    	 		<p>{{pokemon.pokedex_id}}</p>
    	 	</div>
    	 	<div>
    	 		<b>Sighting ID</b>
    	 		<p>{{pokemon.sighting_id}}</p>
    	 	</div>
  	 	</div>
  	 	<div>
  	 		<img :ref="pokemonImgRef" class="pokemon-image" v-bind:src="imgUrl">
  	 	</div>
  	 </section>
  	  <md-input-container>
      	<label>Textarea</label>
      	<md-textarea v-model="pokemon.comment"></md-textarea>
      </md-input-container>
	  <md-dialog-actions>
	    <md-button class="md-primary" @click="this.close">Close</md-button>
	    <md-button class="md-primary" @click="this.open">Save</md-button>
	  </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'pokemon-dialog',
    data () {
      return {
        imgUrl: null,
        pokemon: {},
        pokemonDialogRef: 'pokemonDialogRef',
        pokemonImgRef: 'pokemonImgRef'
      }
    },
    methods: {
      open (pokemon, click) {
        console.log(click)
        console.log()
        let url = require('../assets/img/pokemon-thumbnails/' + pokemon.name.toLowerCase() + '.png')
        let img = this.$refs.pokemonImgRef.cloneNode(false)
        img.src = url
        let container = $('#pokemon-app')
        container.append(img)
        this.pokemon = pokemon
        this.imgUrl = url
        this.$refs[this.pokemonDialogRef].open()
        this.animatePokemon(img, click)
      },
      close () {
        this.$refs[this.pokemonDialogRef].close()
        let img = $('.moveIn')
        img[0].style.transform = 'inherit'
        setTimeout(function () {
          img.remove()
        }, 600)
      },
      animatePokemon (img, click) {
        img.className += ' transition-pokemon moveIn'
        img.style.left = click.x - 28 + 'px'
        img.style.top = click.y - 2 + 'px'
        let coords = this.$refs.pokemonImgRef.getBoundingClientRect()

        img.style.transform = 'translate3d(' + (coords.left - click.x + coords.width - 4) + 'px, ' + (coords.top - click.y + coords.height - 55) + 'px, 0)'
        img.style.transform += 'scale(1.2)'
      }
    }
  }
</script>

<style>
	.transition-pokemon {
		position: absolute;
		z-index: 9999;
		transition: transform 600ms;
	}

	.pokemon-image:not(.transition-pokemon) {
	    opacity: 0
	}

	.md-dialog {
		background-color: white !important;
		width: 70%;
	}
	.dialog-content {
		width: 80%;
    	margin: auto;
    	display: flex;
    	justify-content: space-between;
	}
	.dialog-content .md-input-container {
		width: 80%;
		margin: auto;
	}

</style>