<template>
  <div id="task-index" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item style="font-size: 19px;font-weight:600;">异常监测</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="task-list"  v-loading.fullscreen.lock="loading">
      <div class="shadow-div">

        <el-form ref="taskForm" :inline="true" :model="taskForm">
          <el-row>
            <el-col :span="9">
              <el-form-item prop="sjID">
                <el-input v-model="taskForm.sjID">
                  <template slot="prepend">事件ID</template>
                </el-input>
              </el-form-item>

            </el-col>
            <el-col :span="9">
              <el-form-item prop="sjjb">
                <el-input v-model="taskForm.sjjb">
                  <template slot="prepend">事件级别</template>
                </el-input>
              </el-form-item>

            </el-col>
            <el-col :span="6">
              <div style="text-align: right;">
                <el-button type="primary" @click="searchForm()">查询</el-button>
                <el-button type="info" @click="resetForm()">清空</el-button>
                <a style="margin-left: 8px;cursor: pointer; color:#1675d5" @click="toggleAdvanced">
                  {{ isCollapse ? '收起' : '展开' }}
                  <i :class="isCollapse ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
                </a>
              </div>
            </el-col>
          </el-row>
          <el-collapse-transition>
            <div v-show="isCollapse">
              <el-row class="collapse-transition">
                <el-col :span="9">
                  <el-form-item prop="lyIP">
                    <el-input v-model="taskForm.lyIP">
                      <template slot="prepend">来源IP</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item prop="mdIP">
                    <el-input v-model="taskForm.mdIP">
                      <template slot="prepend">目的IP</template>
                    </el-input>
                  </el-form-item>
                  <!-- <el-form-item prop="org_type">
              <div class="el-input-group__prepend" style="display: inline-block;transform: translateY(-1px);">单位类型</div>
              <el-select v-model="taskForm.org_type" clearable>
                <el-option
                v-for="item in orgtypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item> -->
                </el-col>
              </el-row>
              <el-row class="collapse-transition">

                <el-col :span="9">
                  <el-form-item label="发生时间" prop="taskTime">
                    <el-date-picker v-model="taskForm.start_create_time" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                      width="10vw" value-format="yyyy-MM-dd HH:mm:ss" placement="bottom-start" placeholder="开始时间"
                      class="input-time">
                    </el-date-picker>
                    <span class="split">至</span>
                    <el-date-picker v-model="taskForm.end_create_time" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                      width="10vw" value-format="yyyy-MM-dd HH:mm:ss" placement="bottom-start" placeholder="结束时间"
                      class="input-time">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="9">

                  <el-form-item prop="cxsj">
                    <div class="el-input-group__prepend" style="display: inline-block;transform: translateY(-1px);">持续时间
                    </div>
                    <el-select v-model="taskForm.cxsj" clearable>
                      <el-option v-for="item in cxsjOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
        </el-form>

      </div>
      <!-- 批量操作按钮 -->
      <div style="margin: 15px 0; float: right;width: calc(100% - 70px);">
        <!-- <a class="batch-opt" @click="plOutput">
          <i class="el-icon-document"></i>
          <span class="l10 grey" style="cursor: pointer">导出</span>
        </a> -->
        <el-button type="primary" @click="refresh()">刷新</el-button>
      </div>
    </div>
    <div class="shadow-div" style="padding-bottom: 15px;">
      <div class="base_table">
        <el-table v-loading="tableDataLoading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="#f5f7f9" tooltip-effect="dark" :data="tableData" :row-style="{ height: '60px' }"
          @selection-change="handleSelectionChange">
          <!-- :data="filtersTableData.slice(
                      (currentPage - 1) * pageSize,
                      currentPage * pageSize
                    )" ref="taskTable" -->
          <el-table-column type="selection" width="25" fixed="left"> </el-table-column>
          <!-- <el-table-column prop="id" label="序号" width="70" fixed="left"></el-table-column> -->
          <el-table-column prop="lyIP" label="来源IP" :show-overflow-tooltip="true"
            :width="flexWidth('lyIP', tableData, '来源IP')"></el-table-column>
          <el-table-column prop="mdIP" label="目的IP" :show-overflow-tooltip="true"
            :width="flexWidth('mdIP', tableData, '目的IP')"></el-table-column>
          <el-table-column prop="sjjb" label="事件级别" :show-overflow-tooltip="true"
            :width="flexWidth('sjjb', tableData, '事件级别')"></el-table-column>
          <el-table-column prop="fssj" label="发生时间" :show-overflow-tooltip="true"
            :width="flexWidth('fssj', tableData, '发生时间')">
            <template slot-scope="scope">
              <div>
                {{ dayjs(scope.row.fssj).format("YYYY-MM-DD HH:mm:ss") }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="cxsc" label="持续时长" :show-overflow-tooltip="true"
            :width="flexWidth('cxsc', tableData, '持续时长')"></el-table-column>
          <!-- <el-table-column prop="updated" label="更新时间" :show-overflow-tooltip="true" :width="170">
            <template slot-scope="scope">
              <div>
                {{ dayjs(scope.row.updated).format("YYYY-MM-DD HH:mm:ss") }}
              </div>
            </template>
          </el-table-column> -->
          <!-- <el-table-column type="index" label="序号" width="45" fixed="left"></el-table-column>
          <el-table-column prop="dwmc" label="单位名称" :show-overflow-tooltip="true" :width="200"></el-table-column>
          <el-table-column prop="IP" label="IP" :show-overflow-tooltip="true" :width="flexWidth('IP', tableData, 'IP')"></el-table-column>          
          <el-table-column prop="yyfwsl" label="应用服务数量" :show-overflow-tooltip="true" :width="flexWidth('yyfwsl', tableData, '应用服务数量')"></el-table-column>   
          <el-table-column prop="kfdksl" label="开放端口数量" :show-overflow-tooltip="true" :width="flexWidth('kfdksl', tableData, '开放端口数量')"></el-table-column>  
          <el-table-column prop="bdymsl" label="绑定域名数量" :show-overflow-tooltip="true" :width="flexWidth('bdymsl', tableData, '绑定域名数量')"></el-table-column>   
          <el-table-column prop="updatetime" label="更新时间" :show-overflow-tooltip="true" :width="flexWidth('updatetime', tableData, '更新时间')"></el-table-column>
           -->
          <el-table-column label="操作" width="140" fixed="right">
            <template slot-scope="scope">
              <el-button class="operator-table-btn blue" type="primary" size="mini"
                @click="goResult(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="pageSize" layout="total, prev, pager, next" :total="taskTotal"
          style="float: right; margin-top: 16px">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/css/query-form-style.css";
import "@/assets/css/breadcrumb-tabs-style.css";
import dayjs from 'dayjs';
export default {
  name: "PropertyManagement",
  data() {
    return {
      loading: true,
      cxsjOptions: [
        { key: "一天", value: "一天" },
        { key: "三天", value: "三天" },
        { key: "七天", value: "七天" },
      ],
      industryOptions: [
      ],
      orgtypeOptions: [],
      dayjs: dayjs,
      isCollapse: false,
      taskForm: {
        sjID: "",
        sjjb: "",
        lyIP: "",
        mdIP: "",
        fssj: "",
        cxsj: "",
        start_create_time: "",
        end_create_time: "",
        start_update_time: "",
        end_update_time: "",
        cloud_server: "",
        server: "",
        region: "",
        industry: "",
        record_num: "",
        org_type: "",
        ip: "",
        org_name: ""
      },
      tableData: [], //表格数据初始化
      filtersTableData: [],
      currentPage: 1, //当前页码
      pageSize: 10, //每页最大条数
      taskTotal: 0, //实际数据总条数
      tableDataLoading: false, // 表格加载动画
      multipleSelection: [],   //多选数组
      ids: ""                   //id串
    };
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false; // 1秒后将 loading 设置为 false，显示内容
    }, 1000);
  },
  mounted() {
    window.addEventListener("keydown", this.handleSearch);
    this.tasklist()
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
  },
  methods: {
    plOutput() {
      // console.log(this.multipleSelection);
      // console.log(this.ids);
      if (this.ids.length == 0) {
        this.$message('请勾选资产信息')
      } else {
        this.$http({
          method: 'GET',
          url: '/export-ip-org-relations',
          responseType: 'blob',
          params: { ids: this.ids },
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
      }

    },
    goResult(row) {
      console.log(row);
      let path = '/zhManagement/ycjcxq';
      localStorage.setItem("ycjcRow", JSON.stringify(row))
      // localStorage.setItem("zcIP", JSON.stringify(row.ip))
      this.$router.push({
        path: path,
        // query: {
        //   row,
        //   from: "/property_info/property_manage",
        // },
      });

    },
    // 查询接口
    async tasklist() {
      // const { data: res } = await this.$http.get(
      //   "/ip-org-list",
      //   {
      //     params: {
      //       pageNum: this.currentPage,
      //       pageSize: this.pageSize,
      //       start_create_time: this.taskForm.start_create_time,
      //       end_create_time: this.taskForm.end_create_time,
      //       start_update_time: this.taskForm.start_update_time,
      //       end_update_time: this.taskForm.end_update_time,
      //       cloud_server: this.taskForm.cloud_server,
      //       server: this.taskForm.server,
      //       region: this.taskForm.region,
      //       industry: this.taskForm.industry,
      //       record_num: this.taskForm.record_num,
      //       org_type: this.taskForm.org_type,
      //       ip: this.taskForm.ip,
      //       org_name: this.taskForm.org_name
      //     }
      //   })
      // console.log(res);
      // if (res.code == 200) {
      //   this.tableData = res.data
      //   this.taskTotal = res.total
      //   this.pageSize = res.pageSize
      // }
      this.tableData = [
        {lyIP:'111.33.173.236',mdIP:'10.134.181.53',sjjb:'高',fssj:'2024-03-19 13:20:00',cxsc:'5分钟'},
        
      ]
      this.taskTotal = 1
    },
    async refresh() {
      this.tasklist();
    },
    searchForm() {
      this.currentPage = 1;
      this.tasklist()
    },
    resetForm() {
      this.taskForm = {}
      this.tasklist()
    },
    handleSelectionChange(val) {
      console.log(val);
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
}
</script>
<style lang="less" scoped>
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