<template>
  <el-form
    :model="form"
    ref="form"
    enctype="multipart/form-data"
    :rules="rules"
    class="item-add-list"
  > 
    <div style="height:100%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);" v-show="divshow">
      <el-tabs type="border-card">
        <el-tab-pane v-if="handelchange3cun" label="学情报告">
          <el-table
            v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)"
            element-loading-text="正在拼命更新数据"
            :data="handelchange3cun"
            style="width: 100%">
            <el-table-column
              prop="AnswerSheetID"
              label="试卷id"
              width="180">
            </el-table-column>            
            <el-table-column
              style="font-size:20px;"
              prop="subjectName"
              label="考试科目"
              width="180">
            </el-table-column>
            <el-table-column
              prop="ExamTitle"
              label="试卷名称">
            </el-table-column>
            <el-table-column
              prop="CreateTime"
              label="考试的日期">
            </el-table-column>
              <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button v-model="dialogTableVisible1" @click="dialogTableVisible(scope.row.AnswerSheetID)" size="mini" type="primary" round>查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          

        </el-tab-pane> 
        <el-dialog title="考试详情" :visible.sync="dialogTableVisible1">
            <el-table :data="gridData">
                <el-table-column prop="avgScore" label="平均分" width="150"></el-table-column>
                <el-table-column property="maxScore" label="最高分" width="80"></el-table-column>
                <el-table-column property="Type" label="考试类型" width="80"></el-table-column>
                <el-table-column property="CreateTime" label="考试日期"></el-table-column>
                <el-table-column property="ExamTitle" label="试卷的名称" width="400"></el-table-column>
            </el-table>
        </el-dialog>





      </el-tabs>
    </div>
  </el-form>

</template>

<script>
import bus from '../../common/bus'
export default {
  name: "addproject",
  data() {
    return {
      form: {
        tiny: "",
        GradeName: "",
        ClassName: "",
        SubjectName:"",
        file: [],
        // GradeID:"",
        // ClassID:"",
        // SubjectID:"",

      },
      
      outerVisible: false,
      innerVisible: false,

      scope:[],
      dialogTableVisible1: false,
      gridData:[],
      GradeID: "",
      ClassID: "请选择",
      SubjectID:'',
    	loading:false,
      divshow: true,
      // score:'',
      layered:'',
      avgScore:'',
      userInfo:'',
      rules: {},
      handelchange3cun:[],
      AnswerSheetID:"",
      boxhead:[],
      subject:[],
      inforGradelD:[],
    };
  },
  created() {
        bus.$on("getParam",param =>{
          this.boxhead = param
        })
        bus.$on("GradeID",param=>{
          this.GradeID1 = param
        })
        this.handelchange3()
      },
  computed: {},
  watch:{
    boxhead(){
       this.handelchange3()
    }
  },

  methods: {

    outerVisible1(){
        this.outerVisible = true
    },
    innerVisible1(e){
      this.innerVisible = true
    },
    dialogTableVisible(e){
      this.dialogTableVisible1 = true
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.$get("study/scores?SchoolID="+userInfo["SchoolID"]+
      "&AnswerSheetID="+e+"&SubjectID="+this.boxhead[1]).then(res =>{
        console.log(res.data)
        this.gridData = []
        if(res.data.Type == 0){
            res.data.Type = "考试"
        }else{
          res.data.Type = "作业"
        }
         this.gridData.push(res.data) 
      })
    },

    handelchange3(param){
      this.loading = false
      var subject = JSON.parse(sessionStorage.getItem('subject'));
      var inforGradelD = JSON.parse(sessionStorage.getItem('GradeID'));
      this.inforGradelD = inforGradelD
      console.log(this.inforGradelD)
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(subject)
      this.subject = subject
      if(subject == null || subject == ''){
          this.$get("teacher/subjectAnswerSheetInfo?SchoolID="+userInfo["SchoolID"]+"&UserID="+userInfo["UserID"]
				+"&SubjectID="+this.inforGradelD[1]+"&GradeID="+this.inforGradelD[0]).then(res =>{
            this.handelchange3cun = res.data.list
        })
          this.loading = false
			}else{
        console.log(2)
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
				// GradeID下标是0   SubjectID下标是1
				this.$get("teacher/subjectAnswerSheetInfo?SchoolID="+userInfo["SchoolID"]+"&UserID="+userInfo["UserID"]
				+"&SubjectID="+subject[1]+"&GradeID="+subject[0]).then(res=>{
					if(res.code === 0){
							if(res.data.list == 0){
									this.open7()
							}
              this.handelchange3cun = JSON.parse(JSON.stringify(res.data.list))
              this.loading = false
              console.log(this.handelchange3cun)
							this.pages = res.data.pages;
						}else{
							this.$message.error('学生加载失败');
						}
				})
      }
      
      
      

      // this.handelchange3cun = []
      // var userInfo = JSON.parse(localStorage.getItem("userInfo"));    
      // this.$get("study/answer?SchoolID="+userInfo["SchoolID"]  
      // +"&UserID="+userInfo["UserID"]+"&SubjectID="+param[1]+"&GradeID="+param[0]).then(res =>{
      //   if(res.data.length == 0){
      //       this.open7()
      //   }else{
      //      this.handelchange3cun = []
      //       res.data.forEach((item,index) => {
      //         if(item.Type == "0"){
      //             item.Type = "考试"
      //         }else{
      //             item.Type = "作业"
      //         }
      //         this.handelchange3cun.push(item)
      //     });
      //   }
          
      // })
    },
    open7() {
        this.$message({
          showClose: true,
          message:'暂无可查询内容稍后重试',
          type: 'warning'
        });
      },

    }
  }








</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.el-icon-edit-outline {
  color: #ffc966;
  font-size: 24px;
  margin-right: 10px;
}
.el-icon-info {
  color: #448eff;
  font-size: 24px;
}
</style>
<style>
.item-title {
  height: 42px;
  background: #f6f6f6;
  margin-bottom: 20px;
}
.item-title span {
  font-size: 14px;
  color: #666;
  height: 22px;
  line-height: 22px;
  display: block;
  margin: 10px 0 0 20px;
  border-left: 5px solid #ff7070;
  padding-left: 10px;
}

.sour{
  background:rgb(199, 197, 197); transition:all ease-in-out .3s; padding:10px
}
.sour:hover{background-color:rgb(206, 62, 6)}
</style>
