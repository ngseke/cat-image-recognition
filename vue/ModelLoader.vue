<!-- 存檔管理器 -->
<template lang="pug">
div
  h6 存檔列表
  button.btn.btn-primary(@click='push(value)' v-if='value') 存檔當前 model
  ul.save-list(v-if='modelList')
    li(v-for='(i, index) in modelList' :key='i.id')
      | {{ formatTimestamp(i.timestamp) }} ({{ i.length }} 個字)
      a(href='#' @click='load(i.id)')  載入
      a.text-danger(href='#' @click='remove(i.id)')  [x]
  .text-secondary(v-else) 載入中...
</template>

<script>
import Vue from 'vue'
import db from '../assets/js/database'
import dayjs from 'dayjs'

export default Vue.extend({
  data () {
    return {
      modelList: null,
    }
  },
  props: { value: Object },
  model: { prop: `value`, event: 'value' },
  mounted () {
    this.onList()
  },
  methods: {
    // 發佈存檔
    push (model) {
      if (typeof model !== `object`) alert(`存檔失敗`)
      db.pushNewModel(model)
    },
    // 載入選定存檔
    load (id) {
      this.$emit(`value`, null)
      db.loadModel(id).then((_) => this.$emit(`value`, _))
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
  overflow: scroll
  li
    animation: new-item 5s
</style>
