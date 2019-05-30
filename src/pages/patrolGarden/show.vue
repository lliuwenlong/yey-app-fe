<template>
    <div class="show">
        <Head title="日志详情"></Head>
        <van-tabs>
            <van-tab v-for="(v,i) in list" :key="i" :title="v.name">
                <img :src="'/public/img/'+v.img" width="100%">
                <h3>
                    <p>说明：</p>
                    <span>{{v.desc}}</span>
                </h3>
                <h3>
                    <p>建议：</p>
                    <span>{{v.sug}}</span>
                </h3>
                <h3>
                    <p>专项跟进：</p>
                    <span>{{v.genjin}}</span>
                </h3>
                <h3>
                    <p>教学助理：</p>
                    <span>{{v.jx_zhu}}</span>
                </h3>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import Fil from '@/components/Filter.vue'
    import Head from '@/components/Header.vue'
    export default {
        components: {
            Head,
            Fil
        },
        data(){
            return {
                list:[]
            }
        },
        created(){
            this.axios.post('/staff/getpatrolData',{
                garden_id:this.$route.query.garden_id,
                time:this.$route.query.time,
            }).then(res=>{
                this.list=res.data.data
            })
        }
    }
</script>

<style lang="less" scoped>
.van-tabs{
    padding: 44px 15px;
    h3{
        padding: 5px 0;
        p{
            line-height: 25px;
        }
        span{
            font-size: 16px;
            font-weight: normal;
        }
    }
}
</style>

