<template>
  <div class="home-page">
    <scroll class="wrapper" :data="introduction">
      <div class="contain">
        <div class="header">
          <h1>基本信息</h1>
        </div>
        <div class="info">
          <p class="item name">昵称：<span style="color: #009af3">{{artist.name}}</span></p>
          <p class="item brief">简介: {{briefDesc}}</p>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/scroll/Scroll'
import { getArtistDesc, getSingerSingle } from '../../../api/singer'
export default {
  name: 'HomePage',
  components: {
    Scroll
  },
  data () {
    return {
      briefDesc: '',
      introduction: [],
      artist: {}
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    getArtistDesc () {
      getArtistDesc(this.id).then(res => {
        if (res) {
          this.briefDesc = res.briefDesc
          this.introduction = res.introduction
        }
      })
      getSingerSingle(this.id).then(res => {
        if (res) {
          this.artist = res.artist
        }
      })
    }
  },
  mounted () {
    this.getArtistDesc()
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../common/style/variable.styl'
  .home-page
    width 100%
    color $theme-font-color
    .wrapper
      width 100%
      height 26rem
      position absolute
      top 22rem
      left 0
      padding 0 0.8rem
      overflow hidden
      .contain
        width 100%
        .header
          width 100%
          margin-bottom 0.3rem
        .info
          width 100%
          .item
            margin-bottom 0.2rem
          .name
          .brief
            font-size 1.25rem
            line-height 2rem
</style>
