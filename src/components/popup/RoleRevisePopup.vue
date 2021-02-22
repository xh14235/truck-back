<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">提示</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <el-form
          :model="info"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="info.name"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input
              type="textarea"
              :rows="3"
              v-model="info.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-radio-group v-model="info.status">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
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
  name: "RoleRevisePopup",
  props: {
    info: Object
  },
  data() {
    return {
      ruleForm: {
        title: "",
        des: "",
        using: "是"
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutRoleChange"]),
    confirm() {
      axios
        .post(
          "http://116.236.30.222:9700/admin/role/update/" + this.info.id,
          this.info
        )
        .then(res => {
          if (res.data.code === 200) {
            this.mutRoleChange();
          }
        });
      this.hidePopup();
    }
  }
};
</script>

<style lang="stylus" scoped></style>
