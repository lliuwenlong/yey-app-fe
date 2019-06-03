<template>
    <div>
        <Head title="审批" right="提交申请" @click-right="onClickRight" />
        <van-tabs>
            <van-tab title="待审批">
                <van-cell-group v-for="(v,i) in list" :key="i" @click="showFn(v)">
                    <van-row v-if="v.work_status==1">
                        <van-col span="8" class="Tl">{{v.user_name}}</van-col>
                        <van-col span="8" class="Tc">{{v.work_name}}</van-col>
                        <van-col span="8" class="Tr">{{v.work_addtime}}</van-col>
                    </van-row>
                </van-cell-group>
            </van-tab>
            <van-tab title="审批通过">
                <van-cell-group v-for="(v,i) in list" :key="i" @click="showFn(v)">
                    <van-row v-if="v.work_status==2">
                        <van-col span="8" class="Tl">{{v.user_name}}</van-col>
                        <van-col span="8" class="Tc">{{v.work_name}}</van-col>
                        <van-col span="8" class="Tr">{{v.work_addtime}}</van-col>
                    </van-row>
                </van-cell-group>
            </van-tab>
            <van-tab title="审批拒绝">
                <van-cell-group v-for="(v,i) in list" :key="i" @click="showFn(v)">
                    <van-row v-if="v.work_status==3">
                        <van-col span="8" class="Tl">{{v.user_name}}</van-col>
                        <van-col span="8" class="Tc">{{v.work_name}}</van-col>
                        <van-col span="8" class="Tr">{{v.work_addtime}}</van-col>
                    </van-row>
                </van-cell-group>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    // import Fil from '@/components/Filter.vue'
    import Head from '@/components/Header.vue'
    export default {
        components: {
            // Fil,
            Head
        },
        data() {
            return {
                list: []
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
            onClickRight() {
                this.$router.push('/ApplicationForSubmission');
            },
			showFn(v){
				this.$router.push({
					path:"/ApprovalShow",
					query:{
						data:v,
					}
				})
			},
        },
        created() {
            this.getList();
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
