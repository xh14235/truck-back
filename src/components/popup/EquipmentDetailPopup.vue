<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">详情</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <div class="detail-box">
          <div class="detail-item">
            <span class="detail-key">管理编号</span>
            <span class="detail-val">{{ info.number }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">计量能源种类</span>
            <span class="detail-val">{{ info.type }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">仪表名称</span>
            <span class="detail-val">{{ info.name }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">型号规格</span>
            <span class="detail-val">{{ info.model }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">测量范围</span>
            <span class="detail-val">{{ info.measuringRange }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">精度等级</span>
            <span class="detail-val">{{ info.accuracyLevel }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">制造厂商</span>
            <span class="detail-val">{{ info.company }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">出厂编号</span>
            <span class="detail-val">{{ info.serialNumber }}</span>
          </div>
        </div>

        <div class="detail-box">
          <div class="detail-item">
            <span class="detail-key">启用日期</span>
            <span class="detail-val">{{
              info.enabledTime ? info.enabledTime.substring(0, 10) : ""
            }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">安装建筑名称</span>
            <span class="detail-val">{{ info.buildingName }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">安装楼层</span>
            <span class="detail-val">{{ info.floor }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">测点安装位置</span>
            <span class="detail-val">{{ info.position }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">管理类别</span>
            <span class="detail-val">{{ info.calculateLevel }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">测点回路名称</span>
            <span class="detail-val">{{ info.loopName }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">通讯协议</span>
            <span class="detail-val">{{ info.communicationProtocol }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">通讯地址</span>
            <span class="detail-val">{{ info.communicationAddress }}</span>
          </div>
        </div>

        <div class="detail-box">
          <div class="detail-item">
            <span class="detail-key">父节点名称</span>
            <span class="detail-val">{{ info.parentNodeName }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">上一回路名称</span>
            <span class="detail-val">{{ info.previousLoopName }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">检定(校验)周期</span>
            <span class="detail-val">{{ info.checkCycle }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">下一回路名称</span>
            <span class="detail-val">{{ info.netLoopName }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">检定(校验)日期</span>
            <span class="detail-val">{{
              info.checkTime ? info.checkTime.substring(0, 10) : ""
            }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">下次检定(校验)日期</span>
            <span class="detail-val">{{
              info.nextCheckTime ? info.nextCheckTime.substring(0, 10) : ""
            }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">检定(校验)单位</span>
            <span class="detail-val">{{ info.checkCompany }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">检定(校验)证书编号</span>
            <span class="detail-val">{{ info.checkUnit }}</span>
          </div>
        </div>

        <div class="detail-box">
          <div class="detail-item">
            <span class="detail-key">使用单位</span>
            <span class="detail-val">{{ info.usedCompany }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">使用部门</span>
            <span class="detail-val">{{ info.usedDepartment }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">管理责任人</span>
            <span class="detail-val">{{ info.managerPerson }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">备注</span>
            <span class="detail-val">{{ info.remark }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-key">是否启用</span>
            <span class="detail-val">{{ info.enabled ? "是" : "否" }}</span>
          </div>
          <div class="detail-item"></div>
        </div>
      </div>
      <!-- <div class="reagon-popup-bottom">
        <div class="reagon-popup-btn" @click="hidePopup()">确定</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "EquipmentDetailPopup",
  props: {
    info: Object
  },
  methods: {
    ...mapMutations(["hidePopup"])
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.reagon-popup-wrapper
  width: 35vw
  .reagon-popup-main
    margin: 0 auto
    max-height: 35vw
    overflow-y: scroll
    padding: 1vw 0 0 0
    &::-webkit-scrollbar
      display: none
    .detail-box
      padding: 1vw 0
      margin: 0 2.6vw
      border-bottom: 1px solid #CBD7E4
      display: flex
      flex-wrap: wrap
      &:last-child
        border-bottom: none
      .detail-item
        flex: 0 0 50%
        width: 50%
        height: 1.5625vw
        line-height: 1.5625vw
        font-size: $font14
        display: flex
        border-top: 0
        .detail-key
          flex: 0 0 50%
          width: 50%
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          color: $fontCommon
        .detail-val
          flex: 0 0 50%
          width: 50%
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
</style>
