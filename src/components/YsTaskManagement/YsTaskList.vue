<template>
    <div>
        <div id="task-list">
            <div class="shadow-div">
                <el-form ref="taskForm" :inline="true" :model="taskForm">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item prop="taskName">
                                <el-input v-model="taskForm.taskName">
                                    <template slot="prepend">任务名称</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="任务创建时间" prop="taskTime">
                                <el-date-picker v-model="taskForm.sTime" type="date" format="yyyy-MM-dd" width="10vw"
                                    value-format="yyyy-MM-dd" placement="bottom-start" placeholder="开始时间" class="input-time">
                                </el-date-picker>
                                <span class="split">至</span>
                                <el-date-picker v-model="taskForm.eTime" type="date" format="yyyy-MM-dd" width="10vw"
                                    value-format="yyyy-MM-dd" placement="bottom-start" placeholder="结束时间" class="input-time">
                                </el-date-picker>
                            </el-form-item>
                            <!-- <el-form-item label="任务类型" prop="taskType">
                                <el-select v-model="taskForm.taskType">
                                    <el-option label="全部" value="全部"></el-option>
                                    <el-option label="APP" value="APP"></el-option>
                                    <el-option label="URL" value="URL"></el-option>
                                </el-select>
                            </el-form-item> -->
                            <!-- <el-form-item prop="taskType">
                                <el-input v-model="taskForm.taskType">
                                    <template slot="prepend">任务类型</template>
                                </el-input>
                            </el-form-item> -->
                        </el-col>
                    </el-row>                    
                    <el-row>
                        <!-- <el-col :span="12">
                           
                        </el-col> -->
                        <el-col :span="24">
                            <div style="float: right; text-align: right;">
                                <el-button type="primary" @click="searchForm()">查询</el-button>
                                <el-button type="info" @click="resetForm()">清空</el-button>
                            </div>
                        </el-col>
                    </el-row>                    
                </el-form>                
            </div>
            <div class="operator-div">
                <!-- 创建任务 -->
                <div style="display: inline-block;">
                    <el-button type="primary" style="width: 130px" @click="rwcj">+ 任务创建</el-button>
                    <span style="margin: 0 16px;
                            color: #d3d4dd;
                            font-size: 26px;
                            text-align: center;
                            vertical-align: middle;
                        ">|</span>
                    <el-button type="info" @click="refresh()">刷新</el-button>
                </div>
                <!-- 批量操作按钮 -->
                <div style="float: right; margin-top: 10px">
                    <!-- <a class="batch-opt border-right">
                    <i class="el-icon-document"></i>
                    <span class="l10 grey" style="cursor: pointer">详细数据</span>
                    </a> -->
                    <!-- <a class="batch-opt border-right">
                    <i class="el-icon-video-play green"></i>
                    <span class="l10 green" style="cursor: pointer">批量下发</span>
                    </a>
                    <a class="batch-opt border-right">
                    <i class="el-icon-video-pause orange"></i>
                    <span class="l10 orange" style="cursor: pointer">批量停止</span>
                    </a>
                    <a class="batch-opt">
                    <i class="el-icon-delete red"></i>
                    <span class="l10 red" style="cursor: pointer">批量删除</span>
                    </a> -->
                </div>
            </div> 
            <div class="shadow-div">
                <div class="base_table">
                    <el-table v-loading="tableDataLoading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading"
                    element-loading-background="#f5f7f9" tooltip-effect="dark" :data="tableData" ref="taskTable"
                    :row-style="{ height: '60px' }" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="25" fixed="left"> </el-table-column>
                    <el-table-column type="index" label="序号" width="45" fixed="left">
                    </el-table-column>
                    <el-table-column prop="task_name" label="任务名称" :show-overflow-tooltip="true"  width="150">
                    </el-table-column>
                    <el-table-column prop="ip_num" label="IP数量" :show-overflow-tooltip="true" width="90">
                    </el-table-column>
                    <el-table-column prop="create_time" label="创建时间" :show-overflow-tooltip="true" width="190">
                    </el-table-column>
                    <el-table-column prop="status" label="任务状态" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                        <div v-if="scope.row.status == '已取消'" class="font-bold grey">
                            已取消
                        </div>
                        <div v-if="scope.row.status == '执行中'" class="font-bold green">
                            执行中
                        </div>
                        <div v-if="scope.row.status == '终止'" class="font-bold red">
                            终止
                        </div>
                        <div v-if="scope.row.status == '异常'" class="font-bold orange">
                            异常
                        </div>
                        <div v-if="scope.row.status == '等待下发'" class="font-bold blue">
                            等待下发
                        </div>
                        <div v-if="scope.row.status == '已完成'" class="font-bold green">
                            已完成
                        </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column label="操作" width="220" fixed="right">
                        <template slot-scope="scope">
                        <el-button class="operator-table-btn red" type="danger" size="mini" @click="deleteTask(scope.row.id)">删除</el-button>
                        <el-button class="operator-table-btn blue" type="primary" size="mini" v-if="scope.row.status != '已取消'"
                            @click="goResult(scope.row)">详情</el-button>
                         <el-button class="operator-table-btn red" type="warning" size="mini"
                            v-if="scope.row.status == '等待下发'" @click="qxTask(scope.row.id)">取消</el-button>
                        <el-button class="operator-table-btn orange" type="primary" size="mini" @click="stopTask(scope.row.id)"
                            v-if="scope.row.status == '执行中'">终止</el-button>                                                
                        <el-button class="operator-table-btn green" type="warning" size="mini" @click="startTask(scope.row.id)"
                            v-if="scope.row.status == '等待下发'">下发</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-size="pageSize"  layout="total, prev, pager, next"
                    :total="taskTotal" style="float: right; margin-top: 16px">
                    </el-pagination>
                </div>
            </div>           
        </div>
        <el-dialog :visible.sync="cwVisible">
            <el-result icon="error" title="文件格式错误" subTitle="请核对并修改以下信息后，再重新提交。">

            </el-result>
        </el-dialog>
        <el-dialog :visible.sync="rwcjVisible" title="任务创建" width="32%">
          <div>
                <el-form ref="dialogForm" :inline="true" :model="dialogForm" :rules="rules">
                            <el-form-item prop="taskName" label="任务名称：">
                                <el-input v-model="dialogForm.taskName" >
                                </el-input>
                            </el-form-item>            
                          <el-form-item prop="IP" label="IP：">
                            <el-input v-model="dialogForm.IP" placeholder="IP用逗号分割" type="textarea" autosize @input="handleIPInput">
                                    <!-- <template slot="prepend">IP：</template> -->
                                </el-input>
                            </el-form-item>
                    <div style="text-align: right;">
                                <el-button type="primary" @click="cjClick">确认</el-button>
                                <el-button type="info" @click="qxClick">取消</el-button>
                            </div>                  
                </el-form>                
            </div>
        </el-dialog>
    </div>
