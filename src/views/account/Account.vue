<template>
  <div class="reagon-main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      pathName: ""
    };
  },
  mounted() {
    let hash = this.$route.fullPath.split("/")[2];
    switch (hash) {
      case "equipment":
        this.pathName = "动力设备管理";
        break;
      case "meter":
        this.pathName = "仪表管理";
        break;
      default:
        break;
    }
  }
};
</script>
