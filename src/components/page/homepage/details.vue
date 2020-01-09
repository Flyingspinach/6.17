<template>
    <div class="detailshead">
      <ul>
        <ul class="detailsheadbox"
            v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)"
                element-loading-text="正在拼命更新数据"
        >
          <li>
              正在查看
          </li>
          <li style="color:#ebb563;">
              &nbsp;&nbsp;{{this.ClassID[0]}}&nbsp;&nbsp;&nbsp;
          </li>
          <li>
              学生情况
          </li>
        </ul>
        <el-input class="detailsheadone" placeholder="请输入内容" v-model="input"  clearable>     
        </el-input>
        <el-button @click="search" type="primary">搜索</el-button>
        <!-- <li class="detailsheadboxcontent">
          <div>
            <p>追踪学生动态,教学方案对症下药!!</p>
            <el-button class="detailsheadboxcontent1" type="warning" icon="el-icon-edit">添加更多追踪学生</el-button>
          </div>
          
        </li> -->
        
        <hr>
        <li class="detailsheadtwo">
          <ul  @click="skip(item.StudentID)" v-for="item in tableData" :key="item.id">
            <li>
              <img src="../../../../static/img/pupillogo.png" alt="">
            </li>
            <div class="detailsheadtowhove" >
                <li>
                    {{item.StudentName}}
                    {{item.StudentID}}
                </li>
            </div>
          </ul>
        </li>
        <li class="detailsheadtwo1"></li>
        <el-pagination :disabled="paging" @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
        </el-pagination>
        <!-- <div class="detailspages">
            <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
            </el-pagination>
        </div>  -->
      </ul>
       
    </div>
  
</template>

