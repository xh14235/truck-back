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
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单" prop="parentId">
              <el-select v-model="ruleForm.parentId" placeholder="请选择">
                <el-option
                  v-for="item in list"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="前端名称" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="前端图标" prop="icon">
              <el-input v-model="ruleForm.icon"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number
                v-model="ruleForm.sort"
                :min="0"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="是否启用" prop="hidden">
              <el-radio-group v-model="ruleForm.hidden">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
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
import { createMenu } from "@/http/api";
export default {
  name: "MenuAddPopup",
  props: {
    list: Array
  },
  data() {
    return {
      ruleForm: {
        name: "",
        parentId: 0,
        title: "",
        icon: "",
        sort: 0,
        hidden: 0
      },
      rules: {
        name: [{ required: true, message: "请输入彩打 名称", trigger: "blur" }],
        title: [{ required: true, message: "请输入前端名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutMenuChange"]),
    confirm() {
      createMenu({
        createTime: new Date(),
        hidden: this.ruleForm.hidden,
        icon: this.ruleForm.icon,
        id: 0,
        level: 0,
        name: this.ruleForm.name,
        parentId: this.ruleForm.parentId,
        sort: this.ruleForm.sort,
        title: this.ruleForm.title
      }).then(res => {
        if (res.code === 200) {
          this.mutMenuChange();
        }
      });
      this.hidePopup();
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-select
  width: 100%
</style>
