// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from '../axios/index';
// import ElementUI from 'element-ui';
import store from '../vuex';
import 'element-ui/lib/theme-chalk/index.css';
import {Table, TableColumn,Message, Row, Col, Upload, Input, Button} from 'element-ui';
import element from 'element-ui';
import 'lib-flexible';
import Vant from 'vant';
import 'vant/lib/index.css';
import moment from 'moment';
import echarts from 'echarts'

Vue.use(element);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Vant);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Input);
Vue.use(Button);

Vue.prototype.$message = Message;
Vue.prototype.$echarts = echarts;
Vue.prototype.moment = moment;
Vue.prototype.axios = axios;

Vue.config.productionTip = false;
router.beforeEach((toPath, from, next) => {
    const name = toPath.path.indexOf('/') === -1 ? toPath.path : toPath.path.slice(1);
    const to = {...toPath};
    if (to.name == null) {
        to.name = name;
    };
    let loginId = localStorage.getItem('loginId');
    if (loginId && !store.state.user.isLoading) {
        axios.post('/Admin/history', {
            user_id: loginId,
        }).then((res) => {
            if (res.data.state === 1) {
                store.commit('user/SET_LOGINSTSTE', true);
                store.commit('user/SET_STAFFID', res.data.data);
                next();
            };
        });
        return;
    }
    
    if (to.name.toLocaleLowerCase() === 'login' && loginId) {
        next({
            path: from.fullPath,
        });
        return;
    }
    if (loginId || to.name.toLocaleLowerCase() === 'login') {
        next();
    } else {
        to.name.toLocaleLowerCase() !== 'login' && next({
            path: '/Login',
        });
        store.commit('user/SET_STAFFID', {});
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
