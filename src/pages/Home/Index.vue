<template>
    <div class="hello">
        <van-swipe :autoplay="2000" indicator-color="white" :height="200" v-if="imgData.length">
            <van-swipe-item v-for="(item, key) in imgData" :key="key" @click="goClick(item)">
                <img class="swipeImg" :src="`/public/img/${item.img}`">
            </van-swipe-item>
        </van-swipe>
        <van-swipe :autoplay="2000" indicator-color="white" :height="200" v-else>
            <van-swipe-item>
                <img class="swipeImg" src="@/assets/images/banner.png">
            </van-swipe-item>
            <van-swipe-item>
                <img class="swipeImg" src="@/assets/images/1.jpg">
            </van-swipe-item>
            <van-swipe-item>
                <img class="swipeImg" src="@/assets/images/2.jpg">
            </van-swipe-item>
            <van-swipe-item>
                <img class="swipeImg" src="@/assets/images/3.jpg">
            </van-swipe-item>
        </van-swipe>
        <Investor
            v-if="userInfo.roleStatus === 2 || userInfo.roleStatus === 4 || userInfo.roleStatus === 1"
        />
        <SpecialTeacher v-else-if="userInfo.roleStatus === 7"/>
        <Parent v-else-if="userInfo.roleStatus === 5"/>
        <div class="noticeBar">
            <van-notice-bar
                mode="link"
                left-icon="volume-o"
                v-if="tableData[0]"
                @click="noTice"
            >{{tableData[0].inform_desc}}</van-notice-bar>
        </div>
        <div
            style="margin-bottom:50px;overflow: hidden;"
            v-if="userInfo.roleStatus === 2 || userInfo.roleStatus === 1"
        >
            <van-swipe
                :autoplay="0"
                indicator-color="white"
                class="echars-sw"
                v-if="width !== 0"
                :show-indicators="false"
                :loop="false"
            >
                <van-swipe-item>
                    <van-row type="flex" justify="center">
                        <van-col span="24">
                            <div class="width: 100%">
                                <Echarts
                                    v-if="list.anquan"
                                    :options="getAnQnOptions"
                                    :ecStyle="{width: `${width}px`, height: '150px'}"
                                    :style="{width: `${width}px`}"
                                ></Echarts>
                            </div>
                        </van-col>
                    </van-row>
                    <van-row type="flex" justify="center">
                        <van-col span="24">
                            <div class="width: 100%">
                                <Echarts
                                    v-if="list.zhaosheng"
                                    :options="getZSOptions"
                                    :ecStyle="{width: `${width}px`, height: '150px'}"
                                    :style="{width: `${width}px`}"
                                ></Echarts>
                            </div>
                        </van-col>
                    </van-row>
                    <van-row type="flex" justify="center" style="margin-top: 10px;">
                        <van-col span="12" style="text-align: center;font-size: 14px;">
                            退园人数：{{count}}
                        </van-col>
                        <van-col span="12" style="text-align: center;font-size: 14px;">
                            特长率：{{list.techeng ? list.techeng.two : 0 }}%
                        </van-col>
                    </van-row>
                </van-swipe-item>
                <van-swipe-item>
                    <div class="van-swipe-item-wrap" style="height: 500px;">
                        <van-row type="flex" justify="center">
                            <van-col span="24">
                                <div class="width: 100%">
                                    <Echarts
                                        :options="options1"
                                        :ecStyle="{width: `${width}px`, height: '150px'}"
                                        :style="{width: `${width}px`}"
                                    ></Echarts>
                                </div>
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="center">
                            <van-col span="12">
                                <Echarts
                                    :options="options2"
                                    :ecStyle="{width: `${width / 2}px`, height: '150px'}"
                                    class="fl"
                                    :style="{width: `${width / 2}px`}"
                                ></Echarts>
                            </van-col>
                            <van-col span="12">
                                <Echarts
                                    :options="options3"
                                    :ecStyle="{width: `${width / 2}px`, height: '150px'}"
                                    class="fl"
                                    :style="{width: `${width / 2}px`}"
                                ></Echarts>
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="center">
                            <van-col span="12">
                                <Echarts
                                    :options="options4"
                                    :ecStyle="{width: `${width / 2}px`, height: '150px'}"
                                    class="fl"
                                    :style="{width: `${width / 2}px`}"
                                ></Echarts>
                            </van-col>
                            <van-col span="12">
                                <Echarts
                                    :options="options5"
                                    :ecStyle="{width: `${width / 2}px`, height: '150px'}"
                                    class="fl"
                                    :style="{width: `${width / 2}px`}"
                                ></Echarts>
                            </van-col>
                        </van-row>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div style="margin-bottom:50px;overflow: hidden;" v-if="userInfo.roleStatus === 4">
            <van-swipe
                :autoplay="0"
                indicator-color="white"
                class="echars-sw"
                v-if="width !== 0"
                :show-indicators="false"
                :loop="false"
            >
                <van-swipe-item>
                    <van-row type="flex" justify="center">
                        <van-col span="24">
                            <div class="width: 100%">
                                <Echarts
                                    v-if="list.anquan"
                                    :options="getAnQnOptions"
                                    :ecStyle="{width: `${width}px`, height: '150px'}"
                                    :style="{width: `${width}px`}"
                                ></Echarts>
                            </div>
                        </van-col>
                    </van-row>
                    <van-row type="flex" justify="center">
                        <van-col span="24">
                            <div class="width: 100%">
                                <Echarts
                                    v-if="list.zhaosheng"
                                    :options="getZSOptions"
                                    :ecStyle="{width: `${width}px`, height: '150px'}"
                                    :style="{width: `${width}px`}"
                                ></Echarts>
                            </div>
                        </van-col>
                    </van-row>
                </van-swipe-item>
                <van-swipe-item>
                    <div class="van-swipe-item-wrap">
                        <van-row type="flex" justify="center">
                            <van-col span="24">
                                <Echarts
                                    :options="options1"
                                    :ecStyle="{width: `${width}px`, height: '150px'}"
                                    class="fl"
                                    :style="{width: `${width}px`}"
                                ></Echarts>
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="center">
                            <van-col span="12">
                                <Echarts
                                    :options="options2"
                                    :ecStyle="{width: `${width / 2}px`, height: '150px'}"
                                    class="fl"
                                    :style="{width: `${width}px`}"
                                ></Echarts>
                            </van-col>
                            <van-col span="12">
                                <Echarts
                                    :options="options3"
                                    :ecStyle="{width: `${width / 2}px`, height: '150px'}"
                                    class="fl"
                                    :style="{width: `${width}px`}"
                                ></Echarts>
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="center">
                            <van-col span="12">
                                <Echarts
                                    :options="options4"
                                    :ecStyle="{width: `${width / 2}px`, height: '150px'}"
                                    class="fl"
                                    :style="{width: `${width}px`}"
                                ></Echarts>
                            </van-col>
                            <van-col span="12">
                                <Echarts
                                    :options="options5"
                                    :ecStyle="{width: `${width / 2}px`, height: '150px'}"
                                    class="fl"
                                    :style="{width: `${width}px`}"
                                ></Echarts>
                            </van-col>
                        </van-row>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="title" v-if="userInfo.roleStatus === 5">
            <div class="title_top" v-for="(a,v) in InvData" :key="v">
                <p class="tit">{{a.addtime}}&nbsp;&nbsp;&nbsp;{{a.title}}</p>
                <ul>
                    <li>
                        <img :src="'/public/img/'+a.img">
                    </li>
                    <li>
                        <img :src="'/public/img/'+a.img1">
                    </li>
                    <li>
                        <img :src="'/public/img/'+a.img2">
                    </li>
                </ul>
            </div>
        </div>
        <div class="title" v-if="userInfo.roleStatus === 7">
            <div class="title_top" v-for="(a,v) in tableList" :key="v">
                <p class="tit">{{a.addtime}}&nbsp;&nbsp;&nbsp;{{a.title}}</p>
                <ul>
                    <li>
                        <img :src="'/public/img/'+a.img">
                    </li>
                    <li>
                        <img :src="'/public/img/'+a.img1">
                    </li>
                    <li>
                        <img :src="'/public/img/'+a.img2">
                    </li>
                </ul>
            </div>
        </div>
        <Menu></Menu>
    </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import Echarts from "@/components/Echarts";
