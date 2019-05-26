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

      .col-10
        .alert.alert-secondary.mb-3  loaded {{ images.length }} images
      .col-2
        button.btn.btn-primary(@click="imagePreprocess") Preprocess
    .row
      .col
        canvas#outputTensor3d(ref='outputTensor3d')

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
import data from '../assets/js/data'
import ModelLoader from './ModelLoader.vue'
import dayjs from 'dayjs'

import * as tf from '@tensorflow/tfjs'

export default Vue.extend({
  data () {
    return {
      file: null,
      images: [],
      model: null,
      data: null,
      builded: false,
      showNum: 0
    }
  },
  mounted () {
  },
  methods: {
    imagePreprocess () {
      if (!this.builded){
        this.data = data.imageTransform(this.images, this.images.length)
        this.builded = true
      }
      else
        if (++this.showNum==this.data.length)
          this.showNum = 0
      if (this.data.length>0)
        tf.browser.toPixels(this.data[this.showNum], this.$refs.outputTensor3d)
    },
    fileChange (event) {
      this.showNum = 0
      this.builded = false
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
