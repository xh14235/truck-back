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
          <el-form-item label="角色名称" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="des">
            <el-input
              type="textarea"
              :rows="3"
              v-model="ruleForm.des"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否启用" prop="using">
            <el-radio-group v-model="ruleForm.using">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
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
import { addRole } from "@/http/api";
export default {
  name: "RoleAddPopup",
  data() {
    return {
      ruleForm: {
        title: "",
        des: "",
        using: "是"
      },
      rules: {
        title: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        des: [{ required: true, message: "请输入描述", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutRoleChange"]),
    confirm() {
      addRole({
        adminCount: 0,
        createTime: new Date(),
        description: this.ruleForm.des,
        id: 0,
        name: this.ruleForm.title,
        sort: 0,
        status: this.ruleForm.using === "是" ? 1 : 0
      }).then(res => {
        if (res.code === 200) {
          this.mutRoleChange();
        }
      });
      this.hidePopup();
    }
  }
};
</script>

<style lang="stylus" scoped></style>
