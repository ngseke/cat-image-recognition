<!-- 訓練頁面 -->
<template lang="pug">
div
  .container
    .row
      .col-12
        form
          .form-group
            .input-group.mb-3
              .custom-file
                input#inputSelectImage.custom-file-input(type='file' multiple accept="image/gif, image/jpeg, image/png" @change="fileChange")
                label.custom-file-label(for='inputSelectImage') Choose file
              .input-group-append
                span.input-group-text Upload

      .col-12
        .alert.alert-secondary.mb-3  loaded {{ images.length }} images

  .container-fluid
    .row
      .col-3.col-md-2.mb-1(v-for='i in images')
        img.img-fluid(:src='i.src')

  hr
  .container
    .row
      .col-12.col-md
        ModelLoader(v-model='model')

      .col-12.col-md-8
        .card
          .card-body
            code(v-if='model') {{ model }}
            div(v-else-if='model === null') 載入中...
</template>

<script>
import Vue from 'vue'
import model from '../assets/js/model'
import ModelLoader from './ModelLoader.vue'
import dayjs from 'dayjs'

export default Vue.extend({
  data () {
    return {
      file: null,
      images: [],
      model: null,
    }
  },
  mounted () {
  },
  methods: {
    fileChange (event) {
      this.images = []  // 清空圖片物件陣列
      const files = event.target.files
      Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file) // 取得 blob url
        const img = new Image()

        img.src = url
        img.onload = () => {  }
        this.images.push(img)
      })

      console.log(this.images)
    },
  },
  components: {
    ModelLoader
  }
})
</script>

<style lang="sass" scoped>

</style>
