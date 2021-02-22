<template>
  <div id="app" class="reagon-wrapper">
    <RMenu></RMenu>
    <div class="main-wrapper">
      <RHeader></RHeader>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {
    RHeader: () => import("@/components/common/RHeader"),
    RMenu: () => import("@/components/common/RMenu")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.reagon-wrapper
  width: 100vw
  height: 100vh
  display: flex
  .main-wrapper
    flex: auto
    height: 100%
    overflow: hidden
    background: $mainLight
    display: flex
    flex-direction: column
</style>
