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
            <div class="reagon-upload-label">导入文件</div>
            <div class="reagon-upload-name">{{ file.name || "暂无文件" }}</div>
            <div class="reagon-upload-input">
              选择文件
              <input @change="getFiles" type="file" />
            </div>
            <div class="reagon-upload-error">{{ errorMsg }}</div>
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
      file: {},
      errorMsg: ""
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
              this.$message({
                message:
                  "导入成功！有" + res.data.data.repeat + "条重复信息，已过滤",
                type: "success"
              });
              this.hidePopup();
            } else {
              this.$message({
                message: "导入失败，" + getErrorMsg(res.data),
                iconClass: "el-icon-warning"
              });
              // this.$alert("导入失败，" + getErrorMsg(res.data), "错误提示", {
              //   confirmButtonText: "确定"
              // });
            }
          });
      } else {
        this.$message.error("导入失败，文件格式错误");
        // this.$alert("文件格式错误", "错误提示", {
        //   confirmButtonText: "确定"
        // });
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
        this.errorMsg = "";
      } else {
        this.errorMsg = "文件格式错误";
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.reagon-upload-wrapper
  display: flex
  align-items: flex-start
  flex-wrap: wrap
  .reagon-upload-input, .reagon-upload-name, .reagon-upload-label, .reagon-upload-error
    text-align: center
    height: 1.6667vw
    line-height: 1.6667vw
  .reagon-upload-label
    flex: 0 0 20%
  .reagon-upload-name
    flex: 0 0 40%
    width: 40%
    margin: 0 5%
    border: 1px solid #666
    border-radius: 4px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
  .reagon-upload-error
    margin-left: 25%
    flex: 0 0 40%
    width: 40%
    color: red
  .reagon-upload-input
    flex: 0 0 30%
    width: 30%
    text-align: center
    height: 1.6667vw
    line-height: 1.6667vw
    background: $blue2
    color: $white
    border-radius: 0.8333vw
    overflow: hidden
    position: relative
    cursor: pointer
    input
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 1.6667vw
      opacity: 0
      cursor: pointer
</style>
