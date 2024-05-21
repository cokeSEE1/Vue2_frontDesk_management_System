import Vue from 'vue'
import App from './App.vue'
// 注册全局组件
import TypeNav from "@/components/TypeNav/TypeNav.vue"
// 引入样式
import "swiper/css/swiper.css"
// 引入路由
import router from '@/router'
// 引入mock
import "@/mock/mockServe";
// 引入全局轮播图
import MyCarousel from './components/Carousel/MyCarousel.vue'
// 引入仓库
import store from './store'
import MyPagination from './components/Pagination/MyPagination.vue'
// 统一接口api文件夹里面的全部请求函数
import * as API from '@/api'
import { Button,MessageBox } from 'element-ui';
// 引入表单校验插件
import'@/plugins/validate'
// 引入图片懒加载的插件
import VueLazyload from 'vue-lazyload'
// 引入图片
import mv from '@/assets/images/1.gif'
// 注册图片懒加载插件
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading: mv,
})
Vue.component(Button.name,Button)
// import { reqGetSearchInfo } from './api'
// console.log(reqGetSearchInfo({}));
Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(MyCarousel.name,MyCarousel)
Vue.component(MyPagination.name,MyPagination)
// element UI 注册组件的方法 挂载在组件原型上 
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert
const vm= new Vue({
  render: h => h(App),
  // 安装全局事件总线$bus
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },
  // 注册路由 组件身上都会多出$route,$router属性
  router,
  // 注册仓库 组件身上会多出$store属性
  store
}).$mount('#app')
console.log(vm);