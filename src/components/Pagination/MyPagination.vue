<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)" >上一页</button>
    <button v-if="startNumAndEndNum.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>

    <button v-if="startNumAndEndNum.start>2">···</button>

    <button v-for="(page,index) in startNumAndEndNum.end"
     :key="index" v-if="page>=startNumAndEndNum.start"
     @click="$emit('getPageNo',page)"
     :class="{active:pageNo==page}"
     >{{ page }}</button>
   
    <button v-if="startNumAndEndNum.end<totalPage-1">···</button>
    <button v-if="startNumAndEndNum.end<totalPage"
    @click="$emit('getPageNo',totalPage)"
    :class="{active:pageNo==totalPage}"
    >{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
  

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
  
  <script>


    export default {
      name: "MyPagination",
      props:["pageNo","pageSize","total","continues"],
      computed:{
        totalPage(){
            return Math.ceil(this.total/this.pageSize)
        },
        // 计算出连续页码的起始页 与结束页 连续的页码至少是五页
        startNumAndEndNum(){
            const {continues,pageNo,totalPage} = this
            let start =0,end = 0;
            
            // 如果出现不正常的现象 【不够五页】
            // 总页数没有连续页码多
            if(continues > totalPage){
                
             start=1
             end=totalPage
            }else{
                // 正常现象总页码一定是大于五的
                start=pageNo-Math.floor( continues/2)
                end =pageNo+Math.floor( continues/2)
                // console.log( "end",end);
            }
            // 出现不正常的现象 start的数字出现负数
            if(start<1){
              start=1
              end= continues
            }
            // 出现不正常的现象 end的数字大于总页数
            if(end>totalPage){
                end=totalPage
                start=totalPage-continues
            }
            return { start,end}
        }
       }
    }
  </script>
  
  <style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>