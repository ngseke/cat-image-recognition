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

  .container

    h6 存檔列表
    ul(v-if='modelList')
      li(v-for='(i, index) in modelList')
        | {{ formatTimestamp(i.timestamp) }} ({{ i.length }} 個字)
        span.text-primary {{ i.id }}
    .text-secondary(v-else) 存檔列表載入中...
    button.btn.btn-primary(@click='push') push
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
    push () {
      db.pushNewModel({a: 1})
    },
    onList () {
      db.onList((data) => {
        this.modelList = data
      })
    },
    formatTimestamp (_) {
      return _ ? dayjs(_).format('YYYY年MM月DD日 HH:mm:ss') : `invalid timestamp`
    }
  }
})
</script>

<style lang="sass" scoped>

</style>
