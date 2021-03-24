<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">提示</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <div class="reagon-popup-info">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="资源名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="资源路径" prop="url">
              <el-input v-model="ruleForm.url"></el-input>
            </el-form-item>
            <el-form-item label="资源分类" prop="description">
              <el-select v-model="ruleForm.categoryId" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input
                type="textarea"
                :rows="3"
                v-model="ruleForm.description"
              ></el-input>
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
import { getResourceType, createResource, getErrorMsg } from "@/http/api";
export default {
  name: "ResourceAddPopup",
  props: {
    list: Array
  },
  data() {
    let checkName = (rule, value, callback) => {
      let ddd = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].name === value) {
          ddd++;
        } else {
          ddd += 0;
        }
      }
      if (value === "") {
        callback(new Error("请输入资源名称"));
      } else {
        if (ddd > 0) {
          callback(new Error("该资源名称已存在"));
        }
        callback();
      }
    };
    let checkUrl = (rule, value, callback) => {
      let ddd = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].url === value) {
          ddd++;
        } else {
          ddd += 0;
        }
      }
      if (value === "") {
        callback(new Error("请输入路径"));
      } else {
        if (ddd > 0) {
          callback(new Error("该路径已存在"));
        }
        callback();
      }
    };
    return {
      options: [],
      ruleForm: {
        name: "",
        url: "",
        description: "",
        categoryId: ""
      },
      rules: {
        name: [{ required: true, validator: checkName, trigger: "blur" }],
        url: [{ required: true, validator: checkUrl, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutResourceChange"]),
    confirm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          createResource({
            categoryId: this.ruleForm.categoryId,
            createTime: new Date(),
            description: this.ruleForm.description,
            id: 0,
            name: this.ruleForm.name,
            url: this.ruleForm.url
          }).then(res => {
            if (res.success) {
              this.mutResourceChange();
              this.hidePopup();
            } else {
              this.$message({
                showClose: true,
                message: "添加失败，" + getErrorMsg(res),
                iconClass: "el-icon-warning"
              });
              // this.$alert("添加失败，" + getErrorMsg(res), "错误提示", {
              //   confirmButtonText: "确定"
              // });
            }
          });
        } else {
          return false;
        }
      });
    }
  },
  created() {
    getResourceType().then(res => {
      if (res.success) {
        this.options = res.data;
      }
      this.ruleForm.categoryId = this.options[0].id;
    });
  }
};
</script>

<style lang="stylus" scoped>
.el-select
  width: 100%
</style>
