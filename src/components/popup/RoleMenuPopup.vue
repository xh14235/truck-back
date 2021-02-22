<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper video-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">分配菜单</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <div class="reagon-popup-info">
          <div class="check-group" v-for="(item, index) of list" :key="index">
            <el-checkbox-group v-model="list2">
              <el-checkbox
                v-for="item2 of item.children"
                :key="item2.id"
                :label="item2.id"
                >{{ item2.title }}</el-checkbox
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
import { getMenuList, menuToRole } from "@/http/api";
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
        }
      });
      this.hidePopup();
    }
  },
  created() {
    getMenuList().then(res => {
      this.list = res.data;
      console.log(this.list);
    });
  }
};
</script>

<style lang="stylus" scoped></style>
