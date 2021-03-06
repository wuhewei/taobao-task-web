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
                    label="用户编号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="用户姓名">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="登录账号">
            </el-table-column>
            <el-table-column
                    prop="password"
                    label="登录密码">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.status === 0">禁用</el-tag>
                    <el-tag type="success" v-else-if="scope.row.status === 1">启用</el-tag>
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
                <el-form-item label="用户编号" prop="id">
                    <el-input v-model="taskForm.id" autocomplete="off" placeholder="系统自动生成" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" prop="name">
                    <el-input v-model="taskForm.name" autocomplete="off" maxlength="32" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="登录账号" prop="username">
                    <el-input v-model="taskForm.username" autocomplete="off" maxlength="32" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                    <el-input v-model="taskForm.password" autocomplete="off" maxlength="32" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch :active-value="1" :inactive-value="0" v-model="taskForm.status"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAdd(taskForm)">确 定</el-button>
            </div>
        </el-dialog>
        <div style="margin-top: 20px">
            <el-button @click="openDialog()">新建用户</el-button>
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">批量删除</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "user",
        data() {
            return {
                pageNo: 1,
                pageSize: 10,
                totalCount: 0,
                tableData: [],
                multipleSelection: [],
                dialogFormVisible:  false,
                dialogFormTitle: '新建用户',
                taskForm: {
                    id: '',
                    name: '',
                    username: '',
                    password: '',
                    status: 1,
                },
                refForm: {
                    id: '',
                    name: '',
                    username: '',
                    password: '',
                    status: 1,
                },
                rules: {

                }
            }
        },
        methods: {
            search(pageNo, pageSize) {
                let that = this;
                this.$axios.get('/api/users/list?', {
                    params: {}
                }).then(function (response) {
                    let page = response.data;
                    that.tableData = page.data;
                })
            },
            openDialog() {
                this.dialogFormVisible = true;
                this.dialogFormTitle = '新建用户';
                this.$nextTick(() => {
                    this.$refs['refForm'].resetFields();
                    this.taskForm = JSON.parse(JSON.stringify(this.refForm));
                });
            },
            handleAdd(form) {
                let that = this;
                this.$axios.post('/api/users/saveOrUpdate?',
                    {
                        id: form.id,
                        name: form.name,
                        type: 2,
                        username: form.username,
                        password: form.password,
                        status: form.status
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
                this.dialogFormTitle = '编辑用户';
                // 拷贝，以免影响到表格数据
                this.taskForm = JSON.parse(JSON.stringify(row));
            },
            handleDelete(index, row) {
                let that = this;
                this.$confirm('此操作将会删除【'+ row.id +'】用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let param = new URLSearchParams();
                    param.append('userId',  row.id)
                    this.$axios.post('/api/users/delete?', param).then(res => {
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
        text-align: left;
    }
</style>