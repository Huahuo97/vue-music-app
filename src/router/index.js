import Vue from 'vue'
import VueRouter from 'vue-router'
// 播放页面
import Player from '../pages/player/Player'
// 主页
import Home from '../pages/home/Home'
import Recommend from '../pages/home/component/Recommend'
import Mine from '../pages/home/component/Mine'
// 搜索
import Search from '../pages/search/Search'
import SearchSongs from '../pages/search/component/Songs'
import SearchSongLists from '../pages/search/component/SongLists'
import SearchSingers from '../pages/search/component/Singers'
import SearchMVs from '../pages/search/component/Mvs'
// 歌手列表
import Singer from '../pages/singer/Singer'
import SingerCate from '../pages/singerCate/SingerCate'
// 歌手详情
import SingerDetail from '../pages/singerDetail/SingerDetail'
import HomePage from '../pages/singerDetail/component/HomePage'
import HotSingle from '../pages/singerDetail/component/HotSingle'
import HotAlbum from '../pages/singerDetail/component/HotAlbum'
import HotMv from '../pages/singerDetail/component/HotMv'
// 歌单详情
import SongListDetail from '../pages/songListDetail/SongListDetail'
// 歌单广场
import SongList from '../pages/songList/SongList'
// 排行榜
import Rank from '../pages/rank/Rank'
// 评论
import Comments from '../pages/comment/Comments'
// 电台
import Radio from '../pages/radio/Radio'
// 全局配置文件
import { searchType } from '../common/js/config'
Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/', name: 'Root', redirect: '/home/recommend' },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'recommend',
        name: 'Recommend',
        component: Recommend
      },
      {
        path: 'mine',
        name: 'Mine',
        component: Mine
      }
    ]
  },
  { path: '/player', name: 'Player', component: Player },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    children: [
      {
        path: `${searchType.song}`,
        name: 'SearchSongs',
        params: {
          type: searchType.song
        },
        component: SearchSongs
      },
      {
        path: `${searchType.singer}`,
        name: 'SearchSingers',
        params: {
          type: searchType.singer
        },
        component: SearchSingers
      },
      {
        path: `${searchType.songlist}`,
        name: 'SearchSongLists',
        params: {
          type: searchType.songlist
        },
        component: SearchSongLists
      },
      {
        path: `${searchType.mv}`,
        params: {
          type: searchType.mv
        },
        name: 'SearchMVs',
        component: SearchMVs
      }
    ]
  },
  {
    path: '/comment/:type/:id',
    name: 'Comments',
    component: Comments
  },
  {
    path: '/singerDetail/:id/:name',
    name: 'SingerDetail',
    component: SingerDetail,
    redirect: '/singerDetail/:id/:name/hotSingle',
    children: [
      {
        path: 'homePage',
        name: 'HomePage',
        component: HomePage
      },
      {
        path: 'hotSingle',
        name: 'HotSingle',
        component: HotSingle
      },
      {
        path: 'hotAlbum',
        name: 'HotAlbum',
        component: HotAlbum
      },
      {
        path: 'hotMv',
        name: 'HotMv',
        component: HotMv
      }
    ]
  },
  {
    path: '/singer', name: 'Singer', component: Singer
  },
  {
    path: '/singerCate', name: 'SingerCate', component: SingerCate
  },
  {
    path: '/songListDetail/:id/:name', name: 'SongListDetail', component: SongListDetail
  },
  {
    path: '/songList', name: 'SongList', component: SongList
  },
  {
    path: '/rank', name: 'Rank', component: Rank
  },
  {
    path: '/radio', name: 'Radio', component: Radio
  }
]

const router = new VueRouter({
  routes
})

export default router
