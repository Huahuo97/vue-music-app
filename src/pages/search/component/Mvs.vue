<template>
  <div>
    <scroll class="wrapper" :data="mvLists">
      <div class="contain">
        <mvs-list :list="mvLists"></mvs-list>
        <up-loading></up-loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/scroll/Scroll'
import MvsList from '../../../components/mvsList/MvsList'
import UpLoading from '../../../components/loading/UpLoading'
import { searchType } from '../../../common/js/config'
import { searchByKey } from '../../../api/search'
export default {
  name: 'SearchMVs',
  components: {
    Scroll,
    MvsList,
    UpLoading
  },
  data () {
    return {
      mvLists: [],
      limit: 20,
      offset: 0,
      type: searchType.mv
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
        if (res && res.result && res.result.mvs) {
          this.mvLists = res.result.mvs
        }
      })
    }
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
    height 44.15rem
    overflow hidden
</style>
