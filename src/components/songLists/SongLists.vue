<template>
  <div class="lists">
    <ul class="items">
      <li class="item" v-for="(item, index) of list" :key="index" @click="goSongListDetail(item.id, item.name)">
        <div class="cover">
          <img :src="item.coverImgUrl">
          <span class="count iconfont">&#xe607;{{_formatCount(item.playCount)}}</span>
        </div>
        <p class="desc">{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SongLists',
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
      if (count >= 1e5) {
        count = parseInt(count / 1e4)
        return `${count}万`
      } else {
        return `${count}`
      }
    },
    goSongListDetail (id, name, picUrl, avaUrl) {
      this.$router.push({
        path: `/songListDetail/${id}/${name}`
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .lists
    width 100%
    .items
      width 100%
      padding 0 1.2rem
      .item
        display inline-block
        width 7rem
        margin 0.75rem 0
        .cover
          position relative
          width 6.5rem
          height 6.5rem
          margin 0 0.25rem
          img
            width 100%
            height 100%
          .count
            position absolute
            top 0
            right 0
            color $theme-font-color
        .desc
          width 6.5rem
          height 2.625rem
          margin 0 0.25rem
          font-size 1rem
          color $theme-font-color
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
          text-overflow ellipsis
          overflow hidden
</style>
