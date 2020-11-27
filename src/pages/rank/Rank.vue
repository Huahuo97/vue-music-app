<template>
  <keep-alive>
    <div class="rank" v-show="!fullScreen">
      <base-header title="排行榜" :routerBack="true"></base-header>
      <scroll class="wrapper" :data="topList">
        <div class="contain">
          <top-list :list="topList"></top-list>
        </div>
      </scroll>
    </div>
  </keep-alive>
</template>

<script>
import BaseHeader from '../../components/header/Header'
import Scroll from '../../components/scroll/Scroll'
import TopList from '../../components/topList/TopList'
import { getTopListDetail } from '../../api/rank'
import { mapGetters } from 'vuex'
export default {
  name: 'Rank',
  components: {
    BaseHeader,
    Scroll,
    TopList
  },
  data () {
    return {
      topList: []
    }
  },
  computed: {
    ...mapGetters(['fullScreen'])
  },
  methods: {
    getTopListDetail () {
      getTopListDetail().then(res => {
        if (res) {
          this.topList = res.list
        }
      })
    }
  },
  mounted () {
    this.getTopListDetail()
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .rank
    position relative
    width 100%
    .wrapper
      position absolute
      top 3rem
      left 0
      height 47.75rem
      overflow hidden
      width 100%
</style>
