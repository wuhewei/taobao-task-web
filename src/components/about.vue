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
                    prop="keywords"
                    label="关键词">
            </el-table-column>
            <el-table-column
                    prop="count"
                    label="商品单数">
            </el-table-column>
            <el-table-column
                    prop="shopName"
                    label="店铺名称">
            </el-table-column>
            <el-table-column
                    prop="linkAddress"
                    label="商品链接">
                <template slot-scope="scope">
                    <a v-bind:href="scope.row.linkAddress" target="_blank">{{scope.row.linkAddress}}</a>
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
                <el-form-item label="工单编号" label-width="120" prop="id">
                    <el-input v-model="taskForm.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="关键词" label-width="120" prop="keywords">
                    <el-input v-model="taskForm.keywords" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品单数" label-width="120" prop="count">
                    <el-input v-model="taskForm.count" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="店铺名称" label-width="120" prop="shopName">
                    <el-input v-model="taskForm.shopName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品链接" label-width="120" prop="linkAddress">
                    <el-input v-model="taskForm.linkAddress" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAdd(taskForm)">确 定</el-button>
            </div>
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
                tableData: [
                    {
                        id: '202003100001',
                        keywords: '睡衣女',
                        count: '3',
                        shopName: '南极人正品家居服饰店',
                        linkAddress: 'https://www.baidu.com'
                    },
                    {
                        id: '202003100002',
                        keywords: '人字拖',
                        count: '5',
                        shopName: '正品拖鞋皮革店',
                        linkAddress: 'https://www.baidu.com'
                    },
                    {
                        id: '202003100003',
                        keywords: '棉袄睡衣',
                        count: '6',
                        shopName: '温暖小屋正品家居服饰店',
                        linkAddress: 'https://www.baidu.com'
                    },
                    {
                        id: '202003100004',
                        keywords: '短袖夏天男',
                        count: '1',
                        shopName: '透心凉正品家居服饰店',
                        linkAddress: 'https://www.baidu.com'
                    },
                ],
                multipleSelection: [],
                dialogFormVisible:  false,
                dialogFormTitle: '新建工单',
                taskForm: {
                    id: '',
                    keywords: '',
                    count: '',
                    shopName: '',
                    linkAddress: '',
                },
                refForm: {
                    id: '',
                    keywords: '',
                    count: '',
                    shopName: '',
                    linkAddress: '',
                },
                rules: {

                }
            }
        },
        methods: {
            search(pageNo, pageSize) {
                let that = this;
                this.$axios.get('/api/list?', {
                    params: {
                    }
                }).then(function (response) {
                    that.loading = false;
                    let page = response.data;
                    if (page.constructor === String) {
                        // 提示错误消息
                        that.$message({
                            message: page,
                            duration: 1500,
                            type: 'error'
                        });
                        return;
                    }
                    that.tableData = page.data;
                    that.totalCount = page.totalCount;
                })
            },
            openDialog() {
                this.dialogFormVisible = true;
                this.dialogFormTitle = '新建工单';
                this.$nextTick(() => {
                    this.$refs['refForm'].resetFields();
                    this.taskForm = JSON.parse(JSON.stringify(this.refForm));
                });
            },
            handleAdd(form) {
                this.dialogFormVisible = false;
                this.tableData.push(JSON.parse(JSON.stringify(form)));
            },
            handleEdit(index, row) {
                this.dialogFormVisible = true;
                this.dialogFormTitle = '编辑工单';
                // 拷贝，以免影响到表格数据
                this.taskForm = JSON.parse(JSON.stringify(row));
            },
            handleDelete(index, row) {
                this.$confirm('此操作将会删除【'+ row.id +'】工单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete('/api/del', {
                        params: {id: row.id}
                    }).then(res => {
                        if (res.code === 1) {
                            // TODO 从表格中删除
                            this.$message.success('删除成功')
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
    }
</style>