<template>
  <div class="list-wrapper">
    <div class="add-button">
      <button class="search-btn search-query" @click="showMenuAddPopup">
        <i class="el-icon-plus"></i> 添加账号
      </button>
    </div>
    <div class="reagon-table-wrapper">
      <table border="0" cellspacing="0" class="reagon-table">
        <thead class="reagon-table-head">
          <tr class="reagon-table-row">
            <th class="reagon-table-item">编号</th>
            <th class="reagon-table-item">菜单名称</th>
            <th class="reagon-table-item">菜单级数</th>
            <th class="reagon-table-item">前端名称</th>
            <th class="reagon-table-item">前端图标</th>
            <th class="reagon-table-item">是否显示</th>
            <th class="reagon-table-item">排序</th>
            <th class="reagon-table-item">查看上下级</th>
            <th class="reagon-table-item">操作</th>
          </tr>
        </thead>
        <tbody class="reagon-table-body">
          <tr
            class="reagon-table-row"
            v-for="(item, index) of menuList"
            :key="item.id"
          >
            <td class="reagon-table-item">{{ index + 1 }}</td>
            <td class="reagon-table-item">{{ item.title }}</td>
            <td class="reagon-table-item">{{ item.level }}</td>
            <td class="reagon-table-item">{{ item.name }}</td>
            <td class="reagon-table-item">{{ item.icon }}</td>
            <td class="reagon-table-item">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="item.hidden"
                active-color="#3B84C9"
                inactive-color="#D2D9E1"
                @change="stateItem(item)"
              >
              </el-switch>
            </td>
            <td class="reagon-table-item">{{ item.sort }}</td>
            <td class="reagon-table-item">
              <span
                class="reagon-level-btn"
                :class="{ active: item.parentId }"
                @click="getMenuList(item.parentId)"
                >上级</span
              ><span
                class="reagon-level-btn"
                :class="{ active: item.children && item.children.length }"
                @click="
                  getChildrenList(
                    item.id,
                    item.children && item.children.length
                  )
                "
                >下级</span
              >
            </td>
            <td class="reagon-table-item operation-cell">
              <span class="reagon-table-btn" @click="reviseItem(item)"
                >编辑</span
              >
              <span class="reagon-table-btn" @click="deleteItem(item)"
                >删除</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <MenuAddPopup v-if="menu.menuAddPopup"></MenuAddPopup>
    <MenuStatePopup :info="rowItem" v-if="menu.menuStatePopup"></MenuStatePopup>
    <MenuRevisePopup
      :info="rowItem"
      v-if="menu.menuRevisePopup"
    ></MenuRevisePopup>
    <MenuDeletePopup
      :info="rowItem"
      v-if="menu.menuDeletePopup"
    ></MenuDeletePopup>
    <MenuFailedPopup v-if="menu.menuFailedPopup"></MenuFailedPopup>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getMenuList } from "@/http/api";
import axios from "axios";
export default {
  naem: "MenuList",
  data() {
    return {
      menuList: [],
      rowItem: {}
    };
  },
  computed: {
    ...mapState({
      menu: state => state.popup.menu,
      menuChange: state => state.common.menuChange
    })
  },
  watch: {
    menuChange() {
      this.getMenuList(1);
    }
  },
  components: {
    MenuAddPopup: () => import("@/components/popup/MenuAddPopup"),
    MenuStatePopup: () => import("@/components/popup/MenuStatePopup"),
    MenuRevisePopup: () => import("@/components/popup/MenuRevisePopup"),
    MenuDeletePopup: () => import("@/components/popup/MenuDeletePopup"),
    MenuFailedPopup: () => import("@/components/popup/MenuFailedPopup")
  },
  methods: {
    ...mapMutations([
      "showMenuAddPopup",
      "showMenuStatePopup",
      "showMenuRevisePopup",
      "showMenuDeletePopup"
    ]),
    getMenuList(boo) {
      // console.log(boo);
      if (boo) {
        getMenuList().then(res => {
          if (res.code === 200) {
            this.menuList = res.data;
          } else {
            this.menuList = [
              {
                children: [],
                createTime: "2012-12-12",
                hidden: 0,
                icon: "00",
                id: 0,
                level: 0,
                name: "菜单一",
                parentId: 0,
                sort: 0,
                title: "菜单已"
              }
            ];
          }
        });
      }
    },
    // 获取子类列表
    getChildrenList(parentId, boo) {
      if (boo) {
        axios
          .get("http://116.236.30.222:9700/admin/menu/list/" + parentId)
          .then(res => {
            console.log(res);
            this.menuList = res.data.data.list;
          });
      }
    },
    deleteItem(item) {
      this.rowItem = item;
      this.showMenuDeletePopup();
    },
    reviseItem(item) {
      this.rowItem = item;
      this.showMenuRevisePopup();
    },
    stateItem(item) {
      this.rowItem = item;
      this.showMenuStatePopup();
    }
  },
  mounted() {
    this.getMenuList(1);
    // this.getChildrenList(0);
  }
};
</script>

<style lang="stylus" scoped></style>
