// 搜索歌曲
import { URL } from './config'
import axios from 'axios'

// 通过关键字搜索
export function searchByKey ({ keywords, limit, offset, type }) {
  const url = `${URL}/search`
  return axios.get(url, {
    params: {
      keywords,
      limit,
      offset,
      type
    }
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}

// 搜索热门歌曲列表
export function searchHotList () {
  const url = `${URL}/search/hot`
  return axios.get(url).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}
