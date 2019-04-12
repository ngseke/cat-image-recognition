<template lang="pug">
.container
	| Hello123d {{bundler}}
	| YAYAYAYA
</template>

<script>
import Vue from 'vue'
import model from './assets/model'

export default Vue.extend({
  data () {
    return {
      bundler: "Parcel"
    }
  },
  mounted () {
		console.log(model.buildDiscriminator())
  },
})
</script>

<style lang="sass" scoped>
.container
  color: blue

</style>
