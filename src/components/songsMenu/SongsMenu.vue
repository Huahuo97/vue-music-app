<template>
    <div class="search-songslist">
        <ul class="songs-list">
            <li class="item" v-for="(item, index) in list" :key="index" @click="goSongListDetail(item.id, item.name)">
                <div class="list-img">
                    <img :src="item.coverImgUrl">
                </div>
                <div class="info">
                    <p class="list-name">{{item.name}}</p>
                    <p class="detail">{{item.trackCount}}首音乐 by {{item.creator.nickname}} , 播放 {{_formatCount(item.playCount)}}次</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'SongsMenu',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    creator: {
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
        tempCount = (count / 1000).toFixed(1)
        return `${tempCount}万`
      } else {
        tempCount = count
        return `${tempCount}`
      }
    },
    goSongListDetail (id, name) {
      this.$router.push({
        path: `/songListDetail/${id}/${name}`
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .search-songslist
    .songs-list
      .item
        display flex
        height 5rem
        padding 0 1.2rem
        margin-bottom 0.8rem
        .list-img
          width 3rem
          height 3rem
          margin 0.8rem 0
          img
            width 100%
            height 100%
        .info
          flex 1
          height 100%
          .list-name
            height 2.5rem
            line-height 2.5rem
            padding-left 0.3rem
            font-size 1rem
            color $theme-font-color
            overflow hidden
          .detail
            height 2.5rem
            padding-left 0.3rem
            font-size 0.7rem
            color $theme-font-color
</style>
