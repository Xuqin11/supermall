import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  // mutation唯一的目的就是修改state中的状态
  // mutation中的每个方法尽可能完成的时间比较单一
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.check = true
    state.cartList.push(payload)
  }
}