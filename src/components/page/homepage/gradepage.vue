<template>
    <div class="tableDataListBox">
      <ul class="tableDataList">
        <li>年级编号</li>
        <li>年级名称</li>
        <li>特殊班级</li>
        <li>操作</li>
      </ul>
      <ul class="tableDataList" v-for="(value,index) in  tableData" :key="index">
          <li >{{value.GradeID}}</li>
          <li style="font-size:28px">{{value.GradeName}}</li>
          <li></li>
          <li>
            <el-button :disabled="dis" type="success" @click="skip(value.GradeID)" round size="small">详情</el-button>
            <!-- <router-link :to="{path:'classDetail',
              query:{SchoolID:userInfo.SchoolID,gradeId:
              value.GradeID,UserID:userInfo.UserID}}" style="color:#35a000;">详情</router-link> -->
          </li>
        </ul>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        tableData: [],
        GradeName: '',
        ClassNum: '',
        SpecialClassNames: '',
        loading:true,
        userInfo:[],
        dis:false,
        gradeid:[],
        userInfo:[],
        gradeidcun:[],
      }
    },
    created(){
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.userInfo = userInfo
        this.$get('teacher/gradeInfo?SchoolID='+userInfo["SchoolID"]
        +'&GradeClassIDs='+userInfo["GradeClassIDs"]).then((res) => {
         var Data =res.data
         console.log(Data)
          //  this.tableData.push(res.data) 
          //  console.log(this.tableData)
          for(let i in Data){
            this.tableData.push(Data[i]["0"])
          }
          console.log(this.tableData)
        this.loading = false
      }).catch(() => {this.loading = false})
      console.log(this.gradeid)
      console.log(this.tableData)
      
    },
    computed: {

    },
    methods: {
        skip(e){
          this.gradeidcun = []
          var userInfo = JSON.parse(localStorage.getItem("userInfo"));
          this.$get("teacher/classInfo?SchoolID="+userInfo["SchoolID"]+"&gradeId="+e+"&UserID="+userInfo["UserID"]).then(res=>{
                console.log(res.data)
                for(let i in res.data){
                   this.gradeidcun.push(res.data[i])
                }
                console.log(this.gradeidcun)
                if(this.gradeidcun[0].length == 0){
                    // this.open8()
                    this.$router.push({path:"classman",query:{SchoolID:userInfo.SchoolID,gradeId:e}})
                }else{
                    this.$router.push({path:'classDetail',query:{SchoolID:userInfo.SchoolID,
                    UserID:userInfo.UserID,gradeId:e}}); 
                }
              })
          
        },
        open8() {
        this.$message({
          showClose: true,
          message: '这位选手的年级下没有班级哟',
          type: 'error'
        });
      }
    }
  }
</script>
<style scoped>

.paperList2 .container .el-table .el-table__body-wrapper .el-table__body .el-table_1_column_2{
    font-size:20px;
    font-weight:bold;
  }
.ha1{
  font-size: 50px;
}
.paperList2 .container .container-title{
  font-size:25px;
  font-weight:bold;
}
.tableDataList{
  width: 1200px;
  margin:0 auto;
  display: flex;
  background:#fff;
}
.tableDataList li{
  width: 300px;
  border:1px solid #eee;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-right:none;
}
.tableDataList li:nth-last-child(1){
  border-right:1px solid #eee;
}
.tableDataList:nth-child(1) li{
  border-bottom:none;
}
</style>

