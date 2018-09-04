<template>
  <div class="cartcontrol">
    <transition name="move">
      <span class="cart-decrease icon-remove_circle_outline" @click="decreaseCart" v-show="food.count>0"></span>
    </transition>
    <span class="num" v-show="food.count>0">{{food.count}}</span>
    <span class="icon-add_circle" @click="addCart"></span>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
export default {
  name: 'cart-control',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCart () {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cartcontrol {
  margin-top: .25rem;
  font-size: 0;
  .num {
    display: inline-block;
    vertical-align: top;
    padding: 0 .4rem;
    line-height: 1.2rem;
    font-size: .5rem;
    color: rgb(147, 153, 159);
  }
  .icon-remove_circle_outline, .icon-add_circle {
    display: inline-block;
    line-height: 1.2rem;
    font-size: 1.2rem;
    color: rgb(0, 160, 220);
  }
  .cart-decrease {
    opacity: 1;
    transform: translate3D(0, 0, 0) rotate(0);
    &.move-enter-active, &.move-leave-active {
      transition: all .4s linear;
    }
    &.move-enter, &.move-leave-active {
      opacity: 0;
      transform: translate3D(24px, 0, 0) rotate(180deg);
    }
  }
}
</style>
