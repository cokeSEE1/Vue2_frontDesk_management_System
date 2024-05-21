import { reqAddOrUpdateShopCar, reqGoodsInfo } from "@/api"
// 封装游客身份模块 生成一个随机字符串
import { getUUID } from "@/utils/uuid_token"
const state={
    goodInfo:{},
    // 游客的临时身份
    uuid_token:getUUID()
}
const mutations={
    GETGOODINFO(state,value){
     state.goodInfo=value
    }
}
const actions={
    // 获取产品信息的action
   async getGoodInfo(context,skuId){
      let res=  await reqGoodsInfo(skuId)
      if(res.code==200){
        context.commit("GETGOODINFO",res.data)
      }
    },
    // 将产品添加到购物车中
       async addOrUpdateShopCar(context,{skuId,skuNum}){
       let res=  await reqAddOrUpdateShopCar(skuId,skuNum)
    //    加入购物车以后 前台将参数带给服务器
    //  服务器写入数据成功 并没有返回其他的数据 只是返回了code=200 代表此次操作成功
    // 因为服务器没有返回其余的数据 因此咱们也不需要三连环存储数据
    //    console.log(res);
       if(res.code==200){
        // 代表服务器加入购物车成功
       
        return "ok"
       }else{
       
        // 代表加入购物车失败
        return Promise.reject(new Error('faile'))
       
       }
        }
}
const getters={
    // 路径导航的简化
    categoryView(state){
        // 如果不加一个或者空对象 那么他的初始值为空 执行下列代码时会报错
        return state.goodInfo.categoryView||{}
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
       
    },
    // 产品售卖属性的简化
    squSaleAttrList( state){
        return state.goodInfo.spuSaleAttrList
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}