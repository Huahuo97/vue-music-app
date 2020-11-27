<template>
  <keep-alive>
    <div class="container" v-show="!screenFromList">
        <search-input @search="search"></search-input>
        <search-history v-show="!searchState" @search="setState"></search-history>
        <search-hot v-show="!searchState" @search="setState"></search-hot>
        <search-class v-show="searchState"></search-class>
        <div class="result" v-show="searchState">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </div>
    </div>
  </keep-alive>
</template>

<script>
import SearchInput from '../../components/searchInput/SearchInput'
import SearchHistory from '../../components/searchHistory/searchHistory'
import SearchHot from '../../components/searchHot/searchHot'
import SearchClass from '../../components/searchClass/searchClass'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Search',
  components: {
    SearchInput,
    SearchHistory,
    SearchHot,
    SearchClass
  },
  computed: {
    type () {
      return this.$route.path.split('/')[2] || 1
    },
    ...mapGetters([
      'searchState',
      'playingState',
      'currentSong',
      'fullScreen',
      'screenFromList'
    ])
  },
  methods: {
    search (keywords) {
      this.$router.push(`/search/${this.type}?keywords=${keywords}`)
      if (!this.searchState) {
        this.setSearchState(true)
      }
    },
    setState (flag) {
      this.setSearchState(flag)
    },
    ...mapMutations(
      { setSearchState: 'SET_SEARCH_STATE' }
    )
  },
  beforeRouteLeave (to, from, next) {
    this.setSearchState(false)
    next()
  }
}
</script>

<style lang="stylus" scoped>

</style>
