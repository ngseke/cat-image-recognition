<!-- 訓練頁面 -->
<template lang="pug">
div
  .container
    .row
      .col-12
        form
          .form-group.row
            label.col-auto.col-form-label Width & Height
            .col: input.form-control(type='tel' v-model='wh')
          .form-group
            .input-group.mb-3
              .custom-file
                input#inputSelectImage.custom-file-input(type='file' multiple accept="image/gif, image/jpeg, image/png" @change="fileChange")
                label.custom-file-label(for='inputSelectImage') Choose file
              .input-group-append
                button.btn.btn-primary(type='button' @click='submit') Submit


      .col-12
        template(v-if='isLoadingImages')
          .alert.alert-info.mb-3 loading images... ({{ progress.current }} / {{ progress.total }})
          .progress: .progress-bar(:style='{ width: `${percentage}%` }') {{ percentage }}%

        .alert.alert-secondary.mb-3(v-else) {{ images.length }} images loaded
        button.btn.btn-primary(@click="imagePreprocess") Preprocess

  .container-fluid
    .img-list
      .item(v-for='(i, index) in inputImages')
        .info [{{ i.id }}] #[br] {{ i.target }}
        .img-area
          img(:src='i.image.src' :ref='`image-${i.id}`' draggable='false')
          .selection(:style='selectionStyle(i.target)')
    hr
    .row
      .col
        canvas#outputTensor3d(ref='outputTensor3d')
</template>

<script>
import Vue from 'vue'
import model from '../assets/js/model'
import dayjs from 'dayjs'
import train from '../assets/js/train'

const randomstring = require('randomstring')

import * as tf from '@tensorflow/tfjs'

export default Vue.extend({
  data () {
    return {
      file: null,
      images: [],
      isLoadingImages: false,
      progress: {
        current: 0,
        total: 0,
      },
      wh: 300,
      ////////////////////////////////////////
      data: null,
      builded: false,
      showNum: 0,
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
      const taskList = []

      this.isLoadingImages = true
      this.progress = {
        total: Array.from(files).length,
        current: 0
      }

      Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file) // 取得 blob url

        taskList.push(this.resizeImage(url).then((_) => {
          const img = new Image()
          img.src = _
          return new Promise((resolve, reject) => {
            img.onload = () => {
              this.images.push({ image: img, id: randomstring.generate(5) })
              this.progress.current++
              resolve()
            }
          })
        }))
      })

      Promise.all(taskList).then(() => {
        this.isLoadingImages = false
        this.setImageEvent()
      })
    },
    // 透過 image-js 變形圖片並回傳
    async resizeImage (_) {
      const { Image } = require('image-js') // 在區塊內引入 image-js

      let image = (await Image.load(_)).resize({ width: this.wh, height: this.wh })
      return await image.toDataURL()
    },
    setImageEvent () {
      this.images.map(_ => _.id).forEach(id => {
        const ref = this.$refs[`image-${id}`][0]
        // 按下事件
        ref.onmousedown = (evt) => {
          const [x1, y1] = [evt.offsetX, evt.offsetY]
          const index = this.images.findIndex(item => item.id === id)
          this.$set(this.images[index], 'target', { x1, y1 })
        }

        // 放開事件
        ref.onmouseup = (evt) => {
          const [x2, y2] = [evt.offsetX, evt.offsetY]
          const index = this.images.findIndex(item => item.id === id)
          const target = {
            x1: Math.min(this.images[index].target.x1, x2),
            x2: Math.max(this.images[index].target.x1, x2),
            y1: Math.min(this.images[index].target.y1, y2),
            y2: Math.max(this.images[index].target.y1, y2),
          }
          this.$set(this.images[index], 'target', target)
        }
      })
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
    submit () {
      train.訓練(this.inputImages)
    }
  },
  computed: {
    // 載入圖片進入的 % 數
    percentage () {
      return ((this.progress.current / this.progress.total) * 100).toFixed(1)
    },
    // 用於輸入的圖片資料集（處理過的）
    inputImages () {
      if (!this.images) return []

      return this.images.map((_) => {
        const data = { ..._ }
        const target = data.target
        if (!(target && Object.keys(target).length >= 4)) delete data.target
        return data
      })
    },
  },
  watch: {
    images: {
      deep: true,
      handler () {}
    },
    progress: {
      deep: true,
      handler () {}
    }
  },
  components: {}
})
</script>

<style lang="sass" scoped>
$primary: #3abdcb

*
  user-select: none

.img-list
  width: 100%
  display: flex
  justify-content: center
  flex-wrap: wrap
  .item
    position: relative
    margin: .25rem
    .info
      pointer-events: none
      position: absolute
      top: 0
      left: 0
      z-index: 100
      color: yellow
      font-size: .7rem
      text-shadow: 0 0 10px rgba(black, .9)

.img-area
  position: relative
  .selection
    pointer-events: none
    position: absolute
    background-color: rgba($primary, .5)
    border: solid $primary 1px
</style>
