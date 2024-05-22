<template>
  <div id="task-index" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item style="font-size: 19px;font-weight:600;">任务详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="my-button" style="transform: translate(20px,-20px);" @click="goBack">返回</div>
    <!-- 任务列表 -->
    <div class="shadow-div" style="padding-bottom: 15px;">
      <!-- <div>
            <span class="my-title">系统信息</span>
        </div> -->
      <div style="margin-top: 10px;">
        <el-table v-loading="tableDataLoading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="#f5f7f9" tooltip-effect="dark" :data="tableData" ref="taskTable"
          :row-style="{ height: '60px' }" @selection-change="handleSelectionChange">
          <el-table-column type="expand" width="28">

            <template slot-scope="props">
              <div class="steps">
                <div :class="stepClass(props.row.detail.port_scan)">
                  <div class="step-icon">1</div>
                  <div class="step-label">{{ curRowTaskType === 'Domain' ? '备案查询' : '端口扫描' }}</div>
                </div>
                <div :class="stepClass(props.row.detail.jarm_hash)">
                  <div class="step-icon">2</div>
                  <div class="step-label">{{ curRowTaskType === 'Domain' ? 'DNS解析' : 'Jarm指纹' }}</div>
                </div>
                <div :class="stepClass(props.row.detail.web_info)">
                  <div class="step-icon">3</div>
                  <div class="step-label">获取网页信息</div>
                </div>
                <div :class="stepClass(props.row.detail.cyberspace)">
                  <div class="step-icon">4</div>
                  <div class="step-label">空间测绘</div>
                </div>
                <div :class="stepClass(props.row.detail.monitor)">
                  <div class="step-icon">5</div>
                  <div class="step-label">被动监测</div>
                </div>
                <div :class="stepClass(props.row.detail.cluster)">
                  <div class="step-icon">6</div>
                  <div class="step-label">聚类分析</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" width="45"></el-table-column>
          <el-table-column prop="update_time" label="时间" :show-overflow-tooltip="true"
            :width="flexWidth('update_time', tableData, '时间')"></el-table-column>
          <!-- <el-table-column prop="ip" label="ip" :show-overflow-tooltip="true"
            :width="flexWidth('ip', tableData, 'ip')"></el-table-column> -->
          <el-table-column prop="ip" label="IP" :show-overflow-tooltip="true" :width="flexWidth('ip', tableData, 'ip')"
            v-if="isIPColumn"></el-table-column>
          <el-table-column prop="domain" label="Domain" :show-overflow-tooltip="true"
            :width="flexWidth('domain', tableData, 'domain')" v-if="!isIPColumn"></el-table-column>
          <el-table-column prop="status" label="状态" :show-overflow-tooltip="true"
            :width="flexWidth('status', tableData, '状态')">
            <template slot-scope="scope">
              <div v-if="scope.row.status == true">
                完成
              </div>
              <div v-else-if="scope.row.status == false">
                进行中
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="hs" label="耗时" :show-overflow-tooltip="true" :width="flexWidth('hs', tableData, '耗时')">
            </el-table-column> -->
          <!-- <el-table-column prop="result" label="结果" :show-overflow-tooltip="true" :width="flexWidth('result', tableData, '结果')">
              <template slot-scope="scope">
                <div v-if="scope.row.result == true">
                  成功
                </div>
                <div v-else-if="scope.row.result == false">
                  失败
                </div>
              </template>
            </el-table-column> -->
          <el-table-column label="查看" width="100">
            <template slot-scope="scope">
              <el-button class="operator-table-btn blue" size="mini" @click="xq(scope.row)"
                style="padding-right: 10px;">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="pageSize" layout="total, prev, pager, next" :total="taskTotal"
          style="float: right; margin-top: 16px">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="ICP备案主体信息" :visible.sync="icpVisible" width="31%">
      <!-- <el-form-item label="备案/许可证号："  >
          <el-input
            v-model="icpDialog.dialog_baxkzh"
            placeholder="请输入备案/许可证号"
          ></el-input>
        </el-form-item> -->
      <div style="margin-bottom: 8px;">
        <span style="display: inline-block;width: 120px;text-align: right;">备案/许可证号：</span>
        <el-input v-model="icpVisible.dialog_baxkzh" style="width: 100px;"></el-input>
      </div>
      <div style="margin-bottom: 8px;">
        <span style="display: inline-block;width: 120px;text-align: right;">审核通过日期：</span>
        <el-input v-model="icpVisible.dialog_shtgrq" style="width: 100px;"></el-input>
      </div>
      <div style="margin-bottom: 8px;">
        <span style="display: inline-block;width: 120px;text-align: right;">主办单位名称：</span>
        <el-input v-model="icpVisible.dialog_zbdwmc" style="width: 100px;"></el-input>
      </div>
      <div style="margin-bottom: 8px;">
        <span style="display: inline-block;width: 120px;text-align: right;">主办单位性质：</span>
        <el-input v-model="icpVisible.dialog_zbdwxz" style="width: 100px;"></el-input>
      </div>
      <div>
        <span style="display: inline-block;width: 120px;text-align: right;">网站域名：</span>
        <el-input v-model="icpVisible.dialog_wzym" style="width: 100px;"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="my-button" @click="xiaoyan">确 定</div>
      </span>
    </el-dialog>
    <el-dialog title="单位基本信息" :visible.sync="unitVisible">

    </el-dialog>
  </div>

