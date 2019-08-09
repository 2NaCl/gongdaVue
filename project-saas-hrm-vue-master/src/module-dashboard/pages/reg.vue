<template>
  <div class="login-container">
    <div class="login-form">
      <div v-show="regShow">
        <el-form :model="regForm" :rules="loginRules" ref="regForm" label-position="left">
          <div class="title-container">
            <h3 class="title"><img src="./../assets/login-logo.png"></h3>
          </div>
          <el-form-item prop="userName">
            <el-input name="userName" type="text" clearable v-model="regForm.username" placeholder="请输入您的姓名"/>
          </el-form-item>
          <el-form-item prop="studentId">
            <el-input name="studentId" type="text" clearable v-model="regForm.studentId" placeholder="10位学号"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input name="password" :type="passwordType" clearable @keyup.enter.native="handleLogin"
                      v-model="regForm.password" placeholder="6-16位密码"/>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input name="confirmPassword" :type="passwordType" clearable @keyup.enter.native="handleLogin"
                      v-model="regForm.confirmPassword" placeholder="确认密码"/>
          </el-form-item>
          <el-button class="loginBtn" type="primary" style="width:100%;margin-bottom:30px;" :loading="loading"
                     @click.native.prevent="handleNext">下一步
          </el-button>
        </el-form>
      </div>
      <div v-show="nextShow">
        <el-form :model="regForm" :rules="regFormInfo" ref="regFormInfo" label-position="left">

          <div class="title-container">
            <h3 class="title"><img src="./../assets/login-logo.png"></h3>
          </div>

          <el-form-item prop="dept">
            <el-input name="dept" type="text" clearable v-model="regForm.dept" placeholder="请输入您所申请的实验室名称"/>
          </el-form-item>
          <el-form-item prop="msg">
            <el-input name="msg" type="text" clearable v-model="regForm.msg" placeholder="请输入您申请理由"/>
          </el-form-item>
          <el-button class="loginBtn" type="primary" style="width:100%;margin-bottom:30px;" :loading="loading"
                     @click.native.prevent="handleLogin">注册
          </el-button>

        </el-form>
      </div>
      <div class="regInfo">
        <router-link :to="{'path':'/login'}">使用已有帐户登录</router-link>
      </div>
    </div>

  </div>
</template>

<script>
  import {checkStudentID, checkPassword, checkUserName} from './../../filters/index'
  import {registerStep1, registerStep2, regCode, reg} from '@/api/base/frame'
  import shajs from 'sha.js'

  export default {
    components: {},
    name: 'reg',
    data() {
      const reason = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('实验室申请理由不能为空'))
        } else {
          callback()
        }
      }
      const deptName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('实验室名称不能为空'))
        } else {
          callback()
        }
      }
      const confirmPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'))
        } else if (value !== this.regForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }

      return {
        regForm: {
          studentId: '',
          password: '',
          confirmPassword: '',
          username: '',
          dept: '',
          msg: ''
        },
        loginRules: {
          studentId: [{required: true, trigger: 'blur', validator: checkStudentID}],
          username: [{required: true, trigger: 'blur', validator: checkUserName}],

          password: [
            {required: true, trigger: 'blur', validator: checkPassword}
          ],
          confirmPassword: [
            {required: true, trigger: 'blur', validator: confirmPassword}
          ]
        },
        regFormInfo: {
          dept: [{required: true, trigger: 'blur', validator: deptName}],
          msg: [{required: true, trigger: 'blur', validator: reason}]
        },

        passwordType: 'password',
        loading: false,
        showDialog: false,
        regShow: true,
        nextShow: false,
        sendAuthCode: true,
        auth_time: 0
      }
    },
    methods: {
      getAuthCode: function () {
        this.sendAuthCode = false
        this.auth_time = 30
        var timetimer = setInterval(() => {
          this.auth_time--
          if (this.auth_time <= 0) {
            this.sendAuthCode = true
            clearInterval(timetimer)
          }
        }, 1000)
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },

      // 下一步
      handleNext() {
        // this.$message.success('恭喜您，' + data.data.msg + '!')
        this.regShow = false
        this.nextShow = true
        // this.$refs.regForm.validate(valid => {
        //   if (valid) {
        //     var data = {
        //       studentId: this.regForm.studentId,
        //       verificationCode: this.regForm.verificationCode
        //     }
        //     registerStep1(data)
        //       .then((data, err) => {
        //         if (err) {
        //           this.$message.error(error)
        //           return false
        //         } else {
        //           this.$message.success('恭喜您，' + data.data.msg + '!')
        //           this.regShow = false
        //           this.nextShow = true
        //         }
        //       })
        //       .catch(() => {})
        //   } else {
        //     // console.log('error submit!!')
        //     return false
        //   }
        // })
      },
      // 注册
      handleLogin() {
        this.$refs.regFormInfo.validate(valid => {
          if (valid) {
            reg(this.regForm).then((data, err) => {
              if (err) {
                this.$message.error(error)
                return false
              } else {
                this.$message.success('恭喜您，注册成功！')
                this.$router.push({path: '/login'})
              }
            })
          } else {
            return false
          }
        })
      }
    },
    created() {
      // window.addEventListener('hashchange', this.afterQRScan)
    },
    destroyed() {
      // window.removeEventListener('hashchange', this.afterQRScan)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $light_gray: #68b0fe;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;

        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.7);
      border-radius: 5px;
      color: #454545;
    }
  }

  .el-form-item__error {
    color: #fff;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background: url(./../assets/login.jpg) 50% 50% no-repeat;

    .login-form {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      width: 520px;
      min-height: 400px;
      padding: 35px 35px 15px 35px;
      margin: -260px auto 0;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;

      &_login {
        font-size: 20px;
      }
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        font-weight: 400;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }

  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }

  .el-form-item {
    margin-bottom: 20px;
  }

  .regInfo {
    text-align: center;
    color: #fff;
    font-size: 16px;
  }

  .infoPosin {
    .codeBtn {
      background: #fff;
      color: #43a7fe;
      border: 0 none;
      border-radius: 55px;
      position: absolute;
      right: 10px;
      top: 5px;
    }
  }

  ::-webkit-input-placeholder,
  :-moz-placeholder,
  ::-moz-placeholder,
  :-ms-input-placeholder {
    color: #43a7fe;
  }
</style>
