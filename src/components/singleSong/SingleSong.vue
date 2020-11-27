<template>
    <div class="search-songslist">
        <ul class="songs-list">
            <li class="item" v-for="(item, index) in list" :key="item.id" @click="selectItem(item, index)">
                <div class="index">
                    <span>{{index+1}}</span>
                </div>
                <div class="info">
                    <p class="song-name">{{item.name}}<span v-if="item.alia">({{item.alia}})</span></p>
                    <p class="song-detail">{{item.singers}}-{{item.album}}</p>
                </div>
                <div class="operate">
                    <span class="iconfont">&#xe61d;</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SingleSong',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    selectItem (item, index) {
      this.selectPlay(
        {
          list: this.list,
          index
        }
      )
    },
    ...mapActions(['selectPlay'])
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .search-songslist
    .songs-list
      .item
        position relative
        height 3rem
        padding 0 1.2rem
        margin-bottom 0.8rem
        .index
        .operate
          position absolute
          width 1.2rem
          height 1.2rem
          line-height 1.2rem
          text-align center
          margin 0.85rem 0.85rem 0.5rem
          color $theme-font-color
          font-size $font-size-large
        .index
          top 0
          left 0
        .operate
          top 0
          right 0
        .info
          height 100%
          margin 0 1.2rem
          .song-name
            height 60%
            font-size $font-size-large-x
            color $song-name-color
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
          .song-detail
            height 40%
            font-size $font-size-middle
            color $song-detail-color
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
</style>
