<template>
    <div class="search-mvslist">
        <ul class="mvs-list">
            <li class="item" v-for="(item, index) in list" :key="index">
                <div class="mv-covers">
                    <img :src="item.imgurl">
                    <span class="iconfont covers">&#xe607;{{_formatCount(item.playCount)}}</span>
                </div>
                <div class="info">
                    <p class="mv-name">{{item.name}}</p>
                    <p class="detail">{{_formatTime(item.duration)}},  {{item.artistName}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'SingerMvsList',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    _formatCount (count) {
      let tempCount = 0
      if (count >= 10e4) {
        tempCount = (count / 10000).toFixed(0)
        return `${tempCount}万`
      } else {
        tempCount = count
        return `${tempCount}`
      }
    },
    _formatTime (time) {
      time = Math.floor((time / 1000))
      let minute = parseInt(time / 60)
      let second = parseInt(time % 60)
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      return `${minute}:${second}`
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .search-mvslist
    .mvs-list
      .item
        display flex
        height 5rem
        padding 0 1.2rem
        margin-bottom 0.8rem
        .mv-covers
          position relative
          width 7rem
          height 5rem
          img
            width 100%
            height 100%
          .covers
            position absolute
            top 0
            right 0.2rem
            font-size $font-size-large
            color $theme-font-color
        .info
          position relative
          flex 1
          height 100%
          .mv-name
          .detail
            position absolute
            margin-left 0.3rem
            color $theme-font-color
          .mv-name
            top 0.2rem
            font-size 1.2rem
          .detail
            bottom 0.2rem
            font-size 0.7rem
</style>
