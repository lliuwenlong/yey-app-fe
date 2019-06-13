<template>
    <div class="EatShow">
        <Head title="本周菜谱"></Head>
        <van-panel title="园所" desc="明日之星幼儿园" style="margin-bottom: 10px;"></van-panel>
        <van-panel title="营养成分" style="margin-bottom: 10px;">
            <ul class="ying">
                <li
                    v-for="(v,i) in ying"
                    :key="i"
                >{{chinese[i]}}:&nbsp;{{count[v]?count[v].toFixed(2):"___"}}</li>
            </ul>
        </van-panel>
        <van-tabs v-model="active" @change="load">
            <van-tab :title="moment(v.time).format('MM-DD')" v-for="(v,i) in times" :key="i"></van-tab>
        </van-tabs>
        <van-tabs v-model="active1" @change="load">
            <van-tab :title="v.time" v-for="(v,i) in times1" :key="i"></van-tab>
        </van-tabs>
        <van-panel :title="i" v-for="(v,i) in data" :key="i">
            <ul class="list">
                <li v-for="(vv,ii) in v" :key="ii">
                    <img :src="'/public/img/'+vv.img" alt>
                    <p>{{vv.name}}</p>
                </li>
            </ul>
        </van-panel>
    </div>
</template>

<script>
import moment from "moment";
import Head from "@/components/Header.vue";
export default {
    components: {
        Head
    },
    data() {
        return {
            count: "",
            active: 0,
            active1: 0,
            data: [],
            times: [],
            times1: [
                { time: "早餐" },
                { time: "早点" },
                { time: "午餐" },
                { time: "午点" },
                { time: "晚餐" }
            ],
            ying: [
                `energy`,
                `dan`,
                `zhi`,
                `tan`,
                `xian`,
                `weia`,
                `weib1`,
                `weib2`,
                `ni`,
                `weic`,
                `weie`,
                `gai`,
                `lin`,
                `jia`,
                `na`,
                `mei`,
                `tie`,
                `xin`,
                `xi`,
                `tong`,
                `bo`
            ],
            chinese: [
                "能量",
                "蛋白质",
                "脂肪",
                "碳水化合物",
                "膳食纤维",
                "维生素A",
                "维生素B1",
                "维生素B2",
                "尼克酸",
                "维生素C",
                "维生素E",
                "钙",
                "磷",
                "钾",
                "钠",
                "镁",
                "铁",
                "锌",
                "硒",
                "铜",
                "钼"
            ]
        };
    },
    methods: {
        load() {
            this.data = [];
            this.axios
                .post("/Diet/month_week", {
                    addtime: this.times[this.active].time,
                    time_type: this.active1,
                    garden_id: this.$route.query.garden_id
                })
                .then(res => {
                    this.data = res.data.data;
                });
        }
    },
    created() {
        this.axios.post("/Diet/month_week", this.$route.query).then(res=>{
            this.count=res.data.data.count;
        });
        this.axios.post("Diet/monthfood", this.$route.query).then(res => {
            this.times = res.data.data;
            this.load();
        });
    }
};
</script>

<style lang="less" scoped>
.EatShow {
    .van-panel {
        margin-bottom: 2px;
    }

    .van-panel__content {
        overflow: hidden;
        padding-bottom: 5px;

        ul {
            &.ying {
                padding: 0 15px;

                li {
                    display: inline-block;
                    width: 115px;
                }
            }

            &.list {
                width: 100%;
                display: inline;
                white-space: nowrap;
                overflow-x: scroll;
                float: left;
                overflow-y: hidden;
                padding: 0 15px;

                li {
                    display: inline-block;
                    width: 80px;
                    margin-right: 10px;
                    text-align: center;

                    img {
                        width: 100%;
                        height: 80px;
                    }
                }
            }
        }
    }
}
</style>
