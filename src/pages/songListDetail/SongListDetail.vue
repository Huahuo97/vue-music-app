<template>
  <keep-alive>
    <div class="song-list-detail" v-show="!fullScreen">
      <base-header title="歌单" @back="songListDetailBack"></base-header>
      <scroll class="wrapper" :data="songList">
        <div class="contain">
          <brief :data="playlist"></brief>
          <div class="song-list">
            <single-song :list="songList"></single-song>
          </div>
        </div>
      </scroll>
    </div>
  </keep-alive>
</template>

<script>
import BaseHeader from '../../components/header/Header'
import Scroll from '../../components/scroll/Scroll'
import Brief from './component/Brief'
import SingleSong from '../../components/singleSong/SingleSong'
import { getSongListDetail } from '../../api/songlist'
import { getSongsDetail } from '../../api/song'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'SongListDetail',
  components: {
    BaseHeader,
    Scroll,
    Brief,
    SingleSong
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    name () {
      return this.$route.params.name
    },
    ...mapGetters(['songListFromSearch', 'searchKeyWords', 'fullScreen'])
  },
  data () {
    return {
      playlist: {},
      songList: []
    }
  },
  methods: {
    songListDetailBack () {
      if (this.songListFromSearch === true) {
        this.$router.push({
          name: 'SearchSongLists',
          query: {
            keywords: this.searchKeyWords
          }
        })
        this.setSearchState(true)
      } else {
        this.$router.back()
      }
    },
    getSongListDetail () {
      getSongListDetail({
        id: this.id
      }).then(res => {
        if (res) {
          this.playlist = res.playlist
          const tempIds = res.playlist.trackIds
          const idsArr = []
          tempIds.forEach(element => {
            idsArr.push(element.id)
          })
          this.getSongsDetail(idsArr)
        }
      })
    },
    getSongsDetail (id) {
      getSongsDetail(id).then(res => {
        if (res) {
          this.songList = res
        }
      })
    },
    ...mapMutations({ setSearchState: 'SET_SEARCH_STATE' })
  },
  mounted () {
    this.getSongListDetail()
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .song-list-detail
    position relative
    width 100%
    .wrapper
      position absolute
      top 3rem
      left 0
      width 100%
      height 47.75rem
      overflow hidden
      .contain
        width 100%
        .song-list
          margin-top 1.8rem
</style>
