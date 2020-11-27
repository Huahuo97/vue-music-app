<template>
  <div class="singer" v-show="!fullScreen">
    <base-header title="热门歌手" @back="backHome"></base-header>
    <div class="main" @click="setFromSearch">
      <scroll class="wrapper" :data="hotSingers" :pullup="true" @scrollToEnd="getHotSingers">
        <div class="contain">
          <div class="classify">
            <router-link class="link" to="/singerCate"><span class="iconfont">&#xe604;</span>歌手分类</router-link>
          </div>
          <h1>热门歌手</h1>
          <singers-list :list="hotSingers"></singers-list>
          <up-loading></up-loading>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import BaseHeader from '../../components/header/Header'
import UpLoading from '../../components/loading/UpLoading'
import Scroll from '../../components/scroll/Scroll'
import SingersList from '../../components/singersList/SingersList'
import { getHotSingers } from '../../api/singer'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Singer',
  components: {
    BaseHeader,
    UpLoading,
    Scroll,
    SingersList
  },
  data () {
    return {
      limit: 10,
      offset: 0,
      hotSingers: [],
      more: true
    }
  },
  computed: {
    ...mapGetters(['fullScreen'])
  },
  methods: {
    backHome () {
      this.$router.back()
    },
    getHotSingers (flag) {
      if (!this.more) {
        return
      }
      if (flag === true) {
        this.limit = 10
        this.hotSingers = []
      } else {
        this.offset += 20
      }
      getHotSingers({
        limit: this.limit,
        offset: this.offset
      }).then(res => {
        if (res) {
          this.hotSingers = this.hotSingers.concat(res.artists)
          this.more = res.more
        }
      }).catch(err => {
        console.log(err)
      })
    },
    setFromSearch () {
      this.setSingerFromSearch(false)
    },
    ...mapMutations({ setSingerFromSearch: 'SET_SINGER_FROM_SEARCH' })
  },
  mounted () {
    this.getHotSingers(true)
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .singer
    width 100%
    position relative
    .main
      width 100%
      position absolute
      top 3rem
      left 0
      .wrapper
        width 100%
        height 47.75rem
        position absolute
        top 0
        left 0
        right 0
        overflow hidden
        .contain
          width 100%
          .classify
            width 100%
            height 3rem
            line-height 3rem
            text-align center
            .link
              display block
              height 3rem
              color $theme-color
              font-size $font-size-large-x
              border-bottom 1px solid #fff
              .iconfont
                font-size $font-size-large-x
          h1
            padding 0.8rem 1.2rem 0
            color $theme-font-color
</style>
