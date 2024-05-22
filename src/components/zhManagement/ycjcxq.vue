<template>
    <div id="task-index" class="el-main grid-content">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style="font-size: 19px;font-weight:600;">详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="my-button" style="transform: translate(20px,-20px);" @click="goBack">返回</div>
        <!--<span style="display: inline-block;transform: translate(60px,-19px);color:#666666">当前单位：<span>{{ row.org_name }}</span></span>
       <div class="my-button" style="float: right;transform: translateY(-6px);" @click="Output">导出</div> -->
        <!-- 任务列表 -->
        <el-row v-loading.fullscreen.lock="loading">
            <el-col :span="12">
                <div class="shadow-div" style="padding-bottom: 15px;width: calc(100% - 110px);">
                    <div style="text-align: center;">
                        <span style="color:#83849f">源IP：</span> <span class="my-title">{{ curRow.lyIP }}</span>
                    </div>
                    <el-divider></el-divider>
                    <el-empty description="暂无数据" style="height:250px"></el-empty>

                </div>
            </el-col>
            <el-col :span="12">
                <div class="shadow-div" style="padding-bottom: 15px;width: calc(100% - 110px);">
                    <div style="text-align: center;">
                        <span style="color:#83849f">目的IP：</span><span class="my-title">{{ curRow.mdIP }}</span>
                    </div>
                    <el-divider></el-divider>
                    <div class="my-main" style="height:250px;font-size: 14px;">
                        <span style="color:#83849f">端口信息：</span> <span>SSH,The Secure Shell(SSH) Protocol</span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="shadow-div" style="margin-top:20px;padding-bottom: 15px;width: calc(100% - 110px);">
            <el-row>
                <el-col :span="18">
                    <div>
                        <span class="my-title">告警行为详细时序变化</span>
                        <span style="display: inline-block; float: right; margin-right: 10%;">
                            <el-radio-group v-model="radio1" size="mini" @input="radioChange()">
                                <el-radio-button label="小时级"></el-radio-button>
                                <el-radio-button label="天级"></el-radio-button>
                                <el-radio-button label="月级"></el-radio-button>
                            </el-radio-group>
                        </span>
                    </div>
                    <div style="width: 95%;height: 250px;" id="myBar"></div>
                </el-col>
                <el-col :span="6">
                    <div class="my-title">特征分析</div>
                    <div class="my-main">
                        <span>告警级别：</span><span>{{ tzfx.gjjb }}</span><br>
                        <span>发生时间：</span><span>{{ tzfx.fssj }}</span><br>
                        <span>结束时间：</span><span>{{ tzfx.jssj }}</span><br>
                        <span>行为检出：</span><span>{{ tzfx.xwjc }}</span><br>
                        <span>最长持续：</span><span>{{ tzfx.zccx }}</span><br>
                        <span>对端端口：</span><span>{{ tzfx.dydk }}</span><br>
                        <span>平均访问量：</span><span>{{ tzfx.pjfwl }}</span><br>
                        <span>最大频率：</span><span>{{ tzfx.zdpl }}</span><br>
                        <span>数据量大小：</span><span>{{ tzfx.sjldx }}</span><br>
                    </div>
                </el-col>
            </el-row>


        </div>
        <!-- <el-dialog title="ICP备案主体信息" :visible.sync="icpVisible" width="31%">
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
        </el-dialog> -->

    </div>

