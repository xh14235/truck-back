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
            <el-form-item label="菜单名称" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
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
            <el-form-item label="前端名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <!-- <el-form-item label="前端图标" prop="icon">
              <el-input v-model="ruleForm.icon"></el-input>
            </el-form-item> -->
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
import { createMenu, getErrorMsg } from "@/http/api";
export default {
  name: "MenuAddPopup",
  props: {
    list: Array,
    array: Array
  },
  data() {
    let checkTitle = (rule, value, callback) => {
      let ddd = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].title === value) {
          ddd++;
        } else {
          ddd += 0;
        }
      }
      if (value === "") {
        callback(new Error("请输入菜单名称"));
      } else {
        if (ddd > 0) {
          callback(new Error("该菜单名称已存在"));
        }
        callback();
      }
    };
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
        callback(new Error("请输入前端名称"));
      } else {
        if (ddd > 0) {
          callback(new Error("该前端名称已存在"));
        }
        callback();
      }
    };
    return {
      ruleForm: {
        title: "",
        parentId: 0,
        name: "",
        icon: "",
        sort: 0,
        hidden: 0
      },
      rules: {
        name: [{ required: true, validator: checkName, trigger: "blur" }],
        title: [{ required: true, validator: checkTitle, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutMenuChange"]),
    confirm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          createMenu({
            // createTime: new Date(),
            hidden: this.ruleForm.hidden,
            icon: this.ruleForm.icon,
            // id: 0,
            level: 0,
            name: this.ruleForm.name,
            parentId: this.ruleForm.parentId,
            sort: this.ruleForm.sort,
            title: this.ruleForm.title
          }).then(res => {
            if (res.success) {
              this.mutMenuChange();
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
  }
};
</script>

<style lang="stylus" scoped></style>
