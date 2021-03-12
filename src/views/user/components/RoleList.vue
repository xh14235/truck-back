<template>
  <div class="list-wrapper">
    <div class="search-box">
      <input
        class="search-input"
        v-model="searchInfo"
        placeholder="请输入账号或者姓名"
        type="text"
      />
      <i class="el-icon-search"></i>
      <button class="search-btn search-query" @click="search">查询</button>
      <button class="search-btn search-reset" @click="reset">重置</button>
    </div>
    <div class="add-button">
      <button class="search-btn search-query" @click="showRoleAddPopup">
        <i class="el-icon-plus"></i> 添加角色
      </button>
    </div>
    <div class="reagon-table-wrapper">
      <table border="0" cellspacing="0" class="reagon-table">
        <thead class="reagon-table-head">
          <tr class="reagon-table-row">
            <th class="reagon-table-item">编号</th>
            <th class="reagon-table-item">角色名称</th>
            <th class="reagon-table-item">描述</th>
            <!-- <th class="reagon-table-item">用户数</th> -->
            <th class="reagon-table-item">创建时间</th>
            <th class="reagon-table-item">是否启用</th>
            <th class="reagon-table-item">操作</th>
          </tr>
        </thead>
        <tbody class="reagon-table-body">
          <tr
            class="reagon-table-row"
            v-for="(item, index) of roleList"
            :key="index"
          >
            <td class="reagon-table-item">{{ index + 1 }}</td>
            <td class="reagon-table-item">{{ item.name }}</td>
            <td class="reagon-table-item">{{ item.description }}</td>
            <!-- <td class="reagon-table-item">{{ item.adminCount }}</td> -->
            <td class="reagon-table-item">{{ changeTime(item.createTime) }}</td>
            <td class="reagon-table-item">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="item.status"
                active-color="#3B84C9"
                inactive-color="#D2D9E1"
                @change="stateItem(item)"
              >
              </el-switch>
            </td>
            <td class="reagon-table-item operation-cell">
              <span class="reagon-table-btn" @click="menuItem(item)"
                >分配菜单</span
              >
              <span class="reagon-table-btn" @click="rightItem(item)"
                >分配资源</span
              >
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
      <div class="table-without-data" v-if="!roleList.length">暂无数据</div>
    </div>
    <div class="pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10]"
        :page-size="pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <RoleAddPopup :list="roleList" v-if="role.roleAddPopup"></RoleAddPopup>
    <RoleStatePopup :info="rowInfo" v-if="role.roleStatePopup"></RoleStatePopup>
    <RoleRevisePopup
      :info="rowInfo"
      :list="roleList"
      v-if="role.roleRevisePopup"
    ></RoleRevisePopup>
    <RoleDeletePopup
      :info="rowInfo"
      v-if="role.roleDeletePopup"
    ></RoleDeletePopup>
    <RoleMenuPopup :info="rowInfo" v-if="role.roleMenuPopup"></RoleMenuPopup>
    <RoleRightPopup :info="rowInfo" v-if="role.roleRightPopup"></RoleRightPopup>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getRoleList, getErrorMsg } from "@/http/api";
export default {
  naem: "RoleList",
  data() {
    return {
      searchInfo: "",
      roleList: [],
      rowInfo: {},
      total: 0,
      pageNum: 1,
      pageSize: 10
    };
  },
  components: {
    RoleAddPopup: () => import("@/components/popup/RoleAddPopup"),
    RoleStatePopup: () => import("@/components/popup/RoleStatePopup"),
    RoleRevisePopup: () => import("@/components/popup/RoleRevisePopup"),
    RoleDeletePopup: () => import("@/components/popup/RoleDeletePopup"),
    RoleMenuPopup: () => import("@/components/popup/RoleMenuPopup"),
    RoleRightPopup: () => import("@/components/popup/RoleRightPopup")
  },
  computed: {
    ...mapState({
      role: state => state.popup.role,
      roleChange: state => state.common.roleChange
    })
  },
  watch: {
    roleChange() {
      this.getRoleList();
    }
  },
  methods: {
    ...mapMutations([
      "showRoleAddPopup",
      "showRoleStatePopup",
      "showRoleRevisePopup",
      "showRoleDeletePopup",
      "showRoleMenuPopup",
      "showRoleRightPopup"
    ]),
    handleSizeChange(e) {
      this.pageSize = e;
      this.search();
    },
    handleCurrentChange(e) {
      this.pageNum = e;
      this.search();
    },
    changeTime(time) {
      return time.substring(0, 10) + " " + time.substring(11, 19);
    },
    search() {
      this.getRoleList();
    },
    reset() {
      this.searchInfo = "";
    },
    reviseItem(item) {
      this.rowInfo = item;
      this.showRoleRevisePopup();
    },
    deleteItem(item) {
      this.rowInfo = item;
      this.showRoleDeletePopup();
    },
    stateItem(item) {
      this.rowInfo = item;
      this.showRoleStatePopup();
    },
    menuItem(item) {
      this.rowInfo = item;
      this.showRoleMenuPopup();
    },
    rightItem(item) {
      this.rowInfo = item;
      this.showRoleRightPopup();
    },
    getRoleList() {
      getRoleList({
        keyword: this.searchInfo,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.roleList = res.data.list;
          this.total = res.data.total;
        } else {
          this.$alert("请求列表失败，" + getErrorMsg(res), "错误提示", {
            confirmButtonText: "确定"
          });
        }
      });
    }
  },
  mounted() {
    this.getRoleList();
  }
};
</script>

<style lang="stylus" scoped></style>
