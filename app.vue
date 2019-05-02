<template lang="pug">
div
  nav.navbar.navbar-expand.navbar-dark.bg-dark
    .container
      a.navbar-brand(href='#' @click='page = `index`') 🐱
      #navbar.navbar-collapse
        ul.navbar-nav.mr-auto
          li.nav-item(v-for='i in navbar')
            a.nav-link(href='#' @click='page = i.page' :class='getNavbarClass(i.page)') {{ i.name }}
  main.mt-3
    Index(v-if='page === `index`')
    Train(v-else-if='page === `train`')
    Recognition(v-else-if='page === `recognition`')
</template>

<script>
import Vue from 'vue'
import Index from './vue/Index.vue'
import Train from './vue/Train.vue'
import Recognition from './vue/Recognition.vue'

export default Vue.extend({
  data () {
    return {
      page: `train`,  // 當前頁面
      navbar: [
        { page: `train`, name: `Train` },
        { page: `recognition`, name: `Recognition` }
      ]
    }
  },
  mounted () {
	},
  methods: {
    getNavbarClass (_) {
      return {
        active: this.page === _
      }
    }
  },
	components: {
    Index,
		Train,
    Recognition,
	}
})
</script>

<style lang="sass" scoped>
</style>
