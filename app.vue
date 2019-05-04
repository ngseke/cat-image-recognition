<template lang="pug">
div
  nav.navbar.navbar-expand.navbar-dark.bg-dark
    .container
      router-link.navbar-brand(to='/') 🐱
      #navbar.navbar-collapse
        ul.navbar-nav.mr-auto
          li.nav-item(v-for='i in navbar')
            router-link.nav-link(:to='{ name: i.page }') {{ i.name }}
  main.mt-3
    router-view
</template>

<script>
import Vue from 'vue'

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
  },
})
</script>

<style lang="sass" scoped>
</style>