</template>
<script>
import "@/assets/css/query-form-style.css";
import "@/assets/css/breadcrumb-tabs-style.css";
import dayjs from 'dayjs';
export default {
  name: "YsTaskxq",
  data() {
    return {
      status: {
        port_scan: 1,
        jarm_hash: 2,
        web_info: 0,
        cyberspace: 0,
        monitor: 2,
        cluster: 1
      },
      error: "",
      dayjs: dayjs,
      row: null,
      icpDialog: {
        dialog_baxkzh: null,
        dialog_shtgrq: null,
        dialog_zbdwmc: null,
        dialog_zbdwxz: null,
        dialog_wzym: null,
      },

      icpVisible: false,
      unitVisible: false,
      isCollapse: false,
      taskForm: {
        taskId: "",
        taskName: "",
        taskTag: "",
        sTime: "",
        eTime: "",
        createUser: "",
        taskType: "全部",
        nodeType: "2",
        priority: "全部",
      },
      tableData: [
        // {
        // num:1,
        // xxmc:2,
        // ymdz:3,
        // xtbdips:4,
        // gsdw:5,
        // xtbswz:6
        // }
      ], //表格数据初始化
      currentPage: 1, //当前页码
      pageSize: 10, //每页最大条数
      taskTotal: 0, //实际数据总条数
      tableDataLoading: false, // 表格加载动画
      multipleSelection: [],   //多选数组
      ids: "",                  //id串
      rowId: "",
      curRowTaskType: "",
      isIPColumn: false
    };
  },

  created() {
    this.rowId = JSON.parse(localStorage.getItem("rowId"))
    this.curRowTaskType = JSON.parse(localStorage.getItem("curRowTaskType"))
    console.log(this.rowId);
    this.getXqAPI(this.rowId)
    // localStorage.getItem("row")
    // console.log(JSON.parse(localStorage.getItem("row"))); 
    // this.row = JSON.parse(localStorage.getItem("row"))
    // this.tableData = this.row.xq
  },
  mounted() {
    
    
    window.addEventListener("keydown", this.handleSearch);
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
  },
  methods: {
    async getXqAPI(rowId) {

        const { data: res } = await this.$http.get(`/tasks/${rowId}/targets`, {
          params: {
            pageSize: this.pageSize,
            pageNum: this.currentPage
          }
        })
        console.log(res);
        if (res.code == 200) {

      // console.log( this.tableData[0]);
      // const firstRow = this.tableData[0];
      // if(firstRow.ip){
      //   this.isIPColumn = true
      // }else{
      //   this.isIPColumn = false
      // }
    
          this.tableData = res.data
        if(typeof this.tableData[0].ip == 'undefined'){
          this.isIPColumn = false
        } else{
          this.isIPColumn = true
        }
          this.taskTotal = res.total
          this.pageSize = res.pageSize
        }

    },
    stepClass(rowDetail) {
      // const step = this.steps[index];
      // const status = this.status[step.key];

      if (rowDetail == '1') {
        return "step-success";
      } else if (rowDetail == '2') {
        return "step-error";
      } else {
        return "step-pending";
      }
    },
    xq(row) {
      console.log(row);
      if(row.ip){
        localStorage.setItem("zcIP", JSON.stringify(row.ip))
      }else if(row.domain){
        localStorage.setItem("zcDomain", JSON.stringify(row.domain))
      }
      
      this.$router.push({
        path: '/property_info/property_xq',
        query: {
          from: '/ystaskmanagement/ystaskxq',
          // zcIP: ip
        }
      });
    },
    Output() {
      // console.log(this.row.id);
      this.$http({
        method: 'GET',
        url: '/export-ip-org-relations',
        responseType: 'blob',
        params: { ids: this.row.id },
      }).then((res) => {
        let that = this
        let blob = res.data
        if (blob.type == 'application/json') {
          const reader = new FileReader()

          reader.onload = function () {
            that.$message('导出文件失败')
          }
          reader.readAsText(blob)
        } else {
          console.log(res);
          // title = res.headers.get('Content-Disposition').split('filename=')[1];
          // console.log(res.headers.get('Content-Disposition').split('filename=')[1]);
          let title = "资产信息导出.csv"
          let binaryData = []
          binaryData.push(blob)
          let url = window.URL.createObjectURL(new Blob(binaryData), {
            type: 'application/vnd.ms-excel',
          })
          const aLink = document.createElement('a')
          aLink.href = url
          aLink.setAttribute('download', title)
          document.body.appendChild(aLink)
          aLink.click()
          this.$message.success('文件导出成功！')
          document.body.removeChild(aLink)
        }
      })
    },
    xiaoyan() {

    },
    quxiao() {
      this.icpVisible = false
      this.unitVisible = true
    },
    openICP() {
      this.icpVisible = true
    },
    openUnit() {
      this.unitVisible = true
    },

    goBack() {
      this.$router.push({
        path: '/ystask_management/index',
      });
    },
    tasklist() {
      this.getXqAPI(this.rowId)
    },
    searchForm() {

    },
    resetForm() {

    },
    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val;
      var str = "";
      for (var i = 0; i < this.multipleSelection.length; i++) {
        str += this.multipleSelection[i].id + ",";
      }
      //去掉最后一个逗号(如果不需要去掉，就不用写)
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
      }
      this.ids = str;
    },
    toggleAdvanced() {
      this.isCollapse = !this.isCollapse
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.tasklist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tasklist();
    },
    handleSearch(e) {
      if (e.keyCode == 13) {
        this.searchForm();
      }
    },
    //表格自适应宽度
    flexWidth(prop, tableData, title, num = 0) {
      if (tableData.length === 0) {//表格没数据不做处理
        return;
      }
      let flexWidth = 0;//初始化表格列宽
      let columnContent = '';//占位最宽的内容
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      context.font = "14px Microsoft YaHei";
      if ((prop === '') && title) {//标题长内容少的，取标题的值,
        columnContent = title
      } else {// 获取该列中占位最宽的内容
        let index = 0;
        for (let i = 0; i < tableData.length; i++) {
          const now_temp = tableData[i][prop] + '';
          const max_temp = tableData[index][prop] + '';
          const now_temp_w = context.measureText(now_temp).width
          const max_temp_w = context.measureText(max_temp).width
          if (now_temp_w > max_temp_w) {
            index = i;
          }
        }
        columnContent = tableData[index][prop]
        //比较占位最宽的值跟标题、标题为空的留出四个位置
        const column_w = context.measureText(columnContent).width
        const title_w = context.measureText(title).width
        if (column_w < title_w) {
          columnContent = title || '留四个字'
        }
      }
      // 计算最宽内容的列宽
      let width = context.measureText(columnContent);
      flexWidth = width.width + 40 + num
      return flexWidth + 'px';
    },
  }
};
</script>
<style lang="less" scoped>
// .arrow-right {
//   flex-grow: 1;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   width: 16px;
//   height: 16px;
//   border-top: 2px solid #ccc;
//   border-right: 2px solid #ccc;
//   transform: rotate(45deg);
//   margin-top: 6px;
// }
.steps {
  display: flex;
  justify-content: space-between;
  // width: 93%;
}

