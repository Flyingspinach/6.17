import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '登录' },
            children:[
                {
                    path: '/gradepage',
                    component: resolve => require(['../components/page/homepage/gradepage.vue'], resolve),
                    meta: { title: '年级管理' }
                }, 
                {
                    path: '/result',
                    component: resolve => require(['../components/page/homepage/result.vue'], resolve),
                    meta: { title: '成绩单' }
                },
                {
                    path: '/details',
                    component: resolve => require(['../components/page/homepage/details.vue'], resolve),
                    meta: { title: '详情分析' }
                },
                {
                    path:'/classman',
                    component: resolve => require(['../components/page/homepage/classman.vue'], resolve),
                    meta:{ title:'年级学生'}
                },
                {
                    path: '/homepage',
                    component: resolve => require(['../components/page/homepage/homepage.vue'], resolve),
                    meta: { title: '学情报告' }
                },
                {
                    path: '/learning',
                    component: resolve => require(['../components/page/homepage/learning.vue'], resolve),
                    meta: { title: '最新学情报告' }
                },
                {
                    path: '/classDetail',
                    component: resolve => require(['../components/page/homepage/classDetail.vue'], resolve),
                    meta: { title: '班级管理' }
                },
                {
                    path: '/studentDetail',
                    component: resolve => require(['../components/page/homepage/studentDetail.vue'], resolve),
                    meta: { title: '学生管理' }
                },
                {
                    path: '/studyInfo',
                    component: resolve => require(['../components/page/homepage/studyInfo.vue'], resolve),
                    meta: { title: '学情报告' }
                },
                {
                    path: '/information',
                    component: resolve => require(['../components/page/homepage/information.vue'], resolve),
                    meta: { title: '考试详情' }
                },
                {
                  path:'/paperList',
                  component:resolve => require(['../components/page/testpage/paperList.vue'],resolve),
                  meta:{title:'往期学情',admin:true}
                },
                {
                  path:'/homework',
                  component: resolve => require(['../components/page/homepage/homework.vue'], resolve),
                },
                {
                    path: '/questionbank',
                    component: resolve => require(['../components/page/homepage/questionbank.vue'], resolve),
                    meta: { title: '题库中心' }
                },
                {
                    path:'/Transcript',
                    component: resolve => require(['../components/page/homepage/Transcript.vue'],resolve),
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/login/login.vue'], resolve)
        },
        {
          path:'/index',
          component:resolve => require(['../components/page/studentlogin/index.vue'],resolve),
          meta:{title:'学生首页',admin:true}
        },                                       
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
