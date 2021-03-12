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
import axios from "axios";
import { getErrorMsg } from "@/http/api";
export default {
  name: "MenuRevisePopup",
  props: {
    info: Object,
    list: Array,
    array: Array
  },
  data() {
    let checkTitle = (rule, value, callback) => {
      let ddd = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].title === value && value !== this.info.title) {
          ddd++;
        } else {
          ddd += 0;
        }
      }
      if (ddd > 0) {
        this.errMsg[0] = "该菜单名称已存在";
        callback(new Error(this.errMsg[0]));
      } else {
        this.errMsg[0] = "";
      }
      if (value === "") {
        this.errMsg[1] = "请输入菜单名称";
        callback(new Error(this.errMsg[1]));
      } else {
        this.errMsg[1] = "";
      }
    };
    let checkName = (rule, value, callback) => {
      let ddd = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].name === value && value !== this.info.name) {
          ddd++;
        } else {
          ddd += 0;
        }
      }
      if (ddd > 0) {
        this.errMsg[2] = "该前端名称已存在";
        callback(new Error(this.errMsg[2]));
      } else {
        this.errMsg[2] = "";
      }
      if (value === "") {
        this.errMsg[3] = "请输入前端名称";
        callback(new Error(this.errMsg[3]));
      } else {
        this.errMsg[3] = "";
      }
    };
    return {
      errMsg: ["", "", "", ""],
      errShow: false,
      errIndex: 0,
      ruleForm: {
        createTime: "",
        hidden: 0,
        icon: "",
        id: 0,
        level: 0,
        name: "",
        parentId: 0,
        sort: 0,
        title: ""
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
        axios
          .post(
            "http://116.236.30.222:9700/admin/menu/update/" + this.info.id,
            this.ruleForm
          )
          .then(res => {
            if (res.data.code === 200) {
              this.mutMenuChange();
            } else {
              this.$alert("修改失败，" + getErrorMsg(res.data), "错误提示", {
                confirmButtonText: "确定"
              });
            }
          });
        this.hidePopup();
      }
    }
  },
  created() {
    for (const key in this.info) {
      this.ruleForm[key] = this.info[key];
    }
  }
};
</script>

<style lang="stylus" scoped></style>
