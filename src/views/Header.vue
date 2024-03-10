<template>
    <div id="top" class="clearfix">
      <div class="el-header">
        <!-- 拨测系统 -->
        <a
          @click="changeCollapseState"
          class="sidebar-open-button"
          style="color: #ffffff; margin:0 20px 0 5px; cursor: pointer;">
          <i class="el-icon-s-unfold" v-if="isCollapse === true"></i>
          <i class="el-icon-s-fold" v-else></i>
        </a>
        云上服务资产归属判别平台
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    changeCollapseState() {
      this.isCollapse = !this.isCollapse
      this.$store.commit("setCollapseState", this.isCollapse);
    },
  },
};
</script>
<style lang="less" scoped>
.el-header {
  background-color: #0C172F;
  color: #FFFFFF;
  line-height: 64px;
  font-size: 20px;
  font-weight: bold;
}

</style>
