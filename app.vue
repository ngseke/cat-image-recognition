<template lang="pug">
div
  nav.navbar.navbar-expand.navbar-dark.bg-dark
    .container
      a.navbar-brand(href='#') 🐱
      #navbar.navbar-collapse
        ul.navbar-nav.mr-auto
          li.nav-item: a.nav-link(href='#' @click='page = `train`') Train
          li.nav-item: a.nav-link(href='#' @click='page = `recognition`') Recognition
  main.container.mt-3
    Train(v-if='page === `train`')
    Recognition(v-else-if='page === `recognition`')
</template>

<script>
import Vue from 'vue'
import Train from './vue/Train.vue'
import Recognition from './vue/Recognition.vue'

export default Vue.extend({
  data () {
    return {
      page: `train`,
    }
  },
  mounted () {
	},
	components: {
		Train,
    Recognition,
	}
})
</script>

<style lang="sass" scoped>
</style>
