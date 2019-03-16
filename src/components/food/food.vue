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
         <v-split></v-split>
         <div class="rating">
           <h1 class="title">商品评价</h1>
           <ratingselect
              @increment="onSelectType"
              @toggle="toggleContent"
              :selec-type="selecType"
              :only-content="onlyContent"
              :desc="desc"
              :ratings="food.ratings">
            </ratingselect>
            <div class="rating-wraper">
              <ul class="" v-show="food.ratings && food.ratings.length">
                <li v-show="needShow(rating.rateType, rating.text)"
                    v-for="(rating, index) in food.ratings"
                    class="rating-item border-1px-t"
                    :key="index">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class="avatar" :src="rating.avatar" width="12" height="12"/>
                  </div>
                  <div class="time">{{rating.rateTime | formatDateY}}</div>
                  <p class="text">
                    <span :class="{'icon-thumb_up': rating.rateType===0,
                    'icon-thumb_down': rating.rateType===1}"></span>{{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
         </div>
      </div>
    </div>
  </transition>
</template>

<script type='text/ecmascript-6'>
import BScroll from 'better-scroll'
import { formatDate } from '@/common/js/date'
import Vue from 'vue'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import ratingselect from '@/components/ratingselect/ratingselect'
import Fade from '@/components/fade/fade'
import Split from '@/components/split/split'
const All = 2

export default {
  name: 'food',
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      foodFlag: false,
      selecType: All,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  components: {
    'v-fade': Fade,
    cartcontrol,
    ratingselect,
    'v-split': Split
  },
  filters: {
    formatDateY (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    show () {
      this.foodFlag = true
      this.selecType = All
      this.onlyContent = true
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
    },
    onSelectType (type) {
      console.log(type)
      this.selecType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toggleContent () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow (type, text) {
      if (this.onlyContent && !text) { // 判断只显示评价有内容，没有直接内容直接跳过
        return false
      }
      if (this.selecType === All) { // 判断显示所有内容，有或没有都显示
        return true
      } else {
        return type === this.selecType // 判断选择类型是否匹配
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import '../../common/less/mixni.less';
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
  .rating {
    padding-top: .9rem;
    .title {
      line-height: 0.7rem;
      margin-left: 0.9rem;
      font-size: 0.7rem;
      font-weight: 700;
      color: rgb(7, 17, 27);
    }
    .rating-wraper {
      padding: 0 .9rem;
      .rating-item {
        position: relative;
        padding: .8rem 0;
        .border-1px-t(rgba(7, 17, 27, .1));
        .user {
          position: absolute;
          right: 0;
          top: .8rem;
          line-height: .6rem;
          font-size:0;
          .name {
            display: inline-block;
            vertical-align: top;
            font-size: .5rem;
            color: rgb(147, 153, 159);
          }
          .avatar {
            margin-left: .3rem;
            border-radius: 50%;
          }
        }
        .time {
          margin-bottom: .3rem;
          line-height: .6rem;
          font-size: .5rem;
          color: rgb(147, 153, 159);
        }
        .text {
          line-height: .8rem;
          font-size: .6rem;
          color: rgb(7, 17, 27);
          .icon-thumb_up, .icon-thumb_down {
            line-height: .8rem;
            padding-right: .2rem;
            color: rgb(147, 153, 159);
          }
          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }
        }
      }
      .no-rating {
        padding: .8rem 0;
        font-size: .6rem;
        color: rgb(147, 153, 159);
      }
    }
  }
}
</style>
