<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">编辑</div>
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
import { getResourceType, getErrorMsg } from "@/http/api";
import axios from "axios";
export default {
  name: "ResourceRevisePopup",
  props: {
    info: Object,
    list: Array
  },
  data() {
    let checkName = (rule, value, callback) => {
      let ddd = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].name === value && value !== this.info.name) {
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
      console.log(value);
      let ddd = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].url === value && value !== this.info.url) {
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
        createTime: "",
        id: 0,
        name: "",
        sort: 0,
        categoryId: "",
        description: "",
        url: ""
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
          axios
            .post(
              "http://116.236.30.222:9700/admin/resource/update/" +
                this.info.id,
              this.ruleForm
            )
            .then(res => {
              if (res.data.success) {
                this.mutResourceChange();
                this.hidePopup();
              } else {
                this.$message({
                  showClose: true,
                  message: "修改失败，" + getErrorMsg(res.data),
                  iconClass: "el-icon-warning"
                });
                // this.$alert("修改失败，" + getErrorMsg(res.data), "错误提示", {
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
      console.log(res);
      if (res.success) {
        this.options = res.data;
      } else {
        this.options = [
          {
            createTime: "",
            id: "",
            name: "全部",
            sort: "0"
          },
          {
            createTime: "",
            id: "",
            name: "用户管理",
            sort: "1"
          },
          {
            createTime: "",
            id: "",
            name: "台账管理",
            sort: "2"
          }
        ];
      }
      this.info.categoryId = this.options[0].id;
    });
    for (const key in this.info) {
      this.ruleForm[key] = this.info[key];
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-select
  width: 100%
</style>
