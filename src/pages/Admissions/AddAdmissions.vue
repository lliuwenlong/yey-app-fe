<template>
    <div>
        <Head title="目标幼儿-填写" />
        <div class="app-container">
            <el-form label-width="80px" label-position="left">
                <el-form-item label="负责人">
                    <el-input v-model="writeparams.fuzeren"/>
                </el-form-item>
                <el-form-item label="入园意向">
                    <el-radio v-model="writeparams.status" label="1">强烈</el-radio>
                    <el-radio v-model="writeparams.status" label="2">正常</el-radio>
                    <el-radio v-model="writeparams.status" label="3">放弃园所</el-radio>
                </el-form-item>
                <el-form-item label="上传">
                    <el-upload
                        class="upload-demo"
                        action="/api/Staff/mu_add"
                        name="files"
                        :on-success="handlePreview"
                        multiple
                        :limit="1"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="writeparams.desc" :rows="6"/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <van-button type="default" @click="writeSave" size="large">确 定</van-button>
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
            writeparams: {
                fuzeren: '',
                status: '1',
                desc: '',
                img: ''
            }
        };
    },
    methods: {
        handlePreview(response, file, fileList) {
            this.writeparams.img = response.data;
        },
        writeSave() {
            this.axios
                .post("/student/student_txadd", {
                    s_id: this.$route.query.id,
                    ...this.writeparams
                })
                .then(res => {
                    this.$message({
                        message: res.data.msg,
                        type: "success"
                    });
                    this.$router.go(-1);
                });
        }
    }
};
</script>
<style lang="less">
.app-container {
    padding: 15px;
}
</style>
