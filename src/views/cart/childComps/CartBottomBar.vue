<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" 
                    :is-check="isSelectAll"
                    @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算:({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.check
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.check).length
    },
    isSelectAll() {
      if(this.$store.state.cartList.length === 0) return false

      // 1.第一种方法：filter 
      // return !(this.$store.state.cartList.filter(item => !item.check).length)

      // 2.第二种方法
      return !this.$store.state.cartList.find(item => !item.check)

      // 3.第三种方法：for循环遍历
      // for(let item of this.$store.state.cartList) {
      //   if(!item.check) {
      //     return false
      //   }
      // }
      // return true
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.check = false)
      } else {
        this.$store.state.cartList.forEach(item => item.check = true)
      }
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style  scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}

.check-content {
  display: flex;
  width: 60px;
  align-items: center;
  margin-left: 10px;
}

.check-button {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  line-height: 20px;
}

.price {
  flex: 1;
  margin-left: 20px;
  font-size: 15px;
}

.calculate {
  width: 90px;
  font-size: 15px;
  color: #fff;
  text-align: center;
  background-color: red;
}
</style>
