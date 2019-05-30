<template>
    <div class="list">
        <Head title="日志列表" right="添加日志" @click-right="add"></Head>
        <van-cell :title="v.addtime" is-link v-for="(v,i) in list" :key="i" @click="go(v.addtime)"/>
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
        methods:{
            go(time){
                this.$router.push({
                    path:'patrolGardenShow',
                    query:{
                        garden_id:this.$route.query.id,
                        time
                    }
                })
            },
            add(){
                this.$router.push({
                    path:'patrolGardenAdd',
                    query:{
                        garden_id:this.$route.query.id
                    }
                })
            }
        },
        created(){
            this.axios.post('Staff/teachingTimeApp',{
                garden_id:this.$route.query.id
            }).then(res=>{
                this.list=res.data.data
            })
        }
    }
</script>

<style>

</style>
