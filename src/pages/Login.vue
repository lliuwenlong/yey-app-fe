<!-- 登陆 -->
<template>
    <div class='indexWrapper'>
        <div class="indexWrapper">
            <div class="main">
                <p><i class="i-shopping"></i></p>
                <p class="title">请登录</p>
                <section>
                    <form>
                        <p><i class="i-user"></i><input type="text" name="tel" v-model="username" placeholder="请输入用户名"></p>
                        <p><i class="i-mima01"></i><input type="password" name="password" v-model="password" placeholder="请输入密码"></p>
                        <p class="btnBox"><button type="button" @click="login">登录</button></p>
                    </form>
                </section>
            </div>
            <van-popup v-model="show" position="top" :overlay="true" style="height: 50px;line-height: 50px;text-align: center">
                {{message}}
            </van-popup>
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5';
import {mapMutations} from 'vuex';
export default {
    components: {},
    data() {
        return {
            username: '',
            password: '',
            message: '',
            show: false
        };
    },
    methods: {
        ...mapMutations('user', {setUserInfo: 'SET_STAFFID'}),
        login() {
            if (this.username === '') {
                this.message = '请输入用户名';
                this.show = true;
                return;
            }
            if (this.password === '') {
                this.message = '请输入密码';
                this.show = true;
                return;
            }
            this.axios.post('/Admin/login', {
                username: this.username,
                password: this.password,
                key: md5(`${this.username}${this.password}yey`)
            }).then(res => {
                const reponse = res.data;
                if (reponse.state === 1) {
                    localStorage.setItem('loginId', reponse.data.admin_id);
                    this.setUserInfo(reponse.data);
                    this.$router.push({path: '/'});
                } else {
                    this.message = reponse.msg;
                    this.show = true;
                }
            })
        }
    },
    created() {

    },
    mounted() {
        
    },
}
</script>
<style lang='less' scoped>
    //@import url(); 引入公共css类
    html,body,.indexWrapper{
        position: absolute;
        bottom: 0;
        top: 0;
        width: 100%;
        background: #F1F5F4;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    [class^="i-"]{
        font-family: "icon"!important;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        moz-osx-font-smoothing: grayscale;
    }
    .indexWrapper{
        display: flex;
        flex-direction: column;
        background: white;
    }
    .i-user, .i-mima01 {
        vertical-align: middle;
        position: relative;
        top: -2px;
    }
    .main{
        padding-top: 80px;
    }
    .main>p{
        text-align: center;
    }
    .main>p.title{
        font-size: 16px;
        letter-spacing: 2px;
        color: #ABB2BF;
        line-height: 100px;
    }
    .main .i-shopping{
        display: inline-block;
        font-size: 50px;
        color: #FE4318;
        border-bottom: 1px solid #FE4318;
        border-radius: 50%;
    }
    form>p{
        text-align: center;
        height: 50px;
        padding: 0 23%;
        box-sizing: border-box;
    }
    form>p.btnBox{
        padding: 0;
    }
    form>p>i{
        font-size: 22px;
        display: inline-block;
        width: 12%;
        padding-bottom: 5px;
        color: #FE4318;
        font-weight: 600;
        border-bottom: 1px solid #EDEEF2;
    }
    form>p>input{
        display: inline-block;
        width: 88%;
        padding-bottom: 5px;
        vertical-align: top;
        height: 28px;
        outline: none;
        padding-left: 10px;
        border: 0;
        border-bottom: 1px solid #EDEEF2;
        box-sizing: border-box;
    }
    .btnBox{
        margin-top: 30px;
    }
    .btnBox button{
        display: inline-block;
        width: 55%;
        line-height: 36px;
        border-radius: 18px;
        background: #FE5D3A;
        border: 0;
        color: white;
        letter-spacing: 2px;
        font-size: 14px;
        box-shadow: 0 3px 10px #FE927B;
    }
    .goTo{
        margin-top: 25px;
    }
    .goTo>a{
        color: #FE927B;
        letter-spacing: 1px;
    }
</style>