<!-- 聪明瞬间 -->
<template>
    <div class='content'>
        <Head title="聪明瞬间" />
        <div class="title">
            <div class="title_top" v-for='(a,v) in InvData' :key='v'>
                <p class="tit">{{a.addtime}}<span>{{a.title}}</span></p>
                <ul>
                    <li><img :src="'/public/img/'+a.img"></li>
                    <li><img :src="'/public/img/'+a.img1"></li>
                    <li><img :src="'/public/img/'+a.img2"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Head from '@/components/Header.vue'
export default {
//import引入的组件需要注入到对象中才能使用
    components: {
        Head
    },
    data() {
        //这里存放数据
        return {
            InvData:[],
        };
    },
    //方法集合
    methods: {
        init(){
            let saveGet = {
                user_id: this.$store.state.user.userInfo.admin_id
            }
            this.axios.post('/TeacherApp/student',saveGet)
            .then(res=> {
                this.InvData = res.data.data
                console.log(res.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.init()
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

.title {
  height: auto;
  width: 100%;
  color: rgb(51, 51, 51);
  font-family: "PingFang-SC-Light";
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  margin-bottom: 1.2rem;
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
  padding-top:10px;
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
</style>