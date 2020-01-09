<template>
    <el-form :model="form" ref="form" :rules="rules" class="item-add-list">
    <!-- <div class="item-title clearfix"><span>基本信息</span></div> -->
    <el-row :gutter="10" class="clearfix">
        <el-col :span="12">
            <el-form-item label="项目号:" prop="projectNo">
            <el-input v-model.trim="form.projectNo" type="text"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="项目名称:" prop="projectName">
            <el-input v-model.trim="form.projectName" type="text"></el-input>
          </el-form-item>
        </el-col>                   
    </el-row>
    <el-row :gutter="10" class="clearfix">
        <el-col :span="12">
            <el-form-item label="金额" prop="amt">
            <el-input v-model.trim="form.amt" placeholder="保留小数点后一位或者两位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="备注" prop="memo">
            <el-input v-model.trim="form.memo"></el-input>
          </el-form-item>
        </el-col>
    </el-row>               
    <el-row :gutter="10" class="clearfix">
        <el-col :span="12">
            <el-form-item label="项目开始时间" prop="startDate">
            <el-date-picker type="date" placeholder="选择项目开始时间" v-model="form.startDate" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="项目结束时间" prop="expDate">
            <el-date-picker type="date" placeholder="选择项目结束时间" v-model="form.expDate" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker>
          </el-form-item>
        </el-col>
    </el-row>               
    <el-row :gutter="10" class="clearfix">
      <el-col :span="20" :offset="4">
        <el-button type="primary" @click="onSubmit('form')" style='margin-top:40px'>确认添加</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-col>
    </el-row>
    </el-form>
</template>

<script>
  export default {
    name: 'addproject',
    data() {
        // var re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(198)|(199)|(166)|(165)|(146)|(148))+\d{8})$/;
        var re = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        var amtRule = (rule, value, callback) => {
        if(!re.test(value)) {
            callback(new Error('请输入正确的格式'));
            }else{
              callback();
            }
        };
      return {
        form:{
            projectNo:"",
            projectName:"",
            startDate:"",
            expDate:"",
            amt:"",
            memo:"",
          },
          rules:{
            projectNo: [
            { required: true, message: '不可为空！', trigger: 'blur' }
          ],
            projectNo: [
            { required: true, message: '不可为空！', trigger: 'blur' }
          ],          
          amt: [
            { required: true, validator: amtRule, trigger: 'blur' }
          ],
          startDate: [
            { required: true, message: '不可为空！', trigger: 'blur' }
          ],          
          expDate: [
            { required: true, message: '不可为空！', trigger: 'blur' }
          ],          
          }
      }
    },
    created(){
        
    },
    computed: {

    },
    methods: {
      //提交数据
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                if (valid) {
                this.$post('projects',{
                    projectNo:this.form.projectNo,
                        projectName:this.form.projectName,
                        startDate:this.form.startDate,
                        expDate:this.form.expDate,
                        amt:this.form.amt,
                        memo:this.form.memo,
                }).then((res) => {
                    if(res.code === 0){
                            this.$message({message:res.msg,type: 'success'});
                            // this.$router.push('/mymember');
                    }else{
                        this.$message.error(res.msg);
                    }
                      })
                } else {
                return false;
                }               
                });
              this.$emit('closedialog');  
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            }
    }
  }
</script>

<style scoped>
.handle-box { margin-bottom: 20px;}
.handle-select {width: 120px;}
.handle-input {width: 300px;display: inline-block;}
.del-dialog-cnt{font-size: 16px; text-align: center;}
.el-icon-edit-outline{color:#ffc966; font-size:24px; margin-right:10px;}
.el-icon-info{color:#448eff; font-size:24px;}

</style>
<style>
.item-title{ height:42px; background:#f6f6f6; margin-bottom:20px;}
.item-title span{ font-size:14px; color:#666; height:22px; line-height:22px;display:block; margin:10px 0 0 20px; border-left:5px solid #ff7070; padding-left:10px;}
</style>