<script>
import bus from '../../common/bus'
export default {
  components:{

  },
  data(){
    return{
        userInfo:[],
        school:[],
        tableData:[],
        ClassID:[],
        paging:false,
        pages:0,
        head2:[],
        loading:false,
        input:'',
        gradedata:[],
        gradedatacun:[],
        Gradedata:[],
		Classdata:[],
		subjectdata:[],
      }
  },
  created() {
        bus.$on("getParam",param =>{
            this.head2 = param
        })
        // bus.$on("gradedata",param123=>{
        //     this.gradedata = param123
        //     console.log(this.gradedata)
        // })
        var subject = JSON.parse(sessionStorage.getItem("subject"));
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.userInfo = userInfo
        // this.request()
        if(subject == null){
            this.loading = true
                this.school = JSON.parse(sessionStorage.getItem('school'));
                this.Gradedata = this.school[0]
                this.subjectdata = this.school[1]
                this.Classdata = this.school[2]
                if(this.school[2] === 0){
                    this.grade()
                }else{
                    this.beg()
                }
        }else{
            this.loading = true
                console.log("有点击")
                this.school = JSON.parse(sessionStorage.getItem('subject'));
                this.Gradedata = this.school[0]
                this.subjectdata = this.school[1]
                this.Classdata = this.school[2]
                if(this.school[2] === 0){
                    this.grade()
                }else{
                    this.beg()
                }
              
        }
    },
    watch:{
            head2(){
                this.school = JSON.parse(sessionStorage.getItem('subject'));
                this.Gradedata = this.school[0]
                this.subjectdata = this.school[1]
                this.Classdata = this.school[2]
                if(this.school[1] === 0){
                    this.grade()
                }else{
                    this.beg()
                }
                
            }
    },
  methods:{
    //    request(){
    //       this.$get("/teacher/gradeInfo?SchoolID="+this.userInfo["SchoolID"]+"&GradeClassIDs="+this.userInfo["GradeClassIDs"]).then(res=>{
    //           console.log(res.data)
    //           this.gradedata = res.data
    //       })
    //   },
      grade(){
            this.tableData = []
            this.ClassID = []
            this.gradedatacun = []
            this.$get("/teacher/gradeStudentStudy?SchoolID="+this.userInfo["SchoolID"]+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata).then(res=>{
                console.log(res.data)
                if(res.data.list.length === 0){
                    this.loading = false
                    if(res.data.pages === 0){
                        this.paging = true
                    }   
                }else{
                    this.pages = res.data.pages
                    res.data.list.forEach((item,i) => {
                        this.tableData.push(item)
                    });
                    console.log(this.gradedata)
                    for(let i in this.gradedata){
                        this.gradedata[i].forEach((item,i)=>{
                            this.gradedatacun.push(item)
                        })
                        console.log(this.gradedatacun)
                        this.gradedatacun.forEach((item,i)=>{
                            if(this.school[0] == item.GradeID){ 
                                this.ClassID.push(item.GradeName+"全部班级")
                            }else{

                            }
                        })
                    }
                    this.loading = false
                }
            })
      },
      //请求学生详情追踪
      beg(){
          this.tableData = []
          this.$get("teacher/studentStudy?SchoolID="+this.userInfo["SchoolID"]+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata+"&ClassID="+this.Classdata).then(res=>{
            console.log(res.data)
            if(res.data.list.length == 0){
                this.loading = false
                if(res.data.pages === 0){
                    this.paging = true
                    // console.log(123456789)
                }
            }else{
                this.pages = res.data.pages
                this.ClassID = []
                res.data.list.forEach((item,i) => {
                    this.tableData.push(item)
                    this.ClassID.push(item.ClassID+"班")
                });
                this.loading = false
            }
          })
        //   console.log(this.tableData)
      },
      //搜索
      search(){
          this.tableData = []
          if(this.school[1] === 0){
            if(Number.isNaN(Number(this.input))){
                this.$get("teacher/gradeStudentStudyLike?SchoolID="+this.userInfo["SchoolID"]+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata+"&StudentName="+this.input).then(res=>{
                    res.data.list.forEach((item,i)=>{
                        this.tableData.push(item)
                    })
                })
            }else{
                this.$get("teacher/gradeStudentStudyLike?SchoolID="+this.userInfo["SchoolID"]+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata+"&StudentID="+this.input).then(res=>{
                    res.data.list.forEach((item,i)=>{
                        this.tableData.push(item)
                    })
                })
            }
            

          }else{
                if(Number.isNaN(Number(this.input))){
                    //文字
                        this.$get("/teacher/gradeStudentStudyLike?SchoolID="+this.userInfo["SchoolID"]+"&GradeID="+this.Gradedata
                        +"&SubjectID="+this.subjectdata+"&ClassID="+this.Classdata+"&StudentName="+this.input).then(res=>{
                            res.data.list.forEach((item,i)=>{
                                this.tableData.push(item)
                            })
                        })
                }else{
                    //数字
                        this.$get("/teacher/gradeStudentStudyLike?SchoolID="+this.userInfo["SchoolID"]+"&GradeID="+this.Gradedata
                        +"&SubjectID="+this.subjectdata+"&ClassID="+this.Classdata+"&StudentID="+this.input).then(res=>{
                            res.data.list.forEach((item,i)=>{
                                this.tableData.push(item)
                            })
                        })
                }
          }
          

           
      },
      //分页导航
      handleCurrentChange(val){
          this.tableData = []
          this.loading = true
          if(this.school[1] === 0){
              this.$get("/teacher/gradeStudentStudy?SchoolID="+this.userInfo["SchoolID"]+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata+"&pageNum="+val).then(res=>{
                    if(res.data.length == 0){
                        this.loading = false
                    }else{
                        res.data.list.forEach((item,i) => {
                                this.tableData.push(item)
                                this.ClassID.push(item.ClassID)
                            });
                        this.loading = false
                    }
              })
          }else{
              this.$get("teacher/studentStudy?SchoolID="+this.userInfo["SchoolID"]+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata+"&ClassID="+this.Classdata+"&pageNum="+val).then(res =>{
                    if(res.data.length == 0){
                        this.loading = false
                    }else{
                        res.data.list.forEach((item,i) => {
                                this.tableData.push(item)
                                this.ClassID.push(item.ClassID)
                            });
                        this.loading = false
                    }
                })
          }
      },
      skip(val){
        // console.log(val)
        this.$router.push({path:"classman",query:{StudentID:val}});
      },
  }
}
</script>

<style>


</style>
