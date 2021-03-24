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
              :clearable="false"
              value-format="yyyy-MM-dd hh:mm:ss"
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
              :clearable="false"
              value-format="yyyy-MM-dd hh:mm:ss"
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
      if (value === "") {
        callback(new Error("请输入编号"));
      } else {
        if (ddd > 0) {
          callback(new Error("该编号已存在"));
        }
        callback();
      }
    };
    let checkAccuracyLevel = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入精度等级"));
      } else {
        callback();
      }
    };
    let checkBuildingName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入建筑名称"));
      } else {
        callback();
      }
    };
    let checkEnabledTime = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入启用日期"));
      } else {
        callback();
      }
    };
    let checkFloor = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入安装楼层"));
      } else {
        callback();
      }
    };
    let checkPosition = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入测点安装位置"));
      } else {
        callback();
      }
    };
    let checkSerialNumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入出厂编号"));
      } else {
        callback();
      }
    };
    let checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入仪表名称"));
      } else {
        callback();
      }
    };
    let checkType = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入计量能源种类"));
      } else {
        callback();
      }
    };
    return {
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
        number: [{ required: true, validator: checkNumber, trigger: "blur" }],
        accuracyLevel: [
          { required: true, validator: checkAccuracyLevel, trigger: "blur" }
        ],
        buildingName: [
          { required: true, validator: checkBuildingName, trigger: "blur" }
        ],
        enabledTime: [
          { required: true, validator: checkEnabledTime, trigger: "blur" }
        ],
        floor: [{ required: true, validator: checkFloor, trigger: "blur" }],
        position: [
          { required: true, validator: checkPosition, trigger: "blur" }
        ],
        serialNumber: [
          { required: true, validator: checkSerialNumber, trigger: "blur" }
        ],
        name: [{ required: true, validator: checkName, trigger: "blur" }],
        type: [{ required: true, validator: checkType, trigger: "blur" }]
      }
    };
  },
  props: {
    list: Array
  },
  methods: {
    ...mapMutations(["hidePopup", "mutEquipmentChange"]),
    confirm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          addEquipment(this.ruleForm).then(res => {
            if (res.success) {
              this.mutEquipmentChange();
              this.hidePopup();
            } else {
              this.$message({
                showClose: true,
                message: "添加失败，" + getErrorMsg(res),
                iconClass: "el-icon-warning"
              });
              // this.$alert("添加失败，" + getErrorMsg(res), "错误提示", {
              //   confirmButtonText: "确定"
              // });
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.el-form >>> .el-input
  width: 100%
// .el-form >>> .el-input-number
// width: 75%
.el-form >>> .el-input-number-label
  font-size: $font14
.el-form >>> .el-form-item__error
  top: 100%
  left: 0
  height: auto
  line-height: 1
  padding-top: 4px
  font-size: 12px
  font-weight: normal
.reagon-popup-wrapper
  width: 38vw
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
