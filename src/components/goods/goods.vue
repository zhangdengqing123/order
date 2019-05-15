<template>
  <div class="goods" v-if="goods.length">
    <div v-dir1="cout" v-if="cout > 5">000</div> <!--自定义指定通过 directives-->
    <div class="menu-wrapper" ref="menus">
      <ul class="menu">
        <li class="menu-item"
          v-for="(item, index) of goods"
          :key="index"
          :class="{'current': currentIndex===index}"
          @click="selectMeun($event, index)"
        >
          <span class="text border-1px-t">
            <span class="icon" v-if="item.type > 0" :class="classMap[item.type]">
            </span>
            {{item.name}}
            <i class="textNum" v-if="item.count > 0">{{item.count}}</i>
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <ul>
        <li v-for="(item, index) of goods" :key="index" class="foods-list" ref="foodlist">
          <h1 class="foods-name">{{item.name}}</h1>
          <ul>
            <li @click="seledFood(food,$event)" v-for="food of item.foods" :key="food.name" class="food border-1px-t">
              <div class="foot-icon">
                <img width="2.85rem" height="2.85rem" :src="food.icon">
              </div>
              <div class="foot-content">
                <h2 class="title">{{food.name}}</h2>
                <p class="desc" v-show="food.description">
                  {{food.description}}
                </p>
                <div class="extra">
                  <span class="extra-y">月销{{food.sellCount}}份</span>
                  <span class="extra-g">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <div class="price-amount">
                    <span class="new-price"><span class="currency">￥</span>{{food.price}}</span>
                    <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control @add="addFood" :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopcart"></v-shopcart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import BScroll from 'better-scroll'
