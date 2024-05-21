<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="SearchParams.categoryName">
              {{ SearchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="SearchParams.keyword">
              {{ SearchParams.keyword
              }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌信息面包屑 -->
            <li class="with-x" v-if="SearchParams.trademark">
              {{ SearchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 交易信息属性面包屑 -->
            <li class="with-x" v-for="(attrValue,index) in SearchParams.props" :key="index">
              {{ attrValue.split(":")[1]
              }}<i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne}" @click="changeOrder(1)">
                  <a >综合<span v-show="isOne" >
                    <span v-show="isAsc">↑</span>
                    <span v-show="isDesc">↓</span>
                  </span>
                </a>
                </li>
                <li :class="{ active: isTwo}" @click="changeOrder(2)">
                  <a >价格<span v-show="isTwo" >
                    <span v-show="isAsc">↑</span>
                    <span v-show="isDesc">↓</span>
                  </span></a>
                </li>
               
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"
                      ><img v-lazy="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 测试分页器的数据 -->
          <MyPagination :pageNo="SearchParams.pageNo" 
          :pageSize="SearchParams.pageSize"
           :total="total" 
           :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
import MyPagination from "@/components/Pagination/MyPagination.vue";
export default {
  name: "MySearch",
  data() {
    return {
      // 带给服务器的参数
      SearchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        // 排序
        order: "1:desc",
        // 分页器用的 代表当前排序是第几页
        pageNo: 1,
        // 代表每一页展示数据的个数
        pageSize: 3,
        props: [],
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    // this.SearchParams.category1Id=this.$route.query.category1Id
    // this.SearchParams.category2Id=this.$route.query.category2Id
    // this.SearchParams.category3Id=this.$route.query.category3Id
    // this.SearchParams.categoryName=this.$route.query.categoryName
    // this.SearchParams.keyword=this.$route.query.keyword
    Object.assign(this.SearchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["goodList", "attrsList", "trademark"]),
    isOne(){
      return this.SearchParams.order.indexOf('1')!=-1
    },
    isTwo(){
      return this.SearchParams.order.indexOf('2')!=-1
    },
    isAsc(){
      return this.SearchParams.order.indexOf('asc')!=-1
    },
    isDesc(){
      return this.SearchParams.order.indexOf('desc')!=-1
    },
    // 获取search模块展示的数据
    ...mapState({
      total:state=>state.search.searchList.total

    })
  },
  methods: {
    getData() {
      this.$store.dispatch("getSearchList", this.SearchParams);
    },
    removeCategoryName() {
      // 带给服务器的参数可有可无的，如果属性为空的字段还会把数据带给服务器，
      // 但是如果把响应的字段变为undefined ，当前字段就不会带给服务器
      this.SearchParams.category1Id = undefined;
      this.SearchParams.category2Id = undefined;
      this.SearchParams.category3Id = undefined;
      this.SearchParams.categoryName = undefined;
      this.getData();
      // 地址栏也要改变，因此要进行路由跳转
     if(this.$route.params){
      this.$router.push({name:"search",params:this.$route.params})
     }
    },
    removeKeyword(){
      this.SearchParams.keyword=undefined
      this.getData();
      this.$bus.$emit("clear")
      if(this.$route.query){
      this.$router.push({name:"search",query:this.$route.query})
     }

    },
    removeTrademark(){
      this.SearchParams.trademark=undefined
      this.getData();
    },
    removeProps(index){
      // this.SearchParams.props=[]
      // this.getData();
      // console.log(index);
      this.SearchParams.props.splice(index,1)
      this.getData()
    },
    trademarkInfo(trademark){
     this.SearchParams.trademark=`${trademark.tmId}:${trademark.tmName}`
     this.getData()
    },
    attrInfo(attr,attrValue){
    //  console.log("fu",attr,attrValue);
    // 需要传入的props参数“属性id：属性值：属性名”
     let props=`${attr.attrId}:${attrValue}:${attr.attrName}`
    //  往data中的props数组中压数据
    // 要进行数组去重
    if(this.SearchParams.props.indexOf(props)==-1){
      this.SearchParams.props.push(props)
    this.getData()
    }
    
    },
    changeOrder(flag){
     let originOrder=this.SearchParams.order
     let originFlag=this.SearchParams.order.split(":")[0]
     let originSort=this.SearchParams.order.split(":")[1]
     let newOrder=''
     if(flag==originFlag){
      newOrder=`${originFlag}:${originSort=="desc"?"asc":"desc"}`
      
     }else{
      newOrder=`${flag}:${"desc"}`
     }
    //  将新的order赋予searchparams参数
    this.SearchParams.order=newOrder
    this.getData()
    },
    getPageNo(pageNo){
      this.SearchParams.pageNo=pageNo
      this.getData()
    }
   
  },
  watch: {
    $route(newValue, oldValue) {
      // 重新整理参数
      Object.assign(this.SearchParams, this.$route.query, this.$route.params);
      // 传给服务器
      this.getData();
      console.log(this.SearchParams);
      this.SearchParams.category1Id = "";
      this.SearchParams.category2Id = "";
      this.SearchParams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>