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
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
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
          <!-- <el-form-item label="是否启用" prop="using">
            <el-radio-group v-model="ruleForm.using">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item> -->
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
import { addUser } from "@/http/api";
export default {
  name: "UserAddPopup",
  data() {
    return {
      ruleForm: {
        account: "",
        name: "",
        phone: "",
        email: "",
        psw: "",
        psw2: ""
        // using: 1
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱地址", trigger: "blur" }],
        psw: [{ required: true, message: "请输入密码", trigger: "blur" }],
        psw2: [{ required: true, message: "请再次输入密码", trigger: "blur" }],
        using: [{ required: true, message: "", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutUserChange"]),
    confirm() {
      addUser({
        city: "",
        icon: "",
        nickName: "",
        note: "",
        organizationId: 0,
        province: "",
        username: this.ruleForm.account,
        realName: this.ruleForm.name,
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
};
</script>

<style lang="stylus" scoped></style>
