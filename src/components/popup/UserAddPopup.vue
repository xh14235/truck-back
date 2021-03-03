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
          label-width="25%"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
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
import { addUser, getRoleList } from "@/http/api";
export default {
  name: "UserAddPopup",
  data() {
    let psw2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请重复输入密码"));
      } else if (value !== this.ruleForm.psw) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: "",
        name: "",
        phone: "",
        roleId: "",
        email: "",
        psw: "",
        psw2: ""
      },
      options: [],
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        psw: [{ required: true, message: "请输入密码", trigger: "blur" }],
        psw2: [{ required: true, validator: psw2, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutUserChange"]),
    confirm() {
      if (this.ruleForm.psw === this.ruleForm.psw2) {
        addUser({
          city: "",
          icon: "",
          nickName: "",
          note: "",
          organizationId: 0,
          province: "",
          username: this.ruleForm.account,
          realName: this.ruleForm.name,
          roleId: this.ruleForm.roleId,
          password: this.$getRsaCode(this.ruleForm.psw),
          phone: this.ruleForm.phone,
          email: this.ruleForm.email
        }).then(res => {
          if (res.code === 200) {
            this.mutUserChange();
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
