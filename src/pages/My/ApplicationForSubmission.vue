<template>
    <div>
        <Head title="提交申请"/>
        <div class="application-forsubmission">
            <el-form labelWidth="100px" label-position="left">
                <el-form-item label="事项：">
                    <el-input v-model="addData.work_name"/>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input type="textarea" :rows="4" v-model="addData.work_desc"/>
                </el-form-item>
                <el-form-item label="添加附件：">
                    <el-upload
                        class="upload-demo"
                        action="/Api/Satff/mu_add"
                        multiple
                        name="files"
                        :limit="1"
                        :on-success="file"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-form-item>
                <el-form-item label="审批人：">
                    <el-select v-model="value" placeholder="请选择" @change="option">
                        <el-option
                            v-for="item in options1"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <el-select v-model="addData.work_shnepiid" placeholder="请选择">
                        <el-option
                            v-for="item in options2"
                            :key="item.staff_id"
                            :label="item.staff_name"
                            :value="item.staff_id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <van-button type="default" size="large" @click="addFn">提交</van-button>
            </span>
        </div>
    </div>
</template>
<script>
import Head from "@/components/Header.vue";
export default {
    components: {
        Head
    },
    data() {
        return {
            addData: {
                work_adminid: this.$store.state.user.userId,
                work_shnepiid: '',
                work_desc: '',
                work_name: ''
            },
            options1: [],
            options2: [],
            value: ""
        };
    },
    created() {
        this.axios.post("/inform/shou_shnepi").then(res => {
            this.options1 = res.data.data;
            this.getList()
        });
    },
    methods: {
        file(res, file) {
            this.addData.work_file = res.data;
        },
        option(o) {
            this.axios
            .post("/inform/shou_shnepi", {
                o_id: o
            })
            .then(res => {
                this.options2 = res.data.data;
                this.addData.work_shnepiid = ""
            });
        },
        addFn() {
            this.axios.post("/inform/workapp_add", {
                ...this.addData,
                work_adminid: this.$store.state.user.userInfo.admin_id
            }).then(res => {
                this.$router.go('-1');
                this.$message({
                    type: 'success',
                    message: res.data.msg
                });
            });
        }
    }
};
</script>
<style lang="less" scoped>
    .application-forsubmission {
        padding: 10px;
    }
</style>
