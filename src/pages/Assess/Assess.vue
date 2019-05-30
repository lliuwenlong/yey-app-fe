<!-- 考核管理 -->
<template>
    <div class='content'>
        <Head title="考核管理" right="打分统计" @click-left="onClickLeft" @click-right="onClickRight" />
        <van-tabs @click="onClick">
            <van-tab title="员工考核">
                <Fil :types="['park','assessmentStaff']" :month='true' @change="change"/>
                <van-collapse v-model="activeNames" v-for='(item,index) in tabledata' :key='index' accordion>
                    <van-collapse-item :title="index" :name='index'>
                        <div v-for="(a,i) in item" :key='i' style="height:24px;font-size:14px;display:flex;justify-content:space-between;">
                            <span> {{a.staff_name}} </span>
                            <span> {{a.count}} 分</span>
                        </div>
                    </van-collapse-item>
                </van-collapse>
            </van-tab>
            <van-tab title="园长考核">
                <Fil :types="['park','assessmentPark']" :month='true' @change="change"/>
                <van-collapse v-model="activeNames" v-for='(item,index) in tabledata1' :key='index' accordion>
                    <van-collapse-item :title="index" :name='index'>
                        <div v-for="(a,i) in item" :key='i' style="height:24px;font-size:14px;display:flex;justify-content:space-between;">
                            <span> {{a.staff_name}} </span>
                            <span> {{a.count}} 分</span>
                        </div>
                    </van-collapse-item>
                </van-collapse>
            </van-tab>
        </van-tabs>
        <van-popup v-model="show" style='width:70%;line-height:30px;text-indent:1em;'>
            <van-row v-for='(item,index) in msg' :key='index'>
                <van-col span="24">
                    {{item.nametype}}{{item.name}}{{item.far}}
                </van-col>
            </van-row>  
        </van-popup>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Head from '@/components/Header.vue'
import Fil from '@/components/Filter.vue'
export default {
//import引入的组件需要注入到对象中才能使用
    components: {
        Head,Fil
    },
    data() {
        //这里存放数据
        return {
            msg:[],
            tabledata:[],
            tabledata1:[],
            activeNames: ['1'],
            indexList:'',
            show:false,
        };
    },
    //方法集合
    methods: {
        init(types){
            console.log(types)
            if(this.indexList  == 0){
                // 员工
                let saveLists = {
                    itype:2,
                    orId:types.park.id,
                    hId:types.assessmentStaff.id,
                    start:types.month
                }
                this.axios.post('/TeacherApp/Assessment',saveLists)
                .then(res=> {
                    this.tabledata = res.data.data
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else{
                // 园长
                let saveList = {
                    itype:1,
                    orId:types.park.id,
                    hId:types.assessmentPark.id,
                    start:types.month
                }
                this.axios.post('/TeacherApp/Assessment',saveList)
                .then(res=> {
                    this.tabledata1 = res.data.data
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        onClickLeft() {
            history.go(-1)
        },
        change(types){
            this.init(types)
        },
        onClickRight() {
            this.axios.post('/Scoring/stafflog')
            .then(res=> {
                this.msg = res.data.data
                this.show = true
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        onClick(index, title) {
            this.indexList = index
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.footer {
    width: 100%;
    height: 6rem;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index:2003;
}
</style>