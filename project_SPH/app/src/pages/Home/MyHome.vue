<template>
  <div>
   
    <TypeNav></TypeNav>
    <ListContainer/>
    <ReCommend/>
    <MyRank/>
    <MyLike/>
    <MyFloor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <MyBrand/>
  </div>
 
</template>

<script>
import ListContainer from './ListContainer/ListContainer.vue'
import MyBrand from './MyBrand/MyBrand.vue'
import MyFloor from './MyFloor/MyFloor.vue'
import MyLike from './MyLike/MyLike.vue'
import MyRank from './MyRank/MyRank.vue'
import ReCommend from './ReCommend/ReCommend.vue'
import { mapState } from 'vuex'



export default {
    name:"MyHome",
    components:{
      ListContainer,
      ReCommend,
      MyRank,
      MyLike,
      MyFloor,
      MyBrand
    },
    mounted(){
      this.$store.dispatch("getFloorList")
     
    },
    computed:{
      ...mapState({
       floorList:state=>state.home.floorList
      })
    }
}
</script>

<style>

</style>