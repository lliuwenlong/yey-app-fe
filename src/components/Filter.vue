<template>
    <div class="Filter">
        <van-datetime-picker 
            v-model="currentDate1" 
            v-show="monthF" 
            type="year-month" 
            :formatter="formatter" 
            @cancel="monthF=false"
            @confirm="monthF=false;data.month=moment(currentDate1).format('YYYY-MM');emit()" 
        />
        <van-datetime-picker 
            v-model="currentDate2" 
            v-show="dayF" 
            type="date" 
            :formatter="formatter" 
            @cancel="dayF=false"
            @confirm="dayF=false;data.day=moment(currentDate2).format('YYYY-MM-DD');emit()" 
        />
        <van-datetime-picker 
            v-model="currentDate3" 
            v-show="timesF1" 
            type="date" 
            :formatter="formatter" 
            @cancel="timesF1=false"
            @confirm="timesF1=false;data.times[0]=moment(currentDate3).format('YYYY-MM-DD');emit()" 
        />
        <van-datetime-picker 
            v-model="currentDate4" 
            v-show="timesF2" 
            type="date" 
            :formatter="formatter" 
            :min-date="data.times[0]?new Date(data.times[0]):new Date()"
            @cancel="timesF2=false" 
            @confirm="timesF2=false;data.times[1]=moment(currentDate4).format('YYYY-MM-DD');emit()" 
        />
        <div v-for="(v,i) in types" :key="i" v-show="!((userInfo.roleStatus == 4||userInfo.roleStatus == 7||userInfo.roleStatus == 5)&&(v=='park'||v=='class'))">
            <van-row v-if="list[v]&&list[v].length">
                <van-col span="4" class="tit">{{config[v]().name}}：</van-col>
                <van-col span="19">
                    <van-tabs v-model="active[v]" @change="change(v)">
                        <van-tab v-for="(vv,ii) in list[v]" :title="vv.name" :key="ii"></van-tab>
                    </van-tabs>
                </van-col>
                <van-col span="1" class="tit">&nbsp;</van-col>
            </van-row>
        </div>
        <div  v-if="month||day||times||week">
            <van-row style="background:white">
                <van-col span="4" class="tit">时间：</van-col>
                <van-col span="19" v-if="month||day">
                    <van-field v-if="month" @click='monthF = true' readonly="readonly" placeholder="请选择时间" v-model="data.month" />
                    <van-field v-if="day" @click='dayF = true' readonly="readonly" placeholder="请选择时间" v-model="data.day" />
                </van-col>
                <van-col span="9" v-if="times">
                    <van-field @click='timesF1 = true' readonly="readonly" placeholder="选择起始时间" v-model="data.times[0]" class="Tr"/>
                </van-col>
                <van-col span="1" v-if="times" style="line-height: 44px; text-align: center;background: white;">
                    ~
                </van-col>
                <van-col span="9" v-if="times">
                    <van-field @click='timesF2 = true' readonly="readonly" placeholder="选择结束时间" v-model="data.times[1]" />
                </van-col>
                <van-col span="19" v-if="week">
                    <el-date-picker
                        class="week"
                        v-model="currentDate5"
                        type="week"
                        format="yyyy 第 WW 周"
                        :picker-options="{firstDayOfWeek:1}"
                        placeholder="选择周"
                        @change="data.week=[moment(currentDate5).add(-1,'days').format('YYYY-MM-DD'),moment(currentDate5).add(5,'days').format('YYYY-MM-DD')];emit()">
                    </el-date-picker>
                </van-col>
                <van-col span="1" class="tit">&nbsp;</van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
