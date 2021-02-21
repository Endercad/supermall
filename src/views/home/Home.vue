<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <home-swiper :banners="banners"></home-swiper>
  <home-recommend-view :recommends="recommends"></home-recommend-view>
  <feature-view></feature-view>
  <tab-control :titles="['流行','新款','精选']" class="tab-control"></tab-control >
  <ul>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
    <li>Liebiao</li>
  </ul>
</div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";

  import HomeSwiper from './childComponents/HomeSwiper'
  import HomeRecommendView from "./childComponents/HomeRecommendView";
  import FeatureView from "./childComponents/FeatureView";

  import {getHomeMultidata} from "network/home";


  export default {
    name: "Home",
    components:{
      NavBar,
      TabControl,

      HomeSwiper,
      HomeRecommendView,
      FeatureView
    },
    data(){
      return{
        banners:[],
        recommends:[]
      }
    },
    created() {
      //1.请求多个数据
      getHomeMultidata().then(res=>{
        console.log(res);
        this.banners=res.data.banner.list
        this.recommends=res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  #home{
    padding-top:44px;
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

  }

</style>
