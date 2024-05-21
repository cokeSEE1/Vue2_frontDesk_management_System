import {reqAddressInfo,reqOrderInfo} from '@/api/index'
const state={
      address:[],
      userOrderInfo:{}
}
const mutations={
    GETUSERADDRESS(state,value){
       state. address =value
    },
    GETUSERORDERINFO(state,value){
        state.userOrderInfo=value
        // console.log(value);
    }
}
const actions={
    // 获取用户地址信息
   async getUserAddress(context){
     let res= await  reqAddressInfo()
    //  console.log(res);
    if(res.code==200){
        context.commit('GETUSERADDRESS',res.data)
    }
    },
    // 获取用户订单信息
   async getUserOrderInfo(context){
      let res= await reqOrderInfo()
    //   console.log(res);
    if(res.code==200){
        context.commit('GETUSERORDERINFO',res.data)
    }
    }
}
const getters={}

export default{
    state,
    mutations,
    actions,
    getters
}