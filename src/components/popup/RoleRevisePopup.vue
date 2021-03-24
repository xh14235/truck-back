<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">提示</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input
              type="textarea"
              :rows="3"
              v-model="ruleForm.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-radio-group v-model="ruleForm.status">
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
import { getErrorMsg } from "@/http/api";
import axios from "axios";
export default {
  name: "RoleRevisePopup",
  props: {
    info: Object,
    list: Array
  },
  data() {
    let checkAccount = (rule, value, callback) => {
      let ddd = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].name === value && value !== this.info.name) {
          ddd++;
        } else {
          ddd += 0;
        }
      }
      if (!value) {
        callback(new Error("请输入角色名称"));
      } else {
        if (ddd > 0) {
          callback(new Error("该账号已存在"));
        }
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        description: "",
        status: 1
      },
      rules: {
        name: [{ required: true, validator: checkAccount, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutRoleChange"]),
    confirm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          axios
            .post(
              "http://116.236.30.222:9700/admin/role/update/" + this.info.id,
              this.ruleForm
            )
            .then(res => {
              if (res.data.success) {
                this.mutRoleChange();
                this.hidePopup();
              } else {
                this.$message({
                  showClose: true,
                  message: "删除失败，" + getErrorMsg(res.data),
                  iconClass: "el-icon-warning"
                });
                // this.$alert("修改失败，" + getErrorMsg(res.data), "错误提示", {
                //   confirmButtonText: "确定"
                // });
              }
            });
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.ruleForm.name = this.info.name;
    this.ruleForm.description = this.info.description;
    this.ruleForm.status = this.info.status;
  }
};
</script>

<style lang="stylus" scoped></style>
