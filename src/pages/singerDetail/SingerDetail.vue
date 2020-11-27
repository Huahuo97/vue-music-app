<template>
  <div class="singer-detail" v-show="!screenFromList">
    <base-header :name="name"></base-header>
    <div class="main">
      <div class="singer-img">
        <img :src="artist.img1v1Url">
      </div>
      <div class="detail-class">
        <router-link :to="{ name: 'HomePage'}" class="item">主页</router-link>
        <router-link :to="{ name: 'HotSingle'}" class="item">单曲</router-link>
        <router-link :to="{ name: 'HotAlbum'}" class="item">专辑</router-link>
        <router-link :to="{ name: 'HotMv'}" class="item">MV</router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import BaseHeader from './component/Header'
import { getSingerSingle } from '../../api/singer'
import { mapGetters } from 'vuex'
export default {
  name: 'SingerDetail',
  components: {
    BaseHeader
  },
  data () {
    return {
      singleSongs: [],
      artist: {},
      empty: []
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    name () {
      return this.$route.params.name
    },
    ...mapGetters(['screenFromList'])
  },
  methods: {
    getSingerDetail () {
      getSingerSingle(this.id).then(res => {
        this.artist = res.artist
        this.singleSongs = res.hotSongs
      })
    }
  },
  mounted () {
    this.getSingerDetail()
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .singer-detail
    width 100%
    position relative
    .main
      width 100%
      position absolute
      top 3rem
      left 0
      .singer-img
        width 100%
        height 18.75rem
        overflow hidden
        img
          width 100%
      .detail-class
        width 100%
        height 3rem
        display flex
        .item
          flex 1
          font-size $font-size-large-x
          text-align center
          line-height 3rem
</style>
