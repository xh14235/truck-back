<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">提示</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <div class="reagon-popup-info">MenuFailedPopup</div>
      </div>
      <div class="reagon-popup-bottom">
        <div class="reagon-popup-btn" @click="confirm()">确定</div>
        <div class="reagon-popup-btn" @click="hidePopup()">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
// import { deleteUser } from "@/http/api";
export default {
  name: "MenuFailedPopup",
  methods: {
    ...mapMutations(["hidePopup"]),
    confirm() {
      // deleteUser({
      //   id: 3
      // }).then(res => {
      //   console.log(res);
      // });
      this.hidePopup();
    }
  }
};
</script>

<style lang="stylus" scoped></style>
