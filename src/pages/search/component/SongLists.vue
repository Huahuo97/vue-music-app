<template>
  <div>
    <scroll class="wrapper" :data="songsMenus">
      <div class="contain" @click="setFromSearch">
        <songs-menu :list="songsMenus" :creator="creators"></songs-menu>
        <up-loading></up-loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/scroll/Scroll'
import SongsMenu from '../../../components/songsMenu/SongsMenu'
import UpLoading from '../../../components/loading/UpLoading'
import { searchType } from '../../../common/js/config'
import { searchByKey } from '../../../api/search'
import { mapMutations } from 'vuex'
export default {
  name: 'SearchSongLists',
  components: {
    Scroll,
    SongsMenu,
    UpLoading
  },
  data () {
    return {
      songsMenus: [],
      creators: [],
      limit: 20,
      offset: 0,
      type: searchType.songlist
    }
  },
  computed: {
    keywords () {
      return this.$route.query.keywords
    }
  },
  methods: {
    searchByKey () {
      searchByKey({
        keywords: this.keywords,
        limit: this.limit,
        offset: this.offset,
        type: this.type
      }).then(res => {
        if (res && res.result && res.result.playlists) {
          const tempLists = res.result.playlists
          this.songsMenus = res.result.playlists
          tempLists.forEach(element => {
            this.creators.push(element.creator)
          })
        }
      })
    },
    setFromSearch () {
      this.setSongListFromSearch(true)
    },
    ...mapMutations({ setSongListFromSearch: 'SET_SONG_LIST_FROM_SEARCH' })
  },
  mounted () {
    this.searchByKey()
  },
  watch: {
    keywords (newvalue) {
      if (newvalue) {
        this.searchByKey()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../common/style/variable.styl'
  .wrapper
    position absolute
    top 8rem
    left 0
    right 0
    height 44.15rem
    overflow hidden
</style>
