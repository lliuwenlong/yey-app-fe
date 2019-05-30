<template>
    <div class="add">
        <Head title="入院登记" right="保存" @click-right="addFn"/>
        <van-cell-group title="信息来源">
            <van-field label="选择园所" v-model="params.garden" :readonly="true" @click="parkF=true" placeholder="选择园所" />
            <van-picker 
                :columns="park" 
                value-key="parkName" 
                show-toolbar
                class="Fb"
                v-show="parkF" 
                @cancel="parkF=false" 
                @confirm="res=>{
                    params.garden=res.parkName;
                    params.garden_id=res.parkId;
                    parkF=false;
                    params={...params};
                }" />
            <van-field label="信息来源" v-model="params.source" :readonly="true" @click="messageF=true" placeholder="信息来源" />
            <van-picker 
                :columns="message" 
                value-key="msgName" 
                show-toolbar
                class="Fb"
                v-show="messageF" 
                @cancel="messageF=false" 
                @confirm="res=>{
                    params.source=res.msgName;
                    params.source_id=res.msgId;
                    messageF=false;
                    params={...params};
                }" />
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
                    params.idea=res.intId;
                    intentionF=false;
                    params={...params};
                }" />
            <van-field label="入园经历" v-model="params.statusName" :readonly="true" @click="statusF=true" placeholder="入园经历" />
            <van-picker 
                :columns="[{id:0,name:'有'},{id:1,name:'无'}]"
                value-key="name"
                show-toolbar
                class="Fb"
                v-show="statusF"
                @cancel="statusF=false"
                @confirm="res=>{
                    params.statusName=res.name;
                    params.status=res.id;
                    statusF=false;
                    params={...params};
                }" />
        </van-cell-group>
        <van-cell-group title="托费标准">
            <van-field label="收费标准" v-model="params.tuo" placeholder="收费标准" />
            <van-field label="缴费周期" v-model="params.tuo_zhou" placeholder="缴费周期" />
        </van-cell-group>
        <van-cell-group title="餐费标准">
            <van-field label="收费标准" v-model="params.can" placeholder="收费标准" />
            <van-field label="缴费周期" v-model="params.can_zhou" placeholder="缴费周期" />
        </van-cell-group>
        <van-cell-group title="校车标准">
            <van-field label="收费标准" v-model="params.xiao" placeholder="收费标准" />
            <van-field label="缴费周期" v-model="params.xiao_zhou" placeholder="缴费周期" />
        </van-cell-group>
        <van-cell-group title="其他标准">
            <van-field label="收费标准" v-model="params.qi" placeholder="收费标准" />
            <van-field label="缴费周期" v-model="params.qi_zhou" placeholder="缴费周期" />
        </van-cell-group>
        <van-cell-group title="家长信息">
            <van-field label="家长姓名" v-model="params.family_name" placeholder="家长姓名" />            
            <van-field label="学生关系" v-model="params.relation" placeholder="学生关系" />            
            <van-field label="单位" v-model="params.unit" placeholder="单位" />            
            <van-field label="学历" v-model="params.xueli" placeholder="学历" />            
            <van-field label="电话" v-model="params.tel" placeholder="电话" />            
            <van-field label="微信" v-model="params.wechat" placeholder="微信" />            
        </van-cell-group>
        <van-cell-group title="学生信息">
            <van-field label="学生姓名" v-model="params.name" placeholder="学生姓名" />            
            <!-- <van-field label="性别" v-model="params.sex" placeholder="性别" />  -->
            <van-field label="性别" v-model="params.sexName" :readonly="true" @click="sexF=true" placeholder="选择性别" />
            <van-picker 
                :columns="[{id:1,name:'男'},{id:0,name:'女'}]"
                value-key="name"
                show-toolbar
                class="Fb"
                v-show="sexF"
                @cancel="sexF=false"
                @confirm="res=>{
                    params.sexName=res.name;
                    params.sex=res.id;
                    sexF=false;
                    params={...params};
                }" />        
            <van-field label="出生日期" v-model="params.birthday" placeholder="出生日期" />            
            <van-field label="籍贯" v-model="params.place" placeholder="籍贯" />            
            <van-field label="家庭住址" v-model="params.home" placeholder="家庭住址" />            
            <van-field label="曾在园所" v-model="params.once_garden" placeholder="曾在园所" />            
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
            park:[],
            parkF:false,
            message:[],
            messageF:false,
            intention:[],
            intentionF:false,
            statusF:false,
            sexF:false,
            params:{
                source:"",
                source_id:""
            }
        }
    },
    methods:{
        addFn(){
            this.axios.post("/student/student_source_add", this.params)
            .then(res => {
                this.$message({
                    type: "success",
                    message: res.data.msg
                });
                this.$router.go(-1) 
            });
        }
    },
    created(){
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

<style lang="less" scoped>

</style>

