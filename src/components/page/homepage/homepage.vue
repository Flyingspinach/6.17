<template>
<el-tabs v-model="activeName"   @tab-click="handleClick">
  <el-tab-pane label="学情报告" name="first">
    <el-form
    :model="form"
    ref="form"
    enctype="multipart/form-data"
    class="item-add-list"
  >
    <el-row :gutter="10" class="clearfix">
      <el-col :span="8">
        <el-form-item prop="category1">
          <el-select v-model="GradeID" placeholder="请选择年级" @change="handelchange1">
            <el-option v-for="item in category1" :key="item.id" :label="item.GradeName" :value="item.GradeID"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="category2">
          <el-select
            v-model="ClassID"
            v-show="category2show"
            @change="handelchange2"
          >
            <el-option label="请选择" value="请选择"></el-option>
            <el-option v-for="item in category2" :key="item.id" :label="item.SubjectName" :value="item.SubjectID"></el-option>
          </el-select>
        </el-form-item>
      </el-col> 
  
    </el-row>
    <div style="height:100%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);" v-show="divshow">
        <el-tabs type="border-card">
            <el-tab-pane label="学情报告">
            <div style="border-bottom:2px solid rgba(0, 0, 0, 0.1)">学情报告</div>
            <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);height:100%;margin-top:2%">
            <div style="float:left;margin-top:20px;width:49%;text-align:center;">
                <p>作业平均分</p>
                <p>
                  <h2 style="padding:20px">{{score.avgScore}}</h2>
                </p>
            </div>
            <div style="float:right;margin-top:20px;width:49%;text-align:center;border-left:1px solid rgba(0, 0, 0, .15)">
                <p>作业最高分</p>
                <p><h2 style="padding:20px">{{score.maxScore}}</h2></p>
            </div>
            </div>
            </el-tab-pane>
        </el-tabs>
    </div>

  </el-form>
  </el-tab-pane>

</el-tabs>
  
</template>

<script>
export default {
  components:{

  },
  data(){
    return{
      form: {
        tiny: "",
        GradeName: "",
        ClassName: "",
        file: []
      },
      // v-model双向绑定
      GradeID: "",
      ClassID: "请选择",
      // v-for数据
      category1: [],
      category2: [],
      score:[],
      haha:[],
      // v-show显示
      category2show: true,
      divshow: true,
      activeName: 'first',
      //这是四数据
      tableData: [],
      SchoolID:'',
      ClassID:'',
      false:true,
      tableData1: []
      }
  },
  created() {
        this.getcategory1();
      },
  methods:{
    // change事件
    handelchange1(e) {
      console.log(e)
      this.$get("teacher/gradeSubInfo?SchoolID="+this.userInfo["SchoolID"]+"&gradeId="+e).then(res =>{
        console.log(res)
        // this.category2 = res.data
        for(let i in res.data){
          console.log(res.data[i])
          this.category2.push(res.data[i])
        }
        console.log(this.category2)
        // console.log(this.category2)
      })
      // this.SchoolID=e
      // this.getcategory2().then(category2 => {
      //   if(category2.length === 0){
      //     // this.category2show = true;
      //     // this.divshow = true;

      //   if(this.GradeID!=''){
      //         this.$get("teacher/gradeStudyScore?SchoolID="
      //         + this.userInfo["SchoolID"] + 
      //         "&GradeID=" +this.GradeID).then(res =>{
      //           // score = res.data;
      //       })
      //         if(this.GradeID === "请选择"){
      //           this.divshow = false;
      //         }else{
      //           this.divshow = true;
      //           this.getStudayData1();
      //         } 
      //       }



      //   }else{
      //     // this.category2show = true;
      //     // this.divshow = false;
      //   }
      //   })
    },

 handelchange2(e){
   console.log(e)
      this.ClassID=e
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
      if(this.GradeID!=''){
      //   this.$get("teacher/classStudyScore?SchoolID="
      //   + this.userInfo["SchoolID"] + 
      //   "&ClassID=" +this.ClassID).then(res =>{
      //  })
        if(this.ClassID === "请选择"){
            console.log(1)
        }else{
          console.log(2)
          // this.divshow = true;
          // this.getStudayData2();
          alert("请正确选择")
        } 
      }
    },

   

    handleClick(tab, event) {     
    

      },
  


 // 请求方法名集合
    getStudayData1(){

      this.$axios.all([
        this.$get("teacher/gradeStudyScore?SchoolID=" + this.userInfo["SchoolID"] + "&GradeID=" +this.GradeID ),
        ]).then(([a])=>{
        if(a.code == 0){
          this.score = JSON.parse(JSON.stringify(a.data))
          this.drawLine()
          this.loading = false
        }else{
          this.$message.error('数据请求失败');
        }
      }).catch((err) =>{})

    },


// 请求方法名集合
    getStudayData2(){

      this.$axios.all([
        // this.$get("teacher/classStudyScore?SchoolID=" + this.userInfo["SchoolID"] + "&ClassID=" +this.ClassID ),
               this.$get("teacher/classStudyScore?SchoolID=99&ClassID=16"),
       ]).then(([a])=>{
        if(a.code == 0){
          this.score = JSON.parse(JSON.stringify(a.data))
          this.drawLine()
          this.loading = false
        }else{
          this.$message.error('数据请求失败');
        }
      }).catch((err) =>{})

    },





    getcategory1() {
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.$get(
          "teacher/gradeInfo?SchoolID=" +
            userInfo["SchoolID"] +
            "&GradeClassIDs=" +
            userInfo["GradeClassIDs"]
        )
          .then(res => {
            console.log(res)
            if (res.code === 0) {
              var Data = res.data
              for(let i in Data){
                this.category1.push(Data[i][0])
              }
              // this.category1 = res.data;
            } else {
              this.$message.error("接口数据请求失败");
            }
          })
          .catch(() => {
            this.loading = false;
          });
      },




  getcategory2() {
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.userInfo = userInfo;
      return this.$get("teacher/classInfo?SchoolID=" +userInfo["SchoolID"] +"&gradeId=" +this.GradeID +"&UserID=" +userInfo["UserID"])
        .then(res => {
          if (res.code === 0) {
            this.category2 = res.data;
            console.log(this.category2)
          } else {
            this.$message.error("接口数据请求失败");
            
          }
          return this.category2 
        })
        .catch(() => {
          this.loading = false;
        });
    },


    // tab切换三的选项内容
    tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
  }
}
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
