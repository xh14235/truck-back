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
import { deleteRole } from "@/http/api";
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
