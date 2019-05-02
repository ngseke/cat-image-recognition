<!-- 沒有意義的首頁 河河 -->
<template lang="pug">
div
  .container
    .jumbotron.text-light
      img.cat(src='https://i.imgur.com/OCj2V0d.png')
      h1 Cat Recognition
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
    }
  },
  mounted () {
  },
})
</script>

<style lang="sass" scoped>
.jumbotron
  padding: 0
  position: relative
  img.cat
    width: 100%
    height: auto
  h1
    position: absolute
    bottom: 2rem
    left: 50%
    transform: translateX(-50%)
    font-weight: 900
    font-size: 4rem
    text-shadow: 0 0 10px rgba(black, .9)

</style>
