<!-- 工作日志 -->
<template>
    <div class="content">
        <Head
            title="工作日志"
            left="返回"
            @click-left="onClickLeft"
            :right="$store.state.user.userInfo.roleStatus==4||$store.state.user.userInfo.roleStatus==7?'填写':''"
            @click-right="add"
        />
        <div>
            <Fil :day="true" :types="['park','post']" @change="confirm" all/>
        </div>
		<van-cell :title="`${item.addtime}_${item.staff_name}`" v-for="(item,index) in msg" :key="index" is-link @click="staffName(item)"/>
        <!-- <van-collapse v-model="activeNames" v-for="(item,index) in msg" :key="index" accordion>
            <van-collapse-item :title="index" :name="index">
                <div
                    v-for="(a,i) in item"
                    :key="i"
                    style="height:24px;font-size:14px;"
                    @click="staffName(a)"
                >{{a.staff_name}}</div>
            </van-collapse-item>
        </van-collapse> -->
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
            activeNames: ["1"]
        };
    },
    //方法集合
    methods: {
        onClickLeft() {
            history.go(-1);
        },
        staffName(a) {
            this.$router.push({
                path: "Logdetails",
                query: {
                    msgKey: a
                }
            });
        },
        inputClick() {
            this.show = true;
        },
        init() {
            this.confirm();
        },
        add() {
            this.$router.push("WorkLogAdd");
        },
        confirm(value={}) {
            let savePost = {
				staff_id:this.$store.state.user.userInfo.roleStatus==4||this.$store.state.user.userInfo.roleStatus==7?this.$store.state.user.userInfo.staff_id:null,
                addtime: value.day?value.day:null,
                garden_id: value.park?value.park.id:null,
                position_id: value.post?value.post.id:null,
            };
            this.axios.post("/TeacherApp/word_log", savePost).then(res => {
                if (res.data.data == null) {
                    this.msg = [];
                    this.$dialog
                        .alert({
                            message: "暂无数据"
                        })
                        .then(() => {
                            // on close
                        });
                } else {
                    this.msg = res.data.data;
                }
            });
        },
        onCancel() {
            this.show = false;
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.init();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {}
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.van-cell-group {
    width: 47%;
    margin: 10px 0 0 10px;
}

.footer {
    width: 100%;
    height: 6rem;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: -1;
}
</style>
