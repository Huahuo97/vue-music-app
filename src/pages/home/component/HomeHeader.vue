<template>
    <div class="header">
        <div class="left" @click="setStyle">
            <router-link :to="{ name: 'Recommend' }" class="branch selected" data-index="0">推荐</router-link>
            <router-link :to="{ name: 'Mine' }" class="branch" data-index="1">我的</router-link>
        </div>
        <div class="right">
            <span class="iconfont">&#xe625;</span>
            <!-- 搜索 -->
            <span class="iconfont" @click="goSearch">&#xe623;</span>
            <span class="iconfont">&#xe622;</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  methods: {
    goSearch () {
      this.$router.push({
        path: '/search'
      })
    },
    setStyle (e) {
      const length = e.target.parentElement.children.length
      const parent = e.target.parentElement
      const index = e.target.dataset.index
      for (let i = 0; i < length; i++) {
        parent.children[i].classList.remove('selected')
      }
      parent.children[index].classList.add('selected')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../common/style/variable.styl'
  .header
    position fixed
    top 0
    left 0
    right 0
    width 100%
    .left
      position absolute
      top 0
      left 0.8rem
      height 5rem
      line-height 5rem
      .branch
        margin-right 0.8rem
      .selected
        color $theme-color
    .right
      position absolute
      top 0
      right 0.8rem
      height 5rem
      line-height 5rem
    .left
    .right
      font-size $font-size-large-xl
      color $theme-font-color
      .iconfont
        margin-left 0.8rem
        font-size $font-size-large-xl
</style>