import Investor from "./Investor.vue";
import SpecialTeacher from "./SpecialTeacher.vue";
import Parent from "./Parent";
import { mapState } from "vuex";
export default {
    components: {
        Menu,
        Echarts,
        Investor,
        SpecialTeacher,
        Parent
    },
    name: "Index",
    data() {
        return {
            count: 0,
            InvData: [],
            tableList: [],
            msg: "Welcome to Your Vue.js App",
            active: 0,
            tableData: [],
            options1: {
                title: {
                    text: "当日实际收入 ",
                    x: "center",
                    bottom: "10%"
                },
                series: [
                    {
                        name: "姓名",
                        type: "pie",
                        radius: "40%",
                        center: ["50%", "35%"],
                        data: [{ value: 30 }, { value: 100 }],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }
                ]
            },
            options2: {
                title: {
                    text: "当日核算收入 ",
                    x: "center",
                    bottom: "10%"
                },
                series: [
                    {
                        name: "姓名",
                        type: "pie",
                        radius: "40%",
                        center: ["50%", "35%"],
                        data: [{ value: 30 }, { value: 100 }],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }
                ]
            },
            options3: {
                title: {
                    text: "当日实际支出 ",
                    x: "center",
                    bottom: "10%"
                },
                series: [
                    {
                        name: "姓名",
                        type: "pie",
                        radius: "40%",
                        center: ["50%", "35%"],
                        data: [{ value: 30 }, { value: 100 }],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }
                ]
            },
            options4: {
                title: {
                    text: "当日核算支出 ",
                    x: "center",
                    bottom: "10%"
                },
                series: [
                    {
                        name: "姓名",
                        type: "pie",
                        radius: "40%",
                        center: ["50%", "35%"],
                        data: [{ value: 30 }, { value: 100 }],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }
                ]
            },
            options5: {
                title: {
                    text: "当日销售扣减 ",
                    x: "center",
                    bottom: "10%"
                },
                series: [
                    {
                        name: "姓名",
                        type: "pie",
                        radius: "40%",
                        center: ["50%", "35%"],
                        data: [{ value: 30 }, { value: 100 }],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }
                ]
            },
            width: 0,
            list: {},
            imgData: []
        };
    },
    computed: {
        ...mapState("user", ["userInfo"]),
        getAnQnOptions() {
            const name = this.list.chuqin ? this.list.chuqin.name : '';
            const two = this.list.chuqin ? this.list.chuqin.two : 0;
            return {
                title: {
                    text: `${name}: ${two}%`,
                    x: "center",
                    bottom: "10%"
                },
                series: [
                    {
                        name: "姓名",
                        type: "pie",
                        radius: "40%",
                        center: ["50%", "35%"],
                        data: [{ value: two}, { value: 100 - two }],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }
                ]
            };
        },
        getZSOptions() {
            const name = this.list.zhaosheng ? this.list.zhaosheng.name : '';
            const two = this.list.zhaosheng ? this.list.zhaosheng.two : 0;
            return {
                title: {
                    text: `${name}: ${two}%`,
                    x: "center",
                    bottom: "10%"
                },
                series: [
                    {
                        name: "姓名",
                        type: "pie",
                        radius: "40%",
                        center: ["50%", "35%"],
                        data: [{ value: two }, { value: 100 - two }],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }
                ]
            };
        }
    },
    methods: {
        noTice() {
            this.$router.push({
                path: "/Describe"
            });
        },
        getList() {
            this.axios
                .post("/FinancialStatement/count", {
                    class_id:
                        this.userInfo.roleStatus == 4
                            ? this.$store.state.user.userInfo.class_id
                            : undefined
                })
                .then(res => {
                    let obj = { ...this.options1 };
                    obj.title.text =
                        "当日实际收入 " +
                        (res.data.data[0].money ? res.data.data[0].money : 0);
                    this.options1 = obj;
                    obj = { ...this.options2 };
                    this.options2.title.text =
                        "当日核算收入 " +
                        (res.data.data[0].hmoney ? res.data.data[0].hmoney : 0);
                    this.options2 = obj;
                    obj = { ...this.options3 };
                    this.options3.title.text =
                        "当日实际支出 " +
                        (res.data.data[0].shijiprice
                            ? res.data.data[0].shijiprice
                            : 0);
                    this.options3 = obj;
                    obj = { ...this.options4 };
                    this.options4.title.text =
                        "当日核算支出 " +
                        (res.data.data[0].rzhichi
                            ? res.data.data[0].rzhichi
                            : 0);
                    this.options4 = obj;
                    obj = { ...this.options5 };
                    this.options5.title.text =
                        "当日销售扣减 " +
                        (res.data.data[0].xiaoshou
                            ? res.data.data[0].xiaoshou
                            : 0);
                    this.options5 = obj;
                    // this.showData=res.data.data[0]
                });
        },
        init() {
            let savePost = {
                garden_id: this.$store.state.user.userInfo.garden_id,
                ji_id: this.$store.state.user.userInfo.jiId
            };
            this.axios
                .post("/Inform/show", savePost)
                .then(res => {
                    this.tableData = res.data.data;
                })
                .catch(function(error) {
                    console.log(error);
                });

            let saveGet = {
                user_id: this.$store.state.user.userInfo.admin_id
            };
            this.axios
                .post("/TeacherApp/student", saveGet)
                .then(res => {
                    this.InvData = res.data.data;
                })
                .catch(function(error) {
                    console.log(error);
                });

            let tableL = {
                user_id: this.$store.state.user.userInfo.admin_id,
                class_id: this.$store.state.user.userInfo.class_id
            };
            this.axios
                .post("/TeacherApp/student", tableL)
                .then(res => {
                    this.tableList = res.data.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
            this.axios.post("/Wages/app_tong").then(res => {
                this.list = res.data.data.list;
            });
        },
        goClick(item) {
            this.$router.push({
                path: 'bannerDeic',
                query: {data: JSON.stringify(item)}
            });
        }
    },
    created() {
        this.getList();
        this.axios
                .post("/Student/retreatGardenReasonNum", {
                })
                .then(res => {
                    this.count = res.data.data.count;
                });
        this.axios.post('/Banner/bannerapp', {
            garden_id: this.userInfo.garden_id,
            staff_id: this.userInfo.staff_id
        }).then(res => {
            this.imgData = [...res.data.data.slice(0, 5)];
        });
    },
    mounted() {
        this.init();
        this.width = document.body.offsetWidth;
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    margin: 0;
    padding: 0;
}
html,
body {
    padding-bottom: 1.5rem;
}
.van-tabbar-item {
    font-size: 0.4rem;
}
.van-tabbar-item >>> .van-tabbar-item__icon {
    font-size: 0.6rem;
    position: relative;
    margin-bottom: 0.066667rem;
}
.van-swipe {
    width: 100%;
}
.van-swipe >>> .van-swipe-item {
    height: 100%;
    width: 100%;
}
.van-swipe-item >>> .swipeImg {
    width: 100%;
    height: 100%;
    display: inline-block;
}
.noticeBar {
    height: 30px;
    width: 100%;
    margin: 10px 0px;
}
.noticeBar >>> .van-notice-bar {
    height: 30px;
    width: 100%;
}

.title {
    height: auto;
    width: 100%;
    color: rgb(51, 51, 51);
    font-family: "PingFang-SC-Light";
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    /* margin-bottom: 1.2rem; */
    margin-top: 10px;
    box-sizing: border-box;
    background-color: white;
}
.title_top {
    height: 100%;
    width: 100%;
}
.title .title_top .tit {
    width: 100%;
    font-size: 14px;
    color: rgb(51, 51, 51);
    font-family: "PingFang-SC-Light";
    margin-bottom: 0px;
    padding-top: 10px;
}

.title .title_top ul {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    display: flex;
    justify-content: space-between;
}

.title .title_top li {
    float: left;
    width: 32%;
    height: 2.54rem;
    list-style: none;
    /*padding-right:0.68rem;*/
}

.title .title_top li img {
    width: 100%;
    height: 100%;
}
.van-notice-bar--withicon {
    box-sizing: border-box;
}
.echars-sw {
}
.van-swipe-item-wrap {
    height: 100%;
    overflow: auto;
}
</style>
