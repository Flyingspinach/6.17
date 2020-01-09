<template>

  <div class="login-wrap" v-loading="loading" element-loading-text="登录中">
    <vue-particles
        color="#dedede"
        :particleOpacity="5"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#66ffff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="200"
        :moveSpeed="7"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    <!-- <img class="ms-logo" src="../../../assets/logo.png"/> -->
    <!-- <img class="ms-logo" src="../../../assets/kaokao_2(1).png"> -->
    <!-- <div class="ms-title">考考教育系统管理 </div> -->
    <div class="ms-login clearfix">
      <div class="ms-login-left"></div>
      <div class="ms-login-right">
        <div class="login-title">登录</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="0px"
          class="demo-ruleForm"
        >
          <el-form-item prop="type">
            <el-select
              v-model="value"
              class="login-input"
              placeholder="选择角色"
              @change="typeChange"
            >
              <el-option 
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
            <i class="el-input__icon el-icon-lx-group"></i>
          </el-form-item>
          <el-form-item prop="LoginMobile">
            <el-input class="login-input" v-model="ruleForm.LoginMobile" placeholder="用户名">
              <i slot="prefix" class="el-input__icon el-icon-lx-people"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="Passwd">
            <!-- <el-input
              
              placeholder="密码"
              
              show-password
              
            >
              
            </el-input> -->
            <el-input type="password" class="login-input" placeholder="请输入密码" v-model="ruleForm.Passwd" show-password  @keyup.enter.native="submitForm('ruleForm')">
                <i slot="prefix" class="el-input__icon el-icon-lx-lock"></i>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
   
  </div>
</template>

<script>
export default {
  created(){
    var user = JSON.parse(localStorage.getItem("user"));
    var user1 = JSON.parse(localStorage.getItem("user1"));
    
    if(user === null){

    }else{
       this.ruleForm.LoginMobile = user
       this.value = user1
    }
  },
  data: function() {
    return {
      loading: false,
      ruleForm: {
        type: "",
        LoginMobile: "",
        Passwd: ""
      },
      rules: {
        // type: [
        //   { required: true, message: "请选择角色类型", trigger: "change" }
        // ],
        LoginMobile: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        Passwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      options: [{
          value: 1,
          label: '家长'
        }, {
          value: 2,
          label: "老师"
        },],
        value: "",
    };
  },
  methods: {
    submitForm(formName) {
      this.loading = true
      localStorage.setItem("user",JSON.stringify(this.ruleForm.LoginMobile))
      if(this.value ==1){
        this.loading = false
         this.$post("login/parent_login", {
              "LoginMobile": this.ruleForm.LoginMobile,
              "Passwd": this.ruleForm.Passwd
            }).then(res => {
              if (res.code === 0) {
                  localStorage.setItem("userInfo", JSON.stringify(res.data));
                  localStorage.setItem("token", res.data.token);
                  this.$router.push("/index");
                } else {
                  this.$message.error(res.msg);
                }
                this.loading = false;
               
              })
      }else{
        this.$post("login/teac_login", {"LoginMobile": this.ruleForm.LoginMobile,"Passwd": this.ruleForm.Passwd}).then(res=>{
            if (res.code === 0) {
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                // localStorage.setItem("token", res.data.token);
                this.$router.push("/learning");
              } else {
                this.$message.error(res.msg);
              }
              this.loading = false;
        })
      }

    },
    typeChange(val) {
      // this.useraccount = val
      this.ruleForm.LoginMobile = "";
      this.ruleForm.Passwd = "";
      localStorage.setItem("user1",JSON.stringify(val))
    }
  }
};
</script>
