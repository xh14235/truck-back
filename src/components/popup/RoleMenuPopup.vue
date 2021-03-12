<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">分配菜单</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <div class="reagon-popup-info">
          <div class="check-group check-title">
            <div class="check-group-left">一级</div>
            <div class="check-group-right">二级</div>
          </div>
          <div
            class="check-group-wrapper"
            v-for="(item, index) of list"
            :key="index"
          >
            <el-checkbox-group class="check-group" v-model="list2">
              <div class="check-group-left">
                <el-checkbox
                  :label="item.id"
                  v-model="item.hidden"
                  @change="leftChange($event, item)"
                  >{{ item.title }}</el-checkbox
                >
              </div>
              <div class="check-group-right">
                <el-checkbox
                  v-for="item2 of item.children"
                  :key="item2.id"
                  :label="item2.id"
                  v-model="item2.hidden"
                  @change="rightChange($event, item)"
                  >{{ item2.title }}</el-checkbox
                >
              </div>
            </el-checkbox-group>
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
import { mapMutations } from "vuex";
import { getMenuList, menuToRole, getErrorMsg } from "@/http/api";
import axios from "axios";
export default {
  name: "RolMenuPopup",
  props: {
    info: Object
  },
  data() {
    return {
      list: [],
      list2: []
    };
  },
  methods: {
    ...mapMutations(["hidePopup", "mutRoleChange"]),
    confirm() {
      let param = new URLSearchParams();
      param.append("menuIds", this.list2);
      param.append("roleId", this.info.id);
      menuToRole(param).then(res => {
        if (res.code === 200) {
          this.mutRoleChange();
        } else {
          this.$alert("分配失败，" + res.message, "错误提示", {
            confirmButtonText: "确定"
          });
        }
      });
      this.hidePopup();
    },
    leftChange(e, item) {
      let children = item.children;
      for (let i = 0; i < children.length; i++) {
        if (e) {
          this.list2.push(children[i].id);
        } else {
          for (let j = 0; j < this.list2.length; j++) {
            if (this.list2[j] === children[i].id) {
              this.list2.splice(j, 1);
            }
          }
        }
      }
    },
    rightChange(e, item) {
      if (e) {
        if (!this.list2.includes(item.id)) {
          this.list2.push(item.id);
        }
      } else {
        let children = item.children;
        var n = 0;
        for (var i = 0; i < children.length; i++) {
          for (var j = 0; j < this.list2.length; j++) {
            if (this.list2[j] === children[i].id) {
              n++;
            }
          }
        }
        if (n === 0) {
          for (let i = 0; i < this.list2.length; i++) {
            if (this.list2[i] === item.id) {
              this.list2.splice(i, 1);
            }
          }
        }
      }
    }
  },
  created() {
    getMenuList().then(res => {
      this.list = res.data;
    });
    axios
      .get("http://116.236.30.222:9700/admin/role/listMenu/" + this.info.id, {
        roleId: this.info.id
      })
      .then(res => {
        let data = res.data.data;
        this.list2 = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].hidden === 0) {
            this.list2.push(data[i].id);
          } else {
            this.$alert("分配失败" + getErrorMsg(res.data), "错误提示", {
              confirmButtonText: "确定"
            });
          }
        }
      });
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.el-checkbox-group >>> .el-checkbox__label
  font-size: 0.9375vw
.el-checkbox-group >>> .el-checkbox__inner
  width: 0.9375vw
  height: 0.9375vw
.el-checkbox-group >>> .el-checkbox__inner::after
  width: 0.3125vw
  height: 0.625vw
  left: 0.25vw
  top: 0
.check-group-wrapper
  margin-top: 1.458vw
.check-group
  margin: 0 auto
  width: 17.8125vw
  display: flex
  flex-wrap: wrap
  &.check-title
    font-size: 0.9375vw
    color: $tableHead
    .check-group-left, .check-group-right
      padding-left: 1.458vw
  .check-group-left, .check-group-right
    flex: 0 0 50%
    width: 50%
  .check-group-right
    .el-checkbox
      font-size: 0.9375vw
      width: 100%
      .el-checkbox__label
        font-size: 0.9375vw
</style>
