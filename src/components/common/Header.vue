<template>
  <div class="header">
        <div class="logo"><img src="../../assets/kaokao_2(1).png"/>
            <span>考考教育管理系统</span>
        </div>
    <!-- 折叠按钮 -->
    <!-- <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div> -->
    <div class="header-right">
      <div class="header-user-con"><!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
             欢迎:{{UserName}}老师&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!--<el-dropdown-item command="edituser">编辑资料</el-dropdown-item>-->
            <!--<el-dropdown-item command="editpsw">修改密码</el-dropdown-item>-->
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="block">
                <el-cascader
                    :options="options"
                    v-model="selectedOptions"
                     @active-item-change="handleItemChange"
                    @change="handleChange">
                </el-cascader>
        </div>
        
      </div>
      
    </div>

    
    <div class="ironman">
        <ul>
           <li  v-for="(value,index) in routedata" :key="index" @click="skip(value.url,index)" :class="{'active':index===currentIndex}">
               {{value.name}}
           </li>
        </ul>
    </div>

  </div>
  
</template>
<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                routedata:[
                    {
                        name:"最新学情报告",
                        url:"learning",
                    },{
                        name:"往期学情",
                        url:"paperList",
                    },{
                        name:"学生追踪",
                        url:"details",
                    },{
                        name:"在线批改",
                        url:"homework",
                    }
                ],
                activeIndex2: '1',
                collapse: false,
                fullscreen: false,
                username:'',
                message:0,
                options: [],
                selectedOptions: [],
                // selectedOptions2: [],
                head1:[],
                head2:[],
                gradeIdi:[],
                classdata:[],
                Subjectrequest:[],
                children:[],
                subject:[],
                userInfo:[],
                suiyi:[],
                classdatacun:[],
                children1:[],
                optionscun:[],
                grade:[],
                gradedata:[],
                taxon:"",
                currentIndex:0,
              };  
            
        },
        created(){
            
            this.sanji(),
            this.UserName = JSON.parse(localStorage.getItem('userInfo')).UserName;
            
        },
        computed:{

        },
        methods:{
            skip(e,index){
                console.log(index)
                this.currentIndex = index
                this.$router.push(e)
            },
            handleChange(value) {
                // console.log(value)
                this.head2 = value 
                sessionStorage.setItem('subject',JSON.stringify(this.head2))
                bus.$emit("getParam",this.head2)
                // bus.$emit("gradedata",this.gradedata)
            },
        handleItemChange(){

        },
        //三级联动请求
        sanji(){
            this.selectedOptions = []
            this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
            //请求年级
            this.$get("teacher/gradeInfo?SchoolID="+this.userInfo["SchoolID"]+"&GradeClassIDs="+this.userInfo["GradeClassIDs"]).then(res=>{
                bus.$emit("gradedata",res.data)
                for(let i in res.data){
                    this.$get("/teacher/classInfo?SchoolID="+this.userInfo["SchoolID"]+"&gradeId="+i+"&UserID="+this.userInfo["UserID"]).then(classdata=>{
                        console.log(classdata.data)
                        var children1 = [];
                        var children = [];
                        classdata.data.forEach((item,i)=>{
                            // console.log(item)
                            if(item.clsddId === 0){
                                
                                children1.push({
                                    value: 0,
                                    label:"全部班级",
                                })
                            }
                           
                            if(item.clsddId >0 ){
                                children1.push({
                                    value:item.clsddId,
                                    label:item.clsddId+"班",
                                    // children:children
                                })
                            }
                            
                        })
                        this.$get("teacher/subject?SchoolID="+this.userInfo["SchoolID"]+"&SubjectIDs="+this.userInfo["SubjectIDs"]).then(head =>{
                            if(head.data.length == 9){
                                this.head1 = 1
                                sessionStorage.setItem("head1",JSON.stringify(this.head1))
                            }else{
                                
                            }
                            head.data.forEach((item,i)=>{
                                children.push({
                                    value:item.SubjectID,
                                    label:item.SubjectName,
                                    children:children1
                                })
                            })
                            this.options.push({
                                value:res.data[i][0].GradeID,
                                label:res.data[i][0].GradeName,
                                children:children
                            })
                            
                                console.log(classdata.data)
                                console.log(this.options)
                            this.options.sort((a,b) =>{
                                return  a.value-b.value
                            })
                           
                        })
                    })
                    
                }
                //for循环结束
                
                this.kemu()
            })       
                bus.$on("threelevel",param=>{
                    console.log("这是发送过得默认数据",param)
                    // console.log(this.options[0])
                    this.selectedOptions = param
                    this.kemu()
                    // sessionStorage.setItem('school',JSON.stringify(this.selectedOptions))
                    // if(this.options[0].children[0].children[0].value == 0){
                    //     sessionStorage.setItem('school',JSON.stringify(this.selectedOptions))
                    // }else{

                    // }
                    
                })
            
            

        },
        kemu(){
            //直接判断是不是最后一次循环，然后调用，时间太赶，回头在改，提醒，提醒，提醒
            console.log(123456789)
            setTimeout(()=>{
                if(this.selectedOptions.length === 2){
                    console.log(this.selectedOptions)
                    console.log(this.options[0].children[0].children[1].value)
                    console.log(this.options)
                    console.log(789)
                    // this.selectedOptions = [];
                    this.selectedOptions.push(this.options[0].children[0].children[1].value)
                    console.log(this.selectedOptions)
                    sessionStorage.setItem('school',JSON.stringify(this.selectedOptions))
                    bus.$emit("demo","msg")
                }
                
            },2000)
        },
            // request(){
            //     sessionStorage.setItem('school',JSON.stringify(this.selectedOptions))
            // },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                  localStorage.setItem('userInfo','');
                  localStorage.setItem('token','');
                  sessionStorage.clear();
                  this.$router.push('/login');
                } else if(command == 'edituser'){
                    this.$router.push('/edituser');
                } else if(command == 'editpsw'){
                    this.$router.push('/editpsw')
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            }
        },
        mounted(){
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
        }
    }
