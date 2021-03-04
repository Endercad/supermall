<template>
    <div id="detail">
      <detail-nav-bar class="nav-bar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :images-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-goods-param ref="params" :param-info="paramInfo"></detail-goods-param>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <good-list ref="recommend" :goods="recommends"></good-list>
      </scroll>
      <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    </div>
</template>

<script>
  import DetailNavBar from "./childComponents/DetailNavBar";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
  import DetailGoodsParam from "./childComponents/DetailGoodsParam";
  import DetailCommentInfo from "./childComponents/DetailCommentInfo";
  import DetailBottomBar from "./childComponents/DetailBottomBar";

  import Scroll from 'components/common/scroll/Scroll'
  import GoodList from "components/content/goods/GoodList";

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "network/detail";

  import {debounce} from "common/utils";

  import {itemListenerMixin} from "common/mixin";

  export default {
    name: "Detail",
    data(){
        return {
          iid:null,
          topImages:[],
          goods:{},
          shop:{},
          detailInfo:{},
          paramInfo:{},
          commentInfo: {},
          recommends:[],

          themeTopY:[],
          getThemeTopY:null,

          message:'',
          show:false,

        }
    },

    mixins:[itemListenerMixin],

    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailGoodsParam,
      DetailCommentInfo,
      DetailBottomBar,

      Scroll,
      GoodList,
    },

    created(){
      //保存传入的iid
      this.iid=this.$route.params.iid

      //请求详情页数据
      getDetail(this.iid).then(res=>{
        //console.log(res);
        const data=res.result
        //获取轮播图数据
        this.topImages=data.itemInfo.topImages

        //获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //获得店铺信息
        this.shop=new Shop(data.shopInfo)

        //获得商品的详情数据
        this.detailInfo=data.detailInfo

        //获得商品参数
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //获得评论信息
        if (data.rate.list) {//评论可能为空
          // console.log(data.rate.list[0]);
          this.commentInfo = data.rate.list[0];
        }

        this.getThemeTopY=debounce(()=>{
          this.themeTopY=[]

          this.themeTopY.push(0)
          this.themeTopY.push(this.$refs.params.$el.offsetTop)
          this.themeTopY.push(this.$refs.comment.$el.offsetTop)
          this.themeTopY.push(this.$refs.recommend.$el.offsetTop)

          console.log(this.themeTopY);
        })

        // this.$nextTick(()=>{
        //   //当图片没有加载完时，offsetTop的值是不对的
        //   this.themeTopY=[]
        //
        //   this.themeTopY.push(0)
        //   this.themeTopY.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        //
        // })
      })

      getRecommend().then(res=>{
        console.log(res);
        this.recommends=res.data.list
      })
    },

    mounted() {
    },

    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },

    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()

        this.getThemeTopY()
      },

      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopY[index],100)
      },

      contentScroll(position){
        const positionY=-position.y
        let tIndex=0
        for(let i=0;i<this.themeTopY.length;i++){
          if(this.themeTopY[i]<=positionY)
            tIndex=i
        }
        //console.log(tIndex);
        this.$refs.nav.currentIndex=tIndex
      },

      addToCart(){
        const product={}
        product.image=this.topImages[0]
        product.title=this.goods.title
        product.desc=this.goods.desc
        product.price=this.goods.readPrice
        product.iid=this.iid

        this.$store.dispatch('addCart',product).then(res=>{
          console.log(res);
          this.$toast.show(res,2000)
        })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position:relative;
    z-index:9;
    background-color: #fff;
    height: 100vh;
  }

  .nav-bar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    height:calc(100% - 44px);
  }
</style>
