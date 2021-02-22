<template>
  <div class="aside-wrapper" :style="{ width: wrapperWidth + 'vw' }">
    <div class="aside-logo">
      <img
        :src="require('../../assets/img/' + logoUrl + '.png')"
        alt=""
        class="reagon-logo-colour"
      />
      <!-- {{ activeMenu1 }} -->
    </div>
    <div
      class="aside-menu"
      :style="{ width: menuWidth + 'vw', 'margin-right': menuMarginRight }"
    >
      <div class="menu-box">
        <div
          class="menu-top"
          :class="{ 'menu-active': activeMenu === 0 }"
          @click="changeMenuAcitve(-1)"
        >
          <img src="../../assets/img/menu-home.png" alt="" class="menu-icon" />
          <span class="menu-title" v-show="!isCollapse">首页</span>
        </div>
      </div>
      <div class="menu-box" v-for="(item, index) of menu" :key="item.url">
        <div
          class="menu-top"
          :class="{ 'menu-active': activeMenu === index + 1 }"
          @click="changeMenuAcitve(index)"
        >
          <img
            :src="require('../../assets/img/' + item.icon + '.png')"
            alt=""
            class="menu-icon"
          />
          <span class="menu-title" v-show="!isCollapse">{{ item.title }}</span>
        </div>
        <transition name="opacity">
          <div
            class="menu-children"
            v-show="!isCollapse && activeMenu === index + 1"
          >
            <div
              class="menu-item"
              :class="{
                active: littleMenu === '' + (index + 1) + index2
              }"
              v-for="(item2, index2) of item.children"
              :key="item2.url"
              @click="changeUrl(item2.url, index2)"
            >
              <div class="menu-circle"></div>
              <div>{{ item2.title }}</div>
            </div>
          </div>
        </transition>
        <div
          class="menu-children menu-children2"
          v-show="isCollapse && activeMenu === index + 1 && menuChildren2Show"
        >
          <div
            class="menu-item"
            :class="{
              active: activeMenu === index + 1 && littleMenu === index2
            }"
            v-for="(item2, index2) of item.children"
            :key="item2.url"
            @click="changeUrl(item2.url, index2)"
          >
            <div class="menu-circle"></div>
            <div>{{ item2.title }}</div>
          </div>
        </div>
      </div>
    </div>
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
      wrapperWidth: 15.625,
      menuWidth: 14,
      menuMarginRight: 0,
      activeMenu: Number(sessionStorage.getItem("activeMenu")),
      menuChildren2Show: false,
      littleMenu: sessionStorage.getItem("littleMenu")
    };
  },
  computed: {
    ...mapState({
      menu: state => state.common.menu
    }),
    logoUrl() {
      let url;
      if (this.isCollapse) {
        url = "logo-small";
      } else {
        url = "logo-colour";
      }
      return url;
    }
  },
  methods: {
    toggleMenu() {
      this.isCollapse = !this.isCollapse;
      this.wrapperWidth = this.isCollapse ? 4.6875 : 15.625;
      this.menuWidth = this.isCollapse ? 3.125 : 14;
      this.menuMarginRight = this.isCollapse ? "auto" : 0;
      this.menuChildren2Show = false;
    },
    changeMenuAcitve(index) {
      if (this.activeMenu === index + 1) {
        this.menuChildren2Show = !this.menuChildren2Show;
      } else {
        this.menuChildren2Show = true;
      }
      this.activeMenu = index + 1;
      if (index === -1) {
        sessionStorage.setItem("activeMenu", 0);
        sessionStorage.setItem("littleMenu", 0);
        this.$router.push("/");
      }
    },
    changeUrl(url, index) {
      if (url.includes("user")) {
        sessionStorage.setItem("activeMenu", 1);
        this.littleMenu = "1" + index;
      } else {
        sessionStorage.setItem("activeMenu", 2);
        this.littleMenu = "2" + index;
      }
      sessionStorage.setItem("littleMenu", this.littleMenu);
      this.menuChildren2Show = false;
      this.$router.push(url);
    }
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
  transition: all 0.3s
  .aside-logo
    flex: 0 0 $commonHeight
    height: $commonHeight
    display: flex
    align-items: center
    justify-content: center
    .reagon-logo-colour
      height: 2.6vw
  .aside-menu
    margin-bottom: auto
    margin-left: auto
    transition: all 0.3s
    .menu-box
      width: 100%
      margin-bottom: 1vw
      position: relative
      .menu-top
        height: 3.125vw
        display: flex
        align-items: center
        background: linear-gradient(to right, rgba(169, 195, 227, 0.1), rgba(169, 195, 227, 0))
        border-radius: 1.5625vw
        cursor: pointer
        padding: 0 1vw
        &.menu-active
          background: linear-gradient(to right, rgba(0, 134, 201, 1), rgba(0, 134, 201, 0))
        .menu-icon
          height: 1.354vw
        .menu-title
          color: #fff
          font-size: $font20
          font-weight: 600
          margin-left: 1vw
          margin-right: auto
      .menu-children
        color: #fff
        font-size: $font20
        font-weight: 600
        .menu-item
          line-height: 2vw
          padding-left: 2vw
          cursor: pointer
          display: flex
          align-items: center
          &.active
            color: $blue
        .menu-circle
          content: ''
          display: block
          width: 0.52vw
          height: 0.52vw
          background: #3B84C9
          border-radius: 50%
          margin-right: 1vw
      .menu-children2
        position: absolute
        top: 0
        left: calc(100% + 1vw)
        width: 12.5vw
        padding: 1vw
        background: $mainDark
        z-index: 1
  .aside-img
    align-self: center
    margin-bottom: 0.8854vw
    width: 1.3542vw
    cursor: pointer
</style>
