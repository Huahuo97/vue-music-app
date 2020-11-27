import { URL } from './config'
import axios from 'axios'

export const getBanner = function (type) {
  const url = `${URL}/banner`
  return axios.get(url, {
    params: {
      type
    }
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}
