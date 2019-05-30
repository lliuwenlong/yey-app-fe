<template>
    <div class="show">
        <Head title="入院登记" right="保存" @click-right="addFn"/>
        <van-cell-group title="学生基本信息">
            <van-cell title="学生姓名" :value="data.sName" />
            <van-cell title="信息来源" :value="data.source" />
            <van-cell title="家长姓名" :value="data.familyName" />
            <van-cell title="家长联系方式" :value="data.tel" />
            <van-cell title="入园意向" :value="data.idea" />
        </van-cell-group>
        <van-cell-group title="跟进记录填写">
            <van-field label="负责人" v-model="params.fuzeren" placeholder="负责人" />
            <van-field label="入园意向" v-model="params.intention" :readonly="true" @click="intentionF=true" placeholder="入园意向" />
            <van-picker 
                :columns="intention" 
                value-key="intName" 
                show-toolbar
                class="Fb"
                v-show="intentionF" 
                @cancel="intentionF=false" 
                @confirm="res=>{
                    params.intention=res.intName;
                    params.status=res.intId;
                    intentionF=false;
                    params={...params};
                }" />
            <van-field label="备注" v-model="params.desc" type="textarea" autosize placeholder="填写备注" />
        </van-cell-group>
    </div>
</template>

<script>
import Head from '@/components/Header.vue'
export default {
    components:{
        Head
    },
    data(){
        return {
            intention:[],
            intentionF:false,
            data:this.$route.query.o,
            params:{
                s_id:this.$route.query.o.id
            }
        }
    },
    methods:{
        addFn(){
            this.axios.post("/student/student_txadd", this.params).then(res => {
                this.$message({
                    message: res.data.msg,
                    type: "success"
                });
            });
            this.$router.go(-1) 
        }
    },
    created(){
        console.log(this.data)
        this.axios.post("/student/garden_where",{
            ji_id:this.$store.state.user.userInfo.jiId
        }).then(res => {
            this.message = res.data.data.messageSource;
            this.intention=res.data.data.intention;
            this.park=res.data.data.park;
        });
    }
}
</script>

<style>

</style>
