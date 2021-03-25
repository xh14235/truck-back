<template>
  <div class="login-wrapper">
    <img
      src="../../assets/img/logo-white.png"
      alt=""
      class="reagon-logo-white"
    />
    <div class="login-box">
      <div class="login-box-left">
        <img src="../../assets/img/login-left.png" alt="" />
      </div>
      <div class="login-box-right">
        <div class="login-title">后台管理系统</div>
        <div class="login-title2">Backgrund Management System</div>
        <el-form
          class="login-form"
          ref="ruleForm"
          :model="loginForm"
          :rules="loginRules"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item class="psw-visible-box" prop="password">
            <img
              :src="require('../../assets/img/' + pswImg + '.png')"
              @click="changePswVisible"
              alt=""
              class="psw-visible"
            />
            <el-input
              v-model="loginForm.password"
              :type="pswType"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <div class="err-msg">{{ errMsg }}</div>
        </el-form>
        <div class="login-checkbox">
          <input type="checkbox" v-model="rememberPwd" id="checkbox" />
          <img
            :src="
              rememberPwd
                ? require('@/assets/img/login-check2.png')
                : require('@/assets/img/login-check1.png')
            "
            alt=""
            class="icon"
          />
          <label for="checkbox">记住密码</label>
        </div>
        <button class="login-button" @click="handleLogin">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { login, getInfo, getErrorMsg } from "@/http/api";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("账号不能为空！"));
      } else {
        callback();
      }
    };
    let validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空！"));
      } else {
        callback();
      }
    };
    return {
      errMsg: "",
      pswImg: "login-psw-hide",
      pswType: "password",
      loginForm: {
        username: localStorage.username || "",
        password: localStorage.password || ""
      },
      loginRules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      },
      rememberPwd: false
    };
  },
  methods: {
    ...mapMutations(["mutLogin", "mutRealName", "mutMenu", "mutMenu2Active"]),
    changePswVisible() {
      if (this.pswType === "password") {
        this.pswType = "text";
        this.pswImg = "login-psw-show";
      } else {
        this.pswType = "password";
        this.pswImg = "login-psw-hide";
      }
    },
    handleLogin() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          login({
            username: this.loginForm.username,
            password: this.$getRsaCode(this.loginForm.password)
          }).then(res => {
            if (res.success) {
              // 次级菜单
              this.mutMenu2Active(0);
              // 登录错误信息提示
              this.errorMsg = "";
              // 记住用户名
              localStorage.username = this.loginForm.username;
              // 储存token
              let token = res.data.tokenHead + res.data.token;
              sessionStorage.setItem("token", token);
              this.mutLogin(token);
              // 记住密码
              if (this.rememberPwd) {
                localStorage.password = this.loginForm.password;
              } else {
                localStorage.password = "";
              }
              // 储存用户信息及左侧菜单
              this.getInfo();
              // 页面跳转
              setTimeout(() => {
                this.$router.push("/");
              }, 100);
            } else {
              // 登录错误提示
              this.errMsg = getErrorMsg(res);
            }
          });
        } else {
          return false;
        }
      });
    },
    getInfo() {
      getInfo().then(res => {
        // 用户名
        this.mutRealName(res.data.realName);
        // 左侧菜单
        let menu = [];
        let menus = res.data.menus;
        console.log(menus);
        for (let i = 0; i < menus.length; i++) {
          if (!menus[i].parentId) {
            menu.push({
              id: menus[i].id,
              title: menus[i].title,
              icon: menus[i].icon,
              url: "/" + menus[i].name,
              active: true,
              children: []
            });
          } else {
            for (let j = 0; j < menu.length; j++) {
              if (menus[i].parentId === menu[j].id) {
                menu[j].children.push({
                  title: menus[i].title,
                  url: menu[j].url + "/" + menus[i].name
                  // icon: menu[j].icon
                });
              }
            }
          }
        }
        this.mutMenu(menu);
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
$dd = #939DA8
// 消除搜狗浏览器密码输入框后面软键盘图标
.psw-visible-box >>> input::-webkit-input-safebox-button
  display: none
.el-form-item >>> .el-input__inner
  border: 1px solid $dd
  border-left: 5px solid $blue
  border-radius: 0
  background: $mainLight
  font-size: $font14
.is-error >>> .el-input__inner
  border-color: $dd
  border-left: 5px solid $blue
  &:focus
    border-color: $dd
    border-left: 5px solid $blue
.el-form>>> .el-form-item__error
  font-size: $font14
  padding-top: 8px
.login-wrapper
  position: absolute
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-image: url('../../assets/img/bg-main.png')
  background-size: 100% auto
  display: flex
  justify-content: center
  align-items: center
  .login-box
    width: 45.3125%
    // height: 0
    // padding-bottom: 28%
    box-shadow: 0px 0px 49px 0px rgba(169, 169, 169, 0.75)
    background: $white
    display: flex
    .login-box-left
      flex: 0 0 50%
      width: 50%
      display: flex
      justify-content: center
      align-items: flex-start
      img
        flex: 0 0 100%
        width: 100%
    .login-box-right
      flex: 0 0 50%
      width: 50%
      // height: 100%
      display: flex
      flex-direction: column
      align-items: center
      .login-title
        font-size: $font30
        font-weight: bold
        margin-top: 5.73vw
        color: #757575
      .login-title2
        font-size: $font12
        font-weight: bold
        margin-top: 0.41667vw
        color: #757575
      .login-form
        width: 15.5vw
        margin-top: 2.396vw
        position: relative
        .el-form-item
          margin-bottom: 1.6667vw
        .psw-visible-box
          position: relative
          .psw-visible
            width: 1.1146vw
            height: 1.1146vw
            position: absolute
            top: 0.45vw
            right: 0.5vw
            z-index: 1
            cursor: pointer
        .err-msg
          position: absolute
          bottom: 5px
          color: $red
      .login-checkbox
        flex: 0 0 0.953vw
        width: 15.5vw
        height: 0.953vw
        position: relative
        overflow: hidden
        input
          width: 0.953vw
          height: 0.953vw
          position: absolute
          left: 0
          top: 0
          opacity: 0
          z-index: 1
          cursor: pointer
        label
          color: #BBBBBB
          line-height: 0.953vw
          font-size: $font14
          margin-left: 5px
          cursor: pointer
        .icon
          width: 0.953vw
          height: 0.953vw
          vertical-align: top
          cursor: pointer
      .login-button
        width: 15.5vw
        height: 2.29vw
        line-height: 2.29vw
        margin-top: 1.04vw
        border: none
        outline: none
        border-radius: 1.475vw
        background: $blue
        cursor: pointer
        color: $white
        // font-weight: 600
        font-size: $font18
</style>
