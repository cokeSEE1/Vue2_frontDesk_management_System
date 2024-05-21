import { reqGetSearchInfo } from "@/api"
const state={
    //仓库的初始值 
    searchList:{}
}
const mutations={
    GETSEARCHLIST(state,value){
       state.searchList=value
    }
}
const actions={
  async getSearchList(context,params){
    // 调用这个接口至少是一个空对象
    // params形参是当用户派发actions的时候第二个参数传过来的，至少是一个空对象
  let res= await reqGetSearchInfo(params)
//   console.log(res);
    if(res.code==200){
        context.commit("GETSEARCHLIST",res.data)
    }
   }
}
// 计算属性
// 主要的作用是简化仓库中的数据（简化数据而生）
const getters={
    // 加入网络不给力返回一个空数组 这样不会报错 因为如果不返回 后期遍历数组会出问题
    
    goodList(state){
        return state.searchList.goodsList||[]
    },
    trademark(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}