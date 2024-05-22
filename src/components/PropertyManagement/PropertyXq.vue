<template>
  <div id="task-index" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item style="font-size: 19px;font-weight:600;">资产详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="my-button" style="transform: translate(20px,-20px);" @click="goBack">返回</div>
    <span style="display: inline-block;transform: translate(60px,-19px);color:#666666">当前单位：<span>{{ row.org_name
        }}</span></span>
    <!-- <div class="my-button" style="float: right;transform: translateY(-6px);" @click="Output">导出</div> -->
    <!-- 任务列表 -->
    <div class="shadow-div" style="padding-bottom: 15px;">

      <div class="my-main">
        <span class="my-title">单位基本信息</span>
        <!-- <div class="my-button" @click="openUnit">修改</div> -->
        <el-row>
          <el-col :span="8">
            <div>
              <span>单位名称：</span>
              <span>{{ row.org_name }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <span>单位类型：</span>
              <span>{{ row.org_type }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <span>单位行业：</span>
              <span>{{ row.org_industry }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div>
              <span>单位所属区：</span>
              <span>{{ row.org_region }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <span>备注：</span>
              <span>{{ row.bz }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <div class="my-main">
        <span class="my-title">单位拓展信息</span>
        <el-row>
          <el-col :span="24">
            <div>
              <span>所属上级单位：</span>
              <span>{{ row.higher_ups }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <el-divider></el-divider>
        <div>
            <span class="my-title">系统信息</span>
        </div>
        <div style="margin-top: 10px;">
          <el-table v-loading="tableDataLoading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading"
            element-loading-background="#f5f7f9" tooltip-effect="dark" :data="tableData.slice(
                      (currentPage - 1) * pageSize,
                      currentPage * pageSize
                    )" ref="taskTable"
            :row-style="{ height: '60px' }" @selection-change="handleSelectionChange">
            <el-table-column type="expand" width="28">
              <template slot-scope="scope">
                <div class="my-main">
                  <el-row>
                    <el-col :span="8"><div><span>IP：</span><span>{{ scope.row.ip }}</span></div></el-col>
                    <el-col :span="8"><div><span>开放端口/服务：</span><span>{{ scope.row.port }}</span></div></el-col>
                    <el-col :span="8"><div><span>服务指纹：</span><span>{{ scope.row.fwzw }}</span></div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8"><div><span>云厂商信息：</span><span>{{ scope.row.cloud_server }}</span></div></el-col>
                    <el-col :span="8"><div><span>ICP备案信息：</span><span>{{ scope.row.record_num }}</span></div></el-col>
                    <el-col :span="8"><div><span>地理位置：</span><span>{{ scope.row.dlwz }}</span></div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8"><div><span>网站标题：</span><span>{{ scope.row.wzbt }}</span></div></el-col>
                    <el-col :span="8"><div><span>更新时间：</span><span>{{ scope.row.updated }}</span></div></el-col>
                    <el-col :span="8"><div><span>录入时间：</span><span>{{ scope.row.created }}</span></div></el-col>
                  </el-row>
                </div>
              </template>
</el-table-column>
<el-table-column type="index" label="序号" width="45" fixed="left"></el-table-column>
<el-table-column prop="dwmc" label="系统名称" :show-overflow-tooltip="true"
  :width="flexWidth('dwmc', tableData, '系统名称')"></el-table-column>
<el-table-column prop="kfdk" label="端口/服务" :show-overflow-tooltip="true"
  :width="flexWidth('xxmc', tableData, '端口/服务')"></el-table-column>
<el-table-column prop="url" label="域名地址" :show-overflow-tooltip="true"
  :width="flexWidth('url', tableData, '域名地址')"></el-table-column>
<el-table-column prop="bdymsl" label="系统绑定IP数" :show-overflow-tooltip="true"
  :width="flexWidth('bdymsl', tableData, '系统绑定IP数')"></el-table-column>
<el-table-column prop="bah" label="备案号" :show-overflow-tooltip="true"
  :width="flexWidth('bah', tableData, '备案号')"></el-table-column>
<el-table-column prop="fws" label="所属服务商" :show-overflow-tooltip="true"
  :width="flexWidth('fws', tableData, '所属服务商')"></el-table-column>

</el-table>
<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
  :page-size="pageSize" layout="total, prev, pager, next" :total="tableData.length"
  style="float: right; margin-top: 16px">
</el-pagination>
</div> -->
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
  name: "PropertyXq",
  data() {
    return {
      dayjs: dayjs,
      row: {
        org_name:"",
        org_type:"",
        org_industry:"",
        org_region:"",
        higher_ups:""
      },
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
        //   {
        //   org_name:'',
        //   org_type:'',
        //   org_industry:'',
        //   org_region:''
        // }
      ], //表格数据初始化
      currentPage: 1, //当前页码
      pageSize: 10, //每页最大条数
      taskTotal: 0, //实际数据总条数
      tableDataLoading: false, // 表格加载动画
      multipleSelection: [],   //多选数组
      ids: "",                  //id串
      zcIP: "",
      zcDomain: "",
    };
  },
  created() {
    // const {from} = this.$route.query
    // console.log(from);
    // if(from == '/property_info/property_manage'){
    //   console.log("来自于资产管理");
    //   console.log(JSON.parse(localStorage.getItem("zcrow")));
    //   console.log(this.$route.query.row);
    //   this.tableData[0] = this.row = JSON.parse(localStorage.getItem("zcrow"))
    // }else if(from == '/ystaskmanagement/ystaskxq'){
    //   console.log("来自于任务详情");
    //   this.zcIP = JSON.parse(localStorage.getItem("zcIP"))
    //   this.getIpAPI(this.zcIP)
    // }



  },
  mounted() {
    // this.tableData[0] = this.row = JSON.parse(localStorage.getItem("zcrow"))
    // console.log(localStorage.getItem("zcIP"));
    // console.log(localStorage.getItem("zcDomain"));
    if (localStorage.getItem("zcIP")) {
      this.zcIP = JSON.parse(localStorage.getItem("zcIP"))
      this.getIpAPI(this.zcIP)
    }else if(localStorage.getItem("zcDomain")){
      this.zcDomain = JSON.parse(localStorage.getItem("zcDomain"))
      this.getDomainAPI(this.zcDomain)
    }

  },
  // destroyed() {
  //   window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
  // },
  methods: {
    async getIpAPI(ip) {
      const { data: res } = await this.$http.get(
        "/ip-org-list",
        {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            ip: ip
          }
        })
      console.log(res);
      if (res.code == 200) {
        console.log(res.data);
        const { org_name, org_type, org_industry, org_region,higher_ups } = res.data[0]
        console.log(org_name, org_type, org_industry, org_region);
        this.row.org_name = org_name
        this.row.org_type = org_type
        this.row.org_industry = org_industry
        this.row.org_region = org_region
        this.row.higher_ups = higher_ups
      }
    },
    async getDomainAPI(domain) {
      const { data: res } = await this.$http.get(
        "/ip-org-list",
        {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            domain: domain
          }
        })
      if (res.code == 200) {
        console.log(res.data[0]);
        const { org_name, org_type, org_industry, org_region,higher_ups } = res.data[0]
        console.log(org_name, org_type, org_industry, org_region); 
        this.row.org_name = org_name
        this.row.org_type = org_type
        this.row.org_industry = org_industry
        this.row.org_region = org_region
        this.row.higher_ups = higher_ups
      }
    },
    goBack() {
      const { from } = this.$route.query
      console.log(from);
      // this.$router.push({
      //     path: '/property_info/property_manage',
      // });
      if (from == '/property_info/property_manage') {
        this.$router.push({
          path: '/property_info/property_manage',
        });
      } else if (from == '/ystaskmanagement/ystaskxq') {
        this.$router.push({
          path: '/ystaskmanagement/ystaskxq',
        });
      }
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
    goResult(row) {
      // console.log(row);
      let path = '/property_info/property_xq';
      this.$router.push({
        path: path,
        query: {
          row
        },
      });
    },

    tasklist() {

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
  margin-bottom: 10px;
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