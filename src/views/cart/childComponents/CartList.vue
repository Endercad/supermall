<template>
    <div class="cart-list">
      <scroll class="content">
        <cart-item v-for="(item,index) in cartList"
                   :product="item"
                   :key="index"></cart-item>
      </scroll>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import Scroll from "components/common/scroll/Scroll";

  import CartItem from "./CartItem";

  export default {
    name: "CartList",
    components:{
      Scroll,

      CartItem,
    },
    computed:{
      ...mapGetters(['cartList'])
    }
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100vh - 44px - 49px - 40px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
