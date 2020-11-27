<template>
  <div class="header">
    <span class="iconfont back" @click="goback">&#xe648;</span>
    <span class="title">
      {{this.title}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'BaseHeader',
  props: {
    title: {
      type: String,
      default: ''
    },
    routerBack: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goback () {
      if (this.routerBack) {
        this.$router.back()
      } else {
        this.$emit('back')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .header
    width 100%
    height 3rem
    text-align center
    font-size 1.3rem
    position absolute
    top 0
    left 0
    color $theme-font-color
    background #000
    .back
      position absolute
      top 0
      left 0
      display block
      width 3rem
      height 3rem
      line-height 3rem
      text-align center
    .title
      height 3rem
      line-height 3rem
      margin 0 auto
    .iconfont
      font-size 1.3rem
</style>
