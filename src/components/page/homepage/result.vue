<template>


<el-tabs v-model="activeName"   @tab-click="handleClick">
  <el-tab-pane label="成绩单" name="first">
    <el-form
    :model="form"
    ref="form"
    enctype="multipart/form-data"
    class="item-add-list"
  >
        <div style="height:100%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);" v-show="divshow">
            <el-table
              v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)"
              element-loading-text="正在拼命更新数据"
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="CreateTime"
                label="考试日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="GradeName"
                label="年级">
            </el-table-column>
            <el-table-column
                prop="SubjectName"
                label="科目">
            </el-table-column>
            <el-table-column
                prop="StudentName"
                label="姓名"
                width="100">
            </el-table-column>
            <el-table-column
                prop="Sex"
                label="性别">
            </el-table-column>
            <!-- <el-table-column
                prop="GradeID"
                label="年级">
            </el-table-column>
            <el-table-column
                prop="ClassID"
                label="班级">
            </el-table-column> -->
            <el-table-column
                prop="Score"
                label="分数">
            </el-table-column>
            <el-table-column
                prop="StudentID" 
                label="学号">
            </el-table-column>
            <!-- <el-table-column
                prop="study.Ranking"
                label="排名">
            </el-table-column> -->
            <el-table-column
                prop="type"
                label="考试状态">
            </el-table-column>
            <el-table-column
                prop="Type"
                label="考试类型">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <router-link :to="{path:'studyInfo',query:{SchoolID:userInfo.SchoolID,StudentID:scope.row.StudentID}}" style="color:#35a000;">学情报告</router-link>
              </template>
            </el-table-column>
            </el-table>
            <div class="pagination">
				<el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
				</el-pagination>
			</div>
        </div>
    </el-form>
  </el-tab-pane>
</el-tabs>
  
</template>

