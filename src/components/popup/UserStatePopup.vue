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
import { getErrorMsg } from "@/http/api";
import axios from "axios";
import qs from "qs";
export default {
  name: "UserStatePopup",
  props: {
    info: Object
  },
  methods: {
    ...mapMutations(["hidePopup", "mutUserChange"]),
    confirm() {
      axios
        .post(
          "http://116.236.30.222:9700/admin/admin/updateStatus/" + this.info.id,
          qs.stringify({
            id: this.info.id,
            status: this.info.status
          })
        )
        .then(res => {
          if (res.data.success) {
            this.mutUserChange();
          } else {
            this.$message({
              showClose: true,
              message: "改变失败，" + getErrorMsg(res.data),
              iconClass: "el-icon-warning"
            });
            // this.$alert("改变失败，" + getErrorMsg(res.data), "错误提示", {
            //   confirmButtonText: "确定"
            // });
          }
        });
      this.hidePopup();
    },
    cancle() {
      this.mutUserChange();
      this.hidePopup();
    }
  }
};
</script>

<style lang="stylus" scoped></style>
