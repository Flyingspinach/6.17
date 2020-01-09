<template>
<div class="transcript">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="成绩表" name="first">
            <el-table
            v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)"
            element-loading-text="正在拼命更新数据"
            :data="performance"
            height="485"
            border
            style="1100px">
            <!-- <el-table-column
            prop="CreateTime"
            label="创建日期"
            width="171">
            </el-table-column> -->
            <!-- <el-table-column
            prop="GradeName"
            label="年级"
            width="130">
            </el-table-column> -->
            <el-table-column
            prop="ClassID"
            label="班级"
            width="171">
            </el-table-column>
            <!-- <el-table-column
            prop="SubjectName"
            label="科目"
            width="130">
            </el-table-column> -->
            <el-table-column
            prop="StudentName"
            label="姓名"
            width="171">
            </el-table-column>
            <el-table-column
            prop="StudentID"
            label="学号"
            width="171">
            </el-table-column>
            <!-- <el-table-column
            prop="Sex"
            label="性别"
            width="130">
            </el-table-column> -->
            <el-table-column
            prop="Score"
            label="分数"
            width="171">
            </el-table-column>
            <el-table-column
            prop="Ranking"
            label="排名"
            width="171">
            </el-table-column>
            <el-table-column
            prop="type"
            label="缺考"
            width="171">
            </el-table-column>
            </el-table>
            <el-pagination class="pagessize" :disabled="paging" @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
            </el-pagination>
        </el-tab-pane>
        <!-- <el-tab-pane label="得分趋势图" name="second">
            <div id="myChart123" :style="{width: '750px', height: '400px' , margin : '0 20%'}"></div>
        </el-tab-pane> -->
        <el-tab-pane label="学生分层" name="third">
            <div class="clearfix">
                <div style="float:left;margin-top:20px;width:33%; height:475px">
                    <p style="text-align:center;margin-bottom:10px;">优秀</p>
                    <div class="sour" style="width:60%; margin:0 20%; text-align:center;padding:20% 0">
                    <span style="font-size:50px;">{{layered.good}}</span>人
                    </div>
                </div>
                <div style="float:left;margin-top:20px;width:33%;">
                    <p style="text-align:center;margin-bottom:10px; ">中等</p>
                    <div class="sour" style="width:60%;margin:0 20%;text-align:center;padding:20% 0">
                    <span style="font-size:50px">{{layered.poor}}</span>人
                    </div>
                </div>
                <div style="float:left;margin-top:20px;width:33%;">
                    <p style="text-align:center; margin-bottom:10px;">较差</p>
                    <div class="sour" style="width:60%; margin:0 20%;text-align:center;padding:20% 0">
                    <span style="font-size:50px;">{{layered.second}}</span>人
                    </div>
                </div>
            </div>

        </el-tab-pane>
    </el-tabs>
    
    
</div>
   
    
</template>

