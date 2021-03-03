<template>
  <div class="list-wrapper">
    <div class="search-box">
      <input
        class="search-input"
        v-model="searchInfo1"
        placeholder="请输入账号或者姓名"
        type="text"
      />
      <i class="el-icon-search"></i>
      <div class="select-info">资源分类</div>
      <el-select
        v-model="searchInfo2"
        placeholder="请选择"
        @change="selectChange"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <button class="search-btn search-query" @click="search">查询</button>
      <button class="search-btn search-reset" @click="reset">重置</button>
    </div>
    <div class="add-button">
      <button class="search-btn search-query" @click="showResourceAddPopup">
        <i class="el-icon-plus"></i> 添加资源
      </button>
    </div>
    <div class="reagon-table-wrapper">
      <table border="0" cellspacing="0" class="reagon-table">
        <thead class="reagon-table-head">
          <tr class="reagon-table-row">
            <th class="reagon-table-item">编号</th>
            <th class="reagon-table-item">资源名称</th>
            <th class="reagon-table-item">资源路径</th>
            <th class="reagon-table-item">创建时间</th>
            <th class="reagon-table-item">操作</th>
          </tr>
        </thead>
        <tbody class="reagon-table-body">
          <tr
            class="reagon-table-row"
            v-for="(item, index) of resourceList"
            :key="index"
          >
            <td class="reagon-table-item">{{ index + 1 }}</td>
            <td class="reagon-table-item">{{ item.name }}</td>
            <td class="reagon-table-item">{{ item.url }}</td>
            <td class="reagon-table-item">{{ changeTime(item.createTime) }}</td>
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
    <ResourceDeletePopup
      :info="rowInfo"
      v-if="resource.resourceDeletePopup"
    ></ResourceDeletePopup>
    <ResourceAddPopup v-if="resource.resourceAddPopup"></ResourceAddPopup>
    <ResourceRevisePopup
      v-if="resource.resourceRevisePopup"
      :info="rowInfo"
    ></ResourceRevisePopup>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getResourceType, getResourceByKeywords } from "@/http/api";
export default {
  naem: "ResourceList",
  data() {
    return {
      options: [],
      searchInfo1: "",
      searchInfo2: "",
      resourceList: [],
      total: 0,
      pageNum: 1,
      pageSize: 10
    };
  },
  computed: {
    ...mapState({
      resource: state => state.popup.resource,
      resourceChange: state => state.common.resourceChange
    })
  },
  watch: {
    resourceChange() {
      this.search();
    }
  },
  components: {
    ResourceAddPopup: () => import("@/components/popup/ResourceAddPopup"),
    ResourceRevisePopup: () => import("@/components/popup/ResourceRevisePopup"),
    ResourceDeletePopup: () => import("@/components/popup/ResourceDeletePopup")
  },
  methods: {
    ...mapMutations([
      "showResourceDeletePopup",
      "showResourceRevisePopup",
      "showResourceAddPopup"
    ]),
    changeTime(time) {
      return time.substring(0, 10) + " " + time.substring(11, 19);
    },
    search() {
      getResourceByKeywords({
        categoryId: this.searchInfo2,
        nameKeyword: this.searchInfo1,
        urlKeyword: "",
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.resourceList = res.data.list;
          this.total = res.data.total;
        } else {
          this.resourceList = [
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
    handleSizeChange(e) {
      this.pageSize = e;
      this.search();
    },
    handleCurrentChange(e) {
      this.pageNum = e;
      this.search();
    },
    selectChange() {
      this.pageNum = 1;
    },
    reset() {
      this.searchInfo1 = "";
      this.searchInfo2 = "";
    },
    getResourceType() {
      getResourceType().then(res => {
        if (res.code === 200) {
          this.options = res.data;
        } else {
          this.options = [
            {
              createTime: "",
              id: "111",
              name: "全部",
              sort: "全部"
            },
            {
              createTime: "",
              id: "22",
              name: "用户管理",
              sort: "用户管理"
            },
            {
              createTime: "",
              id: "33",
              name: "台账管理",
              sort: "台账管理"
            }
          ];
        }
      });
    },
    reviseItem(item) {
      this.rowInfo = item;
      this.showResourceRevisePopup();
    },
    deleteItem(item) {
      this.rowInfo = item;
      this.showResourceDeletePopup();
    }
  },
  created() {
    this.getResourceType();
  },
  mounted() {
    this.search();
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.select-info
  font-size: $font18
  margin: 0 1.3vw
  font-weight: 600
  color: $fontCommon
</style>
