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
        h6 存檔列表
        ul.save-list(v-if='modelList')
          li(v-for='(i, index) in modelList' :key='i.id')
            | {{ formatTimestamp(i.timestamp) }} ({{ i.length }} 個字)
            a(href='#' @click='load(i.id)')  載入
            a.text-danger(href='#' @click='remove(i.id)')  [x]
        .text-secondary(v-else) 存檔列表載入中...
        button.btn.btn-primary(@click='push(model)' v-if='model') 存檔當前 model
      .col-12.col-md-8
        .card
          .card-body
            code(v-if='model') {{ model }}
            div(v-else-if='model === null') 載入中...
</template>

<script>
import Vue from 'vue'
import model from '../assets/js/model'
import db from '../assets/js/database'
import dayjs from 'dayjs'

export default Vue.extend({
  data () {
    return {
      file: null,
      images: [],
      modelList: null,
      model: {a:1},
    }
  },
  mounted () {
    this.onList()
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
    // 發佈存檔
    push (model) {
      if (typeof model !== `object`) alert(`存檔失敗`)
      db.pushNewModel(model)
    },
    // 載入選定存檔
    load (id) {
      this.model = null
      db.loadModel(id).then((_) => this.model = _)
    },
    // 移除選定存檔
    remove (id) {
      db.removeModel(id)
    },
    // 監聽列表
    onList () {
      db.onList((data) => {
        this.modelList = data
      })
    },
    formatTimestamp (_) {
      return _ ? dayjs(_).format('YY年MM月DD日 HH:mm:ss') : `invalid timestamp`
    }
  }
})
</script>

<style lang="sass" scoped>
@keyframes new-item
  from
    color: yellow
  to

.save-list
  // max-height: 10rem
  overflow: scroll
  li
    animation: new-item 5s
</style>
