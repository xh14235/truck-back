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
      if (ddd > 0) {
        this.errMsg[0] = "该资源名称已存在";
        callback(new Error(this.errMsg[0]));
      } else {
        this.errMsg[0] = "";
      }
      if (value === "") {
        this.errMsg[1] = "请输入资源名称";
        callback(new Error(this.errMsg[1]));
      } else {
        this.errMsg[1] = "";
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
      if (ddd > 0) {
        this.errMsg[2] = "该路径已存在";
        callback(new Error(this.errMsg[2]));
      } else {
        this.errMsg[2] = "";
      }
      if (value === "") {
        this.errMsg[3] = "请输入路径";
        callback(new Error(this.errMsg[3]));
      } else {
        this.errMsg[3] = "";
      }
    };
    return {
      errMsg: ["", "", "", ""],
      errShow: false,
      errIndex: 0,
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
        createResource({
          categoryId: this.ruleForm.categoryId,
          createTime: new Date(),
          description: this.ruleForm.description,
          id: 0,
          name: this.ruleForm.name,
          url: this.ruleForm.url
        }).then(res => {
          if (res.code === 200) {
            this.mutResourceChange();
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
    getResourceType().then(res => {
      if (res.code === 200) {
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
