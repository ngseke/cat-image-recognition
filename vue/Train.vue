<!-- 訓練頁面 -->
<template lang="pug">
div
  form
    .form-group
      .input-group.mb-3
        .custom-file
          input#inputGroupFile.custom-file-input(type='file' )
          label.custom-file-label(for='inputGroupFile') Choose file
        .input-group-append
          span.input-group-text() Upload
</template>

<script>
import Vue from 'vue'
import model from '../assets/model'

export default Vue.extend({
  data () {
    return {
    }
  },
  mounted () {
  },
})
</script>

<style lang="sass" scoped>

</style>
