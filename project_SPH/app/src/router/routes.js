
// import MyHome from "@/pages/Home/MyHome"
// import MyLogin from "@/pages/Login"
// import MyRegister from "@/pages/Register"
// import MySearch from "@/pages/Search/MySearch"
// import Detail from "@/pages/Detail"
// import AddCartSuccess from "@/pages/AddCartSuccess"
// import ShopCart from "@/pages/ShopCart"
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// 引入二级路由
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
// 路由按需引入
export default [
    {
        path:"/center",
        component:()=>import('@/pages/Center'),
        meta:{show:true},
        // 二级路由组件
        children:[
            {
                path:'myOrder',
                component:myOrder
            },
            {
                path:'groupOrder',
                component:groupOrder
            },
            // 路由重定向
            {
                path:'/center',
                redirect:'/center/myOrder'
            }
        ]
    },
    {
        path:"/paysuccess",
        component:()=>import('@/pages/PaySuccess'),
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path=="/pay"){
                next()
            }else{
                // 停留在当前页面
                next(false)
            }
        }
    },
    {
        path:"/pay",
        component:()=>import('@/pages/Pay'),
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path=="/trade"){
                next()
            }else{
                // 停留在当前页面
                next(false)
            }
        }
        
    },
    {
        path:"/trade",
        component:()=>import('@/pages/Trade'),
        meta:{show:true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path=="/shopcart"){
                next()
            }else{
                next()
                // 停留在当前页面
                
            }
        }
    },
    {
        path:"/shopcart",
        component:()=>import('@/pages/ShopCart'),
        meta:{show:true}
    },
    {
        path:"/addcartsuccess",
        component:()=>import('@/pages/PaySuccess'),
        meta:{show:true}
    },
    {
        path:"/detail/:skuid",
        component:()=>import('@/pages/Detail'),
        meta:{show:true}
    },
    {
        path:"/home",
        component:()=>import('@/pages/Home/MyHome.vue'),
        meta:{show:true}
    },
    {
        path:"/login",
        component:()=>import('@/pages/Login'),
        meta:{show:false}


    },
    {
        path:"/register",
        component:()=>import('@/pages/Register'),
        meta:{show:false}
        
    },
    {   
        path:"/search/:keyword?",
        name:"search",
        component:()=>import('@/pages/Search/MySearch'),
        meta:{show:true}


    },
    // 配置路由重定项，当项目跑起来的时候，立马访问到首页
    {
        path:"*",
        redirect:"/home"
    }
 ]