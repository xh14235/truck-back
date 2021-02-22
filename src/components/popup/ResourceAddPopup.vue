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
import { getResourceType, createResource } from "@/http/api";
export default {
  name: "ResourceAddPopup",
  data() {
    return {
      options: [],
      ruleForm: {
        name: "",
        url: "",
        description: "",
        categoryId: ""
      },
      rules: {
        title: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        des: [{ required: true, message: "请输入描述", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutResourceChange"]),
    confirm() {
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
        }
      });
      this.hidePopup();
    }
  },
  created() {
    getResourceType().then(res => {
      console.log(res);
      if (res.code === 200) {
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
      this.ruleForm.categoryId = this.options[0].id;
    });
  }
};
</script>

<style lang="stylus" scoped>
.el-select
  width: 100%
</style>
