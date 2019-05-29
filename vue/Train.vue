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
                span.input-group-text Submit

      .col-12
        template(v-if='isLoadingImages')
          .alert.alert-info.mb-3 loading images... ({{ progress.current }} / {{ progress.total }})
          .progress: .progress-bar(:style='{ width: `${percentage}%` }') {{ percentage }}%

        .alert.alert-secondary.mb-3(v-else) {{ images.length }} images loaded
        //- button.btn.btn-primary(@click='') do it

  .container-fluid
    .img-list
      .m-1(v-for='(i, index) in images')
        div [{{ i.id }}] {{ i.target }}
        .img-area
          img(:src='i.image.src' :ref='`image-${i.id}`' draggable='false')
          .selection(:style='selectionStyle(i.target)')
</template>

<script>
import Vue from 'vue'
import model from '../assets/js/model'
import dayjs from 'dayjs'

const randomstring = require('randomstring')
const tf = require('@tensorflow/tfjs')

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
    }
  },
  mounted () {
  },
  methods: {
    fileChange (event) {
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

      let image = (await Image.load(_)).resize({ width: 300, height: 300 })
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
    }
  },
  computed: {
    percentage () {
      return ((this.progress.current / this.progress.total) * 100).toFixed(1)
    }
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
  components: {
  }
})
</script>

<style lang="sass" scoped>
*
  user-select: none

.img-list
  width: 100%
  display: flex
  justify-content: center
  flex-wrap: wrap

.img-area
  position: relative
  .selection
    position: absolute
    background-color: rgba(#3abdcb, .5)
    border: solid #3abdcb 1px
</style>
