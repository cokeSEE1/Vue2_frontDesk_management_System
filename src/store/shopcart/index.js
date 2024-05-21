import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api"

const state={
    cartList:[]
}
const mutations={
    GETCARTLIST(state,value){
        state.cartList=value
    }
}
const actions={
    // 获取购物车列表的数据
    async getCartList(context){
      let res= await reqCartList()
    //   console.log(res);
      if(res.code==200){
        context.commit("GETCARTLIST",res.data)
       
      }
    },
    // 删除购物车某个产品
     async deleteCartById(context,skuId){
        let res= await reqDeleteCartById(skuId)
        if(res.code==200){
          return "ok"
        }else{
          return Promise.reject(new Error('faile'))
        }
        },
     // 修改购物车勾选产品的勾选状态
    async updateCheckedById(context,{skuId,isChecked}){
    let res= await reqUpdateCheckedById(skuId,isChecked)
      if(res.code==200){
        return "ok"
      }else{
        return Promise.reject(new Error('faile'))
      }
     },
    //  修改全部产品的勾选状态
    updateAllCartIsChecked(context,isChecked){
      let promiseAll=[]
      // 
      console.log(context.state.cartList[0].cartInfoList);
     context.state.cartList[0].cartInfoList.forEach(item => {
     let promise= context.dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
     promiseAll.push(promise)
     });
     return Promise.all(promiseAll)
    },
    //  删除全部勾选的产品
    deleteAllCheckedCart(context){
      context.getters.cartList.cartInfoList.forEach(item => {
       item.isChecked==1?  context.dispatch('deleteCartById',item.skuId):''
      });
      
    }
}
const getters={
  cartList(state){
    return state.cartList[0]||{}
  },
  // 计算出来购物的数据
  // cartInfoList(state){
  //   return state.
  // }
}

export default{
    state,
    mutations,
    actions,
    getters
}