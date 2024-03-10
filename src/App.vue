<template>
  <div id="app">
    <Header v-if="showHeader"></Header>
    <div>
      <LeftNav  v-if="showLeftNav" style="float: left;"></LeftNav>
      <router-view :class="{'box-view': active}"></router-view>
    </div>
  </div>
</template>
<script>
import "@/assets/css/font-awesome.min.css";
import "@/assets/css/style.css";
import Header from "@/views/Header.vue";
import LeftNav from "@/views/LeftNav.vue";
// import { getToken, getUserToken } from "@/api/home"
import store from "@/store"
export default {
  data() {
    return {
      userToken: '',
      showHeader: true,
      showLeftNav: true,
    }
  },
  computed: {
    active() {
      // 获取当前路由路径
      // const currentPath = this.$route.path;
      
      // // 判断是否是登录页
      // if (currentPath === '/login') {
      //   // 如果是登录页，则不显示 Header 和 LeftNav
      //   this.showHeader = false;
      //   this.showLeftNav = false;
      // } else {
      //   // 其他页面正常显示 Header 和 LeftNav
      //   this.showHeader = true;
      //   this.showLeftNav = true;
      // }

      return false; // 这里返回一个假值示例，您可以根据需要修改
    },
  },
  // created() {
  //   getToken({payload: 123456}).then(res => {
  //     if(res.code === 200) {
  //       store.commit('setToken', res.msg)
  //     }
  //   })
  //   getUserToken({password: 'at@123456', userName: 'admin'}).then(res => {
  //     if(res.code === 200) {
  //       localStorage.setItem('userToken', res.data)
  //     }
  //   })
  // },
  created() {
    this.$router.beforeResolve((to, from, next) => {
      // 根据路由的 meta 字段判断是否显示 Header 和 LeftNav
      this.showHeader = !(to.meta.showHeader === false);
      this.showLeftNav = !(to.meta.showLeftNav === false);
      next();
    });
  },
  components: {
    Header,
    LeftNav
  },
  computed: {
    active() {
      return !this.$store.state.collapseState
    }
  },
}
</script>
<style lang="less">
.box-view {
  margin-left: 140px;
}
body{
  margin: 0px !important;
  min-width: 1200px;
  overflow-x: scroll;
  background: #F7F9FC;
}
</style>
