<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">提示</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <div class="reagon-popup-info">
          <el-checkbox-group v-model="list2">
            <el-checkbox v-for="item of list" :key="item.id" :label="item.id">{{
              item.name
            }}</el-checkbox>
          </el-checkbox-group>
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
// import qs from "qs";
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
        console.log(res.data);
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
    }
  },
  created() {
    this.getResourceList();
  }
};
</script>

<style lang="stylus" scoped></style>
