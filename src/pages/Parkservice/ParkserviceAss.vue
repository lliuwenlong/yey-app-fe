<template>
    <div>
        <Head title="园务考核" />
        <van-cell-group>
            <van-row>
                <van-col span="24" class="Tc">投资人</van-col>
            </van-row>
        </van-cell-group>
        <van-cell-group v-for="(v,i) in list" :key="i" class="list" @click="showFn(v)">
            <van-row>
                <van-col span="12" class="Tl">{{v.name}}</van-col>
                <van-col span="12" class="Tr">第{{i+1}}名</van-col>
            </van-row>
        </van-cell-group>
    </div>
</template>

<script>
    import Head from '@/components/Header.vue'
    export default {
        components: {
            Head
        },
        data() {
            return {
                list: []
            }
        },
        methods:{
            getList(){
                this.axios.post('TeacherApp/statement',{
                    ji_id: this.$store.state.user.userInfo.jiId,
                }).then(res=>{
                    this.list=res.data.data
                })
            },
			showFn(v){
				this.$router.push({
					path:"/ParkserviceAdmin",
					query:{
						data:v,
					}
				})
			},
        },
        created(){
            this.getList();
        }

    }
</script>
<style lang='less' scoped>
    .van-cell-group {
        line-height: 30px;
        background-color: white;
        &:nth-of-type(3),&:nth-of-type(4),&:nth-of-type(5){
            background-repeat: no-repeat;
            background-position: 85% center;
            background-size: 20px;
        }
        &:nth-of-type(3){
            background-image: url('../../assets/images/top (1).png');
        }
        &:nth-of-type(4){
            background-image: url('../../assets/images/top (2).png');
        }
        &:nth-of-type(5){
            background-image: url('../../assets/images/top (3).png');
        }
        .van-row {
            padding: 5px 15px;
        }
    }
</style>
