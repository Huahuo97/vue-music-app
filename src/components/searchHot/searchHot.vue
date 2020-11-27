<template>
    <div class="search-hot">
        <div class="header">
            <h1>热门推荐</h1>
        </div>
        <div class="recommend-wrapper">
            <span v-for="(item, index) in hotList" :key="index" @click="search">{{item.first}}</span>
        </div>
    </div>
</template>

<script>
import { searchHotList } from '../../api/search'
export default {
  name: 'SearchHot',
  data () {
    return {
      hotList: []
    }
  },
  methods: {
    search (e) {
      this.$emit('search', true)
      this.$router.push({ name: 'SearchSongs', query: { keywords: e.target.innerHTML } })
    },
    searchHotList () {
      searchHotList().then(res => {
        if (res && res.result) {
          this.hotList = res.result.hots
        }
      })
    }
  },
  mounted () {
    this.searchHotList()
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .search-hot
    margin-top 1.2rem
    .header
      height 2rem
      line-height 2rem
      h1
        float left
        height 100%
        margin-left 1.2rem
        color $theme-font-color
    .recommend-wrapper
      margin 1.2rem
      span
        display inline-block
        height 1.5rem
        line-height 1.5rem
        text-align center
        padding 0 0.6rem
        margin 0.6rem 0.2rem
        font-size $font-size-large
        color $theme-font-color
        background-color $theme-bgcolor-level1
        border-radius 0.6rem
</style>
