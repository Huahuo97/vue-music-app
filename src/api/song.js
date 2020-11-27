import { URL } from './config'
import axios from 'axios'
import { createSong } from '../common/js/song'

// 获取歌曲的url
export const getsongURL = function (id) {
  const url = `${URL}/song/url`
  return axios.get(url, {
    params: {
      id
    }
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}

// 检测是否有版权
export const ifHasCopyRight = function (id) {
  const url = `${URL}/check/music`
  return axios.get(url, {
    params: {
      id
    }
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}

// 获取歌曲歌词
export const getSongLyric = function (id) {
  const url = `${URL}/lyric`
  return axios.get(url, {
    params: {
      id
    }
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}

// 新歌速递
export const getNewSong = function (limit) {
  const url = `${URL}/personalized/newsong`
  return axios.get(url, {
    params: {
      limit
    }
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}

export const getSongsDetail = function (idArr) {
  const url = `${URL}/song/detail`
  const promises = []
  if (idArr.length) {
    idArr.forEach(item => {
      promises.push(axios.get(url, {
        params: {
          ids: item
        }
      }))
    })
    return Promise.all(promises).then(res => {
      let ret = null
      if (res) {
        ret = []
        res.forEach(item => {
          ret.push(createSong(item.data.songs[0]))
        })
      }
      return Promise.resolve(ret)
    })
  } else {
    return Promise.resolve([])
  }
}
