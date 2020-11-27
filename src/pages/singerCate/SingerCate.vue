<template>
  <keep-alive>
    <div class="category" v-show="!fullScreen">
        <base-header title="歌手分类" @back="cateBack"></base-header>
        <scroll class="wrapper" :data="hotSingerList" :pullup="true" @scrollToEnd="getSingerList">
          <div class="contain">
            <div class="filter" @click="filter">
                <div class="areas" @click="selectArea">
                  <span class="area" :data-area="areaList.china" data-index='0'>华语</span>
                  <span class="area" :data-area="areaList.occident" data-index='1'>欧美</span>
                  <span class="area" :data-area="areaList.japan" data-index='2'>日本</span>
                  <span class="area" :data-area="areaList.korea" data-index='3'>韩国</span>
                  <span class="area" :data-area="areaList.other" data-index='4'>其他</span>
                </div>
                <div class="types" @click="selectType">
                  <span class="type" :data-type="typeList.male" data-index='0'>男</span>
                  <span class="type" :data-type="typeList.female" data-index='1'>女</span>
                  <span class="type" :data-type="typeList.band" data-index='2'>乐队/组合</span>
                </div>
                <div class="show" @click.stop="setShowSelect">
                  <span class="iconfont show-box" v-html="selectIcon">筛选</span>
                </div>
            </div>
            <div class="initials" v-show="showSelect" @click="initialsF">
              <div class="initial" @click="selectInit">
                <span v-for="(item, index) of selectInitial" :key="index" class="item" :data-initial="item" :data-index="index">{{item}}</span>
              </div>
            </div>
            <div class="hot-singer">
                <h1 class="title" v-html="title"></h1>
                <singers-list :list="hotSingerList"></singers-list>
                <up-loading></up-loading>
            </div>
          </div>
        </scroll>
    </div>
  </keep-alive>
</template>

<script>
import BaseHeader from '../../components/header/Header'
import Scroll from '../../components/scroll/Scroll'
import UpLoading from '../../components/loading/UpLoading'
import SingersList from '../../components/singersList/SingersList'
import { singerType, singerArea } from '../../common/js/config'
import { getSingerList } from '../../api/singer'
import { mapGetters } from 'vuex'
export default {
  name: 'SingerCate',
  components: {
    BaseHeader,
    Scroll,
    SingersList,
    UpLoading
  },
  data () {
    return {
      limit: 10,
      offset: 0,
      // # 代表热门歌手
      initial: '#',
      type: singerType.all,
      area: singerArea.all,
      typeList: singerType,
      areaList: singerArea,
      more: true,
      hotSingerList: [],
      showSelect: false,
      selectInitial: ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    }
  },
  computed: {
    selectIcon () {
      return this.showSelect === true ? '&#xe634;筛选' : '&#xe632;筛选'
    },
    title () {
      if (this.initial === '#') {
        return '热门歌手'
      } else {
        return this.initial
      }
    },
    ...mapGetters(['fullScreen'])
  },
  methods: {
    cateBack () {
      this.$router.back()
    },
    setShowSelect () {
      this.showSelect = !this.showSelect
    },
    selectArea (e) {
      this.selectChangeStyle(e)
      this.area = e.target.dataset.area
    },
    selectType (e) {
      this.selectChangeStyle(e)
      this.type = e.target.dataset.type
    },
    selectInit (e) {
      this.selectChangeStyle(e)
      this.initial = e.target.dataset.initial
    },
    selectChangeStyle (e) {
      const length = e.target.parentElement.children.length
      const parent = e.target.parentElement
      const index = e.target.dataset.index
      for (let i = 0; i < length; i++) {
        parent.children[i].classList.remove('selected')
      }
      parent.children[index].classList.add('selected')
    },
    filter () {
      this.getSingerList(true)
    },
    initialsF () {
      this.getSingerList(true)
      this.showSelect = false
    },
    getSingerList (flag) {
      if (!this.more) {
        return
      }
      if (flag === true) {
        this.limit = 10
        this.offset = 0
        this.hotSingerList = []
      } else {
        this.offset += 20
      }
      const initial = this.initial === '#' ? '-1' : this.initial
      getSingerList({
        type: this.type,
        area: this.area,
        initial,
        limit: this.limit,
        offset: this.offset
      }).then(res => {
        if (res) {
          this.hotSingerList = this.hotSingerList.concat(res.artists)
          this.more = res.more
        }
      })
    }
  },
  mounted () {
    this.getSingerList(true)
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .category
    width 100%
    position relative
    .wrapper
      position absolute
      top 3rem
      left 0
      width 100%
      height 47.75rem
      overflow hidden
      .contain
        width 100%
        .filter
          position relative
          width 100%
          padding 0 1.2rem
          font-size $font-size-large-x
          color $theme-font-color
          .areas
          .types
            width 100%
            height 2rem
            line-height 2rem
            .selected
              color $theme-color
          .areas
            .area
              margin-right 1rem
          .types
            .type
              margin-right 1rem
          .show
            position absolute
            top 1rem
            right 1rem
            .show-box
              display inline-block
              height 2rem
              line-height 2rem
              font-size 1.2rem
        .initials
          width 100%
          .initial
            width 100%
            height 6.2rem
            padding 0 1.2rem
            font-size $font-size-large-x
            color $theme-font-color
            .item
              float left
              margin 0.5rem
            .selected
              color $theme-color
        .hot-singer
          margin-top 1rem
          .title
            padding 0 1.2rem
            color $theme-font-color
</style>