.step-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  // background-color: #ccc;
  border: solid 1px;
  text-align: center;
  line-height: 21px;
}

.step-label {
  margin-top: 8px;
  text-align: center;
}

.step-success {
  // background-color: green;
  color: #67c23a;
}

.step-error {
  // background-color: red;
  color: red;
}

.step-pending {
  // background-color: #ccc;
  color: #666;
}

.operator-table-btn {
  font-family: Microsoft YaHei;
  padding: 0;
  width: auto;
  height: auto;
  font-size: 14px;
  // font-size: 17px; //修改了字号
  background-color: white;
  border: none;
  border-radius: 0;
}

:deep(.el-input__inner) {
  border-radius: 4px;
}

.my-main .el-row>.el-col>div>span:nth-of-type(odd) {
  display: inline-block;
  font-size: 14px;
  margin: 8px 0;
  color: black
}

.my-main .el-row>.el-col>div>span:nth-of-type(even) {
  font-size: 14px;
  color: #666666
}

.my-main>.my-button {
  transform: translateY(-1px);
}

.my-title {
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  width: 200px;
  transform: translateX(-1px);
}

.my-button {
  display: inline-block;
  cursor: pointer;
  text-align: center;
  background: #162b5b;
  border-color: #162b5b;
  color: #ffffff;
  width: 70px;
  height: 28px;
  line-height: 27px;
  border-radius: 4px;
  font-size: 14px;
}

