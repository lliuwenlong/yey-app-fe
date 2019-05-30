<!-- 指标管理 -->
<template>
    <div class='content'>
        <Head title="指标统计" />
        <Fil :types="['park','class']" @change="change" :month="true" />
        <ul style='margin-top:5px;' v-if='list != null' >
            <li style='margin-bottom:5px;background-color:white;width:48%;display:inline-block;margin-left:1%;margin-right:1%;' v-for="(v,i) in tabledata1">
                <Echarts
                    :options="options[i]"
                    :ecStyle="{width: '100%', height: '170px'}"
                    class="fl"
                    style="width:98%;float:left;"
                ></Echarts>
                <van-row style='padding-bottom:10px;'>
                    <van-col span="12">
                        <span style='border-radius:3px;width:20px;height:10px;background-color:#000;display:inline-block;'></span> 指标{{listMsg[i]}}%
                    </van-col>
                    <van-col span="12">
                        <span style='border-radius:3px;width:20px;height:10px;background-color:red;display:inline-block;'></span> 达成率{{listMsg[i]}}%
                    </van-col>
                </van-row>
            </li>
        </ul>
        <span style='display:block;line-height:200px;font-size:24px;margin-top:5px;width:96%;margin:2%;height:200px;background-color:white;margin-top:10px;text-align:center;' v-else>
               暂无数据 
        </span>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Head from "@/components/Header.vue"
import Fil from '@/components/Filter.vue'
import Echarts from "@/components/Echarts"
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        Head,Fil,Echarts
    },
    data() {
        //这里存放数据
        return {
            options:{},
            tabledata:[],
            tabledata1:[
                {key:'anquan',value:'安全率',sex:'例外次数',radio:''},
                {key:'chengzhang',value:'成长率',sex:'成长人数',radio:'人'},
                {key:'chuqin',value:'出勤率',sex:'出勤率',radio:'%'},
                {key:'guanli',value:'管理达成率',sex:'',radio:''},
                {key:'gugan',value:'骨干生成率',sex:'骨干生成人数',radio:'人'},
                {key:'jinsheng',value:'晋升率',sex:'晋升人数',radio:'人'},
                {key:'lirun',value:'利润完成率',sex:'招生人数',radio:'人'},
                {key:'lizhi',value:'离职率',sex:'离职人数',radio:'人'},
                {key:'techeng',value:'特长率',sex:'特长率',radio:'%'},
                {key:'tousu',value:'投诉率',sex:'投诉次数',radio:'次'},
                {key:'tuiyuan',value:'退园率',sex:'退园人数',radio:'人'},
                {key:'zaizhi',value:'在职率',sex:'在职人数',radio:'人'},
                {key:'zhaosheng',value:'招生率',sex:'招生人数',radio:'人'},
            ],
            listData2:'',
            listMsg:[],
            listMag:[],
            list:[]
        };
    },
    //方法集合
    methods: {
        change(types){
            this.getList(types)
        },
        getList(types) {
            let savePost = {
                garden_id:types.park.id,
                class_id:types.class.id
            }
        this.axios
            .post("/Wages/app_tong",savePost)
            .then(res => {
                this.list = res.data.data
                for (const key in this.tabledata1) {
                    let listData = ((res.data.data[this.tabledata1[key].key]).replace(/%/g,'')).split('@')
                    this.listMsg[key] = listData[1]
                    this.listMag[key] = listData[2]
                    this.options[key].series[0].data=[{value: listData[1]},{ value: listData[2]}]
                    this.options[key].title.subtext = this.tabledata1[key].sex + listData[0] + this.tabledata1[key].radio
                    this.options[key]={...this.options[key]}
                }
                this.options={...this.options}
                this.listMsg={...this.listMsg}
                this.listMag={...this.listMag}
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.options=[]
        for (const v of this.tabledata1) {
            this.options.push({
                title: {
                    text: v.value,
                    left: 'center',
                    subtext: v.value
                },
                tooltip : {
                    trigger: 'item', 
                    formatter: "{c}%" 
                },
                series: [
                    {
                        name: "姓名",
                        type: "pie",
                        radius: "40%",
                        data: [{ value: 30 }, { value: 100 }],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        },
                        itemStyle:{ 
                            normal:{ 
                                label:{ 
                                    show: true, 
                                    formatter: '{c}%' 
                                }, 
                                labelLine :{show:false} 
                            } 
                        } 
                    }
                ]
            })
        }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>