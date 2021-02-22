<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">提示</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <div class="reagon-popup-info">确定要删除该账号吗？</div>
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
import axios from "axios";
export default {
  name: "MenuDeletePopup",
  props: {
    info: Object
  },
  methods: {
    ...mapMutations(["hidePopup", "mutMenuChange"]),
    confirm() {
      axios
        .post("http://116.236.30.222:9700/admin/menu/delete/" + this.info.id, {
          id: this.info.id
        })
        .then(res => {
          if (res.data.code === 200) {
            this.mutMenuChange();
          }
        });
      this.hidePopup();
    }
  }
};
</script>

<style lang="stylus" scoped></style>
