import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [

    {
        path: '/',
        // name: 'login',
        // component: () => import('../components/Home/login.vue'),
        redirect: 'login'
    }, {
        path: '/login',
        name: 'login',
        component: () => import('../components/Home/login.vue'),
        meta: {showHeader: false, showLeftNav: false}
    },

    {
        path: '/home',
        name: 'Home',
        component: () => import('../components/Home/Index.vue')
    },
    {
        path: '/task_management',
        name: 'TaskManagement',
        component: () => import('../components/TaskManagement/Index.vue')
    },
    {
        path: '/task_management/create_task',
        name: 'CreateTask',
        component: () => import('../components/TaskManagement/CreateTask.vue')
    },
    {
        path: '/task_management/result_query',
        name: 'ResultQuery',
        component: () => import('../components/TaskManagement/ResultQuery.vue')
    },
    {
        path: '/task_management/app_result_query',
        name: 'AppResultQuery',
        component: () => import('../components/TaskManagement/AppResultQuery.vue')
    },
    {
        path: '/task_management/more_obj',
        name: 'MoreObj',
        component: () => import('../components/TaskManagement/MoreObj.vue')
    },
    {
        path: '/client_management',
        component: () => import('../components/ClientManagement/Index.vue'),
        children: [
            {
                path: '',
                name: 'ClientManagement',
                redirect: 'client_app',
            },
            {
                path: 'client_pc',
                name: 'ClientManagementPC',
                component: () => import('../components/ClientManagement/ClientPC.vue')
            },
            {
                path: 'client_app',
                name: 'ClientManagementAPP',
                component: () => import('../components/ClientManagement/ClientApp.vue')
            },
        ]
    },
    {
        path: '/client_management/client_pc_operate',
        name: 'ClientPCOperate',
        component: () => import('../components/ClientManagement/ClientPCOperate.vue')
    },
    {
        path: '/client_management/client_app_detail_modify',
        name: 'ClientAppDetailModify',
        component: () => import('../components/ClientManagement/ClientAppDetailModify.vue')
    },
    {
        path: '/result_report',
        component: () => import('../components/ResultReport/Index.vue'),
        children: [
            {
                path: '',
                name: 'ResultReport',
                redirect: 'result_app',
            },
            {
                path: 'result_pc',
                name: 'ResultReportPC',
                component: () => import('../components/ResultReport/ResultPC.vue')
            },
            {
                path: 'result_app',
                name: 'ResultReportAPP',
                component: () => import('../components/ResultReport/ResultApp.vue')
            },
        ]
    },
    {
        path: '/system_config/app_probe',
        name: 'SystemConfigAppProbe',
        component: () => import('../components/SystemConfig/AppProbe.vue')
    },
    {
        path: '/system_config/add_probe_app',
        name: 'AddProbeApp',
        component: () => import('../components/SystemConfig/AddProbeApp.vue')
    },
    {
        path: '/system_config/app_crawl',
        name: 'SystemConfigAppCrawl',
        component: () => import('../components/SystemConfig/AppCrawl.vue')
    },
    {
        path: '/system_config/app_crawl_config',
        name: 'AppCrawlConfig',
        component: () => import('../components/SystemConfig/AppCrawlConfig.vue')
    },
    {
        path: '/system_config/update_crawl_app',
        name: 'UpdateCrawlApp',
        component: () => import('../components/SystemConfig/UpdateCrawlApp.vue')
    },
    {
        path: '/system_config/app_account',
        name: 'SystemConfigAppAccount',
        component: () => import('../components/SystemConfig/AppAccount.vue')
    },
    {
        path: '/system_config/add_app_account',
        name: 'AddAppAccount',
        component: () => import('../components/SystemConfig/AddAppAccount.vue')
    },
    {
        path: '/system_config/apk_manage',
        name: 'SystemConfigApkManage',
        component: () => import('../components/SystemConfig/ApkManage.vue')
    },
    {
        path: '/system_config/add_apk_manage',
        name: 'AddApkManage',
        component: () => import('../components/SystemConfig/AddApkManage.vue')
    },
    {
        path: '/property_info/property_manage',
        name: 'PropertyManagement',
        component: () => import('../components/PropertyManagement/Index.vue')
    },
    {
        path: '/property_info/property_xq',
        name: 'PropertyXq',
        component: () => import('../components/PropertyManagement/PropertyXq.vue')
    },
    {
        path: '/ystask_management/index',
        name: 'YsTaskManagement',
        component: () => import('../components/YsTaskManagement/Index.vue')
    },
    {
        path: '/ystaskmanagement/ystaskxq',
        name: 'YsTaskxq',
        component: () => import('../components/YsTaskManagement/YsTaskxq.vue')
    },
    {
        path: '/sbManagement/zjManagement',
        name: 'zjManagement',
        component: () => import('../components/sbManagement/zjManagement.vue')
    },
    {
        path: '/zhManagement/tjfx',
        name: 'tjfx',
        component: () => import('../components/zhManagement/tjfx.vue')
    },
    {
        path: '/zhManagement/ycjc',
        name: 'ycjc',
        component: () => import('../components/zhManagement/ycjc.vue')
    },
    // {
    //   path: '/task_management/result_query',
    //   name: 'ResultQuery',
    //   component: () => import('../components/TaskManagement/ResultQuery.vue')
    // },

]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
