<template>
  <div>
   <Header></Header>
   <!-- 路由组件出口 -->
  
   <router-view></router-view>
  <MyFooter v-show="$route.meta.show"/>
  </div>
  
</template>

<script>
import Header from "./components/Header/MyHeader"
import MyFooter from "./components/Footer/MyFooter.vue";
export default {
      name:"App",
      components:{
            Header,
            MyFooter
      },
      mounted(){
             // 通知vuex发请求 获取数据存储到仓库当中
            //  派发一个action 获取三级列表中的数据
        this.$store.dispatch("categoryList")
      }
}

</script>

<style>
 
</style>