:deep(.el-breadcrumb) {
  display: inline-block;
}

.collapse-transition {
  transition: height 0.3s ease;
  overflow: hidden;
}

.collapse-transition-enter,
.collapse-transition-leave-active {
  height: 0;
}

:deep(.el-table__header) {
  width: 100% !important;
}

:deep(.el-table__body) {
  width: 100% !important;
}

:deep(.el-select .el-input__inner) {
  cursor: pointer;
  padding-right: 35px;
  transform: translateY(-1px);
}

:deep(.input-time > .el-input__inner) {
  padding: 0;
  width: 7.7vw;
  text-align: center;
  transform: translateY(-1px);
}

.shadow-div {
  box-shadow: 0 0 8px #cecece;
  padding: 20px 20px 0 20px;
  float: right;
  width: calc(100% - 110px);
  background-color: #fff;
  position: relative;
}

.operator-div {
  margin-bottom: 20px;
  float: right;
  width: calc(100% - 70px);
}

:deep(form.el-form.el-form--inline) {
  width: 100%;
}

:deep(.el-input-group__prepend) {
  width: 88px;
  text-align: right;
  padding: 0 8px;
}

:deep(.el-form-item__label) {
  width: 105px;
  padding: 0 8px !important;
}

:deep(.el-input__prefix, .el-input__suffix) {
  display: none;
}

:deep(input.el-input__inner) {
  // width: 305px;
  width: 17vw;
}

.input-time {
  // width: 143px;
  width: 7.7vw;
}

:deep(.input-time > .el-input__inner) {
  padding: 0;
  // width: 143px;
  width: 7.7vw;
  text-align: center;
}

:deep(.el-input--mini > .el-input__inner) {
  width: 198px;
}

:deep(.is-in-pagination > .el-input__inner) {
  width: 46px;
}

span.split {
  vertical-align: top;
  margin: 0 3px;
}

.formLine {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.formLime-item {
  flex: 1;
  width: 100%;
  margin-right: 0;
}

:deep(.el-select .el-input) {
  width: 93% !important;
}

.el-button {
  color: #ffffff;
  width: 70px;
  // width: 74px;
  height: 40px;
  // font-size: 16px !important;
  border-radius: 4px;
}

.el-button--primary {
  background: #162b5b;
  border-color: #162b5b;
}

:deep(.el-button--info) {
  color: #333333;
  background-color: white;
  border-color: #d3d4dd;
}

.batch-opt {
  font-family: Microsoft YaHei;
  font-size: 15px;
  // font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  padding: 0 12px;
}

.border-right {
  border-right: 1px solid #cecece;
}

.l10 {
  margin-left: 10px;
}

.green {
  color: #4abe86;
}

.orange {
  color: #f39300;
}

.red {
  color: #f74e57;
}

.blue {
  color: #1675d5;
}

.grey {
  color: #666666;
}

.font-bold {
  font-weight: bold;
}

.operator-table-btn {
  font-family: Microsoft YaHei;
  padding: 0;
  width: auto;
  height: auto;
  font-size: 14px;
  // font-size: 17px; //修改了字号
  background-color: white;
  border: none;
  border-radius: 0;
}

button.is-disabled,
button.is-disabled:hover {
  color: gray;
  background-color: white;
}

:deep(.cell) {
  padding: 0 5px !important;
  white-space: nowrap; //不换行
  // font-size: 17px !important;
}

:deep(.el-table) {
  font-size: 16px !important;
}

:deep(.el-table thead) {
  color: rgb(22, 43, 91);
}

:deep(.el-table .el-table__cell) {
  padding: 4px 0 !important;
}

.center-radios {
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
}

.more,
.task-name {
  color: #1675d5;
  text-decoration: underline;
  cursor: pointer;
}
</style>