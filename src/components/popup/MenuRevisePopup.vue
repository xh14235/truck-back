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
            :model="info"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="info.name"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单" prop="parentId">
              <el-select v-model="info.parentId" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="前端名称" prop="title">
              <el-input v-model="info.title"></el-input>
            </el-form-item>
            <el-form-item label="前端图标" prop="icon">
              <el-input v-model="info.icon"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number
                v-model="info.sort"
                :min="0"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="是否启用" prop="hidden">
              <el-radio-group v-model="info.hidden">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
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
import qs from "qs";
export default {
  name: "MenuRevisePopup",
  props: {
    info: Object
  },
  data() {
    return {
      options: [
        {
          label: "无上级菜单",
          value: 0
        }
      ],
      rules: {
        name: [{ required: true, message: "请输入彩打 名称", trigger: "blur" }],
        title: [{ required: true, message: "请输入前端名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutMenuChange"]),
    confirm() {
      axios
        .post(
          "http://116.236.30.222:9700/admin/menu/update/" + this.info.id,
          qs.stringify(this.info)
        )
        .then(res => {
          if (res.data.code === 200) {
            this.mutMenuChange();
          }
        });
      this.hidePopup();
    }
  }
};
</script>

<style lang="stylus" scoped></style>
