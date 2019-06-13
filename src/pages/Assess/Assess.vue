<!-- 考核管理 -->
<template>
    <div class="content">
        <Head title="考核管理" @click-left="onClickLeft"/>
        <van-tabs @click="onClick" :class="editF?'mb':''" v-model="index">
            <van-tab title="员工考核">
                <Fil :types="['park','assessmentStaff']" :month="true" @change="change" all/>
                <van-collapse
                    v-model="activeNames"
                    v-for="(item,index) in tabledata"
                    :key="index"
                    accordion
                >
                    <van-collapse-item :title="index" :name="index">
                        <van-cell
                            v-for="(a,i) in item"
                            :key="i"
                            :title="a.staff_name"
                            v-show="!editF"
                        >
                            <span>{{a.count}} 分</span>
                        </van-cell>
                        <van-checkbox-group v-model="result" v-show="editF">
                            <van-cell-group>
                                <van-cell
                                    v-for="(a,i) in item"
                                    clickable
                                    :key="i"
                                    :title="a.staff_name"
                                >
                                    <van-checkbox :name="a" ref="checkboxes"/>
                                </van-cell>
                            </van-cell-group>
                        </van-checkbox-group>
                    </van-collapse-item>
                </van-collapse>
            </van-tab>
            <van-tab title="园长考核">
                <Fil :types="['park','assessmentPark']" :month="true" @change="change" all/>
                <van-collapse
                    v-model="activeNames"
                    v-for="(item,index) in tabledata1"
                    :key="index"
                    accordion
                >
                    <van-collapse-item :title="index" :name="index">
                        <van-cell
                            v-for="(a,i) in item"
                            :key="i"
                            :title="a.staff_name"
                            @click="()=>{if([1,2,3].indexOf($store.state.user.userInfo.roleStatus)!=-1) edit(a);}"
                        >
                            <span>{{a.count}} 分</span>
                        </van-cell>
                        <!-- <van-checkbox-group v-model="result" v-show="editF">
                            <van-cell-group>
                                <van-cell
                                    v-for="(a,i) in item"
                                    clickable
                                    :key="i"
                                    :title="a.staff_name"
                                >
                                    <van-checkbox :name="a.staffId" ref="checkboxes"/>
                                </van-cell>
                            </van-cell-group>
                        </van-checkbox-group>-->
                    </van-collapse-item>
                </van-collapse>
            </van-tab>
            <van-tab title="打分统计">
                <van-row>
                    <van-cell
                        v-for="(item,index) in msg"
                        :key="index"
                    >{{item.nametype}}{{item.name}}{{item.far}}</van-cell>
                </van-row>
            </van-tab>
        </van-tabs>
        <van-button
            type="primary"
            plain
            size="large"
            style="position:fixed; bottom:0"
            v-show="editF"
            @click="editFn"
        >开始打分</van-button>
        <van-button
            type="primary"
            plain
            size="large"
            style="position:fixed; bottom:0"
            v-show="!editF&&index==0&&[1,2,3].indexOf($store.state.user.userInfo.roleStatus)!=-1"
            @click="edit"
        >打分</van-button>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Head from "@/components/Header.vue";
import Fil from "@/components/Filter.vue";
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        Head,
        Fil
    },
    data() {
        //这里存放数据
        return {
            msg: [],
            tabledata: [],
            tabledata1: [],
            activeNames: ["1"],
            indexList: "",
            show: false,
            checked: [],
            result: [],
            editF: false,
            index: 0
        };
    },
    //方法集合
    methods: {
        init(types) {
            console.log(types);
            if (this.indexList == 0) {
                // 员工
                let saveLists = {
                    itype: 2,
                    orId: types.park.id,
                    hId: types.assessmentStaff.id,
                    start: types.month
                };
                this.axios
                    .post("/TeacherApp/Assessment", saveLists)
                    .then(res => {
                        this.tabledata = res.data.data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            } else {
                // 园长
                let saveList = {
                    itype: 1,
                    orId: types.park.id,
                    hId: types.assessmentPark.id,
                    start: types.month
                };
                this.axios
                    .post("/TeacherApp/Assessment", saveList)
                    .then(res => {
                        this.tabledata1 = res.data.data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }

            this.axios
                .post("/Scoring/stafflog")
                .then(res => {
                    this.msg = res.data.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        onClickLeft() {
            history.go(-1);
        },
        change(types) {
            this.init(types);
        },
        onClickRight() {
            this.editF = !this.editF;
        },
        onClick(index, title) {
            this.indexList = index;
        },
        edit(o) {
            if (this.index === 0) {
                this.editF = !this.editF;
                this.$toast("点选员工开始打分");
            } else {
                this.$router.push({
                    path: "/assessment",
                    query: {
                        staff_id: o.staffId,
                        staff_name: o.staff_name
                    }
                });
            }
        },
        editFn() {
            this.axios
                .post("/Scoring/getStaffType", {
                    userId: this.result.map(item => item.staffId).join(",")
                })
                .then(res => {
                    try {
                        this.staffBtn = res.data.data;
                        this.$router.push({
                            path: "/assessment",
                            query: {
                                msgKey: this.staffBtn,
                                msg: this.result
                            }
                        });
                    } catch (error) {
                        console.log("数据错误或结果为空");
                    }
                });
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {}
};
</script>
<style lang='less' scoped>
.footer {
    width: 100%;
    height: 6rem;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2003;
}
.mb {
    margin-bottom: 60px;
}
</style>