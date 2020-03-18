<template>
    <div class="el-main">
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="工单编号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="photo"
                    label="商品图片">
                <template slot-scope="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.photoUrl" fit="fill"></el-image>
                </template>
            </el-table-column>
            <el-table-column
                    prop="shopId"
                    label="店铺名称">
            </el-table-column>
            <el-table-column
                    prop="linkUrl"
                    label="商品链接">
                <template slot-scope="scope">
                    <el-link v-bind:href="scope.row.linkUrl" target="_blank">{{scope.row.linkUrl}}</el-link>
                </template>
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="展示价">
            </el-table-column>
            <el-table-column
                    prop="couponAmount"
                    label="优惠券金额">
            </el-table-column>
            <el-table-column
                    prop="deadline"
                    label="任务截止日期">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.status === 0">未完成</el-tag>
                    <el-tag type="success" v-else-if="scope.row.status === 1">已完成</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createdTime"
                    label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.createdTime | moment('YYYY-MM-DD HH:mm:ss')}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="updatedTime"
                    label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.updatedTime | moment('YYYY-MM-DD HH:mm:ss')}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            @click="showProcessList(scope.$index, scope.row)">查看已接单列表</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 15px;">
            <el-pagination
                    background
                    layout="total, sizes, prev, pager, next"
                    :current-page="pageNo"
                    :page-size="pageSize"
                    :total="totalCount"
                    @size-change="handleSizeChange"
                    :page-sizes="[10, 50, 100, 500, 1000, 2000]"
                    @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <el-dialog v-bind:title="dialogFormTitle" :visible.sync="dialogFormVisible">
            <el-form :model="taskForm" ref="refForm" :rules="rules">
                <el-form-item label="工单编号" label-width="120" prop="id">
                    <el-input v-model="taskForm.id" autocomplete="off" placeholder="系统自动生成" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="店铺名称" prop="shopId">
                </el-form-item>
                <el-form-item>
                    <el-select v-model="taskForm.shopId" filterable placeholder="请选择店铺">
                        <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="截止日期" label-width="120" prop="deadline">
                    <el-date-picker v-model="taskForm.deadline" type="date" placeholder="请选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="商品链接" label-width="120" prop="linkUrl">
                    <el-input v-model="taskForm.linkUrl" autocomplete="off" maxlength="500" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="商品图片链接" label-width="120" prop="photoUrl">
                    <el-input v-model="taskForm.photoUrl" autocomplete="off" maxlength="500" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="展示价" label-width="120" prop="price">
                    <el-input v-model="taskForm.price" autocomplete="off" maxlength="8" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="优惠券金额" label-width="120" prop="couponAmount">
                    <el-input v-model="taskForm.couponAmount" autocomplete="off" maxlength="8" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAdd(taskForm)">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="已接单列表" :visible.sync="dialogProcessListVisible">
            <el-table :data="dialogProcessList">
                <el-table-column property="taskId" label="工单编号"></el-table-column>
                <el-table-column property="username" label="处理人"></el-table-column>
                <el-table-column property="processStatus" label="处理状态">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-if="scope.row.processStatus === 0">处理中</el-tag>
                        <el-tag type="success" v-else-if="scope.row.processStatus === 1">已完成</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <div style="margin-top: 20px">
            <el-button @click="openDialog()">新建工单</el-button>
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">批量删除</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "about",
        data() {
            return {
                pageNo: 1,
                pageSize: 10,
                totalCount: 0,
                tableData: [],
                multipleSelection: [],
                dialogFormVisible:  false,
                dialogFormTitle: '新建工单',
                dialogProcessListVisible: false,
                dialogProcessList: [
                    {
                        taskId: 1123,
                        username: '美美',
                        processStatus: 1
                    },
                    {
                        taskId: 5322,
                        username: '馨馨',
                        processStatus: 0
                    }
                ],
                taskForm: {
                    id: '',
                    deadline: '',
                    photoUrl: '',
                    shopId: '',
                    linkUrl: '',
                    price: 0,
                    couponAmount: 0

                },
                refForm: {
                    id: '',
                    deadline: '',
                    photoUrl: '',
                    shopId: '',
                    linkUrl: '',
                    price: 0,
                    couponAmount: 0
                },
                rules: {

                },
                shopList: []
            }
        },
        methods: {
            search(pageNo, pageSize) {
                let that = this;
                this.$axios.get('/api/task/list?', {
                    params: {}
                }).then(function (response) {
                    let page = response.data;
                    that.tableData = page.data;
                })
            },
            async initShopList() {
                let that = this;
                await this.$axios.get('/api/shop/list?', {
                    params: {}
                }).then(function (response) {
                    let page = response.data;
                    that.shopList = page.data;
                })
            },
            openDialog() {
                this.initShopList();
                this.dialogFormVisible = true;
                this.dialogFormTitle = '新建工单';
                this.$nextTick(() => {
                    this.$refs['refForm'].resetFields();
                    this.taskForm = JSON.parse(JSON.stringify(this.refForm));
                });
            },
            handleAdd(form) {
                let that = this;
                this.$axios.post('/api/task/saveOrUpdate?',
                    {
                        id: form.id,
                        deadline: form.deadline,
                        photoUrl: form.photoUrl,
                        shopId: form.shopId,
                        linkUrl: form.linkUrl,
                        price: form.price,
                        couponAmount: form.couponAmount
                    }
                ).then(function (response) {
                    if (response.data.code === 1) {
                        that.search(that.pageNo, that.pageSize);
                    }
                });
                this.dialogFormVisible = false;
            },
            handleEdit(index, row) {
                this.dialogFormVisible = true;
                this.dialogFormTitle = '编辑工单';
                // 拷贝，以免影响到表格数据
                this.taskForm = JSON.parse(JSON.stringify(row));
            },
            handleDelete(index, row) {
                let that = this;
                this.$confirm('此操作将会删除【'+ row.id +'】工单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let param = new URLSearchParams();
                    param.append('userId',  row.id)
                    this.$axios.post('/api/task/delete?', param).then(res => {
                        if (res.data.code === 1) {
                            that.$message.success('删除成功');
                            that.search(that.pageNo, that.pageSize);
                        }
                    });
                });
            },
            handleCurrentChange(pageNo) {
                this.search(pageNo, this.pageSize);
            },
            handleSizeChange(pageSize) {
                this.search(this.pageNo, pageSize);
            },
            showProcessList(index, row) {
                this.dialogProcessListVisible = true;
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
        created() {
            this.search(this.pageNo, this.pageSize);
        }
    }
</script>

<style scoped>
    .el-form-item {
        margin-bottom: 10px;
    }
</style>