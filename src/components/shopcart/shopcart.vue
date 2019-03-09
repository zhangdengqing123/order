<template>
  <div class="shopcart" @click.stop="toggleList">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount>0}">
            <span class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalPricet>0}">￥{{totalPricet}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls" :key="ball.id">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click.stop.prevent="emptyClick">清空</span>
        </div>
        <div class="list-content" ref="contentList">
          <ul>
            <li class="food border-1px-t" v-for='food of foods' :key="food.id">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cart-control :food="food"></cart-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <v-fade>
      <div class="showBg" @click="hideList" v-show="listShow" slot="detailFade"></div>
    </v-fade>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import CartControl from '@/components/cartcontrol/cartcontrol'
import Fade from '@/components/fade/fade'
export default {
  name: 'v-shopcart',
  data () {
    return {
      balls: [
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false}
      ],
      dropBalls: [],
      fold: true,
      listShow: false
    }
  },
  components: {
    'cart-control': CartControl,
    'v-fade': Fade
  },
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  methods: {
    drop (el) {
      console.log(el)
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect() // 元素上边距离页面边的距离
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px, 0, 0)`
        }
      }
    },
    dropping (el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight // 手动触发浏览器重绘
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = 'translate3d(0, 0, 0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    emptyClick () {
      this.foods.map(food => {
        food.count = 0
      })
    },
    hideList () {
      this.fold = false
    },
    pay () {
      if (this.totalPricet < this.minPrice) {
        return
      }
      alert(`支付${this.totalPricet}元`)
    }
  },
  computed: {
    totalPricet () {
      let total = 0
      // console.log(this.$store.getters.selectFoods)获取状态管理的getters数据
      this.foods.map((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.foods.map((food) => {
        count += food.count
      })
      return count
    },
    foods () {
      return this.$store.getters.selectFoods
    },
    payDesc () {
      if (this.totalPricet === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPricet < this.minPrice) {
        let diff = this.minPrice - this.totalPricet
        return `还差￥${diff}起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPricet < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  watch: {
    totalCount () {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
    },
    fold () {
      this.listShow = !this.fold
      if (this.listShow) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.contentList, {})
          } else {
            this.scroll.refresh()
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixni.less';
.shopcart {
  position: fixed;
  left: 0;
  bottom:0;
  z-index: 50;
  width: 100%;
  .content {
    display: flex;
    height: 100%;
    color: rgba(255, 255, 255, .4);
    background-color: #141d27;
    font-size: 0;
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -.5rem;
        margin: 0 .5rem;
        padding: .3rem;
        width: 2.8rem;
        height: 2.5rem;
        box-sizing: border-box;
        border-radius: 50%;
        background-color: #141d27;
        .logo {
          width: 100%;
          border-radius: 50%;
          text-align: center;
          background-color: #2b343c;
          &.highlight {
            background-color: rgb(0, 160, 220);
          }
          .icon-shopping_cart {
            line-height: 2.2rem;
            font-size: 1.2rem;
            color: #80858a;
            &.highlight {
              color: #fff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 1.2rem;
          height: .8rem;
          line-height: .9rem;
          border-radius: .8rem;
          font-size: .45rem;
          font-weight: 700;
          text-align: center;
          color: #fff;
          background-color: rgb(240, 20, 20);
          box-shadow: 0 .2rem .4rem 0 rgba(0, 0, 0, .4);
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: .6rem;
        line-height: 1.2rem;
        padding-right: .3rem;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, .1);
        font-size: .8rem;
        font-weight: 700;
        color: rgba(255, 255, 255, .4);
        &.highlight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        line-height: 1.2rem;
        margin: .6rem 0 0 .3rem;
        font-size: .5rem;
      }
    }
    .content-right {
      flex: 0 0 5.25rem;
      width: 5.25rem;
      .pay {
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        font-size: .6rem;
        font-weight: 700;
        &.not-enough {
          background: #2b333b;
        }
        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
    }
  }
  .shopcart-list {
    background-color: #f3f5f7;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
    &.fold-enter-active, &.fold-leave-active {
      transition: all .5s;
    }
    &.fold-enter, &.fold-leave-to {
      transform: translate3d(0, 0, 0);
    }
    .list-header {
      height: 2rem;
      line-height: 2rem;
      padding: 0 .8rem;
      border-bottom: solid 1px rgba(0, 17, 27, 0.1);
      background-color: #f3f5f7;
      .title {
        float: left;
        font-size: .7rem;
        font-weight: @fw200;
        color: rgb(7, 17, 27);
      }
      .empty {
        float: right;
        font-size: .6rem;
        color: rgb(0, 160, 220);
      }
    }
    .list-content {
      padding: 0 .9rem;
      max-height: 217px;
      overflow: hidden;
      background-color: #fff;
      .food {
        position: relative;
        padding: .6rem 0;
        box-sizing: border-box;
        .border-1px-t(rgba(7, 17, 27, 0.1));
        .name {
          line-height: 1.2rem;
          font-size: .7rem;
          color: rgb(7, 17, 27);
        }
        .price {
          position: absolute;
          right: 4.5rem;
          bottom: .6rem;
          line-height: 1.2rem;
          font-size: .7rem;
          font-weight: 700;
          color: rgb(200, 20, 20);
        }
        .cartcontrol-wrapper{
          position: absolute;
          right: 0;
          bottom: .5rem;
        }
      }
    }
  }
  .showBg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -40;
    opacity: 1;
    background: rgba(7, 17, 27, .6);
    backdrop-filter: blur(10px);
    &.fade-enter-active, &.fade-leave-active{
      transition: all 0.5s;
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
