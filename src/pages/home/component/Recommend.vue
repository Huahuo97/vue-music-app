<template>
  <keep-alive>
    <scroll class="wrapper" :data="newSongList">
      <div class="recommend">
        <div class="bannner">
          <swiper :options="swiperOption" class="swiper">
            <swiper-slide class="item" v-for="(item, index) of banners" :key="index">
              <img :src="item.imageUrl">
            </swiper-slide>
          </swiper>
        </div>
        <div class="channel">
          <div class="items">
            <router-link class="item" :to="{ name: 'Radio' }">
              <span class="iconfont icon">&#xe636;</span>
              <span class="alt">电台</span>
            </router-link>
          </div>
          <div class="items">
            <router-link class="item" :to="{ name: 'SongList' }">
              <span class="iconfont icon">&#xe600;</span>
              <span class="alt">歌单</span>
            </router-link>
          </div>
          <div class="items">
            <router-link class="item" :to="{ name: 'Rank' }">
              <span class="iconfont icon">&#xe638;</span>
              <span class="alt">排行榜</span>
            </router-link>
          </div>
          <div class="items">
            <router-link class="item" :to="{ name: 'Singer' }">
              <span class="iconfont icon">&#xe604;</span>
              <span class="alt">歌手</span>
            </router-link>
          </div>
          <div class="items">
            <router-link class="item" to="/">
              <span class="iconfont icon">&#xe631;</span>
              <span class="alt">更多</span>
            </router-link>
          </div>
        </div>
        <div class="recommend-song-list">
          <div class="title">
            <h1>推荐歌单</h1>
            <span class="more" @click="toSonglist">更多</span>
          </div>
          <div class="main">
            <song-lists :list="showList"></song-lists>
          </div>
        </div>
        <div class="new-song">
          <div class="title">
            <h1>新歌速递</h1>
          </div>
          <div class="main">
            <single-song :list="newSongList"></single-song>
          </div>
        </div>
      </div>
    </scroll>
  </keep-alive>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import SongLists from '../../../components/songLists/SongLists'
import Scroll from '../../../components/scroll/Scroll.vue'
import SingleSong from '../../../components/singleSong/SingleSong'
import { getBanner } from '../../../api/banner'
import { getSongList } from '../../../api/songlist'
import { getNewSong, getSongsDetail } from '../../../api/song'
import 'swiper/swiper-bundle.css'
export default {
  name: 'Recommend',
  components: {
    Swiper,
    SwiperSlide,
    SongLists,
    Scroll,
    SingleSong
  },
  data () {
    return {
      type: 0,
      banners: [],
      limit: 6,
      offset: 0,
      showList: [],
      newSongList: [],
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: true,
        loop: true
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    toSonglist () {
      this.$router.push({ name: 'SongList' })
    },
    getBanner () {
      getBanner(this.type).then(res => {
        if (res) {
          this.banners = res.banners
        }
      })
    },
    getSongList () {
      getSongList({
        limit: this.limit,
        offset: this.offset
      }).then(res => {
        if (res) {
          this.showList = res.playlists
        }
      })
    },
    getNewSong () {
      getNewSong().then(res => {
        if (res) {
          const idArr = []
          const tempArr = res.result
          tempArr.forEach(element => {
            idArr.push(element.id)
          })
          this.getSongsDetail(idArr)
        }
      })
    },
    getSongsDetail (id) {
      getSongsDetail(id).then(res => {
        if (res) {
          this.newSongList = res
        }
      })
    }
  },
  mounted () {
    this.getBanner()
    this.getNewSong()
    this.getSongList()
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../common/style/variable.styl'
  .wrapper
    position absolute
    top 5rem
    left 0
    width 100%
    height 45.75rem
    overflow hidden
    .recommend
      width 100%
      .bannner
        width 100%
        .swiper
          width 100%
          .item
            width 100%
            height 10rem
            img
              width 100%
              height 100%
      .channel
        width 100%
        display flex
        margin-top 1rem
        .items
          flex 1
          .item
            display inline-block
            width 100%
            height 5rem
            .icon
              display block
              width 3rem
              height 3rem
              line-height 3rem
              text-align center
              margin 0 auto
            .iconfont
              font-size 2.5rem
              color $theme-color
            .alt
              display block
              height 2rem
              line-height 2rem
              text-align center
              margin 0 auto
              font-size 1rem
      .recommend-song-list
        width 100%
        margin-top 0.8rem
        .title
          width 100%
          height 2.5rem
          padding 0 1.2rem
          line-height 2.5rem
          display flex
          h1
            flex 1
            font-size $font-size-large-xl
            color $theme-color
          .more
            font-size $fong-size-large
            color $theme-font-color
      .new-song
        width 100%
        margin-top 0.8rem
        .title
          width 100%
          height 2.5rem
          line-height 2.5rem
          padding 0 1.2rem
          h1
            font-size $font-size-large-xl
            color $theme-color
        .main
          margin-top 0.8rem
</style>