<script>
import bus from '../../common/bus'
export default {
  components:{

  },
  data(){
    return{
      form: {
        tiny: "",
        CreateTime: "",
        StudentName: "",
        Sex:"",
        GradeID:"",
        ClassID:"",
        Score:"",
        Ranking:"",
        // study:[],
        file: []
      },
      grade:[],
      loading:false,
      // v-model双向绑定
      GradeID: "",
      ClassID: "请选择",
      SubjectID: "",
      // v-for数据
      category1: [],
      category2: [],
      category3: [],
      score:[],
      haha:[],
      // v-show显示
      category2show: false,
      category3show: false,
      divshow: true,
      activeName: 'first',
      //这是四数据
      tableData: [],
      cur_page: 1,
      pages:0,
      SchoolID:'',
      ClassID:'',
      false:true,
      tableData1: [],
      paramData:[],
      head2:[],
      head3:[],
      dis:false,
      queryParams:[],
      userInfo:[],
      head4:[],
      ClassID:[],
      paging:[],
      Pagingjudgment:[],
    //   classandgrade:[],
      }
  },
  created() {
        this.Classrequest()
        var classandgrade = JSON.parse(sessionStorage.getItem('classandgrade'))
        this.head4 = classandgrade
        bus.$on("getParam",param =>{
          this.head2 = param
        })
        console.log(this.Pagingjudgment)
        //以下俩个bus有班级生效getParamthree无班级生效getParamtwo
        // bus.$on("getParamtwo",param =>{
        //     this.head3 = param
        // })
        // bus.$on("getParamthree",param =>{
        //     this.head4 = param
        //     console.log(this.head4)
        // })
      },
  watch:{
      head2(){
        if(this.head4 === 1){
            console.log("无班级")
            this.Gradesubjects()
            this.Pagingjudgment = 50
        }else{
            console.log("有班级")
            this.Classsubjects()
            this.Pagingjudgment = 50
        }
        console.log(this.Pagingjudgment)
        
        // this.getStudayData2()
        // this.getStudayData3()
      }
  },
  methods:{
    // async funA(){
    //     var res =  await axios.post('') //这里的res就是axios请求回来的结果
    // },

    Classrequest(){
       var userInfo = JSON.parse(localStorage.getItem("userInfo"));
       this.userInfo = userInfo
       var queryParams = JSON.parse(sessionStorage.getItem('GradeID'));
       this.queryParams = queryParams
       if(!this.queryParams){
            console.log("没有最新学期")
            this.open5()
       }else{
          this.paging = []
          this.loading = true
          console.log(this.queryParams)
          //根据年级id学科id试卷id查找成绩单
          console.log("请求最新详情的年级id学科id")
          var subject = JSON.parse(sessionStorage.getItem("subject"))
            if(subject === null){
            console.log("用户没有点击")
            
            this.$get("teacher/gradeStudyInfo?SchoolID="+userInfo["SchoolID"]+"&GradeID="+this.queryParams[0]+"&SubjectID="+this.queryParams[1]+"&AnswerSheetID="+this.queryParams[2]).then(res =>{
                console.log(res.data)
                if(res.data.list.length === 0){
                    this.loading = false
                    this.open5();
                }else{
                    this.loading = false
                    res.data.list.forEach((item,i) =>{
                    if(item.Sex === "M"){
                            item.Sex = "男"
                        }else{
                            item.Sex ="女"
                        }
                    if(item.Type == "0"){
                            item.Type = "考试"
                        }else{
                            item.Type = "练习"
                        }
                        this.tableData.push(item)
                    })
                }
          })
        }else{
            console.log("用户点击啦")
            this.$get("/teacher/gradeStudyInfoMassion?SchoolID="+userInfo["SchoolID"]+"&GradeID="+subject[0]+"&SubjectID="+subject[1]).then(res =>{
                this.pages = res.data.navigatePages
                console.log(this.paging)
                if(res.data.list.length === 0){
                    this.loading = false
                }else{
                    this.paging = res.data.list[0].SubjectID
                    res.data.list.forEach((item,i) =>{
                        if(item.Sex === "M"){
                            item.Sex = "男"
                        }else{
                            item.Sex ="女"
                        }
                        if(item.Type == "0"){
                            item.Type = "考试"
                        }else{
                            item.Type = "练习"
                        }
                        this.tableData.push(item)
                    })
                    this.loading = false
                }
            })
        }
            
        







          
       }
    },
    //watch监听head2变化请求年级id科目id下的成绩单
    Gradesubjects(){
        this.paging = []
        this.tableData = []
        this.loading = true
        this.$get("/teacher/gradeStudyInfoMassion?SchoolID="+this.userInfo["SchoolID"]+"&GradeID="+this.head2[0]+"&SubjectID="+this.head2[1]).then(res =>{
            console.log(res.data)
            this.pages = res.data.navigatePages
            console.log(this.paging)
            if(res.data.list.length === 0){
                    this.loading = false
                }else{
                    this.paging = res.data.list[0].SubjectID
                    res.data.list.forEach((item,i) =>{
                        if(item.Sex === "M"){
                            item.Sex = "男"
                        }else{
                            item.Sex ="女"
                        }
                        if(item.Type == "0"){
                            item.Type = "考试"
                        }else{
                            item.Type = "练习"
                        }
                        this.tableData.push(item)
                    })
                    this.loading = false
                }
        })
    },

    //班级科目请求
    Classsubjects(){
        this.paging = []
        this.tableData = []
        this.loading = true
        this.$get("teacher/studentInfoMassions?SchoolID=21001&ClassID=6&SubjectID=5").then(res =>{
            this.pages = res.data.pageSize
            this.paging = res.data.list[0].SubjectID
              if(res.data.list.length === 0){
                      this.loading = false
                  }else{
                      res.data.list.forEach((item,i) =>{
                        if(item.Sex === "M"){
                            item.Sex = "男"
                        }else{
                            item.Sex ="女"
                        }
                        this.tableData.push(item)
                      })
                      this.loading = false
                  }
            })
    },

    open7() {
        this.$message({
          showClose: true,
          message: '警告,这个老师没有班级',
          type: 'warning'
        });
      },
    open6() {
      this.$message({
        showClose: true,
        message: '没有查询到班级里的学生',
        type: 'warning'
      });
    },
    open5() {
      this.$message({
        showClose: true,
        message: '无法根据最新详情获取成绩单',
        type: 'warning'
      });
    },




	// 分页导航
      handleCurrentChange(val) {
        console.log(val)
        this.tableData = []
        this.loading = true
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.userInfo = userInfo
        if(this.Pagingjudgment.length === 0){
            console.log("刚进入页面时的请求")
            //刚进入页面时分页
            this.$get("teacher/gradeStudyInfoMassion?SchoolID=99&GradeID=12&SubjectID=5&pageNum="+val).then(res =>{
                console.log(res.data)
                    if(res.code === 0){
                        res.data.list.forEach((element,i) => {
                        if(element.Sex == "F"){
                            element.Sex = "男"
                        }else{
                            element.Sex = "女"
                        }
                            this.tableData.push(element)
                        });
                        }else{
                            this.$message.error('学生加载失败');
                        }
                        this.loading = false
            }).catch(() => {this.loading = false})
        }else{
            console.log("被点击触发的请求")
            this.$get("/teacher/gradeStudyInfoMassion?SchoolID="+this.userInfo["SchoolID"]+"&GradeID="+this.head2[0]+"&SubjectID="+this.head2[1]+"&pageNum="+val).then(res =>{
            console.log(res.data)
            this.pages = res.data.navigatePages
            this.paging = res.data.list[0].SubjectID
            console.log(this.paging)
                if(res.data.list.length === 0){
                        this.loading = false
                    }else{
                        res.data.list.forEach((item,i) =>{
                            if(item.Sex === "M"){
                                item.Sex = "男"
                            }else{
                                item.Sex ="女"
                            }
                            this.tableData.push(item)
                        })
                        this.loading = false
                    }
            })
        }

        // this.$get("teacher/gradeStudyInfoMassion?SchoolID=99&GradeID=12&SubjectID=5&pageNum=3").then(res =>{
        //     console.log(res.data)
        // })
            //   this.$get("teacher/studentInfoMassion?SchoolID="+userInfo["SchoolID"]+"&ClassID="+this.ClassID+"&pageNum="+val+"&SubjectID="+this.paging).then((res) =>{
            //         console.log(res.data)
            //         if(res.code === 0){
            //         res.data.list.forEach((element,i) => {
            //         if(element.Sex == "F"){
            //             element.Sex = "男"
            //         }else{
            //             element.Sex = "女"
            //         }
            //             this.tableData.push(element)
            //         });
            //         }else{
            //             this.$message.error('学生加载失败');
            //         }
            //         this.loading = false
            //     }).catch(() => {this.loading = false})
			},
	



    handleClick(tab, event) {     

      },
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
  .head-content{
    margin: 0 auto;
  }
</style>
