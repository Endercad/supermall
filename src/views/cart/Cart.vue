<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  import CartList from "./childComponents/CartList";
  import CartBottomBar from "./childComponents/CartBottomBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "cart",
    components:{
      NavBar,

      CartList,
      CartBottomBar,
    },
    computed:{
      ...mapGetters(['cartLength','cartList'])
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color:white;

  }
</style>
