<template>
  <div class="header">
    <!-- 下滑 -->
    <div class="iconfont silde-down" @click="sildeDown">&#xe766;</div>
    <div class="center-guider">
      <span class="path">歌曲</span>
      <span class="path">竖屏MV</span>
      <span class="path">相关</span>
    </div>
    <!-- 分享 -->
    <div class="iconfont share-icon">&#xe617;</div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapGetters(['screenFromList'])
  },
  methods: {
    sildeDown () {
      this.setFullScreen(false)
      this.outFullScreen('screenFromList')
    },
    outFullScreen (from) {
      if (from === 'screenFromList') {
        if (this.screenFromList === true) {
          this.setScreenFromList(false)
        }
      }
    },
    ...mapMutations(
      {
        setFullScreen: 'SET_FULL_SCREEN',
        setScreenFromList: 'SET_SCREEN_FROM_LIST'
      }
    )
  }
}
</script>

<style lang='stylus' scoped>
  @import '../../../common/style/variable.styl'
  .header
    display: flex
    justify-content: center
    height 4rem
    color: $theme-font-color
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
