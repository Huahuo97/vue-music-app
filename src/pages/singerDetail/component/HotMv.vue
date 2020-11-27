<template>
  <div class="hot-mv">
    <scroll class="wrapper" :data="hotMv">
      <mvs-list :list="hotMv"></mvs-list>
    </scroll>
  </div>
</template>

<script>
import { getSingerMv } from '../../../api/singer'
import MvsList from '../../../components/singerMvs/MvsList'
import Scroll from '../../../components/scroll/Scroll'
export default {
  name: 'HotMv',
  components: {
    MvsList,
    Scroll
  },
  data () {
    return {
      hotMv: []
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    getSingerMv () {
      getSingerMv(this.id).then(res => {
        if (res) {
          this.hotMv = res.mvs
        }
      })
    }
  },
  mounted () {
    this.getSingerMv()
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../common/style/variable.styl'
  .hot-mv
    width 100%
    .wrapper
      width 100%
      position absolute
      top 22rem
      left 0
      height 26rem
      overflow hidden
</style>