import { DatePicker } from 'element-ui'
import {mapState} from 'vuex'; 
    export default {
        computed: {
        ...mapState('user', ['userInfo'])
        },
        data() {
            return {
                monthF: false,
                dayF: false,
                timesF1: false,
                timesF2: false,
                list: {},
                active: {},
                config: {
                    park: () => {
                        return {
                            path: '/Staff/organization_status',
                            name: "园所",
                            p_id: this.$store.state.user.userInfo.jiId,
                            status: 1,
                            load: true //是否初始加载
                        }
                    },
                    class: () => {
                        return {
                            path: '/Staff/organization_status',
                            name: "班级",
                            p_id: (this.active.park + 1) ? this.list.park[this.active.park].id : 0,
                            status: 2,
                            load: false //是否初始加载
                        }
                    },
                    assessmentPark: () => {
                        return {
                            path: '/TeacherApp/staff_where',
                            type: 1,
                            name: "类型",
                            load: true //是否初始加载
                        }
                    },
                    assessmentStaff: () => {
                        return {
                            path: '/TeacherApp/staff_where',
                            type: 2,
                            name: "类型",
                            load: true //是否初始加载
                        }
                    },
                    intoPark: () => {
                        return {
                            path: '/Student/message_source',
                            name: "类别",
                            load: true //是否初始加载
                        }
                    },
                    reason: () => {
                        return {
                            path: '/Student/showRetreatGardenReason',
                            name: "退园",
                            load: false, //是否初始加载
                            gardenId: (this.active.park + 1) ? this.list.park[this.active.park].id : 0,
                        }
                    },
                    techang: () => {
                        return {
                            path: 'TeacherApp/countwhere',
                            parkId: (this.active.park + 1) ? this.list.park[this.active.park].id : 0,
                            name: "类型",
                            load: false //是否初始加载
                        }
                    },
                    post: ()=>{
                        return {
                            path: '/Staff/organization_status',
                            name:'职务',
                            p_id: (this.active.park + 1) ? this.list.park[this.active.park].id : 0,
                            status: 0,
                            load: false //是否初始加载
                        }
                    }
                },
                currentDate1: new Date(),
                currentDate2: new Date(),
                currentDate3: new Date(),
                currentDate4: new Date(),
                currentDate5: new Date(),
                data: {
                    month: "",
                    day: "",
                    times: [],
                    week:""
                },
            }
        },
        props: {
            month: {
                default: false
            },
            monthData: {
                default: null
            },
            day: {
                default: false
            },
            dayData: {
                default: null
            },
            times: {
                default: false
            },
            week: {
                default: false
            },
            weekData: {
                default: null
            },
            timesData: {
                type: Array,
                default () {
                    return []
                }
            },
            types: {
                type: Array,
                default () {
                    return []
                }
            },
        },
        methods: {
            init() {

            },
            change(key) {
                this.data[key] = this.list[key][this.active[key]];
                if (key == 'park') {
                    this.getList('reason');
                }
                if (key == "park" && this.types.indexOf("class") != -1&&this.userInfo.roleStatus != 4&&this.userInfo.roleStatus != 5)
                    this.getList("class");
                if (key == "park" && this.types.indexOf("techang") != -1)
                    this.getList("techang")
                if (key == "park" && this.types.indexOf("post") != -1)
                    this.getList("post")
                this.emit();
            },
            emit() {
                this.$emit("change", this.data)
            },
            getList(key) {
                console.log(key);
                this.axios.post(this.config[key]().path, this.config[key]())
                    .then(res => {
                        if (res.data.data && res.data.data.length != -1) {
                            this.list[key] = key === 'reason'
                                ? [{id: -1, name: '全部'}, ...res.data.data ]
                                : res.data.data
                            this.list = { ...this.list }
                            this.active[key] = 0
                            this.change(key)
                        } else {
                            this.list[key] = []
                            this.list = { ...this.list }
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                } else if (type === 'day') {
                    return `${value}日`
                }
                return value;
            }
        },
        created() {
            if (this.types.length == 0) {
                this.emit()
            } else {
                if(this.userInfo.roleStatus == 5){
                    if(this.types.indexOf('intoPark')!=-1){
                        this.types.splice(this.types.indexOf('intoPark'),0)
                    }
                }
                for (let v of this.types) {
                    this.data[v] = {}
                }
                if(this.userInfo.roleStatus == 4||this.userInfo.roleStatus == 7){
                    if(this.types.indexOf('park')!=-1){
                        this.list.park=[{id:this.userInfo.garden_id}]
                        this.active.park=0
                        this.change('park')
                        this.list.class=[{id:this.userInfo.class_id}]
                        this.active.class=0
                        this.change('class')
                    }
                }else if(this.userInfo.roleStatus == 5){
                    if(this.types.indexOf('park')!=-1){
                        this.list.park=[{id:this.userInfo.stugarden_id}]
                        this.active.park=0
                        this.change('park')
                        this.list.class=[{id:this.userInfo.stuclass_id}]
                        this.active.class=0
                        this.change('class')
                    }
                }else{
                    for (let v of this.types) {
                        if (this.config[v]().load) {
                            this.getList(v)
                        }
                    }
                }
            }
            if(this.monthData){
                this.currentDate1=new Date(this.monthData);
                this.data.month=this.moment(this.currentDate1).format('YYYY-MM');
                this.emit();
            }
            if(this.dayData){
                this.currentDate2=new Date(this.dayData);
                this.data.day=this.moment(this.currentDate2).format('YYYY-MM-DD');
                this.emit();
            }
            if(this.weekData){
                this.currentDate5=new Date(this.weekData);
                this.data.week=[
                    this.moment(this.currentDate5).format('YYYY-MM-DD'),
                    this.moment(this.currentDate5).add(6,'days').format('YYYY-MM-DD')
                ];
                this.emit();
            }
            if(this.timesData[0]&&this.timesData[1]){
                this.currentDate3=new Date(this.timesData[0]);
                this.data.times[0]=this.moment(this.currentDate3).format('YYYY-MM-DD');
                this.currentDate4=new Date(this.timesData[1]);
                this.data.times[1]=this.moment(this.currentDate4).format('YYYY-MM-DD');
                this.emit();
                return;
            }
            if(this.timesData[0]){
                this.currentDate3=new Date(this.timesData[0]);
                this.data.times[0]=this.moment(this.currentDate3).format('YYYY-MM-DD');
                this.emit();
            }
            if(this.timesData[1]){
                this.currentDate4=new Date(this.timesData[1]);
                this.data.times[1]=this.moment(this.currentDate4).format('YYYY-MM-DD');
                this.emit();
            }
        }
    }
</script>

<style lang="less" scoped>
    .Filter {
        // 		position: fixed;
        // 		top: 46px;
        // 		width: 100%;
        .van-row {
            .van-col.tit {
                font-size: 14px;
                text-align: right;
                line-height: 44px;
                background: white;
            }

            .van-col /deep/ .van-tab {
                min-width: inherit;
                max-width: 30%;
            }
        }
    }

    .week{
        & /deep/ input{
            border: none;
        }
    }
    .van-datetime-picker {
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 9999;
    }
    .Tr{
        & /deep/ input{
            text-align: right;
        }
    }
</style>
