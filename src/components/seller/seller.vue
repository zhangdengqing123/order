<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px-b">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <div class="remark">
          <div class="block">
            <span class="title">起送价</span>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
              <span class="unit">元</span>
            </div>
          </div>
          <div class="block">
            <span class="title">商家配送</span>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>
              <span class="unit">元</span>
            </div>
          </div>
          <div class="block">
            <span class="title">平均配送时间</span>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>
              <span class="unit">分钟</span>
            </div>
          </div>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px-t">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
           <li class="supports-item" v-for="(item, index) of seller.supports" :key="index">
              <span class="icons" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
           </li>
         </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import star from '@/components/star/star'
import split from '@/components/split/split'
import axios from 'axios'
export default {
  name: 'v-seller',
  components: {
    star,
    split
  },
  methods: {
    getSellerInfo () {
      axios.get('/api/seller')
        .then(this.getSellerInfoSucc)
    },
    getSellerInfoSucc (response) {
      const ERR_OK = 0
      const res = response.data
      if (res.errno === ERR_OK && res.data) {
        let data = res.data
        this.$store.state.seller = data
      }
    }
  },
  computed: {
    seller () {
      return this.$store.state.seller
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.seller, {
      click: true
    })
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.getSellerInfo()
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixni.less';

.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .seller-content {
    .overview {
      padding: .9rem;
      .title {
        margin-bottom: .4rem;
        line-height: .7rem;
        font-size: .7rem;
        color: rgb(7, 17, 27);
      }
      .desc {
        padding-bottom:.9rem;
        font-size: 0;
        .border-1px-t(rgba(7, 17, 27, 0.1));
        .star {
          display: inline-block;
          vertical-align: top;
        }
        .text {
          display: inline-block;
          vertical-align: top;
          line-height: .9rem;
          font-size: .5rem;
          color: rgb(77, 85, 93);
          &:nth-child(2) {
            margin-left: .4rem;
          }
          &:nth-child(3) {
            margin-left: .6rem;
          }
        }
      }
      .remark {
        display: flex;
        margin-top: .9rem;
        .block {
          flex: 1;
          text-align: center;
          border-right: solid 1px rgba(7, 17, 27, 0.1);
          .title {
            line-height: .5rem;
            font-size: .5rem;
            color: rgb(147, 153, 159);
          }
          .content {
            line-height: 1.2rem;
            padding-top: .2rem;
            font-size: 0;
            .stress {
              display: inline-block;
              font-size: 1.2rem;
              font-weight: 200;
              color: rgb(7, 17, 27);
            }
            .unit {
              display: inline-block;
              font-size: .5rem;
            }
          }
          &:last-child {
            border: none;
          }
        }
      }
    }
    .bulletin {
      padding: .9rem .9rem 0 .9rem;
      .title {
        margin-bottom: .4rem;
        line-height: .7rem;
        font-size: .7rem;
        color: rgb(7, 17, 27);
      }
      .content-wrapper {
        padding: 0 .3rem .6rem .3rem;
        .border-1px-t(rgba(7, 17, 27, .1));
        .content {
          line-height: 1.2rem;
          text-align: justify;
          font-weight: 200;
          font-size: .6rem;
          color:rgb(240, 20, 20)
        }
      }
    }
    .supports {
      .supports-item {
        padding: .8rem .6rem;
        .border-1px-t(rgba(7, 17, 27, .1));
        font-size: 0;
        .icons {
          display: inline-block;
          vertical-align: top;
          width: @16px;
          height: @16px;
          margin-right: .2rem;
          background-size: @16px @16px;
          background-repeat: no-repeat;
          &.decrease {
            .bg-image('@{sellerUrl}decrease_2');
          }
          &.discount {
            .bg-image('@{sellerUrl}discount_2');
          }
          &.special {
            .bg-image('@{sellerUrl}special_2');
          }
          &.invoice {
            .bg-image('@{sellerUrl}invoice_2');
          }
          &.guarantee {
            .bg-image('@{sellerUrl}guarantee_2');
          }
        }
        .text {
          vertical-align: top;
          line-height: @16px;
          font-size: @12px;
          font-weight: @fw200;
          color: rgb(7, 17, 27);
        }
      }
    }
  }
}
</style>
