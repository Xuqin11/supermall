<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      Type: Number,
      default: 0
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      click: true,
      probeType: this.probeType,
      // pullUpLoad: true,
      // wheel: true,
      // scrollbar: true,
    })
    console.log(this.scroll);

    // 2.监听滚动对象
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll', position)
    })
  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll.scrollTo(x, y, time)
    },
  }
}
</script>

<style  scoped>

</style>
