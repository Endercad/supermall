<template>
<div class="bottom-bar">
  <div class="check-content">
    <check-button class="check-button"
                  :is-check="isSelectAll"
                  @click.native="checkClick"/>
    <span>全选</span>
  </div>
  <div class="price">
    合计：{{totalPrice}}
  </div>
  <div class="calculate">
    去结算({{checkLength}})
  </div>
</div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton"

  import {mapGetters} from 'vuex'
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton,
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥'+ this.cartList.filter(item=>{
          return item.isCheck
        }).reduce((preValue,item)=>{
          return preValue+item.price*item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item=>item.isCheck).length
      },
      isSelectAll(){
        return (this.cartList.filter(item=>!item.isCheck).length)===0
      }
    },
    methods:{
      checkClick(){
         if(this.isSelectAll){
           this.cartList.forEach(item=>item.isCheck=false)
         }
         else{
           this.cartList.forEach(item=>item.isCheck=true)
         }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    height:40px;

    position: relative;
    line-height: 40px;

    display: flex;
  }
  .check-content{
    display: flex;
    align-items: center;
    width: 60px;
  }
  .check-button{
    width:20px;
    height: 20px;
    line-height: 20px;
  }
  .price{
    margin-left: 30px;
    flex:1;
  }
  .calculate{
    width:80px;
    text-align: center;
    background-color: #ee5b42;
    color: #fff;
  }
</style>
