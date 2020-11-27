<template>
  <div class="header">
    <!-- 下滑 -->
    <div class="iconfont silde-down" @click="sildeDown">&#xe766;</div>
    <div class="center-guider">
      <span class="path">推荐</span>
      <span class="path">最热</span>
      <span class="path">最新</span>
    </div>
    <!-- 分享 -->
    <div class="iconfont share-icon">&#xe617;</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Header',
  methods: {
    sildeDown () {
      this.$router.go(-1)
      document.querySelector('.player').style.display = 'block'
      this.setSearchState(true)
    },
    ...mapMutations(
      { setSearchState: 'SET_SEARCH_STATE' }
    )
  }
}
</script>

<style lang='stylus' scoped>
  @import '../../../common/style/variable.styl'
  .header
    position fixed
    top 0
    left 0
    right 0
    display: flex
    justify-content: center
    height 4rem
    color: $theme-font-color
    background #252525
    z-index 99
    .center-guider
      display: flex
      justify-content: center
      flex: 1
      .path
        margin: 1.2rem
        font-size: 1.2rem
    .iconfont
      font-size 20px
    .silde-down
    .share-icon
      padding: 1.2rem 0.9rem
</style>
