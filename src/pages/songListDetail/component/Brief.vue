<template>
  <div class="brief">
    <div class="left">
      <img :src="data.coverImgUrl">
    </div>
    <div class="right">
      <p class="list-name">{{this.data.name}}</p>
      <div class="creator">
        <img :src="data.creator.avatarUrl"><span class="nick-name">{{this.data.creator.nickname}}</span>
      </div>
      <p class="tags">标签：<span v-for="(item, index) in data.tags" :key="index">{{item}}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Brief',
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../common/style/variable.styl'
  .brief
    display flex
    width 100%
    margin 0.8rem 0
    .left
      width 8rem
      height 8rem
      margin 0 0.8rem
      img
        width 100%
        height 100%
    .right
      position relative
      flex 1
      height 8rem
      color $theme-font-color
      overflow hidden
      margin-right 0.8rem
      .list-name
        width 100%
        font-size 1.25rem
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
      .creator
        width 100%
        margin-top 0.8rem
        img
          width 2rem
          height 2rem
          border-radius 50% 50%
          vertical-align middle
          .nick-name
            margin-left 0.5rem
            overflow: hidden
      .tags
        position absolute
        bottom 0
        margin-top 0.8rem
        font-size 1.05rem
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        span
          margin-right 0.5rem
          color $theme-color
</style>
