// 对外暴露一个函数
// 存储
export const setToken =(token)=>{
    localStorage.setItem('TOKEN',token)
}
// 获取
export const getToken=()=>{
    return localStorage.getItem('TOKEN')
}

// 清除本地存储的token
export const removeToken=()=>{
    return localStorage.removeItem('TOKEN')
}