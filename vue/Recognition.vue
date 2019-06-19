<!-- 辨識頁面 -->
<template lang="pug">
div

  .container
    h2 Step 1: Load Model
    button.btn.btn-primary(type='button' @click='loadModel()') Choose File
    hr
    h2 Step 2: Load Image
    form
      .form-group.row
        label.col-auto.col-form-label Width & Height
        .col: input.form-control(type='tel' v-model='wh')
      .form-group
        .input-group.mb-3
          .custom-file
            input#inputSelectImage.custom-file-input(type='file' accept="image/gif, image/jpeg, image/png" @change="imageChange")
            label.custom-file-label(for='inputSelectImage') Choose file

  .container-fluid
    .result(v-if='image')
      .info
      .img-area
        img(:src='image.src')
        .selection(:style='selectionStyle(i)' v-for='i in result'): .text CAT
</template>

<script>
import Vue from 'vue'
import recog from '../assets/js/recognition'

export default Vue.extend({
  data () {
    return {
      wh: 224,
      image: null,
      isLoadingImages: false,
      result: null,
    }
  },
  methods: {
    loadModel () {

    },
    imageChange (event) {
      this.isLoadingImages = true
      const files = event.target.files
      const url = URL.createObjectURL(files[0]) // 取得 blob url

      this.resizeImage(url).then((_) => {
        const img = new Image()
        img.src = _
        img.onload = () => {
          this.image = { image: img, src: _ }
          this.isLoadingImages = false
          this.submit()
        }
      })
    },
    async resizeImage (_) {
      const { Image } = require('image-js') // 在區塊內引入 image-js

      let image = (await Image.load(_)).resize({ width: this.wh, height: this.wh })
      return await image.toDataURL()
    },
    selectionStyle (target) {
      if (target && Object.keys(target).length >= 4)
        return {
          left: target.x1 + `px`,
          top: target.y1 + `px`,
          width: `${target.x2 - target.x1}px`,
          height: `${target.y2 - target.y1}px`,
        }
      return {}
    },
    async submit () {
      const result = await recog.predict(this.image.image)

      this.result = result.filter(_=>_.class === 'cat').map((_) => {
        _ = _.bbox
        return {x1: _[0], y1: _[1], x2: _[2], y2: _[3]}
      })
    }
  },
  mounted () {
  },
})
</script>

<style lang="sass" scoped>
$primary: #fcc135

.result
  display: flex
  justify-content: center

  .info
    font-size: .8rem
  .img-area
    transform-origin: top
    position: relative
    .selection
      position: absolute
      background-color: rgba($primary, .5)
      border: solid $primary 1px
      .text
        position: absolute
        top: -1.2rem
        font-weight: bold
        color: $primary
        text-shadow: 0 0 5px black
</style>
