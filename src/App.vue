<template>
  <div id="app">
    <player></player>
    <router-view/>
  </div>
</template>

<script>
import Player from './pages/player/Player'
export default {
  components: {
    Player
  }
}
</script>

<style lang="stylus">
</style>
