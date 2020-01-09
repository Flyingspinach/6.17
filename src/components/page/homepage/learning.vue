<template>
    <div>
        <div >
            <el-table
                v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)"
                        element-loading-text="正在拼命更新数据"
                :data="tableData"
                style="width: 100%">
            </el-table>
            <div class="headboxtop"  style="height:100px;">
                <ul class="headboxcontent1" v-for="item in tableData" :key="item.id">
                    <li style="font-size:40px; color:#909399">{{item.Type}}</li>
                    <li>
                        <h2>{{item.ExamTitle}}</h2>
                    </li>
                </ul>
                <ul class="headboxcontent" v-for="item in tableData" :key="item.id">
                    <li>年级:{{item.GradeName}}</li>
                    <li>日期:{{item.CreateTime}}</li>
                    <li>科目:{{item.SubjectName}}</li>
                    <li>类型:{{item.Type}}</li>
                    <li>平均分:{{item.avgScore}}</li>
                    <li>最高分:{{item.maxScore}}</li>
                    <!-- <li>
                        <el-button type="success" round size="medium"><a style="color:#fff" :href="'https://pro.myworldclassroom.com/kaokao/index.php/study/studyExcel?SchoolID='+userInfo.SchoolID+'&AnswerSheetID='+item.AnswerSheetID">得分详情下载</a></el-button>
                    </li> -->
                    <li>
                        <el-button v-show="headdownload(item.maxScore)" type="primary" round @click="biubiu(item.AnswerSheetID)">
                            
                        
                        
                        
                        
                        
                        <!-- 成绩为0时不显示下载界面 这个方法headdownload-->
                        
                        



                        
                        <!-- 年级成绩下载 -->
                        <a v-if="head123" style="color:#fff" :href="'https://pro.myworldclassroom.com/kaokao/index.php/study/studyExcel?SchoolID='+userInfo['SchoolID']+'&AnswerSheetID='+item.AnswerSheetID+'&SubjectID='+subjectdata+'&GradeID='+Gradedata">年级得分详情下载</a>
                        <a v-else       style="color:#fff" :href="'https://pro.myworldclassroom.com/kaokao/index.php/study/studyInfoExcel?SchoolID='+userInfo['SchoolID']+'&AnswerSheetID='+item.AnswerSheetID+'&ClassID='+Classdata+'&SubjectID='+subjectdata+'&GradeID='+Gradedata">班级得分详情下载</a>
                        <!-- 班级下载 -->
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                          
                        <!-- <a style="color:#fff" :href="'https://pro.myworldclassroom.com/kaokao/index.php/study/studyInfoExcel?SchoolID='+userInfo.SchoolID+'&AnswerSheetID='+item.AnswerSheetID+'&ClassID='+school[1]">考试成绩下载</a> -->
                        </el-button>

                            <!-- <el-dialog title="考试班级" :visible.sync="dialogTableVisible">
                                <el-table :data="gridData">
                                    <el-table-column property="value" label="班级" width="150"></el-table-column>
                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button size="mini" @click="biubiu(scope.row.chilen)">
                                                <a :href="'https://pro.myworldclassroom.com/kaokao/index.php/study/studyInfoExcel?SchoolID='+userInfo.SchoolID+'&AnswerSheetID='+scope.row.chilen+'&ClassID='+scope.row.value">点击下载</a>
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-dialog> -->
                    </li>
                </ul>
            </div>
            <el-tabs  v-model="activeName" type="border-card">
                
                <el-tab-pane  label="成绩单" name="box1">
                    <el-table
                        :data="performance"
                        height="486"
                        border
                        style="width: 1377px">
                        <!-- <el-table-column
                        prop="GradeName"
                        label="年级"
                        width="130">
                        </el-table-column> -->
                        <!-- <el-table-column
                        prop="ClassID"
                        label="班级"
                        width="130">
                        </el-table-column> -->
                        <!-- <el-table-column
                        prop="SubjectName"
                        label="科目"
                        width="130">
                        </el-table-column> -->
                        <el-table-column
                        prop="StudentID"
                        label="学号"
                        width="275">
                        </el-table-column>
                        <el-table-column
                        prop="StudentName"
                        label="姓名"
                        width="275">
                        </el-table-column>
                        
                        <!-- <el-table-column
                        prop="Sex"
                        label="性别"
                        width="130">
                        </el-table-column> -->
                        <el-table-column
                        prop="Score"
                        label="分数"
                        width="275">
                        </el-table-column>
                        <el-table-column
                        prop="Ranking"
                        label="排名"
                        width="275">
                        </el-table-column>
                        <el-table-column
                        prop="type"
                        label="缺考"
                        width="275">
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination :disabled="paging" @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="得分趋势图" name="second">
                    <div style="border-bottom:2px solid rgba(0, 0, 0, 0.1)">得分趋势图</div>
                    <div id="myChart" :style="{width: '750px', height: '400px' , margin : '0 20%'}"></div>
                </el-tab-pane>
                <el-tab-pane label="学生分层" name="first">
                    <div style="border-bottom:2px solid rgba(0, 0, 0, 0.1)">学生分层</div>

                    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);height:100%" class="clearfix">
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
        
    </div>
    
