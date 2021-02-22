<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">提示</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <div class="reagon-popup-info">确定要修改当前状态吗？</div>
      </div>
      <div class="reagon-popup-bottom">
        <div class="reagon-popup-btn" @click="confirm()">确定</div>
        <div class="reagon-popup-btn" @click="cancle()">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";
import qs from "qs";
export default {
  name: "MenuStatePopup",
  props: {
    info: Object
  },
  methods: {
    ...mapMutations(["hidePopup", "mutMenuChange"]),
    confirm() {
      axios
        .post(
          "http://116.236.30.222:9700/admin/menu/updateHidden/" + this.info.id,
          qs.stringify({
            id: this.info.id,
            hidden: this.info.hidden
          })
        )
        .then(res => {
          if (res.data.code === 200) {
            this.mutMenuChange();
          }
        });
      this.hidePopup();
    },
    cancle() {
      this.mutMenuChange();
      this.hidePopup();
    }
  }
};
</script>

<style lang="stylus" scoped></style>
