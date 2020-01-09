<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i>全部考试</span>
                    <div v-if="ha2">显示</div>
                    <div v-else>隐藏</div>
                    <el-row class="head">
                        <el-button v-show="box1" type="primary" icon="el-icon-edit" @click="ha1"> 新建考试 </el-button>
                        <el-button v-show="box1" type="primary" icon="el-icon-edit" @click="ha3"> 回复 </el-button>
                    </el-row>
                    
            </el-tab-pane>
            <el-tab-pane  >
                <span slot="label"><i class="el-icon-edit"></i>待分配</span>
                我的行程
            </el-tab-pane>
            <el-tab-pane>待批改
                <span slot="label"><i class="el-icon-warning"></i>待批改</span>
                我的行程
            </el-tab-pane>
            <el-tab-pane>待上传
                <span slot="label"><i class="el-icon-loading"></i>待上传</span>
                                
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data(){
        return{
            box1:true,
            ha2:true,
        }
    },
    methods:{
        ha1(){
            console.log(1)
            this.ha2 = false
        },
        ha3(){
            this.ha2 = true
        }
    }
}
</script>

<style>
    .head{
        position: relative;
        left: 560px;
        top: 100px;
        height: 673px;
    }
</style>
