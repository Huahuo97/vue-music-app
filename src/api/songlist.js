import { URL } from './config'
import axios from 'axios'

export const getSongListDetail = function ({ id }) {
  const url = `${URL}/playlist/detail`
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

// 获取歌单热门分类
export const getHotClassify = function () {
  const url = `${URL}/playlist/hot`
  return axios.get(url).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}

// 获取歌单分类信息
export const getSongListCat = function () {
  const url = `${URL}/playlist/catlist`
  return axios.get(url).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}

// 获取歌单
export const getSongList = function ({ order, cat, limit, offset }) {
  const url = `${URL}/top/playlist`
  return axios.get(url, {
    params: {
      order,
      cat,
      limit,
      offset
    }
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}
