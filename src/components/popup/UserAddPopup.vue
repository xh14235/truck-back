<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">添加账号</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="30%"
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
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
          <el-form-item label="密码" prop="psw">
            <el-input type="password" v-model="ruleForm.psw"></el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="psw2">
            <el-input type="password" v-model="ruleForm.psw2"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="reagon-popup-bottom">
        <div class="reagon-popup-btn" @click="submitForm()">确定</div>
        <div class="reagon-popup-btn" @click="resetForm()">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { addUser, getRoleList, getErrorMsg } from "@/http/api";
export default {
  name: "UserAddPopup",
  data() {
    let psw2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请重复输入密码"));
      } else if (value !== this.ruleForm.psw) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    let checkAccount = (rule, value, callback) => {
      let ddd = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].username === value) {
          ddd++;
        } else {
          ddd += 0;
        }
      }
      if (!value) {
        callback(new Error("请输入账号"));
      } else {
        if (ddd > 0) {
          callback(new Error("该账号已存在"));
        }
        callback();
      }
    };
    let checkPhone = (rule, value, callback) => {
      if (value && !this.phoneReg.test(value)) {
        callback(new Error("请输入11位手机号码"));
      } else {
        callback();
      }
    };
    let checkEmail = (rule, value, callback) => {
      if (value && !this.emailReg.test(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    let psw = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      phoneReg: /^[1][3,4,5,7,8,9][0-9]{9}$/,
      emailReg: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
      ruleForm: {
        username: "",
        realName: "",
        phone: "",
        roleId: "",
        email: "",
        psw: "",
        psw2: ""
      },
      options: [],
      rules: {
        username: [
          { required: true, validator: checkAccount, trigger: "blur" }
        ],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        psw: [{ required: true, validator: psw, trigger: "blur" }],
        psw2: [{ required: true, validator: psw2, trigger: "blur" }]
      }
    };
  },
  props: {
    list: Array
  },
  methods: {
    ...mapMutations(["hidePopup", "mutUserChange"]),
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          addUser({
            city: "",
            icon: "",
            nickName: "",
            note: "",
            organizationId: 0,
            province: "",
            username: this.ruleForm.username,
            realName: this.ruleForm.realName,
            roleId: this.ruleForm.roleId,
            password: this.$getRsaCode(this.ruleForm.psw),
            phone: this.ruleForm.phone,
            email: this.ruleForm.email
          }).then(res => {
            if (res.success) {
              this.mutUserChange();
              this.hidePopup();
            } else {
              this.$message({
                showClose: true,
                message: "添加失败，" + getErrorMsg(res),
                iconClass: "el-icon-warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["ruleForm"].resetFields();
      this.hidePopup();
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

<style lang="stylus" scoped>
.disabled
  color: red
</style>
