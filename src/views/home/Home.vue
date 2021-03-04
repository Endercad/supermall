<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <tab-control :titles="['流行','新款','精选']" class="tab-control"
               @tabClick="tabClick" ref="tabControl1"
                :class="{fixed:isTabFixed}"
                v-show="isTabFixed"></tab-control >
  <scroll class="content"
          ref="scroll"
          :probe-type="3" :pullUpLoad="true"
          @scroll="contentScroll"
          @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']" class="tab-control"
                 @tabClick="tabClick" ref="tabControl2"></tab-control >
    <good-list :goods="showGoods"></good-list>
  </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
</div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  import Scroll from 'components/common/scroll/Scroll'

  import TabControl from "components/content/tabControl/TabControl";
  import BackTop from "components/content/backTop/BackTop";


  import HomeSwiper from './childComponents/HomeSwiper'
  import HomeRecommendView from "./childComponents/HomeRecommendView";
  import FeatureView from "./childComponents/FeatureView";

  import GoodList from "../../components/content/goods/GoodList";

  import {getHomeMultidata,getHomeGoods} from "network/home";

  import {debounce} from 'common/utils'

  import {itemListenerMixin} from "common/mixin";


  export default {
    name: "Home",

    components:{
      NavBar,
      TabControl,
      Scroll,
      BackTop,

      HomeSwiper,
      HomeRecommendView,
      FeatureView,

      GoodList
    },

    data(){
      return{
        banners:[],
        recommends:[],

        goods:{
          pop:{page:0,list:[]},
          new:{page:0,list:[]},
          sell:{page:0,list:[]},
        },
        currentType:'pop',

        scroll:null,

        isShowBackTop:false,
        isTabFixed:false,

        tabOffsetTop:0,

        saveY:0,

      }
    },

    mixins:[itemListenerMixin],

    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },

    created() {
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },

    mounted() {
      this.tabOffsetTop=this.$refs.tabControl
    },

    destroyed() {
      console.log('destroyed');
    },

    activated() {
      this.$refs.scroll.refresh()
      console.log('activated');
      this.$refs.scroll.scrollTo(0,this.saveY,0)

    },

    deactivated() {
      console.log('deactivated');
      this.saveY=this.$refs.scroll.scroll.y

      this.$bus.$off('itemImageLoad',this.itemImgListener())
    },

    methods:{
      /*********************网络请求方法****************/
      //1.请求多个数据
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          console.log(res);
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list
        })
      },

      //2.请求商品
      getHomeGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
         // console.log(this.goods[type].list);

          this.$refs.scroll.finishPullUp()
        })
      },

      /************响应事件方法***************/
      tabClick(index){
        switch(index){
          case 0:
            this.currentType='pop'
                break
          case 1:
            this.currentType='new'
                break
          case 2:
            this.currentType='sell'
                break
        }
        this.$refs.tabControl1.currentIndex=index
        this.$refs.tabControl2.currentIndex=index
      },

      backClick() {
        console.log("回到顶部");
        this.$refs.scroll.scrollTo(0, 0, 600)
      },

      contentScroll(position){
        //console.log(position);
        this.isShowBackTop=-position.y>1000
        this.isTabFixed=-position.y>this.tabOffsetTop
      },

      loadMore(){
        this.getHomeGoods(this.currentType)

        this.$refs.scroll.scroll.refresh()

      },

      swiperImageLoad(){
        //console.log(this.$refs.tabControl2.$el.offsetTop);
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      }

    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    /*position: relative;*/
  }

  .home-nav{
    background-color: var(--color-tint);
    color:white;

    position:fixed;
    left:0;
    right:0;
    top:0;
    z-index:9;
  }

  .tab-control{
    background-color: #fff;
    position:sticky;
    top:44px;
    z-index:9;

  }

  /*.content{*/
  /*  height:calc(100vh - 93px);*/
  /*  margin-top: 44px;*/
  /*  overflow-y: hidden;*/

  /*}*/

  .content{
    overflow: hidden;

    position:absolute;
    top: 44px;
    bottom:49px;
  }

  .fixed{
    position: fixed;
    left: 0;
    right:0;
    top:44px;
  }

</style>
