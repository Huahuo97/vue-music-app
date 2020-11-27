<template>
  <div class="player" v-show="(playingSongList.length > 0)">
    <div class="normal-player" v-show="fullScreen">
      <play-header></play-header>
      <div class="play-container">
          <div class="play-background">
              <img width="100%" height="100%" :src="currentSong.picUrl">
          </div>
          <div class="center-wrapper" @click="setFullShowLyric" v-show="!fullShowLyric">
            <div class="special-img">
              <img width="100%" :src="currentSong.picUrl">
            </div>
            <div class="play-song">
              <div class="songTitle">{{currentSong.name}}</div>
              <div class="songSinger">{{currentSong.singers}}</div>
              <div class="lyric">{{playingLyric}}</div>
            </div>
          </div>
          <div class="full-lyric" @click="setFullShowLyric" v-show="fullShowLyric">
            <keep-alive>
              <scroll class="lyric" ref="lyricList" :data="currentLyric && currentLyricLines">
              <div>
                <div class="lyric-wrapper">
                  <p
                    class="lyric-text"
                    ref="lyricLine"
                    :class="{ current: currentLyricLine === index }"
                    v-for="(item, index) in currentLyricLines"
                    :key="index"
                  >{{item.txt}}</p>
                </div>
              </div>
              </scroll>
            </keep-alive>
          </div>
          <div class="play-bottom">
              <div class="option-wrapper">
                  <div class="favorites iconfont">&#xe62b;</div>
                  <div class="comments iconfont" @click="goToComments">&#xe613;</div>
                  <div class="mores iconfont">&#xe61d;</div>
              </div>
              <div class="progress-wrapper">
                  <span class="time-l">{{format(currentTime)}}</span>
                  <div class="progress-bar">
                    <progress-bar :percent="percent" @percentChange="onPercentChange"></progress-bar>
                  </div>
                  <span class="time-r">{{format(currentSong.duration/1000)}}</span>
              </div>
              <div class="playicon-wrapper">
                  <span class="iconfont mode" v-html="modeChangeIcon" @click="changePlayMode"></span>
                  <span class="iconfont pre" @click="prev">&#xe66e;</span>
                  <span class="iconfont toggle" @click="toggleReady" v-html="togglePlayIconNormal"></span>
                  <span class="iconfont next" @click="next">&#xe66f;</span>
                  <span class="iconfont more">&#xe622;</span>
              </div>
          </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen" @click="showNormalPlayer">
      <div class="album-img-mini" :class="cdPlays">
        <img :src="currentSong.picUrl">
      </div>
      <div class="play-song-mini">
        <p class="song-name">{{currentSong.name}}</p>
        <p class="song-singer">{{currentSong.singers}}</p>
      </div>
      <div class="playicon-mini">
        <span class="iconfont toggle-mini" @click.stop="toggleReady" v-html="togglePlayIconMini"></span>
        <span class="iconfont next-mini" @click.stop="next">&#xe60e;</span>
      </div>
    </div>
    <audio
     :src="currentSong.url"
     ref="audio"
     @canplay="ready"
     @error="error"
     @timeupdate="updateTime"
     @ended="ended"
    ></audio>
  </div>
</template>

