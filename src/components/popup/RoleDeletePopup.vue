<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">提示</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <div class="reagon-popup-info">
          <div class="reagon-popup-confirm">确定要删除该角色吗？</div>
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
import { deleteRole, getErrorMsg } from "@/http/api";
export default {
  name: "RoleDeletePopup",
  props: {
    info: Object
  },
  methods: {
    ...mapMutations(["hidePopup", "mutRoleChange"]),
    confirm() {
      deleteRole({
        ids: this.info.id
      })
        .then(res => {
          if (res.code === 200) {
            this.mutRoleChange();
          } else {
            this.$alert("删除失败，" + getErrorMsg(res), "错误提示", {
              confirmButtonText: "确定"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.hidePopup();
    }
  }
};
</script>

<style lang="stylus" scoped></style>
