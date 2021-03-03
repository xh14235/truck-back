<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">编辑</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <div class="ddd" v-if="info">
          <el-form
            :model="info"
            :rules="rules"
            ref="ruleForm"
            label-width="25%"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input v-model="info.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="realName">
              <el-input v-model="info.realName"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="roleId">
              <el-select v-model="info.roleId" placeholder="请选择">
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
              <el-input v-model="info.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" prop="email">
              <el-input v-model="info.email"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="status">
              <el-radio-group v-model="info.status">
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
import { getRoleList } from "@/http/api";
import axios from "axios";
export default {
  name: "UserRevisePopup",
  props: {
    info: Object
  },
  data() {
    return {
      options: [],
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱地址", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutUserChange"]),
    confirm() {
      if (this.psw2 === this.psw) {
        axios
          .post(
            "http://116.236.30.222:9700/admin/admin/update/" + this.info.id,
            this.info
          )
          .then(res => {
            if (res.data.code === 200) {
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
