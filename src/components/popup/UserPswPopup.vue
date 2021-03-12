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
          label-width="25%"
        >
          <el-form-item label="密码" prop="psw">
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
      if (value === "") {
        this.errMsg[0] = "请输入密码";
        callback(new Error(this.errMsg[0]));
      } else {
        if (this.newPsw.psw2 !== "") {
          this.$refs.newPsw.validateField("psw2");
        }
        this.errMsg[0] = "";
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        this.errMsg[1] = "请再次输入密码";
        callback(new Error(this.errMsg[1]));
      } else if (value !== this.newPsw.psw) {
        this.errMsg[1] = "两次输入密码不一致";
        callback(new Error(this.errMsg[1]));
      } else {
        this.errMsg[1] = "";
        callback();
      }
    };
    return {
      errMsg: ["", ""],
      errShow: false,
      errIndex: 0,
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

      this.errShow = false;
      for (let i = 0; i < this.errMsg.length; i++) {
        if (this.errMsg[i]) {
          this.errShow = true;
          this.errIndex = i;
        }
      }
      if (this.errShow) {
        this.$alert(this.errMsg[this.errIndex], "错误提示", {
          confirmButtonText: "确定"
        });
      } else {
        axios
          .post(
            "http://116.236.30.222:9700/admin/admin/update/" + this.info.id,
            this.info
          )
          .then(res => {
            if (res.data.code === 200) {
              this.mutUserChange();
            } else {
              this.$alert("修改失败，" + getErrorMsg(res.data), "错误提示", {
                confirmButtonText: "确定"
              });
            }
          });
        this.hidePopup();
      }
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
