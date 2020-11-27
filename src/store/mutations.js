import * as types from './mutaion-types'

const mutations = {
  [types.SET_HISTORY_SEARCH] (state, option) {
    state.hisSearch.push(option)
  },
  [types.CLEAR_HISTORY_SEARCH] (state) {
    state.hisSearch.splice(0)
  },
  [types.SET_SEARCH_STATE] (state, params) {
    state.searchState = params
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playingState = flag
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_PLAYING_SONG_LIST] (state, list) {
    state.playingSongList = list
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_SCREEN_FROM_LIST] (state, flag) {
    state.screenFromList = flag
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.playMode = mode
  },
  [types.SET_SEARCH_KEY_WORDS] (state, keywords) {
    state.searchKeyWords = keywords
  },
  [types.SET_SCREEN_FROM_DETAIL] (state, flag) {
    state.screenFromDetail = flag
  },
  [types.SET_SINGER_FROM_SEARCH] (state, flag) {
    state.singerFromSearch = flag
  },
  [types.SET_SONG_LIST_FROM_SEARCH] (state, flag) {
    state.songListFromSearch = flag
  }
}

export default mutations
