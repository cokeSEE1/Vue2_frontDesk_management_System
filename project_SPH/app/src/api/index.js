// 这个模块进行 API的统一管理
import requests from "./request";

// 三级联动的接口
//  /api/product/getBaseCategoryList  get 无参数
import mockRequest from "./mockAjax"
import { method } from "lodash";
export const reqCategoryList = ()=>{
    // 发请求
   return requests({url:"/product/getBaseCategoryList",method:"get"})
}
// 获取首页轮播图的接口
// export const reqGetBannerList = ()=>mockRequest.get('./banner')
export const reqGetBannerList = ()=>{
    // 发请求
   return mockRequest({url:"/banner",method:"get"})
}
// 获取floor的数据
export const reqFloorList= ()=>{
    // 发请求
   return mockRequest({url:"/floor",method:"get"})
}
// 获取搜索模块的数据 地址/api/list 请求方式 post  需要带参数
// {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
//   }

// 当前函数要从外部传递参数
export const reqGetSearchInfo= (params)=>requests({
    url:"/list",
    method:"post",
    // 当前这个函数，给服务器传递params参数，至少是一个空对象
    data:params
})
// 获取商品详情的AJAX 接口地址 /api/item/{ skuId } 请求的方式 GET  
export const reqGoodsInfo =(skuId)=>requests({
    url:`/item/ ${skuId}`,
    method:'get'
})
// 将产品添加到购物车中 获取更新某一产品的个数
// /api/cart/addToCart/{ skuId }/{ skuNum }
// post
 export const reqAddOrUpdateShopCar=(skuId,skuNum)=>requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method:"post"
 })
//  获取购物车列表的数据接口
// url /api/cart/cartList   get
export const reqCartList =()=>requests({
    url:"/cart/cartList",
    method:"get"
})
// 删除购物产品的接口
// /api/cart/deleteCart/{skuId}  DELETE
export const reqDeleteCartById = (skuId)=>requests({
    url:`/cart/deleteCart/${skuId}`,
    method:"delete"
})
// 修改商品的选中状态
// /api/cart/checkCart/{skuId}/{isChecked}  GET
export const reqUpdateCheckedById=(skuId,isChecked)=>requests({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})
// 获取验证码的
export const reqGetCode=(phone)=>requests({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
})
// 注册接口
// url /api/user/passport/register post   参数 phone手机号 password密码 code验证码
    export const reqUserRegister =(data)=>requests({
        url:'/user/passport/register',
        // 带的参数
        data:data,
        method:'post'
    }) 
// 登录接口
// url /api/user/passport/login  post 参数 phone password
export const reqUserLogin=(data)=>requests({
    url:'/user/passport/login',
    method:'post',
    data,
})
// 获取用户信息 需要带着用户的token向服务器要用户的信息
// URL /api/user/passport/auth/getUserInfo   get 
export const reqUserInfo=()=>requests({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
})
// 退出登录
// /api/user/passport/logout get
export const reqLogin=()=>requests({
    url:'/user/passport/logout',
    method:'get'
})
// 获取用户地址的信息
// url /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo=()=>requests({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
})
// 获取商品清单 url  /api/order/auth/trade  get
export const reqOrderInfo=()=>requests({
    url:'/order/auth/trade',
    method:'get'
})
// 提交订单的接口
// url /api/order/auth/submitOrder?tradeNo={tradeNo}  post 
export const reqSubmitOrder=(tradeNo,data)=>requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'post',
    data
})
// 获取订单支付的信息
// url /api/payment/weixin/createNative/{orderId}   get
 export const reqPayInfo=(orderId)=>requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
 })
//  获取支付订单状态
// url /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayState=(orderId)=>requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})
// 获取个人中心的数据
// url /api/order/auth/{page}/{limit}  get 
export const reqMyOrderList=(page,limit)=>requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})