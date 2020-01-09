<template>
  <div class="index-wrap" v-loading="loading" element-loading-text="加载中">
		<div class="header">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1">学生成绩查询</el-menu-item>
				<!-- <el-menu-item index="2" style="padding-left:150px"><a @click="signout">个人中心</a></el-menu-item> -->
				<el-menu-item index="2">所属学校:{{userInfo.SchoolName}}</el-menu-item>
				<el-menu-item index="3">所属年级:{{userInfo.GradeName}}</el-menu-item>
				<el-menu-item index="4">{{userInfo.studentName}}同学，您好<a @click="signout" style="font-size:20px">【退出】</a></el-menu-item>
			</el-menu>	
		</div>

		  <div class="table" style="margin:5%" v-loading="loading" element-loading-text="加载中">
        <!-- <div class="container">
          <div style="text-align:center"><h1>成绩单</h1></div>
          <div class="school">学校名称<span>:</span><span class="xiahua">{{userInfo.SchoolName}}</span></div>
          <div class="school">所属年级<span>:</span><span class="xiahua">{{userInfo.GradeName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
          <div class="school">学生姓名<span>:</span><span class="xiahua">{{userInfo.studentName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
             <el-table :data="papersList" style="width: 70%; margin-left:10%" :default-sort = "{prop: 'date', order: 'descending'}"> 
                <el-table-column prop="subjectName" label="科目" align="center"></el-table-column>
								<el-table-column prop="Score" label="分数" align="center"></el-table-column>
								<el-table-column prop="Ranking" label="排名" align="center"></el-table-column>
                <el-table-column prop="CreateTime" label="日期" align="center"></el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
                </el-pagination>
            </div>
        </div> -->


        <el-tabs type="border-card">
          
          <el-tab-pane label="最新考试成绩">
              <div class="container">
                <div style="text-align:center"><h1>成绩单</h1></div>
                <div class="school">学校名称<span>:</span><span class="xiahua">{{userInfo.SchoolName}}</span></div>
                <div class="school">所属年级<span>:</span><span class="xiahua">{{userInfo.GradeName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
                <div class="school">学生姓名<span>:</span><span class="xiahua">{{userInfo.studentName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
                  <el-table :data="study" style="width: 70%; height:100%; margin-left:10%" > 
                      <el-table-column prop="subjectName" label="科目" align="center"></el-table-column>
                      <el-table-column prop="Score" label="分数" align="center"></el-table-column>
                      <el-table-column prop="class" label="班级" align="center"></el-table-column>
                      <el-table-column prop="CreateTime" label="日期" align="center"></el-table-column>
                      <el-table-column prop="Type" label="类型" align="center"></el-table-column>
                      <el-table-column prop="ExamTitle" label="试卷" align="center"></el-table-column>
                  </el-table>
              </div>
          </el-tab-pane>


          <el-tab-pane label="历史考试成绩">
            <div class="container">
              <div style="text-align:center"><h1>成绩单</h1></div>
              <div class="school">学校名称<span>:</span><span class="xiahua">{{userInfo.SchoolName}}</span></div>
              <div class="school">所属年级<span>:</span><span class="xiahua">{{userInfo.GradeName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
              <div class="school">学生姓名<span>:</span><span class="xiahua">{{userInfo.studentName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
                <el-table :data="studyInfo" style="width: 70%; height:100%; margin-left:10%"> 
                    <el-table-column prop="subjectName" label="科目" align="center"></el-table-column>
                    <el-table-column prop="Score" label="分数" align="center"></el-table-column>
                    <el-table-column prop="class" label="班级" align="center"></el-table-column>
                    <el-table-column prop="CreateTime" label="日期" align="center"></el-table-column>
                    <el-table-column prop="Type" label="类型" align="center"></el-table-column>
                    <el-table-column prop="ExamTitle" label="试卷" align="center"></el-table-column>
                </el-table>

                <div class="pagination">
                    <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
                    </el-pagination>
                </div>
            </div>
          </el-tab-pane>

          
        </el-tabs>
    </div>

  </div>
</template>

<style>
.el-menu-demo{
  left: 0px;
  height: 70px;
}
.cell{
  font-size: 16px;
  color: dimgray;
}

.school{
  font-size: 15px;
  margin: 2.5% 19%;
 
}

.school span{
 padding-left: 20px;
}

.clearfix{
  width: 80%;
  margin:0.5% 0.5%;
}

.xiahua{
  border-bottom:1px solid #000;
  width:200px;
}

.pagination{
  padding:0px 5px;
}
.news-list{
  width:150px;
  float: left;
  padding-top:5px;
}

.news-list-title {
    position: relative;
    float: left;
    margin-left: 25px;
}
div {
    display: block;
}
li {
    display: list-item;
    text-align: -webkit-match-parent;
}

ul, dir {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}

.clearfix:after {
    content: ".";
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    font-size: 0;
} 

.clearfix:before,.clearfix:after{display:table;content:" ";}
.clearfix:after,.clear{clear:both;}
.clearfix{zoom:1;}

.clearfix{
  background-color:rgb(232, 235, 217 1);
}

ul li{background:#fff; transition:all ease-in-out .3s; padding:10px}
ul li .time{ width:100px; float: left; text-align: center; }
ul li .hoverMask{ padding:10px; width:calc(100% - 120px); float: right; background:rgb(232, 235, 217 1); transition:all ease-in-out .5s}
ul li:hover{background-color:rgb(221, 218, 190)}

ul li:hover .hoverMask{background:rgba(255, 255, 255, .3)}
</style>


<script>
  export default {

    data: function(){
      return {
      	userInfo:[],
				surveyList:[],
				cur_page:1,
        pages:0,
        studyInfo:[],
        study:[],
        papersList:[],
			  activeIndex: '1',
				activeIndex2: '1',
				loading:false
      }
		},
		
    created(){

    	// this.userInfo = this.username = JSON.parse(localStorage.getItem('userInfo'))
    	// //获取试卷
    	// this.$get('student/index?SchoolID='+this.userInfo.SchoolID+'&StudentID='+this.userInfo.StudentID).then((res) => {
      // 	if(res.code === 0){
        
			// 		this.papersList = JSON.parse(JSON.stringify(res.data.list))
			// 		this.pages = res.data.pages;
      // 	}else{
      // 		this.$message.error('暂时无其他信息');
      // 	}
      // 	this.loading = false
      // }).catch(() => {this.loading = false})

      this.getStudayData();

    },
    computed: {

    },
    methods: {


    onMousteIn: function(index) {
      this.seen = true; //鼠标移入显示
      this.current = index;
    },
    onMousteOut: function(index) {
      this.seen = false; //鼠标移出隐藏
      this.current = null;
    },

    getStudayData(){
      this.userInfo = this.username = JSON.parse(localStorage.getItem('userInfo'))
        this.$get('student/newStudy?SchoolID='+this.userInfo.SchoolID+'&StudentID='+this.userInfo.StudentID).then(res =>{
          console.log(res.data)
          for(let i in res.data){
            if(res.data.Type == '0'){
                res.data.Type = "作业"
            }else{
                res.data.Type = "考试"
            }
          }
          this.study.push({
                subjectName:res.data.subjectName,
                CreateTime:res.data.CreateTime,
                Score:res.data.Score,
                Type:res.data.Type,
                ExamTitle:res.data.ExamTitle,
                class:res.data.class+"班"
            })      
      })
      
        this.$get('student/index?SchoolID='+this.userInfo.SchoolID+'&StudentID='+this.userInfo.StudentID).then(res =>{
              console.log(res.data)
              this.pages = res.data.pages
              for(let i in res.data.list){
                if(res.data.list[i].Type == '0'){
                    res.data.list[i].Type = "考试"
                }else{
                    res.data.list[i].Type = "作业"
                }
                this.studyInfo.push({
                    subjectName:res.data.list[i].subjectName,
                    Score:res.data.list[i].Score,
                    CreateTime:res.data.list[i].CreateTime,
                    ExamTitle:res.data.list[i].ExamTitle,
                    Type:res.data.list[i].Type,
                    class:res.data.list[i].class+"班"
                })
            }
            
              console.log(this.studyInfo)
        })
      
    },



			//分页导航
		  handleCurrentChange(val) {
      	this.loading = true
				this.$get('student/index?SchoolID='+this.userInfo.SchoolID+'&StudentID='+this.userInfo.StudentID+'&pageNum='+val).then((res) => {
          // console.log(this.userInfo.SchoolID,this.userInfo.StudentID)
          console.log(res.data)
          for(let i in res.data.list){
                if(res.data.list[i].Type == '0'){
                    res.data.list[i].Type = "作业"
                }else{
                    res.data.list[i].Type = "考试"
                }
                this.studyInfo.push({
                    subjectName:res.data.list[i].subjectName,
                    Score:res.data.list[i].Score,
                    CreateTime:res.data.list[i].CreateTime,
                    ExamTitle:res.data.list[i].ExamTitle,
                    Type:res.data.list[i].Type
                })
            }
	      	// if(res.code === 0){
	      	// 	this.papersList = JSON.parse(JSON.stringify(res.data.list))
      		// 	this.pages = res.data.pages;
	      	// }else{
	      	// 	this.$message.error('加载失败');
	      	// }
	      	this.loading = false
	      }).catch(() => {this.loading = false})
      },
      
			handleSelect(){

			},
      signout(){
        localStorage.setItem('userInfo','');
        localStorage.setItem('token','');
        this.$router.push('/login');
      },
      trim(str) {
				return str.replace(/\n|\r\n/g,"<br/>")
      }
    }
  }
</script>

<style>
</style>