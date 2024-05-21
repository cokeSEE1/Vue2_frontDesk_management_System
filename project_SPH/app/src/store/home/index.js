import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/api"

const state={
    // state中的数据不可以瞎写，服务器返回对象，服务器返回数组。【根据接口返回值】
    categoryList:[],
    bannerList:[],
    floorList:[]
   
}
const mutations={
    CATEGORYLIST(state,value){
        state.categoryList=value;
        // console.log(value);
    },
    REQFETBANNERLIST(state,value){
        state.bannerList=value
    },
    REQFLOORLIST(state,value){
        state.floorList=value
    }
}
const actions={
    // 通过api的接口函数调用，向服务器发请求，获取服务器的数据
   async categoryList(context){
       let result = await  reqCategoryList()
    //    context.commit("CATEGORYLIST",result.data)
    //    console.log(result);
    //    commit("CATEGORYLIST",res.data)
       if(result.code==200){
        // console.log(1);
    //     context.commit("CATEGORYLIST",result.data)
        context.commit("CATEGORYLIST",result.data)

       }
    },
    async getbannerlist(context){
      let res= await reqGetBannerList()
      if(res.code==200){
        context.commit("REQFETBANNERLIST",res.data)
        // console.log(1);
      }
       
    },
   async getFloorList(context){
     let res= await reqFloorList()
     if(res.code==200){
        context.commit("REQFLOORLIST",res.data)
        // console.log(1);
      }
    }
}
const getters={}
// reqFloorList()
export default {
    state,
    mutations,
    actions,
    getters
}