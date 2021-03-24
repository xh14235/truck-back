<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">提示</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <el-form
          :model="newPsw"
          :rules="rules"
          ref="ruleForm"
          label-width="30%"
        >
          <el-form-item label="新密码" prop="psw">
            <el-input type="password" v-model="newPsw.psw"></el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="psw2">
            <el-input type="password" v-model="newPsw.psw2"></el-input>
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
import { getRoleList, getErrorMsg } from "@/http/api";
import axios from "axios";
export default {
  name: "UserRolePopup",
  props: {
    info: Object
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        if (this.newPsw.psw2 !== "") {
          this.$refs.ruleForm.validateField("psw2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.newPsw.psw) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      newPsw: {
        psw: "",
        psw2: ""
      },
      rules: {
        psw: [{ required: true, validator: validatePass, trigger: "blur" }],
        psw2: [{ required: true, validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutUserChange"]),
    confirm() {
      this.info.password = this.newPsw.psw;

      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          axios
            .post(
              "http://116.236.30.222:9700/admin/admin/update/" + this.info.id,
              this.info
            )
            .then(res => {
              if (res.data.success) {
                this.mutUserChange();
                this.hidePopup();
              } else {
                this.$message({
                  showClose: true,
                  message: "修改失败，" + getErrorMsg(res.data),
                  iconClass: "el-icon-warning"
                });
              }
            });
        } else {
          return false;
        }
      });
    }
  },
  created() {
    getRoleList({
      keyword: "",
      pageNum: 1,
      pageSize: 10
    }).then(res => {
      this.options = res.data.list;
    });
  }
};
</script>

<style lang="stylus" scoped></style>
