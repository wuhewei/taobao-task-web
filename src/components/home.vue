<template xmlns:el="http://www.w3.org/1999/html">
    <div class="el-main">
        <el-row>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <el-row>
                            <el-col :span="12">
                                <span>推荐列表</span>
                            </el-col>
                            <el-col :span="12">
                                <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                                        <el-option label="工单编号" value="1"></el-option>
                                        <el-option label="关键词" value="2"></el-option>
                                        <el-option label="店铺名称" value="3"></el-option>
                                    </el-select>
                                    <el-button slot="append" icon="el-icon-search"></el-button>
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        <el-collapse accordion>
                            <el-collapse-item v-bind:title="'工单20200310000'+ o">
                                <el-form ref="form">
                                    <el-form-item label="关键词">
                                        <span class="ellipsis" v-text="" >短袖夏天男</span>
                                        <el-button size="mini" icon="el-icon-document-copy" v-clipboard:error="onError"
                                                   v-clipboard:copy="'短袖夏天男'"  v-clipboard:success="onCopy">复制</el-button>
                                    </el-form-item>
                                    <el-form-item label="商品图片">
                                        <el-image style="width: 100px; height: 100px" src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1208538952,1443328523&fm=26&gp=0.jpg" fit="fill"></el-image>
                                    </el-form-item>
                                    <el-form-item label="店铺名称">
                                        南极人正品家居服饰店
                                    </el-form-item>
                                    <el-form-item label="商品链接">
                                        <el-link type="primary" href="https://www.baidu.com" target="_blank"> https://www.baidu.com</el-link>
                                    </el-form-item>
                                    <el-form-item label="操作">
                                        <el-button type="success" icon="el-icon-check">接单</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>待办列表</span>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        <el-collapse accordion>
                            <el-collapse-item v-bind:title="'工单20200310000'+ o">
                                <el-form ref="form">
                                    <el-form-item label="关键词">
                                        <span class="ellipsis" v-text="" >短袖夏天男</span>
                                        <el-button size="mini" icon="el-icon-document-copy" v-clipboard:error="onError"
                                                   v-clipboard:copy="'短袖夏天男'"  v-clipboard:success="onCopy">复制</el-button>
                                    </el-form-item>
                                    <el-form-item label="商品图片">
                                        <el-image style="width: 100px; height: 100px" src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1208538952,1443328523&fm=26&gp=0.jpg" fit="fill"></el-image>
                                    </el-form-item>
                                    <el-form-item label="店铺名称">
                                        南极人正品家居服饰店
                                    </el-form-item>
                                    <el-form-item label="商品链接">
                                        <el-link type="primary" href="https://www.baidu.com" target="_blank"> https://www.baidu.com</el-link>
                                    </el-form-item>
                                    <el-form-item label="订单编号">
                                        <el-input placeholder="请输入订单编号">
                                            <el-button slot="append" icon="el-icon-check">完成</el-button>
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                input3: '',
                select: '1',
                activeName: '1'
            }
        },
        methods: {
            // 复制成功
            onCopy(e){
                this.$message({
                    message:'复制成功！',
                    type:'success'
                })
            },
            // 复制失败
            onError(e){
                this.$message({
                    message:'复制失败！',
                    type:'error'
                })
            },
        }
    }
</script>

<style scoped>
    .box-card {
        text-align: left;
    }
    .el-select .el-input {
        width: 130px;
    }
</style>