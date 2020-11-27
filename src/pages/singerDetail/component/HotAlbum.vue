<template>
  <div class="hot-album">
    <scroll class="wrapper" :data="hotAlbum">
      <album-list :list="hotAlbum"></album-list>
    </scroll>
  </div>
</template>

<script>
import { getSingerAlbum } from '../../../api/singer'
import AlbumList from '../../../components/albumList/AlbumList'
import Scroll from '../../../components/scroll/Scroll'
export default {
  name: 'HotAlbum',
  components: {
    AlbumList,
    Scroll
  },
  data () {
    return {
      hotAlbum: []
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    getSingerAlbum () {
      getSingerAlbum(this.id).then(res => {
        if (res) {
          this.hotAlbum = res.hotAlbums
        }
      })
    }
  },
  mounted () {
    this.getSingerAlbum()
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../common/style/variable.styl'
  .hot-album
    width 100%
    .wrapper
      width 100%
      position absolute
      top 22rem
      left 0
      height 26rem
      overflow hidden
</style>