</template>
<script>
import "@/assets/css/query-form-style.css";
import "@/assets/css/breadcrumb-tabs-style.css";
import dayjs from 'dayjs';
export default {
    name: "ycjcxq",
    data() {
        return {
            tzfx: {
                gjjb: "高",
                fssj: "2024-05-09 15:00:00",
                jssj: "2024-05-09 21:00:00",
                xwjc: "89(次/7小时)",
                zccx: "2分钟",
                dydk: "22",
                pjfwl: "1(次/ip)",
                zdpl: "12(次/5分钟)",
                sjldx: "0.6M"
            },
            radio1: '小时级',
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
            curRow: null,
            loading: true
        };
    },
    created() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false; // 1秒后将 loading 设置为 false，显示内容
        }, 1000);
        this.curRow = JSON.parse(localStorage.getItem("ycjcRow"))
    },
    mounted() {
        //   this.getIpAPI(this.zcIP)
        const xdata = ['15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00']
        const ydata = [15, 17, 9, 12, 13, 10, 18]
        this.initChart(xdata, ydata)
    },
    // destroyed() {
    //   window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
    // },
    methods: {
        radioChange() {
            console.log('改变了');
            if (this.radio1 == '小时级') {
                this.tzfx = {
                    gjjb: "高",
                    fssj: "2024-05-09 15:00:00",
                    jssj: "2024-05-09 21:00:00",
                    xwjc: "89(次/7小时)",
                    zccx: "2分钟",
                    dydk: "22",
                    pjfwl: "1(次/ip)",
                    zdpl: "12(次/5分钟)",
                    sjldx: "0.6M"
                }
                const xdata = ['15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00']
                const ydata = [15, 17, 9, 12, 13, 10, 18]
                this.initChart(xdata, ydata)
            } else if (this.radio1 == '天级') {
                this.tzfx = {
                    gjjb: "高",
                    fssj: "2024-05-03 21:00:00",
                    jssj: "2024-05-09 21:00:00",
                    xwjc: "211(次/7天)",
                    zccx: "5分钟",
                    dydk: "22",
                    pjfwl: "1(次/ip)",
                    zdpl: "102(次/5分钟)",
                    sjldx: "1.2M"
                }
                const xdata = ['05-03', '05-04', '05-05', '05-06', '05-07', '05-08', '05-09']
                const ydata = [39, 37, 20, 32, 21, 27, 24]
                this.initChart(xdata, ydata)
            } else {
                this.tzfx = {
                    gjjb: "高",
                    fssj: "2023-11-09 21:00:00",
                    jssj: "2024-05-09 21:00:00",
                    xwjc: "624(次/7个月)",
                    zccx: "5分钟",
                    dydk: "22",
                    pjfwl: "1(次/ip)",
                    zdpl: "19(次/5分钟)",
                    sjldx: "5.8M"
                }
                const xdata = ['2024-11', '2024-12', '2024-01', '2024-02', '2024-03', '2024-04', '2024-05']
                const ydata = [90, 78, 82, 90, 91, 86, 98]
                this.initChart(xdata, ydata)
            }
        },
        initChart(xdata, ydata) {
            let barChart = this.$echarts.init(document.getElementById("myBar"));
            let options = {
                grid: {
                    top: "19%",
                    left: "3%",
                    right: '5%',
                    bottom: '10%'
                },
                xAxis: {
                    type: 'category',
                    data: xdata,
                    name: '日期'
                },
                yAxis: {
                    type: 'value',
                    name: '通联次数'
                },
                series: [
                    {
                        data: ydata,
                        type: 'bar'
                    }
                ]
            };
            barChart & barChart.setOption(options);
        },
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
                const { org_name, org_type, org_industry, org_region } = res.data[0]
                console.log(org_name, org_type, org_industry, org_region);
                this.row.org_name = org_name
                this.row.org_type = org_type
                this.row.org_industry = org_industry
                this.row.region = org_region
                this.row.higher_ups = higher_ups
                // this.row = res.data[0]
                // this.tableData = res.data
                // this.taskTotal = res.total
                // this.pageSize = res.pageSize
            }
        },
        goBack() {
            this.$router.push({
                path: '/zhManagement/ycjc',
            });
        },
        Output() {
            // console.log(this.row.id);
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
.el-divider--horizontal {
    margin: 10px 0;
}

:deep(.el-input__inner) {
    border-radius: 4px;
}

.my-main .el-row>.el-col>div>span:nth-of-type(odd) {
    display: inline-block;
    font-size: 14px;
    // margin: 8px 0;
    color: black
}

.my-main .el-row>.el-col>div>span:nth-of-type(even) {
    font-size: 14px;
    color: #666666
}

.my-main>span:nth-of-type(odd) {
    display: inline-block;
    font-size: 14px;
    margin: 4px 0;
    color: #83849f
}

.my-main>span:nth-of-type(even) {
    display: inline-block;
    color: black
}

.my-main>.my-button {
    transform: translateY(-1px);
}

.my-title {
    display: inline-block;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 600;
    // width: 200px;
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