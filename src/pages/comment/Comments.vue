<template>
  <div class="comments">
    <comment-header></comment-header>
    <down-loading class="pulldown" v-show="ifPullDown"></down-loading>
    <scroll class="comment-wrapper" :data="comments" :pullup="true" :pulldown="true" @scrollToEnd="getSongComment" @scrollToHead="refresh">
      <div class="contain">
        <div class="song-info">
          <div class="album-img">
            <img :src="target.picUrl" width="100%" height="100%">
          </div>
          <div class="song">
            <p class="song-detail">{{target.singer}} - {{target.name}}</p>
            <p class="comment-total">评论 ({{total}})</p>
          </div>
        </div>
        <div class="hot-comments">
          <h1>推荐评论</h1>
          <ul>
            <li class="item" v-for="(item, index) of hotComments" :key="index">
              <div class="header">
                <div class="user-avatar">
                  <img :src="item.user.avatarUrl">
                </div>
                <div class="comment-detail">
                  <p class="user-name">{{item.user.nickname}}</p>
                  <p class="public-time">{{_formatTime(item.time, 'hot')}}</p>
                </div>
                <div class="more">
                  <span class="iconfont">&#xe61d;</span>
                </div>
              </div>
              <div class="content">
                <p class="comment">{{item.content}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="comments-list">
          <h1>最新评论</h1>
          <ul>
            <li class="item" v-for="(item, index) of comments" :key="index">
              <div class="header">
                <div class="user-avatar">
                  <img :src="item.user.avatarUrl">
                </div>
                <div class="comment-detail">
                  <p class="user-name">{{item.user.nickname}}</p>
                  <p class="public-time">{{_formatTime(item.time, 'new')}}</p>
                </div>
                <div class="more">
                  <span class="iconfont">&#xe61d;</span>
                </div>
              </div>
              <div class="content">
                <p class="comment">{{item.content}}</p>
              </div>
            </li>
          </ul>
        </div>
        <up-loading></up-loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import CommentHeader from './component/Header'
import Scroll from '../../components/scroll/Scroll'
import DownLoading from '../../components/loading/DownLoading'
import UpLoading from '../../components/loading/UpLoading'
import { getSongComment } from '../../api/comment'
export default {
  name: 'Comments',
  components: {
    CommentHeader,
    Scroll,
    DownLoading,
    UpLoading
  },
  data () {
    return {
      total: 0,
      limit: 20,
      offset: 0,
      more: true,
      moreHot: true,
      comments: [],
      hotComments: [],
      ifPullDown: false
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    type () {
      return this.$route.params.type
    },
    target () {
      return this.$route.query
    }
  },
  methods: {
    _formatTime (time, flag) {
      const date = new Date(time)
      const now = new Date(Date.now())
      const nowYear = now.getFullYear()
      const nowMonth = now.getMonth()
      const nowDate = now.getDate()
      const nowHour = now.getHours()
      const nowMin = now.getMinutes()
      const dateYear = date.getFullYear()
      const dateMonth = date.getMonth()
      const dateDate = date.getDate()
      let dateHour = date.getHours()
      let dateMin = date.getMinutes()
      if (flag === 'hot') {
        return `${dateYear}年${dateMonth + 1}月${dateDate}日`
      } else if (flag === 'new') {
        if (dateYear === nowYear) {
          if (dateMonth === nowMonth) {
            if (dateDate === nowDate) {
              if ((nowHour - dateHour) >= 1) {
                if (dateHour < 10) {
                  dateHour = '0' + dateHour
                }
                if (dateMin < 10) {
                  dateMin = '0' + dateMin
                }
                return `${dateHour}:${dateMin}`
              } else {
                const ago = Number(nowMin) - Number(dateMin)
                if (ago === 0) {
                  return '刚刚'
                } else {
                  return `${ago}分钟前`
                }
              }
            } else {
              return `${dateMonth + 1}月${dateDate}日`
            }
          } else {
            return `${dateMonth + 1}月${dateDate}日`
          }
        } else {
          return `${dateYear}年${dateMonth + 1}月${dateDate}日`
        }
      }
    },
    refresh () {
      this.ifPullDown = true
      setTimeout(() => {
        this.ifPullDown = false
      }, 500)
      this.getSongComment(true)
    },
    getSongComment (flag) {
      if (!this.more) {
        return
      }
      if (flag) {
        this.offset = 0
        this.comments = []
      } else {
        this.offset += 20
      }
      getSongComment({
        type: this.type,
        id: this.id,
        limit: this.limit,
        offset: this.offset
      }).then(res => {
        if (res) {
          this.total = res.total
          this.comments = this.comments.concat(res.comments)
          if (flag) this.hotComments = res.hotComments
          this.moreHot = res.moreHot
          this.more = res.more
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    document.querySelector('.player').style.display = 'none'
    this.getSongComment(true)
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  .comments
    position relative
    .pulldown
      position absolute
      top 4rem
      left 0
    .comment-wrapper
      height 46.75rem
      position absolute
      left 0
      top 4rem
      .contain
        overflow hidden
        .song-info
          display flex
          width 100%
          height 6rem
          padding 0 1.2rem
          .album-img
            width 20%
            padding 1rem 0
            img
              width 4rem
              height 4rem
              border-radius 0.5rem 0.5rem
          .song
            width 80%
            margin-left 0.8rem
            line-height 3rem
            color $theme-font-color
            .song-detail
              width 100%
              height  50%
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
            .comment-total
              height 50%
        .hot-comments
        .comments-list
          width 100%
          padding 0 1rem
          h1
          ul
            width 100%
          h1
            margin-bottom 1rem
          .item
            width 100%
            margin-bottom 1.2rem
            .header
              display flex
              align-content center
              margin-bottom 0.5rem
              .user-avatar
                width 2rem
                height 2rem
                img
                  width 100%
                  height 100%
                  border-radius 50% 50%
              .comment-detail
                flex 1
                margin 0 0.8rem
                color $theme-font-color
                .user-name
                  font-size $font-size-large
                  color $theme-color
                  margin-bottom 0.5rem
                .public-time
                  font-size $font-size-middle
              .more
                width 2rem
                height 2rem
                line-height 2rem
                text-align right
          .content
            padding-left 2.8rem
            .comment
              font-size $font-size-large-x
              color $theme-font-color
</style>
