<template>
  <div id="Detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll"
            :probeType=3>
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isBackTop"></back-top>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
import DetailNavBar from './childComp/DetailNavBar'
import DetailSwiper from './childComp/DetailSwiper'
import DetailBaseInfo from './childComp/DetailBaseInfo'
import DetailShopInfo from './childComp/DetailShopInfo'
import DetailGoodsInfo from './childComp/DetailGoodsInfo'
import DetailParamInfo from './childComp/DetailParamInfo'
import DetailCommentInfo from './childComp/DetailCommentInfo'
import DetailBottomBar from './childComp/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/common/backTop/BackTop'
import Toast from 'components/common/toast/Toast'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail.js'

import {debouce} from 'common/utils.js'

import {mapActions} from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Toast,
    Scroll,
    GoodsList,
    BackTop
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isBackTop: false,
      show: false,
      message: ''
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详细数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 1. 获取数据
      const data = res.result

      // 2. 获取轮播图数据
      this.topImages = data.itemInfo.topImages

      // 3. 创建商品对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 4. 取出店铺信息
      this.shop = new Shop(data.shopInfo)

      // 5. 取出商品详细信息
      this.detailInfo = data.detailInfo

      // 6. 获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 7.取出评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 3.请求推荐信息
    getRecommend().then(res => {
      // console.log(res.data.list);
      this.recommends = res.data.list
    })
  },
  updated() {
    
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.themeTopYs = []

      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - parseInt(44))
      // console.log(this.$refs.param.$el.offsetTop - parseInt(44));
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - parseInt(44))
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - parseInt(44))
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      // // console.log(position);
      let positionY = -position.y + 44
      let length = this.themeTopYs.length
      for(let i = 0; i < length - 1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
        // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i == length - 1 && positionY >= this.themeTopYs[i]))) {
        //   // console.log(i);
        //   this.currentIndex = i
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
      }
      this.isBackTop = (-position.y) > 1000

    },
    backClick() {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    addToCart() {
      // 1. 获取购物车需展示的信息
      const product = {}
      product.iid = this.iid
      product.imgUrl = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      console.log(product);

      // 2.将商品添加到购物车
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })

      this.addCart(product).then(res => {
        console.log(res);
        this.message = res
        this.show = true
        setTimeout(() => {
          this.message = ''
          this.show = false
        }, 1500)
      })
    }
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
  height: calc(100% - 44px - 58px);
}
</style>
