<template>
    <div class="search-singerslist">
        <ul class="singers-list">
            <li class="item" v-for="(item, index) in list" :key="index" @click="goSingerDetail(item.id, item.name)">
                <div class="singer-img">
                    <img :src="item.img1v1Url">
                </div>
                <div class="info">
                    <p class="singer-name">{{item.name}}<span v-if="item.alia">({{item.alia[0]}})</span></p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'SingersList',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    goSingerDetail (id, name) {
      this.$router.push({
        path: `/singerDetail/${id}/${name}`
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .search-singerslist
    .singers-list
      .item
        display flex
        height 5rem
        padding 0 1.2rem
        margin-bottom 0.8rem
        .singer-img
          width 3rem
          height 3rem
          margin 1rem 0
          img
            width 100%
            height 100%
            border-radius 50% 50%
        .info
          flex 1
          height 100%
          line-height 5rem
          .singer-name
            padding-left 1rem
            font-size $font-size-large-x
            color $theme-font-color
</style>
