<template>
  <div class="reagon-popup-bg">
    <div class="reagon-popup-wrapper">
      <div class="reagon-popup-top">
        <div class="reagon-popup-title">添加仪表</div>
        <div class="reagon-popup-close" @click="hidePopup()">&times;</div>
      </div>
      <div class="reagon-popup-main">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          :rules="rules"
          label-width="45%"
        >
          <el-form-item label="管理编号" prop="number">
            <el-input v-model="ruleForm.number"></el-input>
          </el-form-item>
          <el-form-item label="计量能源种类" prop="type">
            <el-input v-model="ruleForm.type"></el-input>
          </el-form-item>
          <el-form-item label="仪表名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="型号规格" prop="model">
            <el-input v-model="ruleForm.model"></el-input>
          </el-form-item>
          <el-form-item label="测量范围" prop="measuringRange">
            <el-input v-model="ruleForm.measuringRange"></el-input>
          </el-form-item>
          <el-form-item label="精度等级" prop="accuracyLevel">
            <el-input v-model="ruleForm.accuracyLevel"></el-input>
          </el-form-item>
          <el-form-item label="制造厂商" prop="company">
            <el-input v-model="ruleForm.company"></el-input>
          </el-form-item>
          <el-form-item label="出厂编号" prop="serialNumber">
            <el-input v-model="ruleForm.serialNumber"></el-input>
          </el-form-item>
          <el-form-item label="启用日期" prop="enabledTime">
            <el-date-picker
              v-model="ruleForm.enabledTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="安装建筑名称" prop="buildingName">
            <el-input v-model="ruleForm.buildingName"></el-input>
          </el-form-item>
          <el-form-item label="安装楼层" prop="floor">
            <el-input v-model="ruleForm.floor"></el-input>
          </el-form-item>
          <el-form-item label="测点安装位置" prop="position">
            <el-input v-model="ruleForm.position"></el-input>
          </el-form-item>
          <el-form-item label="管理类别" prop="calculateLevel">
            <el-input v-model="ruleForm.calculateLevel"></el-input>
          </el-form-item>
          <el-form-item label="测点回路名称" prop="loopName">
            <el-input v-model="ruleForm.loopName"></el-input>
          </el-form-item>
          <el-form-item label="通讯协议" prop="communicationProtocol">
            <el-input v-model="ruleForm.communicationProtocol"></el-input>
          </el-form-item>
          <el-form-item label="通讯地址" prop="communicationAddress">
            <el-input v-model="ruleForm.communicationAddress"></el-input>
          </el-form-item>
          <el-form-item label="父节点名称" prop="parentNodeName">
            <el-input v-model="ruleForm.parentNodeName"></el-input>
          </el-form-item>
          <el-form-item label="上一回路名称" prop="previousLoopName">
            <el-input v-model="ruleForm.previousLoopName"></el-input>
          </el-form-item>
          <el-form-item label="检定(校验)周期" prop="checkCycle">
            <el-input-number
              v-model="ruleForm.checkCycle"
              controls-position="right"
              :min="1"
              :max="12"
            ></el-input-number>
            <span class="el-input-number-label">(月)</span>
          </el-form-item>
          <el-form-item label="下一回路名称" prop="netLoopName">
            <el-input v-model="ruleForm.netLoopName"></el-input>
          </el-form-item>
          <el-form-item label="检定(校验)日期" prop="checkTime">
            <el-date-picker
              v-model="ruleForm.checkTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="下次检定(校验)日期" prop="nextCheckTime">
            <el-input v-model="ruleForm.nextCheckTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="检定(校验)单位" prop="checkCompany">
            <el-input v-model="ruleForm.checkCompany"></el-input>
          </el-form-item>
          <el-form-item label="检定(校验)证书编号" prop="checkUnit">
            <el-input v-model="ruleForm.checkUnit"></el-input>
          </el-form-item>
          <el-form-item label="使用单位" prop="usedCompany">
            <el-input v-model="ruleForm.usedCompany"></el-input>
          </el-form-item>
          <el-form-item label="使用部门" prop="usedDepartment">
            <el-input v-model="ruleForm.usedDepartment"></el-input>
          </el-form-item>
          <el-form-item label="管理责任人" prop="managerPerson">
            <el-input v-model="ruleForm.managerPerson"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="ruleForm.remark"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" prop="enabled">
            <el-radio-group v-model="ruleForm.enabled">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
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
import { addEquipment, getErrorMsg } from "@/http/api";
export default {
  name: "EquipmentAddPopup",
  data() {
    let checkNumber = (rule, value, callback) => {
      let ddd = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].number === value) {
          ddd++;
        } else {
          ddd += 0;
        }
      }
      if (ddd > 0) {
        this.errMsg[0] = "该编号已存在";
        callback(new Error(this.errMsg[0]));
      } else {
        this.errMsg[0] = "";
      }
      if (value === "") {
        this.errMsg[1] = "请输入编号";
        callback(new Error(this.errMsg[1]));
      } else {
        this.errMsg[1] = "";
      }
    };
    return {
      errMsg: ["", ""],
      errShow: false,
      errIndex: 0,
      ruleForm: {
        accuracyLevel: "",
        buildingName: "",
        calculateLevel: "",
        checkCompany: "",
        checkCycle: 0,
        checkNumber: "",
        checkTime: "",
        checkUnit: "",
        communicationAddress: "",
        communicationProtocol: "",
        company: "",
        createdBy: "",
        createdTime: "",
        enabled: true,
        enabledTime: "",
        floor: 0,
        id: 0,
        loopName: "",
        managerPerson: "",
        measuringRange: "",
        model: "",
        name: "",
        netLoopName: "",
        nextCheckTime: "",
        number: "",
        parentNodeName: "",
        position: "",
        previousLoopName: "",
        remark: "",
        serialNumber: "",
        type: "",
        updatedBy: "",
        updatedTime: "",
        usedCompany: "",
        usedDepartment: ""
      },
      rules: {
        number: [{ required: true, validator: checkNumber, trigger: "blur" }]
      }
    };
  },
  props: {
    list: Array
  },
  methods: {
    ...mapMutations(["hidePopup", "mutEquipmentChange"]),
    confirm() {
      this.errShow = false;
      for (let i = 0; i < this.errMsg.length; i++) {
        if (this.errMsg[i]) {
          this.errShow = true;
          this.errIndex = i;
        }
      }
      if (this.errShow) {
        this.$alert(this.errMsg[this.errIndex], "错误提示", {
          confirmButtonText: "确定"
        });
      } else {
        addEquipment(this.ruleForm).then(res => {
          if (res.success) {
            this.mutEquipmentChange();
          } else {
            this.$alert("添加失败，" + getErrorMsg(res), "错误提示", {
              confirmButtonText: "确定"
            });
          }
        });
        this.hidePopup();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.el-form >>> .el-input
  width: 100%
.el-form >>> .el-input-number
  width: 75%
.el-form >>> .el-input-number-label
  font-size: $font18
.el-form >>> .el-form-item__error
  top: 100%
  left: 0
  height: auto
  line-height: 1
  padding-top: 4px
  font-size: 12px
  font-weight: normal
.reagon-popup-wrapper
  width: 48vw
  .reagon-popup-main
    max-height: 35vw
    overflow-y: scroll
    &::-webkit-scrollbar
      display: none
    .el-form
      display: flex
      flex-wrap: wrap
      .el-form-item
        flex: 0 0 50%
        width: 50%
        padding-right: 5%
</style>
