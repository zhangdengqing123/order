<template>
  <div class="shopcart">
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
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'v-shopcart',
  data () {
    return {
      active: false
    }
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
  computed: {
    totalPricet () {
      let total = 0
      // console.log(this.$store.getters.selectFoods)获取状态管理的getters数据
      this.$store.getters.selectFoods.map((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.$store.getters.selectFoods.map((food) => {
        count += food.count
      })
      return count
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
  }
}
</script>

<style lang="less" scoped>
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
          line-height: .8rem;
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
}
</style>
