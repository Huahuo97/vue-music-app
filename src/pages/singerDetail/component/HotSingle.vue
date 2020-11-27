<template>
  <div class="hot-single">
    <scroll class="wrapper" :data="songList">
      <single-song :list="songList"></single-song>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/scroll/Scroll'
import { getSingerSingle } from '../../../api/singer'
import { getSongsDetail } from '../../../api/song'
import SingleSong from '../../../components/singleSong/SingleSong'
export default {
  name: 'HotSingle',
  components: {
    SingleSong,
    Scroll
  },
  data () {
    return {
      hotSingle: [],
      songList: []
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    getSingerSingle () {
      getSingerSingle(this.id).then(res => {
        if (res) {
          const idArr = []
          this.hotSingle = res.hotSongs
          this.hotSingle.forEach(element => {
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
    this.getSingerSingle()
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../common/style/variable.styl'
  .hot-single
    width 100%
    .wrapper
      width 100%
      position absolute
      top 22rem
      left 0
      height 26rem
      overflow hidden
</style>
