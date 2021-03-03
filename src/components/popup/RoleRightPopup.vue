<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">提示</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <div class="reagon-popup-info">
          <div class="check-group">
            <el-checkbox-group v-model="list2">
              <el-checkbox
                v-for="item of list"
                :key="item.id"
                :label="item.id"
                >{{ item.name }}</el-checkbox
              >
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
import { getAllResource, ResourceToRole } from "@/http/api";
import axios from "axios";
export default {
  name: "RoleRightPopup",
  data() {
    return {
      list: [],
      list2: []
    };
  },
  props: {
    info: Object
  },
  methods: {
    ...mapMutations(["hidePopup", "mutRoleChange"]),
    confirm() {
      let param = new URLSearchParams();
      param.append("resourceIds", this.list2);
      param.append("roleId", this.info.id);
      ResourceToRole(param).then(res => {
        if (res.code === 200) {
          this.mutRoleChange();
        }
      });
      this.hidePopup();
    },
    getResourceList() {
      getAllResource().then(res => {
        if (res.code === 200) {
          this.list = res.data;
        } else {
          this.list = [
            {
              categoryId: 0,
              createTime: "2012:12:12",
              description: "",
              id: 0,
              name: "后台用户管理",
              url: "/admin"
            }
          ];
        }
      });
    },
    getResourceActiveList() {
      axios
        .get(
          "http://116.236.30.222:9700/admin/role/listResource/" + this.info.id
        )
        .then(res => {
          let data = res.data.data;
          this.list2 = [];
          for (let i = 0; i < data.length; i++) {
            this.list2.push(data[i].id);
          }
        });
    }
  },
  created() {
    this.getResourceList();
    this.getResourceActiveList();
  }
};
</script>

<style lang="stylus" scoped>
.el-checkbox-group >>> .el-checkbox__label
  font-size: 0.9375vw
// .el-checkbox-group >>> .el-checkbox__input
// vertical-align: bottom
.el-checkbox-group >>> .el-checkbox__inner
  width: 0.9375vw
  height: 0.9375vw
.el-checkbox-group >>> .el-checkbox__inner::after
  width: 0.3125vw
  height: 0.625vw
  left: 0.25vw
  top: 0
.el-checkbox-group
  margin: 0 auto
  width: 17.8125vw
  display: flex
  flex-wrap: wrap
  .el-checkbox
    flex: 0 0 50%
    width: 50%
    margin-right: 0
    margin-bottom: 0.677vw
</style>
