import { playMode } from '../common/js/config'

const state = {
  hisSearch: [],
  searchState: false,
  searchKeyWords: '',
  playMode: playMode.listLoop,
  playingState: false,
  playingSongList: [],
  currentIndex: 0,
  fullScreen: false,
  screenFromList: false,
  screenFromDetail: false,
  singerFromSearch: false,
  songListFromSearch: false
}

export default state
