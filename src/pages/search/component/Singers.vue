<template>
  <div>
    <scroll class="wrapper" :data="singersList">
      <div class="contain"  @click="setFromSearch">
        <singers-list :list="singersList"></singers-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/scroll/Scroll'
import SingersList from '../../../components/singersList/SingersList'
import { searchType } from '../../../common/js/config'
import { searchByKey } from '../../../api/search'
import { mapMutations } from 'vuex'
export default {
  name: 'SearchSingers',
  components: {
    Scroll,
    SingersList
  },
  data () {
    return {
      singersList: [],
      limit: 20,
      offset: 0,
      type: searchType.singer
    }
  },
  computed: {
    keywords () {
      return this.$route.query.keywords
    }
  },
  methods: {
    searchByKey () {
      searchByKey({
        keywords: this.keywords,
        limit: this.limit,
        offset: this.offset,
        type: this.type
      }).then(res => {
        if (res && res.result && res.result.artists) {
          this.singersList = res.result.artists
        }
      })
    },
    setFromSearch () {
      this.setSingerFromSearch(true)
    },
    ...mapMutations({ setSingerFromSearch: 'SET_SINGER_FROM_SEARCH' })
  },
  mounted () {
    this.searchByKey()
  },
  watch: {
    keywords (newvalue) {
      if (newvalue) {
        this.searchByKey()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../common/style/variable.styl'
  .wrapper
    position absolute
    top 8rem
    left 0
    right 0
    overflow hidden
    height 44.15rem
</style>
