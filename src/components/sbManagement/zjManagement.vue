<template>
  <div>

      <div style="transform: translateX(90px);width: calc(100% - 110px);" v-loading.fullscreen.lock="loading">
        <el-row :gutter="20">
          <el-col :span="6">
            <div style="box-shadow: 0 0 8px #cecece;margin-top:18px">
              <el-row>
                <el-col :span="10">
                  <div class="col-first-div" style="text-align: center;">
                    <i class="el-icon-monitor span-text-color" style="font-size:40px;margin: 18px 0;"></i><br>
                    <span>系统状态</span>
                  </div>
                </el-col>
                <el-col :span="14">
                  <div class="col-second-div" style="text-align: center;">
                    <div style="margin: 18px 0 16px 0;"><span>异常设备</span><span
                        style="font-size: 24px;margin: 0 8px;">0</span><span>(台)</span></div>
                    <div style="margin-bottom: 18px"><span>正常设备</span><span
                        style="font-size: 24px;margin: 0 8px;">2</span><span>(台)</span></div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="box-shadow: 0 0 8px #cecece;margin-top:18px">
              <el-row>
                <el-col :span="10">
                  <div class="col-first-div" style="text-align: center;">
                    <i class="el-icon-share span-text-color" style="font-size:40px;margin: 18px 0;"></i><br>
                    <span>事件规则</span>
                  </div>
                </el-col>
                <el-col :span="14">
                  <div class="col-second-div" style="text-align: center;">
                    <div style="margin: 18px 0 16px 0;"><span>自定义</span><span
                        style="font-size: 24px;margin: 0 8px;">0</span><span>(条)</span></div>
                    <div style="margin-bottom: 18px"><span>默认</span><span
                        style="font-size: 24px;margin: 0 8px;">17</span><span>(条)</span></div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="box-shadow: 0 0 8px #cecece;margin-top:18px">
              <el-row>
                <el-col :span="10">
                  <div class="col-first-div" style="text-align: center;">
                    <i class="el-icon-price-tag span-text-color" style="font-size:40px;margin: 18px 0;"></i><br>
                    <span style="display: inline-block; margin-bottom: 18px;">资产配置</span>
                  </div>
                </el-col>
                <el-col :span="14">
                  <div class="col-second-div" style="text-align: center;">
                    <div style="margin: 36px 0 16px 0;"><span>资产组</span><span
                        style="font-size: 24px;margin: 0 8px;">1</span><span>(个)</span></div>
                    <!-- <div style="margin-bottom: 18px"><span>正常设备</span><span style="font-size: 24px;margin: 0 8px;">2</span><span>(台)</span></div> -->
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="box-shadow: 0 0 8px #cecece;margin-top:18px">
              <el-row>
                <el-col :span="10">
                  <div class="col-first-div" style="text-align: center;">
                    <i class="el-icon-user span-text-color" style="font-size:40px;margin: 18px 0;"></i><br>
                    <span>用户管理</span>
                  </div>
                </el-col>
                <el-col :span="14">
                  <div class="col-second-div" style="text-align: center;">
                    <div style="margin: 18px 0 16px 0;"><span>锁定用户</span><span
                        style="font-size: 24px;margin: 0 8px;">1</span><span>(位)</span></div>
                    <div style="margin-bottom: 18px"><span>正常用户</span><span
                        style="font-size: 24px;margin: 0 8px;">2</span><span>(位)</span></div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <div class="my-title" style="margin:20px 0 20px 26px;">系统状态</div>
        <el-timeline>
          <el-timeline-item timestamp="采集节点" placement="top">
            <el-card>
              <h4><span style="width: 154px;display: inline-block;margin-bottom: 6px;">状态 :</span><span
                  style="color:#2251f7">运行正常</span></h4>
              <p><span>磁盘(/) :</span> 13%</p>
              <p><span>磁盘(/home) :</span> 9%</p>
              <p><span>ssh :</span> <el-switch v-model="value1"></el-switch> </p>
              <p><span>采集器 :</span> <el-switch v-model="value2"></el-switch> </p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="分析节点" placement="top">
            <el-card>
              <h4><span style="width: 154px;display: inline-block;margin-bottom: 6px;">状态 :</span><span
                  style="color:#2251f7">运行正常</span></h4>
              <p><span>磁盘(/) :</span> 13%</p>
              <p><span>磁盘(/home) :</span> 9%</p>
              <p><span>ssh :</span> <el-switch v-model="value3"></el-switch> </p>
              <p><span>http :</span> 开启中...</p>
              <p><span>采集器 :</span> <el-switch v-model="value4"></el-switch> </p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="管理节点" placement="top">
            <el-card>
              <h4><span style="width: 154px;display: inline-block;margin-bottom: 6px;">状态 :</span><span
                  style="color:#2251f7">运行正常</span></h4>
              <p><span>磁盘(/) :</span> 13%</p>
              <p><span>磁盘(/home) :</span> 9%</p>
              <p><span>ssh :</span> <el-switch v-model="value5"></el-switch> </p>
              <p><span>采集器 :</span> <el-switch v-model="value6"></el-switch> </p>
            </el-card>
          </el-timeline-item>
        </el-timeline>

      </div>
  </div>
</template>
<script>
// import "@/assets/css/query-form-style.css";
// import "@/assets/css/breadcrumb-tabs-style.css";
export default {
  name: "zjManagement",
  data() {
    return {
      value1: true,
      value2: true,
      value3: true,
      value4: true,
      value5: true,
      value6: true,
      loading: true
    }
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false; // 1秒后将 loading 设置为 false，显示内容
    }, 1000);
  }
}
</script>
<style lang="less" scoped>
:deep(.el-timeline-item__timestamp) {
  color: #002267;
}

p>span {
  display: inline-block;
  margin: 6px 0;
  width: 150px;
}

.my-title {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
  // width: 200px;
  transform: translateX(-1px);
}

.col-first-div {
  text-align: center;
}

.col-second-div {
  text-align: center;
}

.col-second-div span:nth-child(odd) {
  color: #83849f;
}

.span-text-color {
  color: #83849f;

}

.shadow-div {
  box-shadow: 0 0 8px #cecece;
  padding: 20px 20px 0 20px;
  float: right;
  width: calc(100% - 110px);
  background-color: #fff;
  position: relative;
}
</style>
