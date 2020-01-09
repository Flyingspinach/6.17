<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">学情报告</div>
            <el-table :data="tableData" border size="medium" ref="multipleTable">
                 <el-table-column prop="subjectName" label="考试科目" align="center" ></el-table-column>
                 <el-table-column prop="Score" label="考试分数" align="center" ></el-table-column>
                 <el-table-column prop="StudentID" label="考试学号" align="center" ></el-table-column>
                 <el-table-column prop="CreateTime" label="考试时间" align="center" ></el-table-column>
  <!-- <el-table-column label="操作" align="center" >
                    <template slot-scope="">
                        <router-link :to="{path:'ans',query:{SchoolID:userInfo.SchoolID}}" style="color:#35a000;">学情报告</router-link>
                    </template>
                </el-table-column> -->

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
        this.StudentID = this.$route.query.StudentID;
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.userInfo = userInfo
        this.$get('teacher/studyInfo?SchoolID='+userInfo["SchoolID"]+'&StudentID='+this.StudentID).then((res) => {
            console.log(res.data)
        if(res.code === 0){
            this.tableData = JSON.parse(JSON.stringify(res.data.list))
            this.pages = res.data.pages;
        }else{
            this.$message.error('该年级加载失败');
        }
        console.log(this.tableData)
        this.loading = false
      }).catch(() => {this.loading = false})
    },
    computed: {

    },
    methods: {
       handleCurrentChange(val) {
            this.StudentID = this.$route.query.StudentID;
        // console.log(this.gradeId)
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.userInfo = userInfo
      	this.loading = true
			this.$get('teacher/studyInfo?SchoolID='+userInfo["SchoolID"]+'&StudentID='+this.StudentID,{pageNum:val}).then((res) => {
                if(res.code === 0){
                    this.tableData = JSON.parse(JSON.stringify(res.data.list))
                    this.pages = res.data.pages;
                }else{
                    this.$message.error('加载失败');
                }
                this.loading = false
            }).catch(() => {this.loading = false})
      },
    }
  }
</script>

<style scoped>
</style>
