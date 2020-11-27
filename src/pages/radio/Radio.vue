<template>
  <div class="radio">
    <base-header title="电台" :routerBack="true"></base-header>
  </div>
</template>

<script>
import BaseHeader from '../../components/header/Header'
export default {
  name: 'Radio',
  components: {
    BaseHeader
  }
}
</script>

<style lang="stylus" scoped>
  .radio
    position relative
    width 100%
</style>
