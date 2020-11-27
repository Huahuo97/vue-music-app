import { getSingerSingle, getSingerMv, getSingerAlbum, getArtistDesc } from '../../api/singer'

export default class Singer {
  constructor ({ id }) {
    this.id = id
  }

  getSingerSingle () {
    getSingerSingle(this.id).then(res => {
      if (res) {
        return res
      }
    })
  }

  getSingerMv () {
    getSingerMv(this.id).then(res => {
      if (res) {
        return res
      }
    })
  }

  getSingerAlbum () {
    getSingerAlbum(this.id).then(res => {
      if (res) {
        return res
      }
    })
  }

  getArtistDesc () {
    getArtistDesc(this.id).then(res => {
      if (res) {
        return res
      }
    })
  }
}
