<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">提示</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
import qs from "qs";
export default {
  name: "UserRolePopup",
  props: {
    info: Object
  },
  data() {
    return {
      options: [
        {
          value: 0,
          label: "超级管理员"
        },
        {
          value: 1,
          label: "管理员"
        },
        {
          value: 2,
          label: "普通成员"
        }
      ],
      value: 0
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutUserChange"]),
    confirm() {
      axios
        .post(
          "http://116.236.30.222:9700/admin/admin/role/update",
          qs.stringify({
            adminId: this.info.id,
            roleIds: this.value
          })
        )
        .then(res => {
          if (res.data.code === 200) {
            this.mutUserChange();
          }
        });
      this.hidePopup();
    }
  }
};
</script>

<style lang="stylus" scoped>
.reagon-popup-main
  text-align: center
</style>
