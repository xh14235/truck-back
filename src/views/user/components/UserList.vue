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
      <button class="search-btn search-query" @click="showUserAddPopup">
        <i class="el-icon-plus"></i> 添加账号
      </button>
    </div>
    <div class="reagon-table-wrapper">
      <table border="0" cellspacing="0" class="reagon-table">
        <thead class="reagon-table-head">
          <tr class="reagon-table-row">
            <th class="reagon-table-item">编号</th>
            <th class="reagon-table-item">账号</th>
            <th class="reagon-table-item">角色</th>
            <th class="reagon-table-item">姓名</th>
            <th class="reagon-table-item">电话号码</th>
            <th class="reagon-table-item">邮箱地址</th>
            <th class="reagon-table-item">创建时间</th>
            <th class="reagon-table-item">是否启用</th>
            <th class="reagon-table-item">操作</th>
          </tr>
        </thead>
        <tbody class="reagon-table-body">
          <tr
            class="reagon-table-row"
            v-for="(item, index) of userList"
            :key="index"
          >
            <td class="reagon-table-item">{{ index + 1 }}</td>
            <td class="reagon-table-item">{{ item.username }}</td>
            <td class="reagon-table-item">{{ item.roleName }}</td>
            <td class="reagon-table-item">{{ item.realName }}</td>
            <td class="reagon-table-item">{{ item.phone }}</td>
            <td class="reagon-table-item">{{ item.email }}</td>
            <td class="reagon-table-item">{{ item.createTime }}</td>
            <td class="reagon-table-item">
              <el-switch
                v-model="item.status"
                :active-value="1"
                :inactive-value="0"
                active-color="#3B84C9"
                inactive-color="#D2D9E1"
                @change="stateItem(item)"
              >
              </el-switch>
            </td>
            <td class="reagon-table-item operation-cell">
              <span class="reagon-table-btn" @click="reviseItem(item)"
                >编辑</span
              >
              <span class="reagon-table-btn" @click="pswItem(item)"
                >修改密码</span
              >
              <span class="reagon-table-btn" @click="deleteItem(item)"
                >删除</span
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div class="table-without-data" v-if="!userList.length">暂无数据</div>
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
    <UserStatePopup :info="rowInfo" v-if="user.userStatePopup"></UserStatePopup>
    <UserPswPopup :info="rowInfo" v-if="user.userPswPopup"></UserPswPopup>
    <UserAddPopup :list="userList" v-if="user.userAddPopup"></UserAddPopup>
    <UserRevisePopup
      v-if="user.userRevisePopup"
      :info="rowInfo"
      :list="userList"
    ></UserRevisePopup>
    <UserDeletePopup
      v-if="user.userDeletePopup"
      :info="rowInfo"
    ></UserDeletePopup>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getUserList, getErrorMsg } from "@/http/api";
export default {
  name: "UserList",
  components: {
    UserStatePopup: () => import("@/components/popup/UserStatePopup"),
    UserPswPopup: () => import("@/components/popup/UserPswPopup"),
    UserAddPopup: () => import("@/components/popup/UserAddPopup"),
    UserRevisePopup: () => import("@/components/popup/UserRevisePopup"),
    UserDeletePopup: () => import("@/components/popup/UserDeletePopup")
  },
  data() {
    return {
      searchInfo: "",
      userList: [],
      rowInfo: {},
      total: 0,
      pageNum: 1,
      pageSize: 10
    };
  },
  computed: {
    ...mapState({
      user: state => state.popup.user,
      userChange: state => state.common.userChange
    })
  },
  watch: {
    userChange() {
      this.getUserList();
    }
  },
  methods: {
    ...mapMutations([
      "showUserStatePopup",
      "showUserPswPopup",
      "showUserAddPopup",
      "showUserRevisePopup",
      "showUserDeletePopup"
    ]),
    search() {
      this.getUserList();
    },
    handleSizeChange(e) {
      this.pageSize = e;
      this.search();
    },
    handleCurrentChange(e) {
      this.pageNum = e;
      this.search();
    },
    reset() {
      this.searchInfo = "";
    },
    getUserList() {
      getUserList({
        keyword: this.searchInfo,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        if (res.success) {
          this.userList = res.data.list;
          this.total = res.data.total;
        } else {
          this.$message({
            showClose: true,
            message: "请求列表失败，" + getErrorMsg(res),
            iconClass: "el-icon-warning"
          });
        }
      });
    },
    stateItem(item) {
      this.rowInfo = item;
      this.showUserStatePopup();
    },
    reviseItem(item) {
      this.rowInfo = item;
      this.showUserRevisePopup();
    },
    deleteItem(item) {
      this.rowInfo = item;
      this.showUserDeletePopup();
    },
    pswItem(item) {
      this.rowInfo = item;
      this.showUserPswPopup();
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>

<style lang="stylus" scoped></style>
