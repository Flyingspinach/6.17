<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">班级管理</div>
            <el-table :data="tableData" border size="medium" ref="multipleTable">
                <el-table-column prop="ClassID" label="班级编号" align="center" ></el-table-column>
                 <el-table-column prop="ClassName" label="班级名称" align="center" ></el-table-column>
                <el-table-column label="操作" align="center" >
                    <template slot-scope="scope">
                        <router-link :to="{path:'studentDetail',query:{SchoolID:userInfo.SchoolID,ClassID:scope.row.ClassID}}" style="color:#35a000;">详情</router-link>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <ul class="tableDataList">
              <li>班级编号</li>
              <li>班级名称</li>
              <li>操作</li>
            </ul>
            <ul class="tableDataList" v-for="(item,index) in tableData" :key="index">
              <li>{{item.ClassID}}</li>
              <li>{{item.ClassName}}</li>
              <li>
                <el-button :disabled="dis" 
                type="success" @click="skip(item.ClassID)" round size="small">详情</el-button>
              </li>
            </ul> -->
        </div>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        tableData: [],
        loading:true,
        userInfo:[],
        gradeId:[],
        dis:false,
      }
    },
    created(){
        this.gradeId = this.$route.query.gradeId;
        // console.log(this.gradeId)
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // console.log(userInfo);
        this.$get('teacher/classInfo?SchoolID='+userInfo["SchoolID"]+
        '&gradeId='+this.gradeId+'&UserID='+userInfo["UserID"]).then((res) => {
          console.log(res.data)
        if(res.code === 0){
            this.tableData = res.data
            this.loading = false
            // JSON.parse(JSON.stringify(res.data))
        }else{
            this.$message.error('该年级加载失败');
        }
        
      }).catch(() => {this.loading = false})
    },
    computed: {

    },
    methods: {
      skip(e){
        console.log(e)
      }
    }
  }
</script>

<style scoped>
.container{
  width: 904px;
  margin: 0 auto;
}
.tableDataList{
  width: 904px;
  margin:0 auto;
  display: flex;
  background:#fff;
}
.tableDataList li{
  width: 300px;
  border:1px solid #eee;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-right:none;
}
.tableDataList li:nth-last-child(1){
  border-right:1px solid #eee;
}
</style>
