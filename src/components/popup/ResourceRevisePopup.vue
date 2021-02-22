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
            :model="info"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="info.name"></el-input>
            </el-form-item>
            <el-form-item label="角色名称" prop="url">
              <el-input v-model="info.url"></el-input>
            </el-form-item>
            <el-form-item label="角色名称" prop="description">
              <el-select v-model="info.categoryId" placeholder="请选择">
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
                v-model="info.description"
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
import { getResourceType } from "@/http/api";
import axios from "axios";
export default {
  name: "ResourceRevisePopup",
  props: {
    info: Object
  },
  data() {
    return {
      options: [],
      rules: {
        title: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        des: [{ required: true, message: "请输入描述", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutResourceChange"]),
    confirm() {
      axios
        .post(
          "http://116.236.30.222:9700/admin/resource/update/" + this.info.id,
          this.info
        )
        .then(res => {
          if (res.data.code === 200) {
            this.mutResourceChange();
          }
        });
      this.hidePopup();
    }
  },
  created() {
    getResourceType().then(res => {
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
      this.info.categoryId = this.options[0].id;
    });
  }
};
</script>

<style lang="stylus" scoped>
.el-select
  width: 100%
</style>
