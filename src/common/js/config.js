// 全局配置文件
export const searchType = {
  song: 1,
  album: 10,
  singer: 100,
  songlist: 1000,
  user: 1002,
  mv: 1004,
  lyric: 1006,
  radio: 1009,
  video: 1014,
  synthesis: 1018
}

export const playMode = {
  singleLoop: 0,
  listLoop: 1,
  random: 2
}

// 歌手分类
// 全部: -1
// 男歌手：1
// 女歌手：2
export const singerType = {
  all: -1,
  male: 1,
  female: 2,
  band: 3
}

// 歌手地区
// 全部: -1
// 华语：7
// 欧美： 96
// 日本：8
// 韩国：16
// 其他：0
export const singerArea = {
  all: -1,
  china: 7,
  occident: 96,
  japan: 8,
  korea: 16,
  other: 0
}
