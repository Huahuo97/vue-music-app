<template>
  <div class="home" v-show="!fullScreen">
      <home-header></home-header>
      <router-view/>
  </div>
</template>

<script>
import HomeHeader from './component/HomeHeader'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    HomeHeader
  },
  computed: {
    ...mapGetters(['fullScreen'])
  }
}
</script>

<style lang="stylus" scoped>
  .home
    position relative
</style>
