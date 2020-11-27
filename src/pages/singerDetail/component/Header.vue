<template>
    <div class="header">
        <span class="iconfont back" @click="goback">&#xe648;</span>
        <span class="name">{{name}}</span>
        <span class="iconfont more">&#xe61d;</span>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { searchType } from '../../../common/js/config'
export default {
  name: 'Header',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    searchType () {
      return searchType
    },
    ...mapGetters(['searchKeyWords', 'singerFromSearch'])
  },
  methods: {
    goback () {
      if (this.singerFromSearch === true) {
        this.$router.push({ name: 'SearchSingers', query: { keywords: this.searchKeyWords } })
        this.setSearchState(true)
      } else {
        this.$router.go(-1)
      }
    },
    ...mapMutations({
      setSearchState: 'SET_SEARCH_STATE'
    })
  }
}
</script>

<style lang="stylus" scoped>
  .header
    position absolute
    top 0
    left 0
    width 100%
    height 3rem
    background #000
    z-index 999
    .back
    .more
      position absolute
      top 0
      width 3rem
      height 3rem
      line-height 3rem
      text-align center
      color #fff
    .back
      left 0
    .name
      position absolute
      top 0
      left 4rem
      height 3rem
      line-height 3rem
      text-align center
      color #fff
      font-size 1.25rem
    .more
      right 0
    .iconfont
      font-size 1.35rem
</style>
