<template>

        <div class="classmanleft">

            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="学生成绩" name="first">
                    <el-table
                    v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)"
                    element-loading-text="正在拼命更新数据"
                    :data="tableData"
                    border
                    style="width: 1200px">
                        <el-table-column
                        prop="CreateTime"
                        label="日期"
                        width="171">
                        </el-table-column>
                        <el-table-column
                        prop="StudentName"
                        label="姓名"
                        width="171">
                        </el-table-column>
                        <el-table-column
                        prop="gradeName"
                        label="年级"
                        width="171">
                        </el-table-column>
                        <el-table-column
                        prop="subjectName"
                        label="科目"
                        width="171">
                        </el-table-column>
                        <el-table-column
                        prop="Type"
                        label="考试/作业"
                        width="171">
                        </el-table-column>
                        <el-table-column
                        prop="ExamTitle"
                        label="名称"
                        width="171">
                        </el-table-column>
                        <el-table-column
                        prop="Score"
                        label="分数"
                        width="171">
                        </el-table-column>
                    </el-table>
                        <el-pagination :disabled="paging" @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
                        </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="得分趋势图" name="second">
                    <div id="myChart123" style="width: 700px; height: 500px;"></div>
                </el-tab-pane>
            </el-tabs>
            
            
            
        </div>

</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            gradeId:[],
            loading:true,
            StudentID:[],
            pages:1,
            subject:[],
            information:[],
            time:[],
            paging:false,
            value:false,
            school:[],
            activeName: 'first',
            subject123:[],
            userInfo:[],
            Gradedata:[],
		    Classdata:[],
		    subjectdata:[],
        }
      },
      created(){
            this.StudentID = this.$route.query.StudentID
            this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
            this.subject123 = JSON.parse(sessionStorage.getItem('subject'));
            console.log(this.subject123)
            if(this.subject123 == null){
                this.school  = JSON.parse(sessionStorage.getItem('school'));
                this.Gradedata = this.school[0]
				this.subjectdata = this.school[1]
				this.Classdata = this.school[2]
                this.grade()
            }else{
                this.school  = JSON.parse(sessionStorage.getItem('subject'));
                this.Gradedata = this.school[0]
				this.subjectdata = this.school[1]
				this.Classdata = this.school[2]
                if(this.school[1] == 0){
                    this.grade()
                }else{
                    this.man()
                }
                
            }
            
      },
        mounted(){
            // this.drawLine();
        },
      methods:{
          //年级学生追踪
          grade(){
              console.log(this.userInfo["SchoolID"],this.StudentID,this.school[0],this.school[2])
               this.$get("study/gradeStudentStudy?SchoolID="+this.userInfo["SchoolID"]+"&StudentID="+this.StudentID+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata).then(res=>{
                    console.log(res.data)
                    if(res.data.pages === 1){
                        this.paging = true
                    }else{
                        this.pages = res.data.pages
                    }
                    if(res.data.list.length == 0){
                            this.loading = false
                    }else{
                        res.data.list.forEach((item,i) => {
                            if(item.Type == '0'){
                                item.Type = "考试"
                            }else{
                                item.Type = "作业"
                            }
                            this.tableData.push(item)
                            this.subject.push(item.CreateTime)
                            this.information.push(item.Score)
                            this.time.push(item.StudentName)
                            this.drawLine()
                        });
                        // console.log(this.time)
                        console.log(this.tableData)
                        this.loading = false
                    }
               })
          },
          //班级学生追踪
          man(){
              var userInfo = JSON.parse(localStorage.getItem("userInfo"));
              this.$get("study/studentStudy?SchoolID="+userInfo["SchoolID"]+"&StudentID="+this.StudentID+"&GradeID="+this.Gradedata+"&ClassID="+this.Classdata+"&SubjectID="+this.subjectdata).then(res =>{
                  console.log(res.data)
                  if(res.data.pages === 1){
                      this.paging = true
                  }else{
                      this.pages = res.data.pages
                  }
                  if(res.data.list.length == 0){
                        this.loading = false
                  }else{
                      res.data.list.forEach((item,i) => {
                        if(item.Type == '0'){
                            item.Type = "考试"
                        }else{
                            item.Type = "作业"
                        }
                        this.tableData.push(item)
                        this.subject.push(item.CreateTime)
                        this.information.push(item.Score)
                        this.time.push(item.StudentName)
                        this.drawLine()
                    });
                    // console.log(this.time)
                    console.log(this.tableData)
                    this.loading = false
                  }
              })
          },
          handleCurrentChange(val){
              this.tableData = []
              this.$get("student/index?SchoolID="+userInfo["SchoolID"]+"&StudentID="+this.StudentID+"&pageNum="+val).then(res=>{
                    if(res.data.list.length == 0){
                            this.loading = false
                    }else{
                        res.data.list.forEach((item,i) => {
                            if(item.Type == '0'){
                                item.Type = "考试"
                            }else{
                                item.Type = "作业"
                            }
                            this.tableData.push(item)
                        });
                        this.loading = false
                    }
              })
          },
        drawLine(){
				let myChart123 =  this.$echarts.init(document.getElementById('myChart123'))
				myChart123.setOption({
                    title: {
                        text: this.time[0]
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:["分数",]
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.subject
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'分数',
                            type:'line',
                            stack: '总量',
                            data:this.information
                        },
                    ]
                })
            },
            handleClick(){

            },
      }
}
</script>

<style>

    .classmanleft{
        width: 1200px;
        margin: 0 auto;
    }
</style>
