<template>
  <transition name="move">
    <div v-show="foodFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.price}}</span>
          </div>
          <div class="price">
            <span class="now">
              <span class="currency">￥</span>
              {{food.price}}
            </span>
            <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <v-fade>
            <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count === 0" slot="detailFade">加入购物车</div>
          </v-fade>
        </div>
         <v-split v-show="food.info"></v-split>
         <div class="info" v-show="food.info">
           <h1 class="title">商品详情</h1>
           <p class="text">{{food.info}}</p>
         </div>
      </div>
    </div>
  </transition>
</template>

<script type='text/ecmascript-6'>
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import Fade from '@/components/fade/fade'
import Split from '@/components/split/split'

export default {
  name: 'food',
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      foodFlag: false
    }
  },
  components: {
    'v-fade': Fade,
    cartcontrol,
    'v-split': Split
  },
  methods: {
    show () {
      this.foodFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.foodFlag = false
    },
    addFirst (event) {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 2.5rem;
  width: 100%;
  z-index: 10;
  background: #fff;
  &.move-enter-active,
  &.move-leave-active {
    transition: all 0.3s linear;
  }
  &.move-enter,
  &.move-leave-active {
    transform: translate3d(100%, 0, 0);
  }
  .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .back {
      position: absolute;
      top: 0.5rem;
      left: 0;
      .icon-arrow_lift {
        display: block;
        font-size: 1rem;
        color: #fff;
      }
    }
  }
  .content {
    position: relative;
    padding: 0.9rem;
    .title {
      line-height: 0.7rem;
      margin-bottom: 0.4rem;
      font-size: 0.7rem;
      font-weight: 700;
      color: rgb(7, 17, 27);
    }
    .detail {
      margin-bottom: 0.9rem;
      line-height: 0.5rem;
      font-size: 0;
      .sell-count,
      .rating {
        font-size: 0.5rem;
        color: rgb(147, 153, 159);
      }
      .sell-count {
        margin-right: 0.6rem;
      }
    }
    .price {
      display: flex;
      line-height: 1.2rem;
      font-size: 0;
      .now {
        font-size: 0.7rem;
        font-weight: 700;
        color: rgba(240, 20, 20);
        .currency {
          font-weight: 700;
          font-size: 0.5rem;
        }
      }
      .old {
        padding-left: 0.4rem;
        font-weight: 700;
        text-decoration: line-through;
        font-size: 0.5rem;
        color: rgb(147, 153, 159);
      }
    }
    .cartcontrol-wrapper {
      position: absolute;
      right: 0.9rem;
      bottom: 0.9rem;
    }
    .buy {
      position: absolute;
      right: 0.9rem;
      bottom: 0.9rem;
      z-index: 10;
      height: 1.2rem;
      line-height: 1.2rem;
      padding: 0 0.6rem;
      box-sizing: border-box;
      border-radius: 0.6rem;
      font-size: 0.5rem;
      color: #fff;
      background: rgb(0, 160, 220);
    }
  }
  .info {
    padding: .9rem;
    .title {
      line-height: .7rem;
      padding-bottom: .6rem;
      font-size: .7rem;
      color: rgb(7, 17, 27);
    }
    .text {
      padding: 0 .8rem;
      font-size: .6rem;
      font-weight: 200;
      line-height: 1.2rem;
      text-align: justify;
      color: rgb(77, 85, 93);
    }
  }
}
</style>
