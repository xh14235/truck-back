<template>
  <div class="header-wrapper">
    <div class="header-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="bread1">{{ bread1 }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="bread2">{{ bread2 }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-username">你好，{{ username }}</div>
    <div class="header-logout" @click="logout">
      <img src="@/assets/img/logout.png" alt="" />
      退出
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RHeader",
  data() {
    return {
      bread1: "",
      bread2: ""
    };
  },
  computed: {
    ...mapState({
      username: state => state.common.username,
      menu: state => state.common.menu
    }),
    hash() {
      return this.$route.fullPath;
    }
  },
  watch: {
    hash() {
      this.changeBread();
    }
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
    }
  },
  mounted() {
    this.changeBread();
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