<script>
import bus from '../../../components/common/bus.js'
export default {
    data() {
        return {
                performance: [],
                AnswerSheetID:[],
                pages:1,
                loading:false,
                activeName:"first",
                ArrayList:[],
                ArrayList1:[],
                exsicon:[],
                layered:[],
                head2:[],
                userInfo:[],
                school:[],
                Gradedata:[],
                Classdata:[],
                subjectdata:[],
                paging:true,
            }
        },
    created(){
            this.AnswerSheetID = this.$route.query.AnswerSheetID
            var subject = JSON.parse(sessionStorage.getItem("subject"));
            var userInfo = JSON.parse(localStorage.getItem("userInfo"));
            var head1 = JSON.parse(sessionStorage.getItem("head1"))
            this.userInfo = userInfo
            if(subject == null){
                this.loading = true
                this.school = JSON.parse(sessionStorage.getItem('school'));
                this.Gradedata = this.school[0]
                this.subjectdata = this.school[1]
                this.Classdata = this.school[2]
                console.log(this.Classdata)
                if(this.Classdata === 0){
                    this.grade()
                }else{
                    this.requst()
                }
                console.log(this.school)
            }else{
                this.loading = true
                this.school = JSON.parse(sessionStorage.getItem('subject'));
                this.Gradedata = this.school[0]
                this.subjectdata = this.school[1]
                this.Classdata = this.school[2]
                if(this.Classdata === 0){
                    this.grade()
                }else{
                    this.requst()
                }
            }
            bus.$on("getParam",param =>{
                this.head2 = param
            })
    },
    // mounted(){
    //     this.drawLine();
    // },
    watch:{
        head2(){
            console.log("数据在变化")
            this.school = JSON.parse(sessionStorage.getItem('subject'));
            this.Gradedata = this.school[0]
            this.subjectdata = this.school[1]
            this.Classdata = this.school[2]
            if(this.Classdata == 0){
                this.grade()
                console.log("走年级")
            }else{
                this.requst()
                console.log("走班级")
            }
        }
    },
    methods:{
        grade(){
            this.loading = true
            this.performance = [];
            console.log(this.userInfo["SchoolID"],this.school[2],this.AnswerSheetID,this.school[0])
            this.$get("teacher/gradeStudentInfoMassion?SchoolID="+this.userInfo["SchoolID"]+"&SubjectID="+this.subjectdata+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata).then(res=>{
                console.log(res.data)
                if(res.data.list.length === 0){
                    this.loading = false
                    alert("暂无数据，请稍后在尝试")
                }else{
                    this.pages = res.data.pages
                    if(res.data.pages > 1){
                        this.paging = false
                    }else{
                        this.paging = true
                    }
                    if(res.data.list.length === 0){
                        this.loading = false
                    }
                    res.data.list.forEach((item,i) => {
                        item.ClassID + "班"
                        if(item.Sex === "M"){
                            item.Sex = "男"
                        }else{
                            item.Sex ="女"
                        }
                        if(item.type == "参考"){
                            item.type = " "
                        }
                        if(item.Score == 0){
                            item.type = "缺考"
                        }
                            this.performance.push({
                                ClassID:item.ClassID+"班",
                                CreateTime:item.CreateTime,
                                ExamTitle:item.ExamTitle,
                                GradeName:item.GradeName,
                                Sex:item.Sex,
                                StudentName:item.StudentName,
                                SubjectName:item.SubjectName,
                                Type:item.Type,
                                type:item.type,
                                Score:item.Score+"分",
                                StudentID:item.StudentID,
                                Ranking:item.Ranking,
                            })
                            this.exsicon.push(item.SubjectName)
                            this.ArrayList.push(item.Score)
                            // this.drawLine()
                            this.loading = false
                        }); 
                    this.loading = false
                }
                
            }),
            this.$get("/study/layerGradesStudent?SchoolID="+this.userInfo["SchoolID"]+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata).then(head=>{
                    this.layered = head.data
            })
        },


        requst(){
            this.loading = true
            this.performance = []
                this.$get("teacher/studentInfoMassion?SchoolID="+this.userInfo["SchoolID"]+"&ClassID="+this.Classdata+"&SubjectID="+this.subjectdata+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata).then(res=>{
                    console.log(res.data)
                    // console.log(this.userInfo["SchoolID"],this.shool[1],this.shool[2],this.AnswerSheetID,this.shool[0])
                    this.pages = res.data.pages
                    if(res.data.list.length === 0){
                        this.loading = false
                    }
                    if(res.data.pages > 1){
                        this.paging = false
                    }else{
                        this.paging = true
                    }
                    res.data.list.forEach((item,i) => {
                        item.ClassID + "班"
                        if(item.Sex === "M"){
                            item.Sex = "男"
                        }else{
                            item.Sex ="女"
                        }
                        if(item.type == "参考"){
                            item.type = " "
                        }
                        if(item.Score == 0){
                            item.type = "缺考"
                        }
                        this.performance.push({
                            ClassID:item.ClassID+"班",
                            CreateTime:item.CreateTime,
                            ExamTitle:item.ExamTitle,
                            GradeName:item.GradeName,
                            Sex:item.Sex,
                            StudentName:item.StudentName,
                            SubjectName:item.SubjectName,
                            Type:item.Type,
                            type:item.type,
                            Score:item.Score+"分",
                            StudentID:item.StudentID,
                            Ranking:item.Ranking,
                        })
                        this.exsicon.push(item.SubjectName)
                        this.ArrayList.push(item.Score)
                        // this.drawLine()
                        this.loading = false
                    }); 
                    this.student()
                    // console.log(this.exsicon)
                    // console.log(this.ArrayList)
                })

        },
        //分页导航
        handleCurrentChange(val){
            this.loading = true
            this.performance = []
            if(this.Classdata == 0){
                console.log(123)
                console.log(this.userInfo["SchoolID"],this.school[1],this.school[2],this.AnswerSheetID,this.school[0],val)
               this.$get("teacher/gradeStudentInfoMassion?SchoolID="+this.userInfo["SchoolID"]+"&SubjectID="+this.subjectdata+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata+"&pageNum="+val).then(res=>{
                    console.log(res.data)
                    res.data.list.forEach((item,i) => {
                            item.ClassID + "班"
                            if(item.Sex === "M"){
                                item.Sex = "男"
                            }else{
                                item.Sex ="女"
                            }
                            if(item.type == "参考"){
                                item.type = " "
                            }
                            if(item.Score == 0){
                                item.type = "缺考"
                            }
                            this.performance.push({
                                ClassID:item.ClassID+"班",
                                CreateTime:item.CreateTime,
                                ExamTitle:item.ExamTitle,
                                GradeName:item.GradeName,
                                Sex:item.Sex,
                                StudentName:item.StudentName,
                                SubjectName:item.SubjectName,
                                Type:item.Type,
                                type:item.type,
                                Score:item.Score+"分",
                                StudentID:item.StudentID,
                                Ranking:item.Ranking,
                            })
                            this.loading = false
                        }); 
                })
            }else{
                console.log(456)
                 this.$get("teacher/studentInfoMassion?SchoolID="+this.userInfo["SchoolID"]+"&ClassID="+this.Classdata+"&SubjectID="+this.subjectdata+"&AnswerSheetID="
                +this.AnswerSheetID+"&GradeID="+this.Gradedata+"&pageNum="+val).then(res=>{
                    res.data.list.forEach((item,i) => {
                            item.ClassID + "班"
                            if(item.Sex === "M"){
                                item.Sex = "男"
                            }else{
                                item.Sex ="女"
                            }
                            if(item.type == "参考"){
                                item.type = " "
                            }
                            if(item.Score == 0){
                                item.type = "缺考"
                            }
                            this.performance.push({
                                ClassID:item.ClassID+"班",
                                CreateTime:item.CreateTime,
                                ExamTitle:item.ExamTitle,
                                GradeName:item.GradeName,
                                Sex:item.Sex,
                                StudentName:item.StudentName,
                                SubjectName:item.SubjectName,
                                Type:item.Type,
                                type:item.type,
                                Score:item.Score+"分",
                                StudentID:item.StudentID,
                                Ranking:item.Ranking,
                            })
                            this.loading = false
                        }); 
                })
            }
            // var userInfo = JSON.parse(localStorage.getItem("userInfo"));
            // var school = JSON.parse(sessionStorage.getItem("school"));
        },
        handleClick(){

        },
        student(){
            if(this.Classdata == 0){
                console.log("年级学生分层")
                this.$get("/study/layerGradesStudent?SchoolID="+this.userInfo["SchoolID"]+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata).then(res=>{
                    console.log(res.data)
                    this.layered = res.data
                })
            }else{
                console.log("班级学生分层")
                this.$get("study/layerStudent?SchoolID="+this.userInfo["SchoolID"]+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata+"&ClassID="+this.Classdata).then(res=>{
                    console.log(res.data)
                    this.layered = res.data
                })
            }
            
        },
        
        drawLine(){
				let myChart123 =  this.$echarts.init(document.getElementById('myChart123'))
				myChart123.setOption({
					title: {
						text: '折线图堆叠'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data:["分数"]
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
						data: this.exsicon
					},
					yAxis: {
						type: 'value'
					},
					series: [
						{
							name:'分数',
							type:'line',
							stack: '总量',
							data:this.ArrayList
						},
					]
				})
			},
    }
}
</script>

<style>

</style>
