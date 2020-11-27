<template>
  <div>
    <div class="search-header">
        <div class="search-box">
            <span class="microphone iconfont">&#xe60b;</span>
            <input type="text" @keyup.enter="search" v-model="keywords" ref="searchInput" v-focus>
            <span class="clear iconfont" @click="clear">&#xe60c;</span>
        </div>
        <div class="cancel" @click="goback">
            <a href="javascript:;">取消</a>
        </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'SearchInput',
  data () {
    return {
      keywords: ''
    }
  },
  methods: {
    clear () {
      if (!this.keywords) return
      this.keywords = ''
      this.$refs.searchInput.focus()
    },
    search () {
      const searchWord = this.keywords.trim()
      if (!this.keywords) return
      this.$emit('search', searchWord)
      this.setHistorySearch({ searchWord })
      this.setSearchKeyWords(searchWord)
    },
    goback () {
      this.$router.push('/')
    },
    ...mapMutations(
      {
        setHistorySearch: 'SET_HISTORY_SEARCH',
        setSearchKeyWords: 'SET_SEARCH_KEY_WORDS'
      }
    )
  },
  // 自定义指令
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .search-header
    display flex
    position relative
    height 1.8rem
    margin-top 0.8rem
    font-size $font-size-large
    .search-box
      position relative
      flex 1
      height 100%
      padding 0 0.6rem
      input
        width 100%
        height 100%
        padding-left 2.8rem
        border-radius 1rem
        background-color $theme-bgcolor-level1
        color $theme-font-color
        font-size $font-size-large-x
      .microphone
        position absolute
        left 0
        top 0
        display inline-block
        width 1.8rem
        height 1.8rem
        line-height 1.8rem
        text-align center
        margin-left 1.4rem
      .clear
        cursor pointer
        position absolute
        right 0
        top 0
        display inline-block
        width 1.8rem
        height 1.8rem
        line-height 1.8rem
        text-align center
        margin-right 0.8rem
      .iconfont
        font-size 1.5rem
    .cancel
      height 100%
      padding 0.36rem 0.6rem
      margin-right 0.36rem

</style>
