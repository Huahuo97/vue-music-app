# vue-music
> `Simple Music`是一个使用vue全家桶写的一个移动端的SPA-音乐app, 总的来说也是自己用来学习vue的练手项目，包括了vue+vuex+vue-router+vue-cli全家桶，适合新手或者有一定vue使用经验的人。
最新版目前是第一版完成了一些功能，具体见功能特性，其中后台数据API来自开源项目：[网易云音乐 NodeJS 版 API](https://github.com/Binaryify/NeteaseCloudMusicApi)，感谢原作者，感谢网易云。

## 技术栈
vue2 + vuex + vue-router + vue-cli + es6 + stylus

## 功能特性
+ 主页推荐页面
+ 排行榜页面
+ 歌单列表页 (歌单详情页)
+ 歌手列表页 (歌手详情页)
+ 歌曲评论页面
+ 搜索页面 (热门搜索、历史搜索，支持歌曲搜索、歌手搜索、歌单搜索、MV搜索) 注：MV搜索只渲染了样式
+ 播放器内核 (全屏播放/组件播放， 播放/暂停、歌曲切换、播放模式切换、歌词/歌词滚动、播放进度条)
+ 已完成16个基础组件 (src/components)，11个页面组件(src/pages)
+ 通过better-scroll完成类移动端滚动体验

## 部分截图
<div align="center">
  <img src="./src/finished/主页.gif" title="主页"/>
  <img src="./src/finished/排行榜.gif" title="排行榜"/>
</div>
<div align="center">
  <img src="./src/finished/歌单.gif" title="歌单页"/>
  <img src="./src/finished/歌手.gif" title="歌手页"/>
</div>
<div align="center">
  <img src="./src/finished/搜索.gif" title="搜索页"/>
  <img src="./src/finished/播放器.gif" title="播放器"/>
</div>

## 快速安装和开始
> Simple Music

### 下载项目到本地
```
git clone git@github.com:Huahuo97/vue-music-app.git
```

### 安装依赖
```
yarn install
```

### 编译项目
```
yarn serve
```

### 项目打包
```
yarn build
```

### 启动后台代理接口
```
cd server
node ./app.js
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 其他说明
+ 后台接口代理我自己下载了[网易云音乐 NodeJS 版 API](https://github.com/Binaryify/NeteaseCloudMusicApi)的代码放在了server目录，你也可以自己下载放在自己的目录，对应的目录跟着修改就行。
+ 接口代理端口默认为3000，有需要可以自己修改，在api/config.js中可修改代理端口号。
+ 个人练手项目，欢迎沟通交流与star~，目前决定的功能中也有部分未完成，因此有些tab或者按钮点击没有反应，后续会持续更新功能和修复一些存在的问题。
+ 简单生活，简单音乐。