</template>
<script>
import "@/assets/css/query-form-style.css";
import dayjs from 'dayjs';
export default {
    name: "YsTaskList",
    data(){
        return {
          
          dialogForm:{
            taskName: '',
            IP: ''
          },
          rwcjVisible:false,
            cwVisible:false,
            taskForm: {
                taskName: "",
                taskType: "",
                sTime:"",
                eTime:""
            },
            tableData: [
              // {
              //     'task_name': '2024-2-1',
              //     'ip_num': '已完成',
              //     'create_time': '2024-2-1-10:43',
              //     'status': '等待下发',
              // 'xq':[ {
              //         'IP': '111.202.89.79',
              //     'dwmc': '天津市住房和城乡建设委员会',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'zfcxjs.tj.gov.cn',
              //     'bah': '',
              //     'fws': '',
              //     'dlwz': '天津',
              //     'wzbt': '天津市住房和城乡建设委员会',
              //     'jd':'已取消',
              //     'zt':'执行中',
              //     'hs':'28min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '125.36.183.249',
              //     'dwmc': '天津市住房和城乡建设委员会',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'szzj.zfcxjs.tj.gov.cn',
              //     'bah': '',
              //     'fws': '',
              //     'dlwz': '天津',
              //     'wzbt': '天津市住房租赁服务与监管平台',
              //     'jd':'已取消',
              //     'zt':'已完成',
              //     'hs':'55min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '123.150.4.98',
              //     'dwmc': '天津市市场监督管理委员会',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'credit.scjg.tj.gov.cn',
              //     'bah': '',
              //     'fws': '天津市市场监督管理委员会',
              //     'dlwz': '天津',
              //     'wzbt': '',
              //     'jd':'已取消',
              //     'zt':'已完成',
              //     'hs':'1h51min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '101.201.252.68',
              //     'dwmc': '天津市第五中心医院生态城医院',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'www.tjstcyy.com.cn',
              //     'bah': '津ICP备19009478号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '首页-天津市第五中心医院生态城医院',
              //     'jd':'已取消',
              //     'zt':'已完成',
              //     'hs':'58min',
              //     'jg':'成功'
              // },
              // {
              //         'IP': '111.33.175.156',
              //     'dwmc': '天津市高级人民法院',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'www.tjcourt.gov.cn',
              //     'bah': '津ICP备18006679号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '',
              //     'jd':'已取消',
              //     'zt':'执行中',
              //     'hs':'50min',
              //     'jg':'成功'
              //     },
              //     ]
              //     },
              // {
              //     'task_name': '2024-1-31',
              //     'ip_num': '等待下发',
              //     'create_time': '2024-1-31-12:43',
              //     'status': '已取消',
              //     },
              // {
              //     'task_name': '2024-1-30',
              //     'ip_num': '7',
              //     'create_time': '2024-1-31-14:22',
              //     'status': '执行中',
              //     'xq':
              // [ {
              //     'IP': '123.6.81.45',
              //     'dwmc': '天津市静海区民政局',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'jinghai12349.com',
              //     'bah': '津ICP备2021008210号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '静海区养老服务信息平台',
              //     'jd':'执行中',
              //     'zt':'执行中',
              //     'hs':'12min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '111.202.89.79',
              //     'dwmc': '天津市体育局',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'ty.tj.gov.cn',
              //     'bah': '津ICP备17005825号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '',
              //     'jd':'异常',
              //     'zt':'已完成',
              //     'hs':'54min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '61.181.246.204',
              //     'dwmc': '天津泰达热电能源管理有限公司',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '80',
              //     'updatetime': '2024/1/31',
              //     'url': 'www.tedapower.com',
              //     'bah': '津ICP备05010518号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '天津泰达电力有限公司',
              //     'jd':'已完成',
              //     'zt':'已完成',
              //     'hs':'1h31min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '61.181.19.14',
              //     'dwmc': '天津泰达热电能源管理有限公司',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'www.tedard.com.cn/index/Single/index.html?compid=23',
              //     'bah': '津ICP备11006066号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '致远A8+协同管理软件 V7.1SP1',
              //     'jd':'6',
              //     'zt':'已完成',
              //     'hs':'38min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '123.6.81.42',
              //     'dwmc': '天津市商务局',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'shangwuju.tj.gov.cn',
              //     'bah': '津ICP备10004655号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '身份认证系统',
              //     'jd':'终止',
              //     'zt':'执行中',
              //     'hs':'34min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '60.28.163.6',
              //     'dwmc': '天津市公共资源交易中心',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'ggzy.zwfwb.tj.gov.cn',
              //     'bah': '',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '天津建设工程信息网投标信息系统',
              //     'jd':'6',
              //     'zt':'已完成',
              //     'hs':'46min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '61.181.121.25',
              //     'dwmc': '天津市中环认证服务有限公司',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'www.tjzhca.com:5555/ForePage/Index',
              //     'bah': '津ICP备18008961号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '',
              //     'jd':'等待下发',
              //     'zt':'已完成',
              //     'hs':'30min',
              //     'jg':'成功'
              //     }]   
              // },
              // {
              //     'task_name': '测试',
              //     'ip_num': '终止',
              //     'create_time': '2024-2-1-10:46',
              //     'status': '异常',
              //     },
              // {
              //     'task_name': '2024-2-2',
              //     'ip_num': '异常',
              //     'create_time': '2024-1-29-15:11',
              //     'status': '终止',
              // 'xq': [ {
              //     'IP': '123.56.5.87',
              //     'dwmc': '天津天保人力资源股份有限公司',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'www.baozhuncheng.com/',
              //     'bah': '',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '',
              //     'jd':'异常',
              //     'zt':'执行中',
              //     'hs':'22min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '123.150.67.130',
              //     'dwmc': '天津银行',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'www.bankoftianjin.com',
              //     'bah': '津ICP备19004789号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '',
              //     'jd':'等待下发',
              //     'zt':'已完成',
              //     'hs':'1h58min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '221.239.32.50',
              //     'dwmc': '天津市住房保障服务中心',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '443',
              //     'updatetime': '2024/1/31',
              //     'url': 'www.tjzfbz.com.cn',
              //     'bah': '津ICP备13005877号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '',
              //     'jd':'已取消',
              //     'zt':'已完成',
              //     'hs':'1h2min',
              //     'jg':'成功'
              //     }]},
              // {
              //     'task_name': '2024-2-1',
              //     'ip_num': '7',
              //     'create_time': '2024-1-31-15:27',
              //     'status': '已完成',
              // 'xq':[{
              //   'IP': '223.111.128.84',
              //     'dwmc': '天津市文化和旅游局',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '80',
              //     'updatetime': '2024/1/31',
              //     'url': 'whly.tj.gov.cn',
              //     'bah': '津ICP备05010518号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '人工举升选泵软件',
              //     'jd':'6',
              //     'zt':'已完成',
              //     'hs':'2h',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '60.29.67.161',
              //     'dwmc': '天津市科学技术发展战略研究院',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'www.sts.org.cn',
              //     'bah': '津ICP备06004185号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '',
              //     'jd':'6',
              //     'zt':'已完成',
              //     'hs':'40min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '60.30.180.158',
              //     'dwmc': '中新天津生态城图书档案馆',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'tecla.cn',
              //     'bah': '津ICP备19002853号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '中新天津生态城图书档案馆',
              //     'jd':'6',
              //     'zt':'已完成',
              //     'hs':'22min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '60.30.156.163',
              //     'dwmc': '天津市河西区教师发展中心',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': '60.30.156.163',
              //     'bah': '津ICP备11000612号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '天津市河西区教师发展中心首页',
              //     'jd':'6',
              //     'zt':'执行中',
              //     'hs':'2min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '60.30.156.159',
              //     'dwmc': '天津市河西区教师发展中心',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'ydjy.tjhxec.cn',
              //     'bah': '津ICP备11000612号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '首页 - 教育云平台',
              //     'jd':'6',
              //     'zt':'已完成',
              //     'hs':'1h8min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '111.31.103.189',
              //     'dwmc': '天津市肿瘤医院',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'www.tjmuch.com/',
              //     'bah': '津ICP备05002861号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '',
              //     'jd':'6',
              //     'zt':'已完成',
              //     'hs':'53min',
              //     'jg':'成功'
              //     },
              // {
              //         'IP': '60.29.59.174',
              //     'dwmc': '中共天津市委机构编制委员会办公室',
              //     'yyfwsl': '执行中',
              //     'kfdksl': '执行中',
              //     'bdymsl': '执行中',
              //     'kfdk': '',
              //     'updatetime': '2024/1/31',
              //     'url': 'tjbb.gov.cn',
              //     'bah': '津ICP备15007181号',
              //     'fws': '执行中',
              //     'dlwz': '天津',
              //     'wzbt': '天津机构编制网',
              //     'jd':'6',
              //     'zt':'已完成',
              //     'hs':'1h',
              //     'jg':'成功'
              //     }]}
            ], //表格数据初始化
            currentPage: 1, //当前页码
            pageSize: 10, //每页最大条数
            taskTotal: 0, //实际数据总条数
            tableDataLoading: false, // 表格加载动画
            multipleSelection: [],   //多选数组
            ids: "",              //id串
            rules: {
              taskName: [
                { required: true, message: '请输入任务名称', trigger: 'blur' }
              ],
              IP: [
                { required: true, message: '请输入IP', trigger: 'blur' }
              ]
            }
    
        }
    },
    created(){
      this.searchForm()
    },
    methods:{
      resetForm(){
        this.taskForm.taskName = "",
        this.taskForm.sTime = "",
        this.taskForm.eTime = "",
        this.tasklist()
      },
      async refresh() {
        this.tasklist();
      },
      async tasklist(){
        const { data: res } = await this.$http.get('/tasks',{params: {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          start_time: this.taskForm.sTime,
          stop_time:this.taskForm.eTime,
          name:this.taskForm.taskName
        }})
        if(res.code == 200){
          console.log(res);
          this.tableData = res.data
          this.taskTotal = res.total
          this.pageSize = res.pageSize
        }
      },
      searchForm(){
        this.currentPage = 1;
        this.tasklist()
      },
     
      handleIPInput(value) {
        this.dialogForm.IP = value;
        this.$nextTick(() => {
          this.$forceUpdate();
        });
      },
      qxClick(){
        this.rwcjVisible = false
        this.dialogForm.taskName = ""
        this.dialogForm.IP = ""
        // this.$refs.form.clearValidate(['taskName','IP']);
        this.$refs.dialogForm.resetFields();
        // console.log(this.$refs.form);
      },
      cjClick(){
        if(this.dialogForm.taskName.length == 0 || this.dialogForm.IP.length == 0){
          this.$message('请输入完整')
          return false
        }
        this.$http.post("/tasks/",{
          task_name:this.dialogForm.taskName,
          ips:this.dialogForm.IP
        }).then(({data:res})=>{
          if(res.code == 200){
            this.rwcjVisible = false
            this.$message({
              message: "创建成功",
              type: "success",
            });
            this.tasklist()
          }else{
            this.$message({
              message: "创建失败",
              type: "error",
            });
          }
        })
        
      //  this.tableData.push( 
      //   {
      //       'task_name':  dayjs().format('YYYY-MM-DD'),
      //       'ip_num': '异常',
      //       'create_time':  dayjs().format('YYYY-MM-DD HH:mm:ss'),
      //       'status': '等待下发',
      //   'xq': [ {
      //       'IP': '123.56.5.87',
      //       'dwmc': '天津天保人力资源股份有限公司',
      //       'yyfwsl': '执行中',
      //       'kfdksl': '执行中',
      //       'bdymsl': '执行中',
      //       'kfdk': '',
      //       'updatetime': dayjs().format('YYYY-MM-DD HH:mm:ss'),
      //       'url': 'www.baozhuncheng.com/',
      //       'bah': '',
      //       'fws': '执行中',
      //       'dlwz': '天津',
      //       'wzbt': '',
      //       'jd':'已取消',
      //       'zt':'执行中',
      //       'hs':'0min',
      //       'jg':'执行中'
      //       },
      //       {
      //           'IP': '123.150.67.130',
      //       'dwmc': '天津银行',
      //       'yyfwsl': '执行中',
      //       'kfdksl': '执行中',
      //       'bdymsl': '执行中',
      //       'kfdk': '',
      //       'updatetime': dayjs().format('YYYY-MM-DD HH:mm:ss'),
      //       'url': 'www.bankoftianjin.com',
      //       'bah': '津ICP备19004789号',
      //       'fws': '执行中',
      //       'dlwz': '天津',
      //       'wzbt': '',
      //       'jd':'已取消',
      //       'zt':'执行中',
      //       'hs':'0min',
      //       'jg':'执行中'
      //       }]})
      },
      rwcj(){
        this.rwcjVisible = true
      },
        async deleteTask(rowId){
          const {data:res} = await this.$http.delete(`tasks/${rowId}`)
          if(res.code == 200){
            this.$message.success('成功！')
            this.tasklist()
          }else{
            console.log(res);
          }
        },
       async goResult(row){
            const {status, id} = row
            localStorage.setItem("rowId",JSON.stringify(id))
            console.log(status);
            if(status == '执行中' || status == '已完成'){
              let path = '/ystaskmanagement/ystaskxq';
              this.$router.push({
                  path: path,
                  query: {
                    //  row:row,
                      rowId:id
                  },
              });
              localStorage.setItem("rowId",JSON.stringify(id))
            }else if(status == '异常'){
                this.cwVisible = true
            }
        },
        // 取消
        qxTask(rowId){
          this.changeAPI(rowId,0)
        },
        // 终止
        stopTask(rowId){
          this.changeAPI(rowId,2)
        },
        // 下发
        startTask(rowId) {
          this.changeAPI(rowId,1)

        },
        async changeAPI(rowId, Type){
          const {data:res} = await this.$http.put(`tasks/${rowId}`,{
            status:Type
          })
          if(res.code == 200){
            this.$message.success('成功！')
            this.tasklist()
          }else{
            console.log(res);
          }
        },
        //分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.tasklist();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.tasklist();
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
    }
}
</script>
<style lang="less" scoped>
:deep(.el-dialog .el-input__inner) {
    border-radius: 4px;
    width: 16vw;
}
:deep(.el-dialog .el-textarea__inner){
  width: 16vw;
}
:deep(.el-dialog .el-form-item__label) {
  background-color: transparent;
    color: #909399 !important;
    border: 0;
    width: 120px;
}
:deep(.el-dialog .el-input-group__prepend){
  background-color: transparent;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 0;
    // border-radius: 4px;
    // padding: 0 20px;
    width: 80px;
    white-space: nowrap;
}
:deep(.el-table__header) {
  width: 100% !important;
}

:deep(.el-table__body) {
  width: 100% !important;
}

.shadow-div {
  box-shadow: 0 0 8px #cecece;
  padding: 20px;
  margin-bottom: 20px;
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