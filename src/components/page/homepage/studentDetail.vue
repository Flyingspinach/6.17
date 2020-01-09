<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">学生管理</div>
            <el-table :data="tableData" border size="medium" ref="multipleTable">
                <el-table-column prop="StudentID" label="学生编号" align="center" ></el-table-column>
                 <el-table-column prop="StudentName" label="学生姓名" align="center" ></el-table-column>

                  <el-table-column label="操作" align="center" >
                    <template slot-scope="scope">
                        <router-link :to="{path:'studyInfo',query:{SchoolID:userInfo.SchoolID,StudentID:scope.row.StudentID}}" style="color:#35a000;">学情报告</router-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
                </el-pagination>
            </div>

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
        cur_page:1,
				pages:0
      }
    },
    created(){
      if(this.$route.query.ClassID && this.$route.query.SchoolID){
          this.ClassID = this.$route.query.ClassID;
        // console.log(this.gradeId)
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // console.log(userInfo);
        this.$get('teacher/studentInfo?SchoolID='+userInfo["SchoolID"]+'&ClassID='+this.ClassID).then((res) => {
        if(res.code === 0){
          console.log(res)
            this.tableData = JSON.parse(JSON.stringify(res.data.list))
            this.pages = res.data.pages;
            
        }else{
            this.$message.error('该年级加载失败');
        }
        
      }).catch(() => {this.loading = false})
      }
      console.log(this.tableData)
      this.student()
    },
    computed: {

    },
    methods: {
       handleCurrentChange(val) {
      	this.loading = true
				this.$get('teacher/studentInfo?SchoolID='+userInfo["SchoolID"]+'&ClassID='+this.ClassID,{pageNum:val}).then((res) => {
	      	if(res.code === 0){
	      		this.tableData = JSON.parse(JSON.stringify(res.data.list))
      			this.pages = res.data.pages;
	      	}else{
	      		this.$message.error('加载失败');
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
      },
      //其学生请求是模拟数据
      student(){
        this.$get("teacher/studentStudy?SchoolID=99&ClassID=16").then(res=>{
          res.data.list.forEach((element,i) => {
              if(element.Sex == "F"){
                element.Sex = "男"
              }else{
                element.Sex = "女"
              }
                this.tableData.push(element)
            });
            this.loading = false
        })
      }
    }
  }
</script>

<style scoped>
</style>
