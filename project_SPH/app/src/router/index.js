// 配置 路由的地方
import Vue from "vue"
import VueRouter from 'vue-router'
import routes from "./routes"
// 引入store
import store from "@/store"
// 使用插件
Vue.use(VueRouter)

let router= new VueRouter({
     routes,
     scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return {y:0 }
      },
})

// 全局路由守卫 前置守卫
router.beforeEach(async (to, from, next) => {
  // next()
 let token= store.state.user.token
 let name=store.state.user.userInfo.name
 if(token){
  // 用户已经登录了还想去首页 不能去 只能停留在首页
  if(to.path=='/login'){
    next('/')
  }else{
    // 登陆了 但去的不是login
    if(name){
      next()
    }else{
      // 没有用户信息 派发action 让仓库，储存用户信息再跳转
     try {
      // 获取用户信息 成功后放行
      await store.dispatch('getUserInfo')
      next()
     } catch (error) {
      // token失效了 获取不到用户的信息 重新登录
      // 清除token 
      await store.dispatch('userLogout')
      next('/login')
     }
    }
    
  }
 }else{
  // 未登录 不能去交易相关 支付相关 pay paysuccess 不能去个人中心
  // 未登录时 去上面的路由就去 登录路由
  // 不是上面这些就放行
  let toPath= to.path
  if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
    next('/login?redirect='+toPath)
  }else{
    next()
  }
  
 }
})

export default router