<script>
import PlayHeader from './component/Header'
import ProgressBar from '../../components/progressBar/ProgressBar'
import Scroll from '../../components/scroll/Scroll'
import { mapGetters, mapMutations } from 'vuex'
import { playMode } from '../../common/js/config'
import Lyric from 'lyric-parser'
export default {
  data () {
    return {
      currentTime: 0,
      songReady: false,
      currentLyric: null,
      currentLyricLines: [],
      playingLyric: '',
      fullShowLyric: false,
      currentLyricLine: 0
    }
  },
  components: {
    PlayHeader,
    ProgressBar,
    Scroll
  },
  computed: {
    cdPlays () {
      return this.playingState ? 'play' : 'pause'
    },
    togglePlayIconNormal () {
      return this.playingState ? '&#xe6b2;' : '&#xe6b0;'
    },
    togglePlayIconMini () {
      return this.playingState ? '&#xe611;' : '&#xe607;'
    },
    modeChangeIcon () {
      return this.playingMode === playMode.singleLoop ? '&#xe610;' : this.playingMode === playMode.listLoop ? '&#xe612;' : '&#xe60f;'
    },
    percent () {
      return this.currentTime / (this.currentSong.duration / 1000)
    },
    ...mapGetters([
      'playingState',
      'playingSongList',
      'currentIndex',
      'currentSong',
      'fullScreen',
      'screenFromList',
      'playingMode'
    ])
  },
  methods: {
    ready () {
      this.songReady = true
      this.$refs.audio.play()
    },
    error () {
      this.songReady = true
      this.next()
    },
    ended () {
      if (this.playingMode === playMode.singleLoop) {
        this.singleLoop()
      } else {
        this.next()
      }
    },
    toggleReady () {
      if (!this.songReady) {
        return
      }
      if (this.playingState === true) {
        this.$refs.audio.pause()
      } else {
        this.$refs.audio.play()
      }
      this.setPlayingState(!this.playingState)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    prev () {
      if (!this.songReady) {
        return
      }
      if (this.playingSongList.length !== 1) {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playingSongList.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playingState) {
          this.toggleReady()
        }
      }
    },
    next () {
      if (!this.songReady) {
        return
      }
      if (this.playingSongList.length !== 1) {
        let index = this.currentIndex + 1
        if (index === this.playingSongList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playingState) {
          this.toggleReady()
        }
      }
    },
    singleLoop () {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      this.currentLyric.seek(0)
    },
    changePlayMode () {
      const mode = (this.playingMode + 1) % 3
      this.setPlayMode(mode)
    },
    showNormalPlayer () {
      this.setFullScreen(true)
      this.goToFullScreen('fromList')
    },
    goToFullScreen (from) {
      if (from === 'fromList') {
        if (this.screenFromList === false) {
          this.setScreenFromList(true)
        }
      }
    },
    format (time) {
      time = Math.floor(time)
      const minute = Math.floor(time / 60)
      const second = this._pad(time % 60)
      return `${minute}:${second}`
    },
    _pad (num) {
      let length = num.toString().length
      while (length < 2) {
        num = '0' + num
        length++
      }
      return num
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    onPercentChange (percent) {
      this.$refs.audio.currentTime = (this.currentSong.duration / 1000) * percent
      if (this.currentLyric) {
        this.currentLyric.seek(this.currentSong.duration * percent)
      }
    },
    getSongLyric () {
      this.currentSong.getSongLyric().then(res => {
        if (res) {
          this.currentLyric = new Lyric(res, this.handleLyric)
          this.currentLyricLines = this.currentLyric.lines
        }
        if (this.playingState) {
          this.currentLyric.play()
        } else {
          this.currentLyric.stop()
        }
      }).catch(() => {
        this.currentLyric = null
        this.playingLyric = ''
        this.currentLyricLine = 0
        this.currentLyricLines = []
      })
    },
    handleLyric ({ lineNum, txt }) {
      this.playingLyric = txt
      this.currentLyricLine = lineNum
      if (lineNum > 5) {
        const lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
    },
    setFullShowLyric () {
      this.fullShowLyric = !this.fullShowLyric
      if (this.fullShowLyric) {
        setTimeout(() => {
          this.$refs.lyricList.refresh()
        }, 20)
      }
    },
    goToComments () {
      this.$router.push({
        path: `/comment/music/${this.currentSong.id}`,
        query: {
          name: this.currentSong.name,
          singer: this.currentSong.singers,
          picUrl: this.currentSong.picUrl
        }
      })
    },
    ...mapMutations(
      {
        setPlayingState: 'SET_PLAYING_STATE',
        setPlayingSongList: 'SET_PLAYING_SONG_LIST',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setFullScreen: 'SET_FULL_SCREEN',
        setScreenFromList: 'SET_SCREEN_FROM_LIST',
        setPlayMode: 'SET_PLAY_MODE'
      }
    )
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentLyricLine = 0
      }
      this.getSongLyric()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/style/variable.styl'
  @keyframes cdPlay {
    0% {
      transform rotate(0)
    }
    100% {
      transform rotate(360deg)
    }
  }
  .player
    position: relative
    top: 0
    left: 0
    .normal-player
      position absolute
      top 0
      left 0
      z-index 999
      right 0
      overflow hidden
      .play-container
        margin-top: 0.36rem
        .play-background
          position: absolute
          top: 0
          left: 0
          z-index: -1
          width: 100%
          height 100%
          opacity: 0.6
          transform: scale(2)
          filter: blur(30px)
        .center-wrapper
          width 100%
          height 35rem
          overflow hidden
          .special-img
            width: 100%
            img
              border-radius: 1.05rem 1.05rem 0 0
          .play-song
            width: 100%
            margin-top: 0.42rem
            padding: 0 0.9rem
            color: #fff
            overflow hidden
            .songTitle
              font-size: $font-size-large-xl
              font-weight: $font-weight-large
              margin-bottom: 0.9rem
              height 3.5rem
              line-height 3.5rem
            .songSinger
              font-size: $font-size-large
              font-weight: $font-weight-small
              margin-bottom: 0.5rem
              height 2rem
             line-height 2rem
            .lyric
              height 4.4rem
              font-size 1.25rem
              color $theme-color
        .full-lyric
          width 100%
          height 35rem
          position relative
          .lyric
            width 100%
            height 100%
            position absolute
            top 0
            left 0
            overflow hidden
            .lyric-wrapper
              width 100%
              margin 0 auto
              .lyric-text
                padding: 0.8rem 0
                word-break: keep-all
                word-wrap: break-word
                overflow: hidden
                font-size: 1.2rem
                letter-spacing: 2px
                text-align: center
                color: $theme-font-color
                &.current
                  color: $theme-color
        .play-bottom
            width 100%
            .option-wrapper
              width 100%
              height 3.5rem
              line-height 3.5rem
              display flex
              padding 0 1.5rem
              justify-content center
              color $theme-font-color
              .favorites
              .comments
              .mores
                  margin 0 3rem
              .iconfont
                font-size 2.2rem
            .progress-wrapper
              display flex
              margin-top 0.5rem
              padding 0 1.2rem
              align-items center
              .time-l
              .time-r
                font-size $font-size-small-xs
                color $theme-font-color
              .progress-bar
                flex 1
                margin 0 0.3rem
            .playicon-wrapper
              width 100%
              height 3.5rem
              line-height 3.5rem
              display flex
              margin 1.5rem 0
              padding 0 0.75rem
              justify-content center
              color $theme-font-color
              .mode
              .pre
              .toggle
              .next
              .more
                  margin 0 1.5rem
              .iconfont
                  font-size 2rem
    .mini-player
      position fixed
      bottom  0
      left 0
      z-index 99
      display flex
      align-content center
      width 100%
      height 3rem
      background #3f3f3f
      .album-img-mini
        width 20%
        height 100%
        text-align center
        &.play
          animation cdPlay 20s linear infinite
        &.pause
          animation-play-state paused
        img
          width 3rem
          height 100%
          border-radius 50%
      .play-song-mini
        width 50%
        .song-name
          height 60%
          color $theme-font-color
          font-size $font-size-large-x
          overflow hidden
        .song-singer
          height 40%
          color $theme-font-color
          font-size $font-size-middle
          overflow hidden
      .playicon-mini
        display flex
        align-content center
        width 30%
        line-height 3rem
        .toggle-mini
        .next-mini
          flex 1
          text-align center
          color $theme-color
        .iconfont
          font-size 1.9rem
</style>
