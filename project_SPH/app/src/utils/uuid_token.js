import { v4 as uuidv4 } from 'uuid';
// 要生成一个随机字符串 且每次执行的时候都不能变化 游客身份持久存储
export const getUUID = ()=>{
    // 先从本地存储的地方获取uuid （看一下本地存储里面是否有）
  let uuid_token = localStorage.getItem("UUIDTOKEN")
//   如果没有
  if(!uuid_token){
    // 就生成游客的临时身份
    uuid_token=uuidv4()
    // 在本地存储一次
    localStorage.setItem("UUIDTOKEN",uuid_token)
  }
  return uuid_token
}