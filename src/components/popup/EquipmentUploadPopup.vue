<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">导入</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <div class="reagon-popup-info">
          <div class="reagon-upload-wrapper">
            <div class="reagon-upload-input">
              点击上传
              <input @change="getFiles" type="file" />
            </div>
            <div class="reagon-upload-label">{{ file.name }}</div>
          </div>
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
import { mapState, mapMutations } from "vuex";
import { getErrorMsg } from "@/http/api";
import axios from "axios";
export default {
  name: "EquipmentUploadPopup",
  data() {
    return {
      file: {}
    };
  },
  computed: {
    ...mapState({
      baseUrl: state => state.common.baseUrl
    })
  },
  methods: {
    ...mapMutations(["hidePopup", "mutEquipmentChange"]),
    confirm() {
      let formData = new FormData();
      formData.append("file", this.file);
      if (
        this.file.type === "application/vnd.ms-excel" ||
        this.file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        axios
          .post(this.baseUrl + "admin/admin/meter/import/excel", formData)
          .then(res => {
            if (res.data.success) {
              this.mutEquipmentChange();
              this.hidePopup();
            } else {
              this.$alert("导入失败，" + getErrorMsg(res.data), "错误提示", {
                confirmButtonText: "确定"
              });
            }
          });
      } else {
        this.$alert("文件格式错误", "错误提示", {
          confirmButtonText: "确定"
        });
      }
    },
    getFiles(e) {
      let file = e.target.files[0];
      if (
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        this.file = file;
      } else {
        this.$alert("文件格式错误，可能会导入不成功", "错误提示", {
          confirmButtonText: "确定"
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.reagon-upload-wrapper
  text-align: center
  .reagon-upload-input
    width: 8vw
    margin: 0 auto
    text-align: center
    height: 1.875vw
    line-height: 1.875vw
    background: $blue
    color: $white
    border-radius: 0.9375vw
    overflow: hidden
    position: relative
    cursor: pointer
    input
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 1.875vw
      opacity: 0
      cursor: pointer
</style>
