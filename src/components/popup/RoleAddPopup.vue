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
          <el-form-item label="是否启用" prop="using">
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
import { addRole, getErrorMsg } from "@/http/api";
export default {
  name: "RoleAddPopup",
  data() {
    let checkAccount = (rule, value, callback) => {
      let ddd = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].name === value) {
          ddd++;
        } else {
          ddd += 0;
        }
      }
      if (ddd > 0) {
        this.errMsg[0] = "该角色已存在";
        callback(new Error(this.errMsg[0]));
      } else {
        this.errMsg[0] = "";
      }
      if (value === "") {
        this.errMsg[1] = "请输入角色名称";
        callback(new Error(this.errMsg[1]));
      } else {
        this.errMsg[1] = "";
      }
    };
    return {
      errMsg: ["", ""],
      errShow: false,
      errIndex: 0,
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
  props: {
    list: Array
  },
  methods: {
    ...mapMutations(["hidePopup", "mutRoleChange"]),
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
        addRole({
          adminCount: 0,
          createTime: new Date(),
          description: this.ruleForm.description,
          id: 0,
          name: this.ruleForm.name,
          sort: 0,
          status: this.ruleForm.status
        }).then(res => {
          if (res.code === 200) {
            this.mutRoleChange();
          } else {
            this.$alert("添加失败，" + getErrorMsg(res), "错误提示", {
              confirmButtonText: "确定"
            });
          }
        });
        this.hidePopup();
      }
    }
  }
};
</script>

<style lang="stylus" scoped></style>
