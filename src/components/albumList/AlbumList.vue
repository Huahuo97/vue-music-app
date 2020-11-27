<template>
    <div class="album-list">
        <ul class="list">
            <li class="item" v-for="(item, index) in list" :key="index">
                <div class="item-img">
                    <img :src="item.picUrl">
                </div>
                <div class="info">
                    <p class="item-name">{{item.name}}</p>
                    <p class="detail">{{_formatTime(item.publishTime)}}  {{item.size}}首</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'AlbumList',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    _formatTime (time) {
      const date = new Date(time)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .album-list
    .list
      padding-top 1.2rem
      .item
        display flex
        height 5rem
        padding 0 1.2rem
        margin-bottom 0.8rem
        .item-img
          width 5rem
          height 5rem
          img
            width 100%
            height 100%
        .info
          flex 1
          height 100%
          .item-name
          .detail
            height 2.5rem
            line-height 2.5rem
            padding-left 0.8rem
            color $theme-font-color
          .item-name
            font-size 1.2rem
          .detail
            font-size 1rem
</style>
