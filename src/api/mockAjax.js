import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css"
const requests = axios.create({
    baseURL: "/mock",
    timeout: 5000,
})
// 请求拦截器
requests.interceptors.request.use((config) => {
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