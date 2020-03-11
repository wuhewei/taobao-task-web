<template>
    <div class="el-main">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <div id="title"><i class="el-icon-s-custom">身份登录</i></div>
            <el-form-item label="用户名" prop="username">
                <el-input v-model.number="ruleForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    that: this,
                    username: [
                        { validator: (rule, value, callback) => {
                                if (value === '') {
                                    callback(new Error('请输入用户名'));
                                } else {
                                    if (this.that.ruleForm.username !== '') {
                                        this.that.$refs.ruleForm.validateField('checkUsername');
                                    }
                                    callback();
                                }
                        }, trigger: 'blur' }
                    ],
                    password: [
                        { validator: (rule, value, callback) => {
                                if (value === '') {
                                    callback(new Error('请输入密码'));
                                } else {
                                    if (this.that.password !== '') {
                                        this.that.$refs.ruleForm.validateField('checkPassword');
                                    }
                                    callback();
                                }
                        }, trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            toLogin() {
                const redirect = this.$route.query.redirect;
                if(redirect){
                    //存在回跳地址就回跳
                    this.$router.push(redirect);
                }else{
                    //否则就跳到默认的首页
                    this.$router.push({
                        name: 'home'
                    })
                }
            },
            submitForm(formName) {
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.$axios.get('/doLogin', {
                            params: {
                                username: that.ruleForm.username,
                                password: that.ruleForm.password
                            }
                        }).then(function (response) {
                            if (response.data === 'ok') {
                                window.location.replace('index');
                            } else {
                                that.$message({
                                    message: '用户名或密码错误',
                                    duration: 1500,
                                    type: 'error'
                                });
                            }
                        }).catch(function (err) {
                            console.log(err);
                        });
                        return false;
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            this.toLogin();
        },
        computed() {
            this.toLogin();
        }
    }
</script>

<style scoped>
    .el-main {
        width: 500px;
        margin: 0 auto;
    }
    #title {
        text-align: center;
        color: #409eff;
        font-size: 22px;
        margin-top: 200px;
        margin-bottom: 15px;
    }
</style>