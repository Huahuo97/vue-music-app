<template>
  <div>
    <scroll class="wrapper" :data="songList">
      <div class="contain">
        <single-song :list="songList"></single-song>
        <up-loading></up-loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/scroll/Scroll'
import SingleSong from '../../../components/singleSong/SingleSong'
import UpLoading from '../../../components/loading/UpLoading'
import { searchType } from '../../../common/js/config'
import { searchByKey } from '../../../api/search'
import { getSongsDetail } from '../../../api/song'
export default {
  name: 'SearchSongs',
  components: {
    Scroll,
    SingleSong,
    UpLoading
  },
  data () {
    return {
      songList: [],
      limit: 30,
      offset: 0,
      type: searchType.song
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
        if (res && res.result && res.result.songs) {
          const tempSongs = res.result.songs
          const idArr = []
          tempSongs.forEach(element => {
            idArr.push(element.id)
          })
          this.getSongsDetail(idArr)
        }
      })
    },
    getSongsDetail (id) {
      getSongsDetail(id).then(res => {
        if (res) {
          this.songList = res
        }
      })
    }
  },
  mounted () {
    if (this.keywords) {
      this.searchByKey()
    }
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
    overflow hidden
    height 44.15rem
</style>
