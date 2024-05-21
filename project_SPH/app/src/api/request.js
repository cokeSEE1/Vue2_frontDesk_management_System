import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css"
// 引入store
import store from "@/store";
const requests = axios.create({
    baseURL: "/api",
    timeout: 5000,
})
// 请求拦截器
requests.interceptors.request.use((config) => {
    if(store.state.detail.uuid_token){
        // 请求头添加一个字段（userTemId）和后台老师商量好的
        config.headers.userTempId=store.state.detail.uuid_token
    }
    // 需要携带token给服务器
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    nProgress.start();
    return config

})
// 响应拦截器
requests.interceptors.response.use((res) => {
    nProgress.done();
    
    return res.data

    // 返回成功的回调
}, (error) => {
    // 响应失败的回调
    return error
    // return Promise.reject(new Error("faile"))
})
// 对外暴露
export default requests;