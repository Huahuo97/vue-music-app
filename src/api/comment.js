import { URL } from './config'
import axios from 'axios'

export const getSongComment = function ({ type, id, limit, offset }) {
  const url = `${URL}/comment/${type}`
  return axios.get(url, {
    params: {
      id,
      limit,
      offset
    }
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}
