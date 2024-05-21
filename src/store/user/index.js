// ?登录与注册模块
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogin} from '@/api/index'
import { setToken,getToken,removeToken } from '@/utils/token'
const state={
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations={
    GETCODE(state,value){
        state.code=value
    },
    USERLOGIN(state,value){
      state.token=value
    },
    GETUSERINFO(state,value){
      state.userInfo=value
    },
    CLEAR(state){
      // 帮仓库的相关用户信息清空
      state.token='',
      state.userInfo={},
      // 本地数据清空
      removeToken()
      
      
    }
}
const actions={
  // 获取验证码
   async getCode(context,phone){
      let res= await reqGetCode(phone)
    //   console.log(res);
      if(res.code==200){
        context.commit('GETCODE',res.data)
        return 'ok'
      }else{
        return Promise.reject(new Error('faile'))
      }
    },
    // 用户的注册
   async userRegister(context,user){
     let res= await reqUserRegister(user)
    //  console.log(res);
    if(res.code==200){
      return "ok"
    }else{
      return Promise.reject(new Error('faile'))
    }

    },
    // 用户登录
   async userLogin(context,data){
    let res= await reqUserLogin(data)
    // console.log(res);
    if(res.code==200){
      context.commit("USERLOGIN",res.data.token)
      // 本地存储 持久化存储token
      setToken(res.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
    },
    // 获取用户信息
   async getUserInfo(context){
    let res= await reqUserInfo()
    // console.log(res);
    if(res.code==200){
      // 提交用户的信息
      context.commit('GETUSERINFO',res.data)
     return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
    },
    // 退出登录
   async userLogout(context){
     let res= await reqLogin()
    //  console.log(res);
     if(res.code==200){
      // 清除前台的数据
      context.commit("CLEAR")
      return 'ok'
     }else{
      return Promise.reject(new Error('faile'))
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