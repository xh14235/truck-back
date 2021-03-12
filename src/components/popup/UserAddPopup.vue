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
          label-width="25%"
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
        <div class="reagon-popup-btn" @click="confirm()">确定</div>
        <div class="reagon-popup-btn" @click="hidePopup()">取消</div>
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
        this.errMsg[0] = "请重复输入密码";
        callback(new Error(this.errMsg[0]));
      } else if (value !== this.ruleForm.psw) {
        this.errMsg[0] = "两次输入密码不一致";
        callback(new Error(this.errMsg[0]));
      } else {
        this.errMsg[0] = "";
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
      if (ddd > 0) {
        this.errMsg[1] = "该账号已存在";
        callback(new Error(this.errMsg[1]));
      } else {
        this.errMsg[1] = "";
      }
      if (value === "") {
        this.errMsg[2] = "请输入账号";
        callback(new Error(this.errMsg[2]));
      } else {
        this.errMsg[2] = "";
      }
    };
    let checkPhone = (rule, value, callback) => {
      if (!this.phoneReg.test(value)) {
        this.errMsg[3] = "请输入11位手机号码";
        callback(new Error(this.errMsg[3]));
      } else {
        this.errMsg[3] = "";
      }
    };
    let checkEmail = (rule, value, callback) => {
      if (!this.emailReg.test(value)) {
        this.errMsg[4] = "请输入正确的邮箱";
        callback(new Error(this.errMsg[4]));
      } else {
        this.errMsg[4] = "";
      }
    };
    return {
      errMsg: ["", "", "", "", ""],
      errShow: false,
      errIndex: 0,
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
        psw: [{ required: true, message: "请输入密码", trigger: "blur" }],
        psw2: [{ required: true, validator: psw2, trigger: "blur" }]
      }
    };
  },
  props: {
    list: Array
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
          if (res.code === 200) {
            this.mutUserChange();
          } else {
            this.$alert("添加失败，" + getErrorMsg(res), "错误提示", {
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
