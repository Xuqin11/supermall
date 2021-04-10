<template>
  <div id="Detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComp/DetailNavBar'
import DetailSwiper from './childComp/DetailSwiper'
import DetailBaseInfo from './childComp/DetailBaseInfo'
import DetailShopInfo from './childComp/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods, Shop} from 'network/detail.js'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {}
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详细数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 1. 获取轮播图数据
      const data = res.result
      this.topImages = data.itemInfo.topImages

      // 2. 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3. 创建店铺信息
      this.shop = new Shop(data.shopInfo)
    })
  }
}
</script>

<style  scoped>
#Detail {
  position: relative;
  height: 100vh;
  z-index: 9;
  background-color: #fff;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>
