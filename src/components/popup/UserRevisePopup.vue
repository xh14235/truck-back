<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">编辑</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <div class="ddd" v-if="ruleForm">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="25%"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input v-model="ruleForm.username" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="realName">
              <el-input v-model="ruleForm.realName"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="roleId">
              <el-select v-model="ruleForm.roleId" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="status">
              <el-radio-group v-model="ruleForm.status">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
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
import { getRoleList, getErrorMsg } from "@/http/api";
import axios from "axios";
export default {
  name: "UserRevisePopup",
  props: {
    info: Object,
    list: Array
  },
  data() {
    let checkUsername = (rule, value, callback) => {
      let ddd = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].username === value && value !== this.info.username) {
          ddd++;
        } else {
          ddd += 0;
        }
      }
      if (ddd > 0) {
        this.errMsg[0] = "该账号已存在";
        callback(new Error(this.errMsg[0]));
      } else {
        this.errMsg[0] = "";
      }
      if (value === "") {
        this.errMsg[1] = "请输入账号";
        callback(new Error(this.errMsg[1]));
      } else {
        this.errMsg[1] = "";
      }
    };
    let checkPhone = (rule, value, callback) => {
      if (!this.phoneReg.test(value)) {
        this.errMsg[2] = "请输入11位手机号码";
        callback(new Error(this.errMsg[2]));
      } else {
        this.errMsg[2] = "";
      }
    };
    let checkEmail = (rule, value, callback) => {
      if (!this.emailReg.test(value)) {
        this.errMsg[3] = "请输入正确的邮箱";
        callback(new Error(this.errMsg[3]));
      } else {
        this.errMsg[3] = "";
      }
    };
    return {
      errMsg: ["", "", "", ""],
      errShow: false,
      errIndex: 0,
      phoneReg: /^[1][3,4,5,7,8,9][0-9]{9}$/,
      emailReg: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
      options: [],
      ruleForm: {
        city: "",
        email: "",
        icon: "",
        nickName: "",
        note: "",
        phone: "",
        province: "",
        realName: "",
        roleId: 0,
        status: 0,
        username: ""
      },
      rules: {
        username: [
          { required: true, validator: checkUsername, trigger: "blur" }
        ],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutUserChange"]),
    confirm() {
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
            this.ruleForm
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
    for (const key in this.info) {
      this.ruleForm[key] = this.info[key];
    }
  }
};
</script>

<style lang="stylus" scoped></style>
