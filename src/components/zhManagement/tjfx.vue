<template>
  <div id="task-index" class="el-main grid-content">
    <!-- 统计分析 -->
    <el-row  v-loading.fullscreen.lock="loading">
      <el-col :span="6">
        <div class="shadow-div" style="padding-bottom: 15px;width: calc(100% - 110px);">
          <div>
            <span style="color:#83849f">单位数量：</span> <br>
            <span style="font-size: 28px;">{{ 1129 }}</span>
          </div>
          <div style="color:#83849f;margin: 18px 0 20px 0;">
            <span>周同比</span>
            <i class="el-icon-caret-top" style="color:greenyellow"></i>
            <span style="margin:0 8px;">12%</span>
            <span>日环比</span>
            <i class="el-icon-caret-bottom" style="color:red"></i>
            <span style="margin:0 8px;">11%</span>
          </div>
          <el-divider></el-divider>
          <div>日增加的单位数量</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="shadow-div" style="padding-bottom: 15px;width: calc(100% - 110px);">
          <div>
            <span style="color:#83849f">信息系统数量：</span> <br>
            <span style="font-size: 28px;">{{ 2719 }}</span>
          </div>
          <div style="color:#83849f;margin: 18px 0 20px 0;">
            <span>周同比</span>
            <i class="el-icon-caret-top" style="color:greenyellow"></i>
            <span style="margin:0 8px;">3%</span>
            <span>日环比</span>
            <i class="el-icon-caret-bottom" style="color:red"></i>
            <span style="margin:0 8px;">2%</span>
          </div>
          <el-divider></el-divider>
          <div>日增加的信息系统数量</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="shadow-div" style="padding-bottom: 15px;width: calc(100% - 110px);">
          <div>
            <span style="color:#83849f">域名数量：</span> <br>
            <span style="font-size: 28px;">{{ 2413 }}</span>
          </div>
          <div style="color:#83849f;margin: 18px 0 20px 0;">
            <span>周同比</span>
            <i class="el-icon-caret-top" style="color:greenyellow"></i>
            <span style="margin:0 8px;">22%</span>
            <span>日环比</span>
            <i class="el-icon-caret-bottom" style="color:greenyellow"></i>
            <span style="margin:0 8px;">11%</span>
          </div>
          <el-divider></el-divider>
          <div>日增加的域名数量</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="shadow-div" style="padding-bottom: 15px;width: calc(100% - 110px);">
          <div>
            <span style="color:#83849f">IP数量：</span> <br>
            <span style="font-size: 28px;">{{ 4521 }}</span>
          </div>
          <div style="color:#83849f;margin: 18px 0 20px 0;">
            <span>周同比</span>
            <i class="el-icon-caret-top" style="color:red"></i>
            <span style="margin:0 8px;">5%</span>
            <span>日环比</span>
            <i class="el-icon-caret-bottom" style="color:greenyellow"></i>
            <span style="margin:0 8px;">9%</span>
          </div>
          <el-divider></el-divider>
          <div>日增加的IP数量</div>
        </div>
      </el-col>
    </el-row>
    <div class="shadow-div" style="margin-top: 25px;width: calc(100% - 110px);">
      <span class="my-title">资产增长趋势</span>
      <div id="myBarChart" style="width:100%;height: 250px;"></div>
    </div>
    <el-row>
      <el-col :span="12">
        <div class="shadow-div" style="margin-top: 25px;width: calc(100% - 110px);height: 283px;">
          <span class="my-title">资产排名</span><br>
          <div v-for="(item, index) in zcData" :key="index" class="item" style="transform: translateY(8px);">
            <div :class="{ 'circle-number': index < 3, 'square-number': index >= 3 }">
              {{ index + 1 }}
            </div>
            <span>{{ item.k }}</span>
            <span style="float: right;">{{ item.v }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="shadow-div" style="margin-top: 25px;width: calc(100% - 110px);">
          <span class="my-title">系统服务类型占比</span><br>
          <div id="myPieChart" style="width:100%;height: 250px;"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import "@/assets/css/query-form-style.css";
import "@/assets/css/breadcrumb-tabs-style.css";
export default {
  name: "tjfx",
  mounted() {
    this.initChart()
    this.initChart2()
  },
  data() {
    return {
      zcData: [
        { k: '大数据中心', v: '100' },
        { k: '天津市公安局', v: '24' },
        { k: '渤海银行股份有限公司', v: '21' },
        { k: '天津银行股份有限公司', v: '17' },
        { k: '天津农村商业银行股份有限公司', v: '15' },
        { k: '天津大学', v: '10' },
        { k: '南开大学', v: '9' },
      ],
      loading: true
    }
  },
  methods: {
    initChart() {
      let barChart = this.$echarts.init(document.getElementById("myBarChart"));
      let options = {
        grid: {
          top: "19%",
          left: "3%",
          right: '3%',
          bottom: '10%'
        },
        color: ['#3ba1ff'],
        xAxis: {
          type: 'category',
          data: ['6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月'],
          // name: '日期'
        },
        yAxis: {
          type: 'value',
          // name: '通联次数'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130, 198, 106, 233, 68, 91],
            type: 'bar'
          }
        ]
      };
      barChart & barChart.setOption(options);
    },
    initChart2() {
      let pieChart = this.$echarts.init(document.getElementById("myPieChart"));
      let options = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical', // 设置图例垂直显示
          right: '5%', // 调整图例位置到右侧
          top: 'center', // 设置图例居中
          formatter: function (name) {
            // 自定义图例的显示内容，这里显示名称和对应数值或占比
            var data = options.series[0].data; // 获取数据
            var total = 0;
            for (var i = 0; i < data.length; i++) {
              total += data[i].value; // 计算总数
            }
            for (var j = 0; j < data.length; j++) {
              if (data[j].name === name) {
                // 找到对应的数据项
                return name + ' : ' + data[j].value + ' (' + ((data[j].value / total) * 100).toFixed(2) + '%)';
              }
            }
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            center: ['30%', '50%'], 
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'HTTP' },
              { value: 324, name: 'HTTPS' },
              { value: 19, name: 'SSH' },
              { value: 15, name: 'FTP' },
              { value: 9, name: 'Mysql' }
            ]
          }
        ]
      }
      pieChart & pieChart.setOption(options);
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
.el-divider--horizontal {
  margin: 10px 0;
}

.shadow-div {
  box-shadow: 0 0 8px #cecece;
  padding: 20px 20px 0 20px;
  float: right;
  // width: calc(100% - 110px);
  background-color: #fff;
  position: relative;
}

.my-title {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
  // width: 200px;
  transform: translateX(-1px);
}

.circle-number {
  display: inline-block;
  font-size: 12px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  background-color: black;
  color: white;
  margin-right: 10px;
}

.square-number {
  display: inline-block;
  font-size: 12px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  background-color: #afb0b0;
  color: black;
  margin-right: 10px;
}

.item {
  margin-bottom: 10px;
}
</style>