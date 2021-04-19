import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 查找之前的数组中是否含有该商品，也可以用for循环的方法
      // 如果含有，则oldproduct的值为item
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) { // 数量加1
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量加1')
      } else {  //添加新的商品
       payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('加入购物车成功')
      }
    })
  }
}