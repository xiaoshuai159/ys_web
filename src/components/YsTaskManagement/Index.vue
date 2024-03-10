<template>
    <div id="task-index" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/ystask_management' }"  style="font-size: 19px;font-weight:600;">任务管理</el-breadcrumb-item>
    </el-breadcrumb>
    <YsTaskList></YsTaskList>
  </div>
</template>
<script>
import YsTaskList from "./YsTaskList.vue";
import "@/assets/css/breadcrumb-tabs-style.css"
export default {
    name: "YsTaskManagement",
    components: {
        YsTaskList
    },
    data(){
        return {};
    },
}
</script>
<style lang="less" scoped>
</style>