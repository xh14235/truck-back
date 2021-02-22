<template>
  <div class="reagon-main">
    <div class="statistics-wrapper">
      <div class="statistics-box">
        <div class="statistics-title">
          <img
            src="../../assets/img/home-icon1.png"
            alt=""
            class="statistics-img"
          />
          <span>用户统计</span>
        </div>
        <div class="statistics-detail">
          <p class="statistics-row">
            <span>总数：</span>
            <span>{{ allUser }}</span>
            <span>人</span>
          </p>
          <p
            class="statistics-row"
            v-for="(item, index) of userList"
            :key="index"
          >
            <span>{{ item.title }}：</span>
            <span>{{ item.num }}</span>
            <span>人</span>
          </p>
        </div>
      </div>
      <div class="statistics-box">
        <div class="statistics-title">
          <img
            src="../../assets/img/home-icon2.png"
            alt=""
            class="statistics-img"
          />
          <span>设备统计</span>
        </div>
        <div class="statistics-detail">
          <p class="statistics-row">
            <span>总数：</span>
            <span>{{ allEquipment }}</span>
            <span>台</span>
          </p>
          <p
            class="statistics-row"
            v-for="(item, index) of equipmentList"
            :key="index"
          >
            <span>{{ item.title }}：</span>
            <span>{{ item.num }}</span>
            <span>台</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      userList: [],
      equipmentList: []
    };
  },
  computed: {
    allUser() {
      let num = 0;
      for (let i = 0; i < this.userList.length; i++) {
        num += this.userList[i].num;
      }
      return num;
    },
    allEquipment() {
      let num = 0;
      for (let i = 0; i < this.equipmentList.length; i++) {
        num += this.equipmentList[i].num;
      }
      return num;
    }
  },
  methods: {
    getUserList() {
      this.userList = [
        {
          title: "超级管理员",
          num: 2
        },
        {
          title: "管理",
          num: 8
        },
        {
          title: "普通成员",
          num: 98
        }
      ];
    },
    getEquipmentList() {
      this.equipmentList = [
        {
          title: "运行中",
          num: 70
        },
        {
          title: "待机中",
          num: 20
        },
        {
          title: "维修中",
          num: 10
        }
      ];
    }
  },
  mounted() {
    this.getUserList();
    this.getEquipmentList();
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.statistics-wrapper
  display: flex
  .statistics-box
    width: 15.625vw
    height: 15.625vw
    background: $white
    margin-right: 1vw
    padding: 2vw
    border-radius: 10px
    color: $fontDark
    .statistics-title
      display: flex
      align-items: center
      .statistics-img
        height: 2.08vw
        margin-right: 1vw
      span
        font-size: $font24
        font-weight: 600
    .statistics-detail
      .statistics-row
        display: flex
        justify-content: space-between
        margin-top: 1.1vw
        font-size: $font20
        span
          &:nth-child(1)
            margin-right: auto
          &:nth-child(2)
            font-weight: 600
        &:nth-child(1)
          span
            &:nth-child(2)
              color: $blue
</style>
