import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-type"
export default {
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      let oldProduct=null
      for(let item of context.state.cartList){
        if (item.iid===payload.iid){
          oldProduct=item
          break;
        }
      }
      if(oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      }
      else{
        payload.count=1
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新商品')
      }
    })
  }
}
