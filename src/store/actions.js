import * as types from './mutaion-types'

export const selectPlay = function ({ commit, state }, { list, index }) {
  commit(types.SET_PLAYING_SONG_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_SCREEN_FROM_LIST, true)
  commit(types.SET_SCREEN_FROM_DETAIL, true)
}
