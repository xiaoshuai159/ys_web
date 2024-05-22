<template>
    <div class="login-wrap">
      <div class="img_div"><img :src="imgurl" alt="logo" style="width:550px;height:550px;"></div>
      <div class="login1">
        <el-form :rules="rules" class="login-container" ref="loginForm" :model="loginForm">
        <h1 class="title">云上服务资产归属判别平台</h1>
        <el-form-item prop="login_user">
          <el-input type="text" v-model="loginForm.login_user" placeholder="请输入账号" auto-complete="false" prefix-icon="el-icon-user-solid" minlength="5" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item prop="login_passwd">
          <el-input  v-model="loginForm.login_passwd" placeholder="请输入密码" auto-complete="false" prefix-icon="el-icon-lock" minlength="5" maxlength="30" show-password></el-input>
        </el-form-item>
         <!-- <el-form-item prop="code" class='codebox'>
          <el-input type="text" class='code' v-model="loginForm.code" placeholder="请输入验证码" auto-complete="false" prefix-icon="el-icon-key" style="vertical-align:middle;margin-right:5px;">
           
          </el-input>
           <span><img :src="captchaUrl"  @click="updateCaptcha" style="vertical-align:middle; height:37px"  align='right'></span>
        </el-form-item>  -->
        
        <el-form-item class="buttonBox">
          <!-- 无验证码的情况：新增样式 margin-top: 3vh -->
          <el-button type="primary" style="width: 40%; margin-top: 3vh;" @click="submitLogin" @keyup.enter="submitLogin">登录</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div> 
  </template>
   
  <script>
    export default {
      name: 'login',
      data: function() {
        return {
        //   imgurl:require("@/assets/logo2.png"),
          // imgurl:require("@/assets/changanlogo.png"),
          imgurl:require("@/assets/a7fba5c3346470712319616c9a7ddc33.png"),
          captchaUrl:'/verify_code?time'+new Date(),
          loginForm:{
            login_user:'',
            login_passwd:'',
            code:''
          },
          checked:true,
          rules:{          
            login_user: [{required:true,message:'请输入用户名',trigger:'blur'}],          
            login_passwd: [{required:true,message:'请输入密码',trigger:'blur'}],
            code: [{required:true,message:'请输入验证码',trigger:'blur'}],
          }
          
        }
      },
      created() {
          var lett = this;
          document.onkeydown = function(e) {
            var key = window.event.keyCode;
            if (key == 13) {
            lett.submitLogin();
            }
          }
      },
      methods: {
        submitLogin() {
          // 假数据， 不走接口，前端自己玩
          if(this.loginForm.login_user == 'admin' && this.loginForm.login_passwd == 'yunshangfuwuzichan'){
             this.$router.push({name:'PropertyManagement'})
          }else{
            this.$message.error('账号密码错误！')
          }
            // this.$router.push({name:'infoPage'})
            
            
          // this.$refs.loginForm.validate((valid) => {  // 7.6 测试暂时关闭
          //   if (valid) {
          //     //第一种
          //     // this.$http.interceptors.response.use((rep)=>{
          //     //   return Promise.resolve(rep)
          //     // }, (error) => {
          //     //   //console.log(error.response.data.code)
          //     //   if(error.response.code=='502'){
          //     //     this.$message.error('验证码有误，请重试！');
          //     //   }else if((error.response.code=='501')){
          //     //     this.$message.error('账号或密码有误，请重试！');
          //     //   }
          //     //     // return Promise.reject(error);
          //     //   })
          //    this.$http.post('/login_in',this.loginForm).then(rep=>{                
          //       if(rep){
          //         this.$message({
          //           message: '登陆成功！',
          //           type: 'success'
          //         });      
          //         this.$router.push({
          //           name:'infoPage',
          //         })
          //         this.$store.dispatch('updatetoken',rep.data.token)         
          //       }
          //     }).catch((err)=>{
          //        console.log(err)
          //        this.$message.error('输入有误，请重试！');
          //     })
  
          //   } else {
          //     this.$message.error('请输入所有字段！');
          //     return false;
          //   }
          // });
        
        },
        updateCaptcha() {
          this.captchaUrl = '/verify_code?time'+new Date();
        },
   
  
      }
    }
  </script>
   
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="less">
    .login-wrap {
      width: 100%;
      height: 100%;
      /* background-color: #112346; */
      background-repeat: no-repeat;
    }
    .img_div{
      position: absolute;
      top:50%;
      margin-top:-285px;
      right:50%
    }
    h1{
        letter-spacing:2px;
        
    }

   .login1{
     position: absolute;
      left:52%;
      // margin-left: -210px;
      top:50%;
      margin-top:-190px;
   }
    .login-container {
      // position: relative;
      border-radius: 10px;
      /* margin: 50px auto; */
      width: 385px;
      padding: 24px 15px;
      background: #fff;
      border: 1px solid #eaeaea;
      text-align: center;
      box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
    }
  
   /deep/.el-form-item__content{
     display: flex;
     align-items: center;
    //  text-align: center;
   }
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
  //   .el-select{
  //   width:20%; 
  // }
  /deep/.el-input__inner{
    height: 37px;
  }
  
  .el-input__suffix {
    top: -1px;
  }
  .el-input__icon {
    line-height: inherit;
  }
  .el-button{
    // width:200px;
    height:37px;
      line-height: 0.1;
      margin: 0 auto;
      border-radius:20px;
      background-color: #fff;
      color: #4595e9;
      letter-spacing:5px;
  }
  .el-button:hover{
    background-color: #4595e9;
      color: #fff;
  }
  .el-input{
    margin: auto 40px;
  }
  /deep/.el-form-item__error {
      color: #F56C6C;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      margin-left: 40px;
      position: absolute;
      top: 100%;
      left: 0;
  }
  .code{
    width: 210px;
  }
  </style>
  