<template>
    <div class="search-class">
        <span class="tab">
            <router-link :to="{name: 'SearchSongs', query:{'keywords': this.searchKeyWords}}">单曲</router-link>
        </span>
        <span class="tab">
            <router-link :to="{name: 'SearchSingers', query:{'keywords': this.searchKeyWords}}">歌手</router-link>
        </span>
        <span class="tab">
            <router-link :to="{name: 'SearchSongLists', query:{'keywords': this.searchKeyWords}}">歌单</router-link>
        </span>
        <span class="tab">
            <router-link :to="{name: 'SearchMVs', query:{'keywords': this.searchKeyWords}}">MV</router-link>
        </span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SearchClass',
  computed: {
    ...mapGetters(['searchKeyWords'])
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .search-class
    display flex
    height 2rem
    line-height 2rem
    margin-top 2rem
    margin-bottom 1.2rem
    .tab
      height 100%
      flex 1
      text-align center
      font-size $font-size-large-x
</style>
