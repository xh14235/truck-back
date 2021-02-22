<template>
  <div class="aside-wrapper">
    <div class="aside-logo" :style="{ 'padding-left': paddingLeft + 'vw' }">
      <img
        src="../../assets/img/logo-colour.png"
        alt=""
        class="reagon-logo-white"
      />
    </div>
    <el-aside class="aside-menu" :style="{ width: wid + 'vw' }">
      <el-menu
        :default-active="activeMenu"
        router
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        unique-opened
      >
        <el-menu-item
          index="/"
          :style="{
            'margin-left': marginLeft + 'vw',
            'margin-right': marginRight + 'vw'
          }"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu
          v-for="(item, index) of menu"
          :style="{
            'margin-left': marginLeft + 'vw',
            'margin-right': marginRight + 'vw'
          }"
          :key="item.url"
          :index="'' + index + 1"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
            v-for="item2 of item.children"
            :key="item2.title"
            :index="item2.url"
            >{{ item2.title }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-aside>
    <img
      class="aside-img"
      src="../../assets/img/menu-toggle.png"
      @click="toggleMenu"
      alt=""
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RMenu",
  data() {
    return {
      isCollapse: false,
      wid: 15.625,
      paddingLeft: 2.5,
      marginLeft: 1.5625,
      marginRight: 0,
      activeMenu: "/"
    };
  },
  computed: {
    ...mapState({
      menu: state => state.common.menu
    })
  },
  methods: {
    toggleMenu() {
      this.isCollapse = !this.isCollapse;
      this.wid = this.isCollapse ? 4.6875 : 15.625;
      this.paddingLeft = this.isCollapse ? 1.354 : 2.5;
      this.marginLeft = this.isCollapse ? 0.573 : 1.5625;
      this.marginRight = this.isCollapse ? 0.9896 : 0;
    }
    // storageUrl(url) {
    //   console.log(url);
    //   sessionStorage.setItem("activeMenu", url);
    // }
  },
  created() {
    let url = location.hash;
    this.activeMenu = url.substring(1);
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.aside-wrapper
  background: $mainDark
  display: flex
  flex-direction: column
  justify-content: space-between
  .aside-logo
    flex: 0 0 $commonHeight
    height: $commonHeight
    display: flex
    align-items: center
  .aside-menu
    margin-bottom: auto
    transition: all 0.3s
    .el-menu
      background-color: transparent
  .aside-img
    align-self: center
    margin-bottom: 1.85vh
    height: 2.4074vh
    cursor: pointer
</style>
