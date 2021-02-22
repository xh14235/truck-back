<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">提示</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <div class="reagon-popup-info">
          <div class="reagon-popup-confirm">确定要修改当前状态吗？</div>
        </div>
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
  name: "RoleStatePopup",
  props: {
    info: Object
  },
  methods: {
    ...mapMutations(["hidePopup", "mutRoleChange"]),
    confirm() {
      axios
        .post(
          "http://116.236.30.222:9700/admin/role/updateStatus/" + this.info.id,
          qs.stringify({
            id: this.info.id,
            status: this.info.status
          })
        )
        .then(res => {
          if (res.data.code === 200) {
            this.mutRoleChange();
          }
        });
      this.hidePopup();
    },
    cancle() {
      this.mutRoleChange();
      this.hidePopup();
    }
  }
};
</script>

<style lang="stylus" scoped></style>
