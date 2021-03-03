<template>
  <div class="header-wrapper">
    <div class="header-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="bread1">{{ bread1 }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="bread2">{{ bread2 }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-username">你好，{{ realName }}</div>
    <div class="header-logout" @click="logout">
      <img src="@/assets/img/logout.png" alt="" />
      退出
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { getInfo } from "@/http/api";
export default {
  name: "RHeader",
  data() {
    return {
      bread1: "",
      bread2: ""
      // realName: "",
      // menu: []
    };
  },
  computed: {
    ...mapState({
      roleChange: state => state.common.roleChange,
      realName: state => state.common.realName,
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
    hash() {
      return this.$route.fullPath;
    }
  },
  watch: {
    hash() {
      this.changeBread();
    },
    roleChange() {
      this.getMenu();
    }
    // nowUrl() {
    //   if (this.nowUrl !== 3) {
    //     this.changeBread();
    //     this.getMenu();
    //   }
    // }
  },
  methods: {
    changeBread() {
      if (this.hash === "/") {
        this.bread1 = "";
        this.bread2 = "";
      } else {
        for (let i = 0; i < this.menu.length; i++) {
          for (let j = 0; j < this.menu[i].children.length; j++) {
            if (this.menu[i].children[j].url === this.hash) {
              this.bread1 = this.menu[i].title;
              this.bread2 = this.menu[i].children[j].title;
            }
          }
        }
      }
    },
    logout() {
      sessionStorage.setItem("token", "");
      this.$store.state.common.token = "";
      this.$router.push("/login");
    },
    getMenu() {
      // getInfo().then(res => {
      // this.realName = res.data.realName;
      // this.menu = [];
      // let menus = res.data.menus;
      // for (let i = 0; i < menus.length; i++) {
      //   if (!menus[i].parentId) {
      //     this.menu.push({
      //       id: menus[i].id,
      //       title: menus[i].title,
      //       icon: menus[i].icon,
      //       url: "/" + menus[i].name,
      //       active: true,
      //       children: []
      //     });
      //   } else {
      //     for (let j = 0; j < this.menu.length; j++) {
      //       if (menus[i].parentId === this.menu[j].id) {
      //         this.menu[j].children.push({
      //           title: menus[i].title,
      //           url: this.menu[j].url + "/" + menus[i].name
      //         });
      //       }
      //     }
      //   }
      // }
      // });
    }
  },
  mounted() {
    // if (this.nowUrl !== 3) {
    this.changeBread();
    // this.getMenu();
    // }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.header-breadcrumb >>> .el-breadcrumb__separator
  font-weight: 600
  color: $fontCommon
.header-breadcrumb >>> .el-breadcrumb__inner
  font-weight: 600
  color: $fontCommon
.header-wrapper
  flex: 0 0 $commonHeight
  display: flex
  width: 100%
  padding: 0 2.34375vw 0 1.823vw
  height: $commonHeight
  background: $white
  justify-content: space-between
  align-items: center
  color: $fontCommon
  font-size: $font20
  .header-breadcrumb
    margin-right: auto
    .el-breadcrumb
      font-size: $font20
  .header-username
    margin-right: 1.823vw
    font-weight: 600
  .header-logout
    display: flex
    align-items: center
    cursor: pointer
    font-weight: 600
    img
      height: 1.25vw
      margin-right: 0.3vw
</style>
