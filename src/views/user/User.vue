<template>
  <div class="reagon-main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      pathName: ""
    };
  },
  mounted() {
    let hash = this.$route.fullPath.split("/")[2];
    switch (hash) {
      case "userlist":
        this.pathName = "用户列表";
        break;
      case "rolelist":
        this.pathName = "角色列表";
        break;
      case "menulist":
        this.pathName = "菜单列表";
        break;
      case "resourcelist":
        this.pathName = "资源列表";
        break;
      default:
        break;
    }
  }
};
</script>
