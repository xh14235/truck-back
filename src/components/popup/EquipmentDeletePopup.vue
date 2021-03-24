<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">删除</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <div class="reagon-popup-info">
          <div class="reagon-popup-confirm">确定要删除该仪表吗？</div>
        </div>
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
import { getErrorMsg } from "@/http/api";
import axios from "axios";
export default {
  name: "EquipmentDeletePopup",
  props: {
    info: Object
  },
  methods: {
    ...mapMutations(["hidePopup", "mutEquipmentChange"]),
    confirm() {
      axios
        .post(
          "http://116.236.30.222:9700/admin/admin/meter/delete/" + this.info.id,
          {
            id: this.info.id
          }
        )
        .then(res => {
          if (res.data.success) {
            this.mutEquipmentChange();
          } else {
            this.$message({
              showClose: true,
              message: "删除失败，" + getErrorMsg(res.data),
              iconClass: "el-icon-warning"
            });
            // this.$alert("删除失败，" + getErrorMsg(res.data), "错误提示", {
            //   confirmButtonText: "确定"
            // });
          }
        });
      this.hidePopup();
    }
  }
};
</script>

<style lang="stylus" scoped></style>
