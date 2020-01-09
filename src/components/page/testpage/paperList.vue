<template>
	<div class="table paperList1"
		v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)"
                    element-loading-text="正在拼命更新数据"
	>
		
	<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="往期学情" name="first">
				<div class="container">
						<div class="container-title">往期学情</div>
						<el-table :data="tableData" border size="medium" ref="multipleTable">
							<el-table-column prop="AnswerSheetID" label="ID" align="center"></el-table-column>
							<el-table-column prop="SubjectName" label="科目" align="center"></el-table-column>
							<el-table-column prop="ExamTitle" label="试卷名称" align="center"></el-table-column>
							<el-table-column prop="avgScore" label="平均分" align="center"></el-table-column>
							<el-table-column prop="maxScore" label="最高分" align="center"></el-table-column>
							<el-table-column prop="CreateTime" label="考试时间" align="center"></el-table-column>
							<el-table-column label="操作" align="center" >
								<template slot-scope="scope">
										<el-button @click="examine(scope.row.AnswerSheetID)" type="primary" round size="medium" >
											查看基本成绩
											<!-- <a  class="box-content-head" :href="'https://pro.myworldclassroom.com/kaokao/index.php/teacher/answerSheet?SchoolID='+userInfo.SchoolID+'&AnswerSheetID='+scope.row.AnswerSheetID" >答题卡下载</a> -->
										</el-button>
										<hr>
										<el-button class="el-icon-download" v-show="headdownload(scope.row.maxScore) " type="success" round size="medium" @click="dialogTableVisible123(scope.row.AnswerSheetID)">
											<!-- 年级成绩下载 -->
											<a v-if="head123" style="color:#fff" :href="'https://pro.myworldclassroom.com/kaokao/index.php/study/studyExcel?SchoolID='+userInfo['SchoolID']+'&AnswerSheetID='+scope.row.AnswerSheetID+'&SubjectID='+subjectdata+'&GradeID='+Gradedata">得分详情下载</a>
											<!-- 班级成绩下载 -->
											<a v-else style="color:#fff" :href="'https://pro.myworldclassroom.com/kaokao/index.php/study/studyInfoExcel?SchoolID='+userInfo['SchoolID']+'&AnswerSheetID='+scope.row.AnswerSheetID+'&ClassID='+Classdata+'&SubjectID='+subjectdata+'&GradeID='+Gradedata">得分详情下载</a>
										</el-button>
										<hr>
										<!-- <el-button type="warning" round @click="Scoretodownload(scope.row.AnswerSheetID)" >
											<a class="box-content-head" :href="'https://pro.myworldclassroom.com/kaokao/index.php/study/studyExcel?SchoolID='+userInfo.SchoolID+'&AnswerSheetID='+scope.row.AnswerSheetID" >年级详情下载</a>
										</el-button> -->
											<!-- <el-dialog title="考试详情下载" :visible.sync="dialogTableVisible">
												<el-table :data="gridData">
													<el-table-column property="value" label="班级" width="150"></el-table-column>
													<el-table-column label="操作">
														<template slot-scope="scope">
															<el-button size="mini" @click="biubiu(scope.row.chilen)">
																<a :href="'https://pro.myworldclassroom.com/kaokao/index.php/study/studyInfoExcel?SchoolID='+userInfo.SchoolID+'&AnswerSheetID='+scope.row.chilen+'&ClassID='+scope.row.value">班级下载</a>
															</el-button>
															<el-button size="mini"><a :href="'https://pro.myworldclassroom.com/kaokao/index.php/study/studyExcel?SchoolID='+userInfo.SchoolID+'&AnswerSheetID='+this.AnswerSheetID" >得分详情Excel下载</a></el-button>
														</template>
													</el-table-column>
												</el-table>
											</el-dialog> -->
								</template>
							</el-table-column>
						</el-table>
						<div class="pagination">
							<el-pagination :disabled="paging" @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
							</el-pagination>
						</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="趋势图" name="second">
					<div id="myChart123" style="width: 700px; height: 500px;"></div>
			</el-tab-pane>
	</el-tabs>
		
	</div>
</template>
   

