import { URL } from './config'
import axios from 'axios'

// 获取所有榜单
export const getTopList = function () {
  const url = `${URL}/toplist`
  return axios.get(url).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}

// 所有榜单内容摘要
export const getTopListDetail = function () {
  const url = `${URL}/toplist/detail`
  return axios.get(url).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}
