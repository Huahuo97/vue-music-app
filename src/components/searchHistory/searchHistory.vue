<template>
    <div class="search-history">
        <div class="header">
            <h1>历史搜索</h1>
            <span class="iconfont clear" @click="clear">&#xe60c;</span>
        </div>
        <div class="history-wrapper">
          <span v-for="(item, index) in historySearch" :key="index" @click="search" v-show="!historySearch.lenth">{{item.searchWord}}</span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'SearchHistory',
  data () {
    return {
      historySearch: []
    }
  },
  mounted () {
    this.historySearch = this.hisSearch
  },
  computed: {
    ...mapGetters(['hisSearch'])
  },
  methods: {
    clear () {
      this.clearHistorySearch()
    },
    search (e) {
      this.$emit('search', true)
      this.$router.push({ name: 'SearchSongs', query: { keywords: e.target.innerHTML } })
    },
    ...mapMutations(
      {
        clearHistorySearch: 'CLEAR_HISTORY_SEARCH'
      }
    )
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .search-history
    margin-top 1.2rem
    .header
      height 2rem
      line-height 2rem
      h1
        float left
        height 100%
        margin-left 1.2rem
        color $theme-font-color
      span
        float right
        width 1.5rem
        height 100%
        margin-right 0.8rem
      .iconfont
        font-size 1.5rem
    .history-wrapper
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