import ShopCart from '@/components/shopcart/shopcart'
import CartControl from '@/components/cartcontrol/cartcontrol'
import Food from '@/components/food/food'
export default {
  name: 'v-goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      listHeight: [],
      scrollY: 0,
      selectedFood: {},
      cout: 3,
      nums: 0
    }
  },
  directives: { // 自定义指令
    dir1: {
      bind (el, bindings, value, oldValue) {
        console.log('这是bind')
        console.log(value)
        el.innerHTML = bindings.value
      },
      update (el, bindings) {
        console.log('这里更新了')
        el.innerHTML = bindings.value
        if (bindings.value < 5) {
          console.log(bindings.value)
        }
      },
      unbind () {
        console.log('解除绑定')
      }
    }
  },
  components: {
    'v-shopcart': ShopCart,
    'cart-control': CartControl,
    'food': Food
  },
  methods: {
    seledFood (food, e) {
      this.selectedFood = food
      this.$refs.food.show() // 父组件调用子组件方法
    },
    getGoodsInfo () {
      axios.get('/api/goods?id=' + this.seller.id)
        .then(this.getGoodsInfoSucc)
    },
    getGoodsInfoSucc (response) {
      const ERR_OK = 0
      const res = response.data
      if (res.errno === ERR_OK && res.data) {
        let data = res.data
        this.$store.state.goods = data
        this._initScroll()
        this._calculateHeight()
      }
    },
    _initScroll () {
      this.$nextTick(function () {
        this.menuScroll = new BScroll(this.$refs.menus, {})
        this.foodScroll = new BScroll(this.$refs.foods, {
          probeType: 3 // 注释probeType: 1：滚动的时候会派发scroll事件，会截流。2：滚动的时候实时派发scroll事件，不会截流。3：除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        })
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y)) // 监听每次滚动的纵坐标位置
        })
      })
    },
    _calculateHeight () {
      this.$nextTick(() => {
        let foodList = this.$refs.foodlist
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight // 累加每个li里面的高度
          this.listHeight.push(height)
        }
        // console.log(this.listHeight) // 打印每次数组里面每个li累加高度的值
      })
    },
    selectMeun (event, index) {
      let foodList = this.$refs.foodlist
      let el = foodList[index]
      this.foodScroll.scrollToElement(el, 300)
    },
    addFood (target) {
      this._drop(target)
    },
    _drop (target) {
      this.$nextTick(() => { // 体验优化，异步执行下落动画
        this.$refs.shopcart.drop(target)
      })
    }
  },
  computed: {
    goods () {
      const goods = this.$store.state.goods
      let ret = []
      goods.forEach(good => {
        const {name, type, foods} = good
        let count = 0
        foods.forEach(food => {
          count += food.count || 0
        })
        ret.push({
          name,
          type,
          foods,
          count
        })
      })
      console.log(ret)
      return ret
    },
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) { // 遍历每个li累加的高度值
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1] // 获取与高度1区间范围
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.getGoodsInfo()
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixni.less';
.goods {
  display: flex;
  position: absolute;
  top: 8.7rem;
  bottom: 2.3rem;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 4rem;
    width: 4rem;
    background-color: #f3f5f7;
    .menu {
      color: #666;
      .menu-item {
        display: table;
        height: 2.7rem;
        width: 2.8rem;
        padding: 0 .6rem;
        line-height: .7rem;
        &.current{
          .text{
            color: red;
            font-weight: 700;
          }
        }
        .icon {
          display: inline-block;
          vertical-align: top;
          width: @12px;
          height: @12px;
          margin-right: .1rem;
          background-size: @12px @12px;
          background-repeat: no-repeat;
          &.decrease {
            .bg-image('@{goodsUrl}decrease_3');
          }
          &.discount {
            .bg-image('@{goodsUrl}discount_3');
          }
          &.special {
            .bg-image('@{goodsUrl}special_3');
          }
          &.invoice {
            .bg-image('@{goodsUrl}invoice_3');
          }
          &.guarantee {
            .bg-image('@{goodsUrl}guarantee_3');
          }
        }
        .text {
          display: table-cell;
          width: 2.8rem;
          vertical-align: middle;
          .border-1px-t(rgba(7, 17, 27, 0.1));
          font-size: .6rem;
          .textNum {
            display: inline-block;
            font-style: normal;
            font-weight: bold;
            color:#00b43c;
          }
        }
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .foods-list {
      .foods-name {
        padding-left: .7rem;
        height: 1.3rem;
        line-height: 1.3rem;
        border-left: solid 2px #d9dde1;
        font-size: .6rem;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
      }
      .food {
        display: flex;
        margin: .9rem;
        padding-bottom: .9rem;
        font-size: .6rem;
        .border-1px-t(rgba(7, 17, 27, .1));
        &:last-child {
         .border-none;
         margin-bottom: 0;
        }
        .foot-icon {
          flex: 0 0 2.85rem;
          width: 2.85rem;
          height: 2.85rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .foot-content {
          position: relative;
          flex: 1;
          margin: .1rem 0 0 .5rem;
          .title {
            height: .7rem;
            line-height: .7rem;
            color: rgb(7, 17, 27);
            font-size: .7rem;
            width: 6rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .desc{
            width: 6rem;
            margin-top: .4rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: .5rem;
            color: rgb(147, 153, 159);
          }
          .extra {
            font-size: 0;
            line-height: .5rem;
            margin-top: .4rem;
          }
          .extra-y, .extra-g {
            font-size: .5rem;
            padding-right: .6rem;
            box-sizing: border-box;
          }
          .price {
            display: flex;
            line-height: 1.2rem;
            .price-amount {
              font-size: 0;
              .new-price {
                font-size: .7rem;
                font-weight: 700;
                color: rgba(240, 20, 20);
                .currency {
                  font-weight: 700;
                  font-size: .5rem;
                }
              }
              .old-price {
                padding-left: .4rem;
                font-weight: 700;
                text-decoration:line-through;
                font-size: .5rem;
                color: rgb(147, 153, 159);
              }
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom:.2rem;
          }
        }
      }
    }
  }
}
</style>
