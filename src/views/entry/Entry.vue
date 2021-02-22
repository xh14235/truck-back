<template>
  <div class="entry-wrapper">
    <img
      src="../../assets/img/logo-white.png"
      alt=""
      class="reagon-logo-white"
    />
    <div class="entry-box">
      <div
        class="entry-item"
        v-for="(item, index) of list"
        @mouseenter="mouseenter(index)"
        @mouseleave="mouseleave(index)"
        @click="jump(item.url)"
        :key="item.url"
      >
        <img
          v-if="item.hover"
          :src="require('../../assets/img/entry' + (index + 1) + '.gif')"
          alt=""
        />
        <img
          v-else
          :src="require('../../assets/img/entry' + (index + 1) + '.jpg')"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Entry",
  data() {
    return {
      list: [
        {
          hover: false,
          url: "/"
        },
        {
          hover: false,
          url: "/2"
        },
        {
          hover: false,
          url: "/3"
        },
        {
          hover: false,
          url: "/4"
        }
      ]
    };
  },
  methods: {
    mouseenter(index) {
      this.list[index].hover = true;
    },
    mouseleave(index) {
      this.list[index].hover = false;
    },
    jump(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.entry-wrapper
  position: absolute
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-image: url('../../assets/img/bg-main.png')
  background-size: 100% auto
  display: flex
  justify-content: center
  align-items: center
  .entry-box
    flex: 0 0 44.79vw
    width: 44.79vw
    height: 18.854vw
    // flex: 0 0 860px
    // width: 860px
    // height: 360px
    display: flex
    justify-content: space-between
    flex-wrap: wrap
    align-content: space-between
    .entry-item
      cursor: pointer
      img
        width: 20.8333vw
        // width: 400px
</style>
