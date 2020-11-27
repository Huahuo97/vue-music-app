export const hisSearch = state => state.hisSearch
export const searchState = state => state.searchState
export const searchKeyWords = state => state.searchKeyWords
export const singerFromSearch = state => state.singerFromSearch
export const songListFromSearch = state => state.songListFromSearch
export const fullScreen = state => state.fullScreen
export const screenFromDetail = state => state.screenFromDetail
export const screenFromList = state => state.screenFromList
export const playingMode = state => state.playMode
export const playingState = state => state.playingState
export const playingSongList = state => state.playingSongList
export const currentIndex = state => state.currentIndex
export const currentSong = (state) => {
  return state.playingSongList[state.currentIndex] || {}
}
