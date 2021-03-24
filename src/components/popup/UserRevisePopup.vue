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
            label-width="30%"
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
        <div class="reagon-popup-btn" @click="submitForm()">确定</div>
        <div class="reagon-popup-btn" @click="resetForm()">取消</div>
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
    let checkAccount = (rule, value, callback) => {
      let ddd = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].username === value && value !== this.info.username) {
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
    return {
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
          { required: true, validator: checkAccount, trigger: "blur" }
        ],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutUserChange"]),
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          axios
            .post(
              "http://116.236.30.222:9700/admin/admin/update/" + this.info.id,
              this.ruleForm
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
    for (const key in this.info) {
      this.ruleForm[key] = this.info[key];
    }
  }
};
</script>

<style lang="stylus" scoped></style>
