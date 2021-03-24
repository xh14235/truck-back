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
      <button class="search-btn" @click="showEquipmentAddPopup">
        <i class="el-icon-plus"></i> 添加仪表
      </button>
      <button class="search-btn search-import" @click="exportData()">
        <i class="el-icon-printer"></i> 导出
      </button>
      <button class="search-btn search-export" @click="importData()">
        <i class="el-icon-document-add"></i> 导入
      </button>
      <button class="search-btn search-download">
        <a href="/仪器仪表管理模板.xls"
          ><i class="el-icon-download"></i>下载模板</a
        >
      </button>
    </div>
    <div class="reagon-table-wrapper">
      <table border="0" cellspacing="0" class="reagon-table">
        <thead class="reagon-table-head">
          <tr class="reagon-table-row">
            <th class="reagon-table-item">序号</th>
            <th class="reagon-table-item">管理编号</th>
            <th class="reagon-table-item">计量能源种类</th>
            <th class="reagon-table-item">仪表名称</th>
            <th class="reagon-table-item">型号规格</th>
            <th class="reagon-table-item">测量范围</th>
            <th class="reagon-table-item">精度等级</th>
            <th class="reagon-table-item">状态</th>
            <th class="reagon-table-item">操作</th>
            <!-- <th class="reagon-table-item"></th> -->
          </tr>
        </thead>
        <tbody class="reagon-table-body">
          <tr
            class="reagon-table-row"
            v-for="(item, index) of eqiupmentList"
            :key="index"
          >
            <td class="reagon-table-item">{{ index + 1 }}</td>
            <td class="reagon-table-item">{{ item.number }}</td>
            <td class="reagon-table-item">{{ item.type }}</td>
            <td class="reagon-table-item">{{ item.name }}</td>
            <td class="reagon-table-item">{{ item.model }}</td>
            <td class="reagon-table-item">{{ item.measuringRange }}</td>
            <td class="reagon-table-item">{{ item.calculateLevel }}</td>
            <td class="reagon-table-item">
              <el-switch
                v-model="item.enabled"
                active-color="#3B84C9"
                inactive-color="#D2D9E1"
                @change="stateItem(item)"
              >
              </el-switch>
            </td>
            <td class="reagon-table-item operation-cell">
              <span class="reagon-table-btn" @click="detailItem(item)"
                >详情</span
              >
              <span class="reagon-table-btn" @click="reviseItem(item)"
                >编辑</span
              >
              <span class="reagon-table-btn" @click="deleteItem(item)"
                >删除</span
              >
            </td>
            <!-- <td></td> -->
          </tr>
        </tbody>
      </table>
      <div class="table-without-data" v-if="!eqiupmentList.length">
        暂无数据
      </div>
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
    <EquipmentAddPopup
      :info="rowInfo"
      :list="eqiupmentList"
      v-if="equipment.equipmentAddPopup"
    ></EquipmentAddPopup>
    <EquipmentDeletePopup
      :info="rowInfo"
      v-if="equipment.equipmentDeletePopup"
    ></EquipmentDeletePopup>
    <EquipmentRevisePopup
      :info="rowInfo"
      :list="eqiupmentList"
      v-if="equipment.equipmentRevisePopup"
    ></EquipmentRevisePopup>
    <EquipmentStatusPopup
      :info="rowInfo"
      v-if="equipment.equipmentStatusPopup"
    ></EquipmentStatusPopup>
    <EquipmentDetailPopup
      :info="rowInfo"
      v-if="equipment.equipmentDetailPopup"
    ></EquipmentDetailPopup>
    <EquipmentUploadPopup
      :info="rowInfo"
      v-if="equipment.equipmentUploadPopup"
    ></EquipmentUploadPopup>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getEquipmentList, getErrorMsg } from "@/http/api";
import axios from "axios";
export default {
  naem: "Equipment",
  components: {
    EquipmentAddPopup: () => import("@/components/popup/EquipmentAddPopup"),
    EquipmentDeletePopup: () =>
      import("@/components/popup/EquipmentDeletePopup"),
    EquipmentRevisePopup: () =>
      import("@/components/popup/EquipmentRevisePopup"),
    EquipmentStatusPopup: () =>
      import("@/components/popup/EquipmentStatusPopup"),
    EquipmentDetailPopup: () =>
      import("@/components/popup/EquipmentDetailPopup"),
    EquipmentUploadPopup: () =>
      import("@/components/popup/EquipmentUploadPopup")
  },
  data() {
    return {
      searchInfo: "",
      eqiupmentList: [],
      rowInfo: {},
      total: 0,
      pageNum: 1,
      pageSize: 10
    };
  },
  computed: {
    ...mapState({
      equipmentChange: state => state.common.equipmentChange,
      equipment: state => state.popup.equipment
    })
  },
  watch: {
    equipmentChange() {
      this.getEquipmentList();
    }
  },
  methods: {
    ...mapMutations([
      "showEquipmentAddPopup",
      "showEquipmentStatusPopup",
      "showEquipmentDeletePopup",
      "showEquipmentRevisePopup",
      "showEquipmentDetailPopup",
      "showEquipmentUploadPopup"
    ]),
    search() {
      this.getEquipmentList();
    },
    reset() {
      this.searchInfo = "";
    },
    handleSizeChange(e) {
      this.pageSize = e;
      this.search();
    },
    handleCurrentChange(e) {
      this.pageNum = e;
      this.search();
    },
    getEquipmentList() {
      getEquipmentList({
        keyword: this.searchInfo,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        if (res.success) {
          this.eqiupmentList = res.data.list;
          this.total = res.data.total;
        } else {
          this.$message({
            showClose: true,
            message: "请求列表失败，" + getErrorMsg(res),
            iconClass: "el-icon-warning"
          });
          // this.$alert("请求列表失败，" + getErrorMsg(res), "错误提示", {
          //   confirmButtonText: "确定"
          // });
        }
      });
    },
    stateItem(item) {
      this.rowInfo = item;
      this.showEquipmentStatusPopup();
    },
    reviseItem(item) {
      this.rowInfo = item;
      this.showEquipmentRevisePopup();
    },
    deleteItem(item) {
      this.rowInfo = item;
      this.showEquipmentDeletePopup();
    },
    detailItem(item) {
      this.rowInfo = item;
      this.showEquipmentDetailPopup();
    },
    downloadTemplate() {},
    importData() {
      this.showEquipmentUploadPopup();
    },
    exportData() {
      axios({
        method: "get",
        url: "http://116.236.30.222:9700/admin/admin/meter/export/excel",
        responseType: "blob"
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded" //请求的数据类型为form data格式
        // }
      }).then(res => {
        if (res.data.errorMsg) {
          this.$alert("导出失败，" + getErrorMsg(res.data), "错误提示", {
            confirmButtonText: "确定"
          });
        } else {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          // const url = window.URL.createObjectURL(
          //   new Blob([res.data], { type: "application/vnd.ms-excel" })
          // );
          const link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "仪器仪表列表.xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
    }
  },
  mounted() {
    this.getEquipmentList();
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.search-import, .search-export, .search-download
  margin-left: 1vw
  background: $blue2
.search-download
  a
    color: $white
</style>
