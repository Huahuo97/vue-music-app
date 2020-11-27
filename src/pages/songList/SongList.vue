<template>
  <div v-show="!fullScreen">
    <keep-alive>
      <div class="song-list" v-show="!showCate">
        <base-header title="歌单广场" :routerBack="true"></base-header>
        <div class="title-class" ref="titleClass">
          <span class="item" data-index="0" @click="selectCat">全部</span>
          <span class="item" data-index="1" @click="selectCat">华语</span>
          <span class="item" data-index="2" @click="selectCat">流行</span>
          <span class="item iconfont" @click="setShowCate">&#xe631;更多</span>
        </div>
        <scroll class="wrapper" :data="playLists" :pullup="true" @scrollToEnd="getSongList">
          <div class="contain">
            <div class="title">
              <h1>{{this.cat}}</h1>
              <div class="order" >
                <span class="oandn" data-index="0" @click="selectOrder">最热</span>
                <span class="oandn" data-index="1" @click="selectOrder">最新</span>
              </div>
            </div>
            <song-lists :list="playLists"></song-lists>
            <up-loading></up-loading>
          </div>
        </scroll>
    </div>
    </keep-alive>
    <keep-alive>
      <div class="song-list-cate" v-show="showCate">
        <base-header title="全部分类" @back="cateBack"></base-header>
        <scroll class="wrapper" :data="playLists">
          <div class="contain" @click="setFromSearch">
            <div class="items" v-for="(items, index) of categroies" :key="index" @click="setNotShowCate">
              <h1 class="cate">{{getCate(index)}}</h1>
              <div class="item" @click="selectAllCat">
                <span class="cate-detail" v-for="(item, index) of items" :key="index" :data-index="index">{{item}}</span>
              </div>
            </div>
          </div>
        </scroll>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import BaseHeader from '../../components/header/Header'
import SongLists from '../../components/songLists/SongLists'
import Scroll from '../../components/scroll/Scroll'
import UpLoading from '../../components/loading/UpLoading'
import { getHotClassify, getSongListCat, getSongList } from '../../api/songlist'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'SongList',
  components: {
    BaseHeader,
    SongLists,
    Scroll,
    UpLoading
  },
  data () {
    return {
      limit: 18,
      offset: 0,
      order: '最热',
      cat: '全部',
      more: true,
      playLists: [],
      categroies: [],
      cate: {},
      showCate: false
    }
  },
  computed: {
    ...mapGetters(['fullScreen'])
  },
  methods: {
    cateBack () {
      this.showCate = false
    },
    setShowCate () {
      this.showCate = true
    },
    setNotShowCate () {
      this.showCate = false
      const titleClass = this.$refs.titleClass
      const length = titleClass.children.length
      for (let i = 0; i < length; i++) {
        titleClass.children[i].classList.remove('selected')
      }
    },
    setFromSearch () {
      this.setSongListFromSearch(false)
    },
    selectCat (e) {
      this.selectedStyle(e)
      this.cat = e.target.innerHTML
      this.getSongList(true)
    },
    selectAllCat (e) {
      const items = document.querySelectorAll('.cate-detail')
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('selected')
      }
      e.target.classList.add('selected')
      this.cat = e.target.innerHTML
      this.getSongList(true)
    },
    selectOrder (e) {
      this.selectedStyle(e)
      this.order = e.target.innerHTML
      this.getSongList(true)
    },
    selectedStyle (e) {
      const length = e.target.parentElement.children.length
      const parent = e.target.parentElement
      const index = e.target.dataset.index
      for (let i = 0; i < length; i++) {
        parent.children[i].classList.remove('selected')
      }
      parent.children[index].classList.add('selected')
    },
    getCate (index) {
      if (index === 0) {
        return this.cate[0]
      } else if (index === 1) {
        return this.cate[1]
      } else if (index === 2) {
        return this.cate[2]
      } else if (index === 3) {
        return this.cate[3]
      } else if (index === 4) {
        return this.cate[4]
      }
    },
    getHotClassify () {
      getHotClassify().then(res => {
        if (res) {
          console.log(res)
        }
      })
    },
    getSongListCat () {
      getSongListCat().then(res => {
        if (res) {
          this.cate = res.categories
          let tempArr = []
          const cateArr = []
          const cate = res.categories
          const cateSub = res.sub
          for (let i = 0; i < Object.keys(cate).length; i++) {
            cateSub.forEach(element => {
              if (element.category === i) {
                tempArr.push(element.name)
              }
            })
            cateArr.push(tempArr)
            tempArr = []
          }
          this.categroies = cateArr
        }
      })
    },
    getSongList (flag) {
      // 新品歌单的后台访问会出现more为false的问题
      const order = this.order === '最热' ? 'hot' : 'new'
      // if (!this.more) {
      //   return
      // }
      if (flag === true) {
        this.limit = 18
        this.offset = 0
        this.playLists = []
      } else {
        this.offset += 20
      }
      getSongList({
        order,
        cat: this.cat,
        limit: this.limit,
        offset: this.offset
      }).then(res => {
        if (res) {
          this.playLists = this.playLists.concat(res.playlists)
          this.more = res.more
        }
      })
    },
    ...mapMutations({ setSongListFromSearch: 'SET_SONG_LIST_FROM_SEARCH' })
  },
  mounted () {
    this.getSongList(true)
    this.getSongListCat()
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .song-list
    width 100%
    position relative
    .title-class
      width 100%
      height 3rem
      position absolute
      top 3rem
      left 0
      display flex
      .item
        flex 1
        text-align center
        line-height 3rem
        color $theme-font-color
        font-size $font-size-large-x
      .selected
        color $theme-color
    .wrapper
      position absolute
      top 6rem
      left 0
      width 100%
      height 44.75rem
      overflow hidden
      .contain
        width 100%
        .title
          display flex
          width 100%
          padding 0 1.2rem
          color $theme-font-color
          h1
            flex 1
          .order
            .oandn
              margin-left 0.5rem
              color $theme-font-color
              font-size $font-size-large
            .selected
              color $theme-color
  .song-list-cate
    width 100%
    position relative
    .wrapper
      width 100%
      position absolute
      top 3rem
      left 0
      height 47.75rem
      overflow hidden
      .contain
        width 100%
        margin-top 1.5rem
        .items
          width 100%
          padding 0 1.2rem
          margin-bottom 0.8rem
          .cate
            width 100%
            font-size $font-size-large-x
            color $theme-color
          .item
            width 100%
            font-size $font-size-large
            color $theme-font-color
            .cate-detail
              display inline-block
              width 25%
              height 2.5rem
              line-height 2.5rem
              text-align center
            .selected
              color: $theme-color
</style>
