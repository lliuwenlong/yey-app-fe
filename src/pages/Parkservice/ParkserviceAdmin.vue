<template>
    <div>
        <Head title="考核管理" />
        <van-tabs>
            <van-tab :title="v.name" v-for="(v,i) in list" :key="i">
                <van-cell-group v-for="(vv,ii) in v.son" :key="ii" style="margin: 5px 0;">
                    <van-row>
                        <van-col span="12" class="Tl" style="font-size: 16px;">{{vv.name}}</van-col>
                        <van-col span="12" class="Tr">基础得分{{vv.fen}}&nbsp;得分{{vv.defen?vv.defen:0}}</van-col>
                    </van-row>
                    <div style="padding: 5px 15px;height: 100px;overflow-y: auto;">{{vv.desc?vv.desc:"备注:"}}</div>
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
                this.axios.post('/staff/statement', {
                    garden_id: this.$route.query.data.garden_id
                }).then(res => {
                    this.list = [];
                    try {
                        let list = res.data.data.data;
                        for (const item of list) {
                            for (const v of list) {
                                if (item.id == v.p_id) {
                                    item.son = item.son ? item.son.concat([v]) : [v];
                                }
                            }
                            if (item.p_id == 0) this.list.push(item);
                        }
                    } catch (error) {
                        console.log(error)
                    }
                })
            }
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
