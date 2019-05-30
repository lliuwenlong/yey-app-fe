<template>
    <div>
        <Head title="审批详情" />
        <van-cell-group>
            <van-field label="申请人:" v-model="data.user_name" />
        </van-cell-group>
        <van-cell-group>
            <van-field label="事项:" v-model="data.work_name" />
        </van-cell-group>
        <van-cell-group>
            <van-field label="描述:" type="textarea" v-model="data.desc" />
        </van-cell-group>
        <van-cell-group>
            <van-panel title="附件:">
                <a :href="'/public/img/'+data.work_file" style="margin: 15px;">{{data.work_file}}</a>
            </van-panel>
        </van-cell-group>
        <van-row style="position: absolute; bottom: 0; left: 0; width: 100%;" v-if="data.work_status==1&&data.work_adminid!=userId">
            <van-col span="12">
                <van-button type="warning" size="large" @click="edit(data.work_id,3)">拒绝</van-button>
            </van-col>
            <van-col span="12">
                <van-button type="primary" size="large" @click="edit(data.work_id,2)">通过</van-button>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    import Head from '@/components/Header.vue'
    export default {
        components: {
            Head
        },
        data() {
            return {
                data: this.$route.query.data,
                userId: this.$store.state.user.userInfo.admin_id
            }
        },
        methods: {
            getList() {
                this.axios.post('/inform/workapp_show', {
                    user_id: this.$store.state.user.userInfo.admin_id
                }).then(res => {
                    this.list = res.data.data;
                })
            },
            edit(work_id, work_status) {
                this.axios
                    .post("/inform/workapp_update", {
                        work_id,
                        work_status
                    })
                    .then(res => {
                        this.getList()
                        this.$message(res.data.msg);
                    });
            }
        },
        created() {
            // this.getList();
        }

    }
</script>

<style lang='less' scoped>
    .van-cell-group {
        line-height: 30px;
        background-color: white;

        .van-row {
            padding: 5px 15px;
        }
    }
</style>