</script>
<style scoped>
    .block{
        position: relative;
        left: 28px;
        top: 0px;
    }
    .conponet{
        position: relative;
        top: 8px;
        left: 39px;
    }
    .el-menu-demo{
        display: flex;
        justify-content: center;
    }
    .el-menu-demo{
        left: 70px;
        height: 70px;
    }
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 80px;
        color: rgb(72, 178, 228);
    }
    .header .logo{float: left; width:333px; line-height: 70px;font-size:20px;}
    .header .logo img{ height:40px; margin:15px 15px 0 10px; float:left;}
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
        font-size: 22px;
    }
    
    .header-right{
        float: right;
        padding-right: 50px;
        font-size:22px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
        margin-top:2px;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: rgb(72, 178, 228);
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .ironman{
        position: absolute;
        left: 0px;
        top: 85px;
        width: 100%;
        height: 80px;
        /* background-color: rgba(128, 155, 161, 0.678); */
    }
    .ironman ul{
        width: 1200px;
        height: 60px;
        margin: 0 auto;
        display: flex;
        justify-content:space-between;
        color: black;
        /* background-color: red; */
        line-height: 40px;
    }

    /* .ironman ul li{
        width: 131px;
        height: 44px;
        opacity: 10;
        padding:0;
        background: transparent;
        text-align: center;
    } */
    .ironman ul li:hover{ background:transparent;}
                    
    /* .ironman ul .router-link-active :hover{ background:transparent;} */
    /* .ironman ul li */
     .active{
        width: 131px;
        text-align: center;
        height: 24px;
        margin: 10px 0px;
        border-radius: 30px;
        color: #fff;
        line-height: 26px;
        background-color: rgba(0, 110, 253, 0.432) !important;
    }
    
    
</style>
