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
        button.btn.btn-primary(@click='doIt(images[0].image)') do it

  .container-fluid
    .row
      .col-4.col-md-3.mb-1(v-for='i in images')
        img.img-fluid(:src='i.image.src')
</template>

<script>
import Vue from 'vue'
import model from '../assets/js/model'
import dayjs from 'dayjs'

const tf = require('@tensorflow/tfjs')

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
      // this.images = []  // 清空圖片物件陣列
      const files = event.target.files

      Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file) // 取得 blob url

        this.resizeImage(url).then((_) => {
          const img = new Image()
          img.src = _
          this.images.push({ image: img})
        })
      })
    },
    // 透過 image-js 變形圖片並回傳
    async resizeImage (_) {
      const { Image } = require('image-js') // 在區塊內引入 image-js

      let image = (await Image.load(_)).resize({ width: 500, height: 500 })
      return await image.toDataURL()
    },
    doIt (_) {
      tf.browser.fromPixels(_)
    }
  },
  components: {
  }
})
</script>

<style lang="sass" scoped>

</style>