<script>
import bus from '../../common/bus'
// let echarts = require('echarts/lib/echarts')

  export default {
    name: 'teacher',
    data() {
      return {
		ArrayList:[],
		head123:true,
		activeName: 'first',
		ArrayList1:[],
		ArrayList2:[],
		tableData: [],
		cur_page: 1,
		pages:1,
		s_school: '',
		s_grade: '',
		s_klass: '',
		s_name: '',
		loading: false,
		paging:false,
		AnswerSheetID:"",
		AnswerSheetID123:[],
		head2:[],
		userInfo:[],
		subject:[],
		exsicon:[],
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
		Scoretodownload1:[],
		school:[],
		Gradedata:[],
		Classdata:[],
		subjectdata:[],
      }
    },

    computed:{

		},
	mounted(){
        this.drawLine();
	},
	created(){
			var subject = JSON.parse(sessionStorage.getItem("subject"));
			var userInfo = JSON.parse(localStorage.getItem("userInfo"));
			this.userInfo = userInfo
			var head1 = JSON.parse(sessionStorage.getItem("head1"))
			if(head1 == 1){
				this.download = true
			}
			bus.$on("getParam",param=>{
				this.head2 = param
				
			})
			//需要·
			if(subject == null){
				this.school = []
				this.school = JSON.parse(sessionStorage.getItem('school'));
				this.Gradedata = this.school[0]
				this.subjectdata = this.school[1]
				this.Classdata = this.school[2]
				if(this.school[2] === 0){
					this.grade()
					this.head123 = true
				}else{
					this.search()
					this.head123 = false
				}
			}else{
				this.school = JSON.parse(sessionStorage.getItem('subject'));
				this.Gradedata = this.school[0]
				this.subjectdata = this.school[1]
				this.Classdata = this.school[2]
				if(this.school[2] === 0){
					this.grade()
					this.head123 = true
				}else{
					this.search()
					this.head123 = false
				}
			}
			
		},
	watch:{
		head2(){
			this.Gradedata = this.head2[0]
            this.subjectdata = this.head2[1]
			this.Classdata = this.head2[2]
			console.log(this.Classdata)
			if(this.Classdata === 0){
				console.log("走年级")
				this.grade()
				this.head123 = true
			}else{
				console.log("走班级")
				this.search()
				this.head123 = false
			}
			// this.search1()
			// this.school = JSON.parse(sessionStorage.getItem('subject'));
			// this.Gradedata = this.school[0]
            // this.subjectdata = this.school[1]
			// this.Classdata = this.school[2]
			// console.log(this.Classdata)
			// if(this.Classdata === 0){
			// 	console.log("走年级通道")
			// 	this.grade()
			// 	this.head123 = true
			// }else{
			// 	console.log("走班级通道")
			// 	this.search()
			// 	this.head123 = false
			// }
			

			// this.school = JSON.parse(sessionStorage.getItem('subject'));
			// console.log(this.school)
			// this.search()
		}
	},
    methods: {

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
						data:['最高分',"最低分"]
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
							name:'最低分',
							type:'line',
							stack: '总量',
							data:this.ArrayList
						},
						{
							name:'最高分',
							type:'line',
							stack: '总量',
							data:this.ArrayList1
						},
					]
				})
			},
		Scoretodownload(val){
			this.Scoretodownload1 = val
		},
		biubiu(val){
			
		},
		grade(){
			this.loading = true
			this.tableData = []
			this.ArrayList = []
			this.ArrayList1 = []
			this.exsicon = []
			this.$get("/study/answerGrade?SchoolID="+this.userInfo["SchoolID"]+"&SubjectID="+this.subjectdata+"&GradeID="+this.Gradedata).then(res=>{
				console.log(res.data)
				if(res.data.length === 0){
						this.paging = true
				}else{
					if(res.data.pages === 1){
						this.paging = true
					}else{
						this.pages = res.data.pages
					}
				}
				if(res.data.length === 0){
						this.loading = false
						this.open7()
				}else{
					res.data.list.forEach((item,i) => {
						console.log(item)
						this.tableData.push(item)
						this.ArrayList.push(item.avgScore)
						this.ArrayList1.push(item.maxScore)
						this.exsicon.push(item.CreateTime+"/"+item.SubjectName)
						this.drawLine()
					});
					
					this.loading = false
				}
			})
		},
		handleClick(tab, event) {
        		
		  },
		examine(val){
			this.$router.push({path:"Transcript",query:{AnswerSheetID:val}})
		},
    	// 分页导航
      handleCurrentChange(val) {
			this.loading = true
			var userInfo = JSON.parse(localStorage.getItem("userInfo"));
				// this.$get('student_papers',{pageNum:val}).then((res) => {
			this.$get('teacher/answerSheetInfo?SchoolID='+userInfo["SchoolID"]+'&UserID='+userInfo["UserID"],{pageNum:val}).then((res) => {
					if(res.data.pages === 1){
							this.paging = true
					}else{
							this.pages = res.data.pages
					}
	      	if(res.code === 0){
						this.pages = res.data.pages;
	      		this.tableData = JSON.parse(JSON.stringify(res.data.list))
      			
	      	}else{
	      		this.$message.error('学生加载失败');
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
			},
			open7() {
				this.$message({
					showClose: true,
					message: '该老师无法获取到往期学情',
					type: 'warning'
				});
			},
      search(){
		  	this.loading = true
			this.tableData = []
			this.ArrayList = []
			this.ArrayList1 = []
			this.exsicon = []
			this.$get("study/answer?SchoolID="+this.userInfo["SchoolID"]+"&UserID="+this.userInfo["UserID"]+"&SubjectID="+this.subjectdata+"&GradeID="+this.Gradedata+"&ClassID="+this.Classdata).then(res=>{	
				if(res.data.length === 0){
						this.paging = true
				}else{
					if(res.data.pages === 1){
							this.paging = true
					}else{
							this.pages = res.data.pages
					}
				}
				if(res.data.length === 0){
						this.loading = false
						this.open7()
				}else{
						res.data.list.forEach((item,i) => {
							this.tableData.push(item)
							this.ArrayList.push(item.avgScore)
							this.ArrayList1.push(item.maxScore)
							this.exsicon.push(item.CreateTime+"/"+item.SubjectName)
							this.drawLine()
						});
						this.loading = false
				}
				
			})
		},
	
	search1(){
		
		//  GradeID下标是0   SubjectID下标是1
		var userInfo = JSON.parse(localStorage.getItem("userInfo"));
		this.$get("teacher/subjectAnswerSheetInfo?SchoolID="+userInfo["SchoolID"]+"&UserID="+userInfo["UserID"]
		+"&SubjectID="+this.subjectdata+"&GradeID="+this.Gradedata).then(res =>{
			if(res.code === 0){
				if(res.data.list == 0){
						this.open7()
				}
				this.tableData = JSON.parse(JSON.stringify(res.data.list))
				this.pages = res.data.pages;
			}else{
				this.$message.error('学生加载失败');
			}
		})
	},
	dialogTableVisible123(val){
		
	},
	headdownload(val){
		if(val == 0){
			return false
		}else{
			return true
		}
	}


	},
	
  }
  
</script>

<style>

.box-content-head{
	color: #fff;
}
</style>

