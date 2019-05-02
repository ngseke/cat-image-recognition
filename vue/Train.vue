<!-- 訓練頁面 -->
<template lang="pug">
div
  form
    .form-group
      .input-group.mb-3
        .custom-file
          input#inputGroupFile.custom-file-input(type='file' multiple accept="image/gif, image/jpeg, image/png" @change="fileChange")
          label.custom-file-label(for='inputGroupFile') Choose file
        .input-group-append
          span.input-group-text() Upload
  .container-fluid
    .row
      .col-12 loaded {{ images.length }} images
      .col-3.col-md-2.mb-1(v-for='i in images')
        img.img-fluid(:src='i.src')
</template>

<script>
import Vue from 'vue'
import model from '../assets/model'

export default Vue.extend({
  data () {
    return {
      file: null,
      images: [],
    }
  },
  mounted () {
  },
  methods: {
    fileChange (event) {
      const files = event.target.files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const url = URL.createObjectURL(file)
        const img = new Image()

        img.src = url
        img.onload = () => {
        }
        this.images.push(img)
      }
    },
  }
})
</script>

<style lang="sass" scoped>

</style>
