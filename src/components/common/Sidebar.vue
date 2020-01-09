<template>
    <div class="sidebar">
        <!-- <el-menu class="sidebar-el-menu"  :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu> -->
        <!-- <el-col :span="12">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-col> -->

        <!-- <el-col :span="12">
            <el-menu
            router
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#ffffff"
            active-text-color="#545c64"
            @open="handleOpen"
            @close="handleClose">
                <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>考考管理</span>
                        </template>
                    <el-menu-item-group>
                        <el-menu-item index="gradepage">年级管理</el-menu-item>
                        <el-menu-item index="paperList">往期学情</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
            </el-menu>
        </el-col> -->

    
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
  data() {
    return {
      collapse: false,
      activeIndex: '1',
      activeIndex2: '1',
      items: [
        {
          icon: 'el-icon-info',
          index: '1',
          title: '学情追踪',
          subs:[{
            index: 'homepage',
            title: '学情报告'
          },{
            index: 'result',
            title: '成绩单',
          },{
            index: 'details',
            title: '详情分析报表',
          }
        ]

        },
         {
          icon: 'el-icon-lx-people',
          index: 'gradepage',
          title: '年级管理'
        },
        {
          icon: 'el-icon-document',
          index: 'paperList',
          title: '往期学情',
        } ,
        {
          icon: 'el-icon-edit',
          index: 'information',
          title: '考试详情',
        } 
      ]
    }
  },
  computed:{
    onRoutes(){
      return this.$route.path.replace('/','');
    }
  },
  created(){

    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
    })
  },
  methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<style scoped>
.sidebar{
    width: 200px;

}
.el-col-12{
    width: 100%;
}
    /* .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .el-menu-item{ height:40px; line-height:40px;}
    .sidebar > ul {
        height:100%;
    } */
    
</style>
