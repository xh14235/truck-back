<template>
  <div class="aside-wrapper" :style="{ width: wrapperWidth + 'vw' }">
    <div class="aside-logo" :style="{ 'padding-left': paddingLeft + 'vw' }">
      <img
        :src="require('../../assets/img/' + logoUrl + '.png')"
        alt=""
        class="reagon-logo-colour"
      />
    </div>
    <div
      class="aside-menu"
      :style="{ width: menuWidth + 'vw', 'margin-right': menuMarginRight }"
    >
      <div class="menu-box">
        <div
          class="menu-top"
          :class="{ isCollapse: isCollapse, active: nowUrl === 0 }"
          @click="toHome()"
        >
          <img src="../../assets/img/menu-home.png" alt="" class="menu-icon" />
          <span class="menu-title" v-show="!isCollapse">首页</span>
        </div>
      </div>
      <div
        class="menu-box"
        v-for="(item, index) of menu"
        :key="item.url"
        @mouseenter="showChildren2(index)"
        @mouseleave="hideChildren2(index)"
      >
        <div
          class="menu-top"
          :class="{ isCollapse: isCollapse, active: nowUrl === index + 1 }"
          @click="toggleChild(index)"
        >
          <img
            :src="require('../../assets/img/' + item.icon + '.png')"
            alt=""
            class="menu-icon"
          />
          <span class="menu-title" v-show="!isCollapse">{{ item.title }}</span>
          <img
            v-show="!isCollapse"
            :class="{ active: item.active }"
            src="../../assets/img/menu-arrow.png"
            class="menu-arrow"
          />
        </div>
        <div class="menu-children" v-show="!isCollapse && item.active">
          <div
            class="menu-item"
            :class="{ 'menu-active': menu2Active === '' + index + '' + index2 }"
            v-for="(item2, index2) of item.children"
            @click="changeUrl(item2.url, index, index2)"
            :key="item2.url"
          >
            <div class="menu-circle"></div>
            <div>{{ item2.title }}</div>
          </div>
        </div>
        <div class="menu-children2" v-show="isCollapse && item.active">
          <div class="menu-children">
            <div
              class="menu-item"
              :class="{
                'menu-active': menu2Active === '' + index + '' + index2
              }"
              v-for="(item2, index2) of item.children"
              @click="changeUrl(item2.url, index, index2)"
              :key="item2.url"
            >
              <div class="menu-circle"></div>
              <div>{{ item2.title }}</div>
            </div>
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
import { getInfo } from "@/http/api";
import { mapState, mapMutations } from "vuex";
export default {
  name: "RMenu",
  data() {
    return {
      isCollapse: false,
      wrapperWidth: 15.625,
      menuWidth: 14,
      menuMarginRight: 0,
      paddingLeft: 2.5
    };
  },
  computed: {
    ...mapState({
      menu2Active: state => state.common.menu2Active,
      menu: state => state.common.menu
    }),
    nowUrl() {
      let url = this.$route.path;
      let nowUrl;
      if (url === "/") {
        nowUrl = 0;
      } else if (url.includes("user")) {
        nowUrl = 1;
      } else if (url.includes("account")) {
        nowUrl = 2;
      } else {
        nowUrl = 3;
      }
      return nowUrl;
    },
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
    ...mapMutations(["mutMenu2Active"]),
    toggleMenu() {
      for (let i = 0; i < this.menu.length; i++) {
        if (!this.isCollapse) {
          this.menu[i].active = false;
        } else {
          this.menu[i].active = true;
        }
      }
      this.isCollapse = !this.isCollapse;
      this.wrapperWidth = this.isCollapse ? 4.6875 : 15.625;
      this.menuWidth = this.isCollapse ? 2.604 : 14;
      this.menuMarginRight = this.isCollapse ? "auto" : 0;
      this.paddingLeft = this.isCollapse ? 0.78125 : 2.5;
    },
    toggleChild(index) {
      if (!this.isCollapse) {
        this.menu[index].active = !this.menu[index].active;
      }
    },
    showChildren2(index) {
      if (this.isCollapse) {
        this.menu[index].active = true;
      }
    },
    hideChildren2(index) {
      if (this.isCollapse) {
        this.menu[index].active = false;
      }
    },
    toHome() {
      this.$router.push("/");
      this.mutMenu2Active(0);
    },
    changeUrl(url, index, index2) {
      this.$router.push(url);
      this.mutMenu2Active("" + index + "" + index2);
    },
    getMenu() {
      getInfo().then(res => {
        let menus = res.data.menus;
        this.menu = [];
        for (let i = 0; i < menus.length; i++) {
          if (!menus[i].parentId) {
            this.menu.push({
              id: menus[i].id,
              title: menus[i].title,
              icon: menus[i].icon,
              url: "/" + menus[i].name,
              active: true,
              children: []
            });
          } else {
            for (let j = 0; j < this.menu.length; j++) {
              if (menus[i].parentId === this.menu[j].id) {
                this.menu[j].children.push({
                  title: menus[i].title,
                  url: this.menu[j].url + "/" + menus[i].name
                });
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.menu-box >>> .menu-children
  color: #fff
  font-size: $font16
  font-weight: 600
  padding: 0.625px 0
  .menu-item
    line-height: 2.5vw
    padding-left: 1.5vw
    cursor: pointer
    display: flex
    align-items: center
    &.menu-active
      color: $blue
  .menu-circle
    content: ''
    display: block
    width: 0.52vw
    height: 0.52vw
    background: #3B84C9
    border-radius: 50%
    margin-right: 1vw
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
    padding-left: 2.5vw
    .reagon-logo-colour
      height: 2.6vw
  .aside-menu
    margin-bottom: auto
    margin-left: auto
    margin-top: 1.302vw
    transition: all 0.3s
    .menu-box
      width: 100%
      margin-bottom: 0.78125vw
      position: relative
      .menu-top
        height: 2.604vw
        display: flex
        align-items: center
        background: linear-gradient(to right, rgba(169, 195, 227, 0.1), rgba(169, 195, 227, 0))
        border-radius: 1.302vw 0 0 1.302vw
        cursor: pointer
        padding: 0 0.625vw
        &.active
          background: linear-gradient(to right, rgba(0, 134, 201, 1) 0%, rgba(0, 134, 201, 1) 60%, rgba(0, 134, 201, 0) 100%)
        &.isCollapse
          border-radius: 1.302vw
          background: rgba(169, 195, 227, 0.1)
          &.active
            background: rgba(0, 134, 201, 1)
        .menu-icon
          height: 1.354vw
        .menu-title
          color: #fff
          font-size: $font16
          font-weight: 600
          margin-left: 1.0417vw
          margin-right: auto
        .menu-arrow
          width: 1.354vw
          transition: all 0.3s
          &.active
            transform: rotate(540deg)
      .menu-children2
        position: absolute
        top: 0
        left: 110%
        width: 12.5vw
        z-index: 1
        .menu-children
          background: $mainDark
          margin-left: 1vw
          padding: 1vw 1vw 1vw 0
  .aside-img
    align-self: center
    margin-bottom: 0.8854vw
    width: 1.3542vw
    cursor: pointer
</style>