</template>

<script>
import bus from '../../common/bus'
export default {
    components:{
    },
    data(){
        return{
            head123:true,
            tableData: [],
            userInfo:'',
            avgScore:'',
            maxScore:'',
            layered:'',
            ExamTitle:'',
            arr:[],
            paging:false,
            // avg:[],
            head2:[],
            AnswerSheetID:[],//存入试卷id啦
            SubjectID:[],
            loading:false,
            activeName:'box1',
            activeName123:"biubiu",
            GradeID:[],
            // inforGradeID:[],
            performance:[],
            pages:0,
            gridData: [],
            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px',
            Classtodownload:[],
            subject:[],
            school:[],
            exs:[],
            ArrayList:[],
            ArrayList1:[],
            Gradedata:[],
            Classdata:[],
            subjectdata:[],
            // threelevel:[],
        }
    },
    created() {
            //这里注释
            // this.loading = true
            var subject = JSON.parse(sessionStorage.getItem("subject"));
            var userInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.userInfo = userInfo
            this.Firstrequest()
            bus.$on("demo",param=>{
                this.newest()
            })
            // setTimeout(()=>{
            //     this.school = JSON.parse(sessionStorage.getItem('school'));
            //     this.Gradedata = this.school[0]
            //     this.subjectdata = this.school[1]
            //     this.Classdata = this.school[2]
            //     console.log(this.Classdata)
            //     this.newest()
            // },2000);
        
            bus.$on("getParam",param =>{
                this.head2 = param
                // console.log(this.head2)
            })
            bus.$emit("GradeID",this.GradeID)
            // if(subject == null){
            //     this.loading = true
            //         setTimeout(()=>{
            //             this.school = []
            //             this.school = JSON.parse(sessionStorage.getItem('school'));
            //             this.Gradedata = this.school[0]
            //             this.subjectdata = this.school[1]
            //             this.Classdata = this.school[2]
            //             if(this.school[1] === 0){
            //                 this.ha2()
            //                 this.head123 = true
            //             }else{
            //                 this.ha1()
            //                 this.head123 = false
            //             }
            //         },2000)
                    
            // }else{
            //     this.loading = true
            //     this.school = []
            //     this.school = JSON.parse(sessionStorage.getItem('subject'));
            //     this.Gradedata = this.school[0]
            //     this.subjectdata = this.school[1]
            //     this.Classdata = this.school[2]
            //     setTimeout(()=>{
            //         if(this.school[1] === 0){
            //             this.ha2()
            //             this.head123 = true
            //         }else{
            //             this.ha1()
            //             this.head123 = false
            //         }
            //     },2000)
            // }
    },
    watch:{
        head2(){
            this.school = JSON.parse(sessionStorage.getItem('subject'));
            this.Gradedata = this.school[0]
            this.subjectdata = this.school[1]
            this.Classdata = this.school[2]
            // console.log("数据在变化")
            if(this.Classdata == 0){
                console.log("走年级通道了")
                // console.log(this.Gradedata,this.subjectdata,this.Classdata)
                this.ha2()
                this.head123 = true
            }else{
                console.log("走班级通道啦")
                // console.log(this.Gradedata,this.subjectdata,this.Classdata)
                this.ha1()
                this.head123 = false
                // this.head123 = true
                // this.head123 = false
            }
        }
    },
    mounted(){
        this.drawLine();
    },
    methods:{
        drawLine(){
            let myChart =  this.$echarts.init(document.getElementById('myChart'))
            myChart.setOption({
                legend: {},
                tooltip: {},
                dataset: {
                    source: [
                        ['product', '平均分','最高分',],
                        this.ArrayList,
                        this.ArrayList1,
                        // ['Matcha Latte', 43.3, 85.8, 93.7],
                        // ['Milk Tea', 83.1, 73.4,],
                        // ['Cheese Cocoa', 86.4, 65.2,],
                        // ['Walnut Brownie', 72.4, 53.9,]
                    ]
                },
                xAxis: {type: 'category'},
                yAxis: {},
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: [
                    {type: 'bar'},
                    {type: 'bar'},
                    // {type: 'bar'}
                ]
              })    
              },
        handleClick(){
            
        },
        Firstrequest(){
            this.tableData = []
            this.loading = true
            this.$get("/study/newestGradeStudy?SchoolID="+this.userInfo["SchoolID"]+"&UserID="+this.userInfo["UserID"]).then(res=>{
                if(res.data.length === 0){
                        this.loading = false
                    }else{
                        var threelevel = [];
                        this.AnswerSheetID = res.data[0].AnswerSheetID
                        res.data.forEach((item,i) =>{
                            if(item.Type == "0"){
                                item.Type = "考试"
                            }else{
                                item.Type = "作业"
                            }
                            this.tableData.push(item)
                            this.exs.push(item.SubjectName)
                            this.exs.push('年级')
                            this.ArrayList.push("班级",item.avgScore,item.maxScore)
                            threelevel.push(item.GradeID,item.SubjectID,)
                            this.drawLine()
                        })
                        bus.$emit("threelevel",threelevel)
                        
                        
                        
                    }
            })
            
        },
        newest(){
            this.loading = true
            var head1 = JSON.parse(sessionStorage.getItem("head1"))
            console.log(head1)
            if(head1 === null){
                this.head123 = false
            }else{
                this.head123 = true
            }
            this.school = JSON.parse(sessionStorage.getItem('school'));
            this.Gradedata = this.school[0]
            this.subjectdata = this.school[1]
            this.Classdata = this.school[2]
            // console.log(this.school)
            // console.log(this.Classdata)
            if(this.Classdata == 0){
                    //年级成绩单
                    console.log("走年级")
                    this.school = JSON.parse(sessionStorage.getItem('school'));
                    this.Gradedata = this.school[0]
                    this.subjectdata = this.school[1]
                    this.Classdata = this.school[2]
                    console.log(this.AnswerSheetID,this.userInfo["SchoolID"],this.Gradedata,this.subjectdata)
                    this.performance = []
                    this.$get("/teacher/gradeStudentInfoMassion?SchoolID="+this.userInfo["SchoolID"]+"&SubjectID="+this.subjectdata+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata).then(box=>{
                        console.log(box.data)
                        if(box.data.list.length === 0){
                            // console.log(box.data.pages)
                            this.loading = false
                            this.paging = true
                        }else{
                            
                            if(box.data.pages > 1 && box.data.pages>0){
                                this.paging = false
                                this.pages = box.data.pages
                            
                            }else{
                                this.paging = true
                                this.pages = box.data.pages
                            }
                            box.data.list.forEach((item,i) =>{
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
                                })
                                this.loading = false
                                
                        }
                    })
                    //学生分层
                    //得分趋势图
                    this.ArrayList1 = []
                    this.$get("study/classScore?SchoolID="+this.userInfo["SchoolID"]+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata).then(content=>{
                        // this.ArrayList.push(res.data.maxScore)
                        // console.log(content.data)
                        this.ArrayList1.push("年级",content.data.avgScore,content.data.maxScore)
                        this.drawLine()
                        })
                    this.$get("study/layerGradesStudent?SchoolID="+this.userInfo["SchoolID"]+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata).then(head=>{
                        this.layered = head.data

                    })
                    
                            
                
            }else{
                this.tableData = []
                //最新学情报告请求
                //应该写个方法封装的真的是烦人,但是我懒得写啦哈哈哈哈
                this.$get("/study/newestStudy?SchoolID="+this.userInfo["SchoolID"]+"&UserID="+this.userInfo["UserID"]+"&ClassID="+this.Classdata).then(res=>{
                    console.log(res.data)
                    if(res.data.length === 0){
                        this.loading = false
                    }else{
                        var threelevel = [];
                        this.AnswerSheetID = res.data[0].AnswerSheetID
                        res.data.forEach((item,i) =>{
                            if(item.Type == "0"){
                                item.Type = "考试"
                            }else{
                                item.Type = "作业"
                            }
                            this.tableData.push(item)
                            this.exs.push(item.SubjectName)
                            this.exs.push('年级')
                            this.ArrayList.push("班级",item.avgScore,item.maxScore)
                            threelevel.push(item.GradeID,item.SubjectID)
                            this.drawLine()
                        })
                        
                    }
                    //成绩单请求s
                    this.$get("/teacher/studentInfoMassion?SchoolID="+this.userInfo["SchoolID"]+"&ClassID="+this.Classdata+"&SubjectID="+this.subjectdata+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata).then(box=>{
                        console.log(box.data)
                        if(box.data.list.length === 0){
                            // console.log(box.data.pages)
                            this.loading = false
                            this.paging = true
                        }else{
                            
                            if(box.data.pages > 1){
                                this.paging = false
                                this.pages = box.data.pages
                            
                            }else{
                                this.paging = true
                                this.pages = box.data.pages
                            }
                            box.data.list.forEach((item,i) =>{
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
                                })
                                
                        }
                    })
                    //学生分层
                    this.$get("/study/layerStudent?SchoolID="+this.userInfo["SchoolID"]+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata+"&ClassID="+this.Classdata).then(head=>{
                        this.layered = head.data
                        // this.loading = false
                    })
                    //年级最高分和最低分
                    this.$get("/study/classScore?SchoolID="+this.userInfo["SchoolID"]+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata).then(content=>{
                        this.ArrayList1.push("年级",content.data.avgScore,content.data.maxScore)
                        this.drawLine()
                        this.loading = false
                    })
                })
            }
            
        },
        ha2(){
            this.loading = true
            this.AnswerSheetID = []
            this.tableData = []
            
            this.$get("/study/newestGradeStudy?SchoolID="+this.userInfo["SchoolID"]+"&UserID="+this.userInfo["UserID"]).then(res=>{
                // console.log(res.data)
                if(res.data.length === 0){
                    this.loading = false
                }else{
                    this.AnswerSheetID = res.data[0].AnswerSheetID
                    res.data.forEach((item,i) =>{
                        if(item.Type == "0"){
                            item.Type = "考试"
                        }else{
                            item.Type = "作业"
                        }
                        this.tableData.push(item)
                        this.exs.push(item.SubjectName)
                        this.exs.push('年级')
                        this.ArrayList.push("班级",item.avgScore,item.maxScore)

                        // this.ArrayList1.push(item.maxScore)
                        this.drawLine()
                    })
                    // console.log(this.ArrayList)
                }
            //年级成绩单
            // console.log(this.AnswerSheetID,this.userInfo["SchoolID"],this.subjectdata,this.Gradedata)
            this.performance = []
            this.$get("/teacher/gradeStudentInfoMassion?SchoolID="+this.userInfo["SchoolID"]+"&SubjectID="+this.subjectdata+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata).then(box=>{
                // console.log(box.data)
                if(box.data.list.length === 0){
                    // console.log(box.data.pages)
                    this.loading = false
                    this.paging = true
                }else{
                    
                    if(box.data.pages > 1 && box.data.pages>0){
                        this.paging = false
                        this.pages = box.data.pages
                       
                    }else{
                        this.paging = true
                        this.pages = box.data.pages
                    }
                     box.data.list.forEach((item,i) =>{
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
                        })
                        this.loading = false
                    
                }
            })
            //得分趋势图
            this.ArrayList1 = []
            this.$get("study/classScore?SchoolID="+this.userInfo["SchoolID"]+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata).then(content=>{
                // this.ArrayList.push(res.data.maxScore)
                // console.log(content.data)
                this.ArrayList1.push("年级",content.data.avgScore,content.data.maxScore)
                this.drawLine()
                })
            this.$get("study/layerGradesStudent?SchoolID="+this.userInfo["SchoolID"]+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata).then(head=>{
                this.layered = head.data
            })

            
            })
            //年级学生分层
        },
        ha1(){
                //最新学情报告请求
                this.loading = true
                this.tableData = []
                this.ArrayList = []
                this.ArrayList1 = []
                this.AnswerSheetID = []
                this.exs = []
                // console.log(this.subjectdata)
                this.$get("/study/newestStudy?SchoolID="+this.userInfo["SchoolID"]+"&UserID="+this.userInfo["UserID"]+"&ClassID="+this.Classdata).then(res=>{
                    console.log(res.data)
                    if(res.data.length == 0){
                        this.loading = false
                        // alert("该班级的数据为空，亲，稍后再来试试")
                    }else{
                        this.AnswerSheetID = res.data[0].AnswerSheetID
                        this.avg = JSON.parse(JSON.stringify(res.data[0]))
                    }
                    
                    this.transcript()
                    this.student()
                    if(res.data.length == 0){
                        this.open7()
                        this.loading = false
                    }else{
                        res.data.forEach((item,i) =>{
                            if(item.Type == "0"){
                                item.Type = "考试"
                            }else{
                                item.Type = "作业"
                            }
                            this.tableData.push(item)
                            this.exs.push(item.SubjectName)
                            this.exs.push('年级')
                            this.ArrayList.push("班级",item.avgScore,item.maxScore)

                            // this.ArrayList1.push(item.maxScore)
                            this.drawLine()
                        })
                    }
                })
        },
        //成绩单请求
        transcript(){
            this.performance = []
            
            this.$get("teacher/studentInfoMassion?SchoolID="+this.userInfo["SchoolID"]+"&ClassID="+this.Classdata+"&SubjectID="+this.subjectdata+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata) .then(res =>{
                //同需要判断
                if(res.data.length === 0){
                    this.paging = true
                    this.loading = false
                }else{
                    if(res.data.list.length === 0){
                            this.loading = false
                            this.paging = true
                        }else{
                        this.pages = res.data.pages
                        res.data.list.forEach((item,i) =>{
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
                        })
                            this.loading = false
                            this.tendencychart()
                        }
                }
            }) 
        },
        // 学生分层
        student(){
            this.$get("study/layerStudent?SchoolID="+this.userInfo["SchoolID"]+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata+"&ClassID="+this.Classdata).then(res=>{
                this.layered = res.data
            })
        },
        //得分趋势图
        tendencychart(){
            this.ArrayList1 = []
            this.$get("study/classScore?SchoolID="+this.userInfo["SchoolID"]+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata+"&SubjectID="+this.subjectdata).then(res=>{
                // this.ArrayList.push(res.data.maxScore)
                this.ArrayList1.push("年级",res.data.avgScore,res.data.maxScore)
                this.drawLine()
            })

        },
        //分页导航
        handleCurrentChange(val){
            this.loading = true
            this.performance = []
            if(this.Classdata === 0){
                //年级分页
                this.$get("/teacher/gradeStudentInfoMassion?SchoolID="+this.userInfo["SchoolID"]+"&SubjectID="+this.subjectdata+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata+"&pageNum="+val).then(res=>{
                        // console.log(res.data)
                        if(res.data.list.length === 0){
                            this.loading = false
                            }else{
                                res.data.list.forEach((item,i) =>{
                                    if(item.Sex === "M"){
                                        item.Sex = "男"
                                    }else{
                                        item.Sex ="女"
                                    }
                                    if(item.type == "参考"){
                                        item.type = ""
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
                                })
                                this.loading = false
                            }
                })
            }else{
                //班级分页
                this.$get("teacher/studentInfoMassion?SchoolID="+this.userInfo["SchoolID"]+"&ClassID="+this.Classdata+"&SubjectID="+this.subjectdata+"&AnswerSheetID="+this.AnswerSheetID+"&GradeID="+this.Gradedata+"&pageNum="+val).then(res=>{
                    if(res.data.list.length === 0){
                            this.loading = false
                            }else{
                                res.data.list.forEach((item,i) =>{
                                    if(item.Sex === "M"){
                                        item.Sex = "男"
                                    }else{
                                        item.Sex ="女"
                                    }
                                    if(item.type == "参考"){
                                        item.type = ""
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
                                })
                                this.loading = false
                            }
                })
            }
          
        },


        open7() {
            this.$message({
            showClose: true,
            message: '该老师无法获取到最新学情',
            type: 'warning'
            });
        },

        dialogTableVisible123(val){
            this.gridData = [];
            var userInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.dialogTableVisible = true
            // this.$get("study/answeetClass?SchoolID="+userInfo["SchoolID"]+"&AnswerSheetID="+this.school[1]).then(res =>{
            //     for(let i in res.data){
            //         this.gridData.push({
            //             value:res.data[i].clsddIds,
            //             chilen:res.data[i].answerId
            //         })
            //     }
            // })
        },
        biubiu(val){
            console.log(val)
            this.Classtodownload = val
            this.$confirm('已向服务器端发出下载请求请稍微', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            center: true
            }).then(() => {
            this.$message({
                type: 'success',
                message: '正在下载中!'
            });
            }).catch(() => {

            });
        },
        headdownload(val){
            if(val == 0){
                return false
            }else{
                return true
            }
        }

    }
}
</script>

<style>
.box-content-head{
    color: #fff;
}
.el-tabs--border-card .el-tabs__content{
    height: 570px;
}
.tablehead{
    font-size: 0px;
    font-weight: bold;
}
.clearfix{
    margin:0px 165px;
}
.el-tabs--border-card{
    width: 1700px;
    margin: 0 auto;
}
</style>
