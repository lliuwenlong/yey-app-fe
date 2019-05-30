<!-- 添加共育 -->
<template>
    <div class='content'>
        <Head title="添加" right="保存" @click-right="onClickRight"/>
        <div class='contentQing'>
            <van-cell-group>
                <van-field
                    v-model="username"
                    label="课程名称："
                    placeholder="请输入课程名称"
                />
            </van-cell-group>
            <van-cell-group>
                <van-cell title="教材图片：">
                <template>
                <van-uploader :after-read="file=>onRead(file)" style="dicplay:inline-block" class="Tc">
                    {{file?file:'点击上传'}}
                </van-uploader>
                </template>
                </van-cell>
            </van-cell-group>
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
            username:'',
            file:"",
            img:""
        };
    },
    //方法集合
    methods: {
        onClickRight() {
            let savePost = {
                class: this.username,
                img: this.img,
                admin_id: this.$store.state.user.userInfo.admin_id
            }
			this.axios.post("/TeacherApp/Parentaladd",savePost).then(res=>{
                console.log(res.data.data)
            })
        },
        onRead(file){
            let data=new FormData;
            data.append("files", file.file);
            this.axios.post("/Staff/mu_add",data).then(res=>{
                this.file=file.file.name
                this.img=res.data.data
            })
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
.van-cell__title{
    max-width:90px;
}
.van-cell__value{
    text-align:left;
}
</style>