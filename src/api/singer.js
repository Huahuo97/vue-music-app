import { URL } from './config'
import axios from 'axios'

export const getSingerSingle = function (id) {
  const url = `${URL}/artists`
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

export const getSingerMv = function (id) {
  const url = `${URL}/artist/mv`
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

export const getSingerAlbum = function (id) {
  const url = `${URL}/artist/album`
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

export const getArtistDesc = function (id) {
  const url = `${URL}/artist/desc`
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

export const getHotSingers = function ({ limit, offset }) {
  const url = `${URL}/top/artists`
  return axios.get(url, {
    params: {
      limit,
      offset
    }
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}

export const getSingerList = function ({ type, area, initial, limit, offset }) {
  const url = `${URL}/artist/list`
  return axios.get(url, {
    params: {
      type,
      area,
      initial,
      limit,
      offset
    }
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}
