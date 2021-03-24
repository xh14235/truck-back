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
      if (!value) {
        callback(new Error("请输入角色名称"));
      } else {
        if (ddd > 0) {
          callback(new Error("该账号已存在"));
        }
        callback();
      }
    };
    return {
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
    // getTime() {
    //   let time = new Date();
    //   let year = time.getFullYear();
    //   let month = time.getMonth() + 1;
    //   month = month > 9 ? month : "0" + month;
    //   let day = time.getDate();
    //   day = day > 9 ? day : "0" + day;
    //   let hour = time.getHours();
    //   hour = hour > 9 ? hour : "0" + hour;
    //   let minute = time.getMinutes();
    //   minute = minute > 9 ? minute : "0" + minute;
    //   let second = time.getSeconds();
    //   second = second > 9 ? second : "0" + second;
    //   return (
    //     year +
    //     "-" +
    //     month +
    //     "-" +
    //     day +
    //     " " +
    //     hour +
    //     ":" +
    //     minute +
    //     ":" +
    //     second
    //   );
    // },
    confirm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          addRole({
            adminCount: 0,
            // createTime: new Date(),
            description: this.ruleForm.description,
            id: 0,
            name: this.ruleForm.name,
            sort: 0,
            status: this.ruleForm.status
          }).then(res => {
            if (res.success) {
              this.mutRoleChange();
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
    }
  }
};
</script>

<style lang="stylus" scoped></style>
