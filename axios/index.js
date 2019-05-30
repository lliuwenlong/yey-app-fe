import axios from 'axios'
import qs from 'qs'
// import {
//   Message
// } from 'element-ui';

/** **** 创建axios实例 ******/

const service = axios.create({
  // baseURL: '/static/Api', 
  baseURL: '/Api',
  // baseURL: 'http://192.168.43.107/Api',
  // baseURL:'http://192.168.2.4:80/Api',
  // baseURL:'',
  // baseURL:'/index.php/Api',
  timeout: 5000 // 请求超时时间
})

/** **** request拦截器==>对请求参数做处理 ******/

service.interceptors.request.use(config => {
  config.data = (config.data instanceof FormData) ? config.data : qs.stringify(config.data)
  return config;
}, error => { //请求错误处理
  return Promise.reject(error)
})

/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(response => {
    return response;
  },
  error => { //响应错误处理
    // Message({
    //   message: '数据异常',
    //   type: 'warning'
    // });
    return Promise.reject(error)
  }
);
export default service;