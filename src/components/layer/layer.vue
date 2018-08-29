<template>
  <div class="detail">
    <div class="detail-wrapper clearfix">
       <div class="content">
         <h1 class="name">{{detail.name}}</h1>
         <div class="star-wrapper">
           <detail-star :size="48" :score="detail.score"></detail-star>
         </div>
         <bulletin-info :title="bulletin[0]"></bulletin-info>
         <ul v-if="detail.supports" class="supports">
           <li class="supports-item" v-for="(item, index) of detail.supports" :key="index">
              <span class="icons" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
           </li>
         </ul>
         <bulletin-info :title="bulletin[1]"></bulletin-info>
         <p class="bulletin-text">{{detail.bulletin}}</p>
       </div>
    </div>
    <div class="detail-close" @click="detailClick">
      <span class="icon-close"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from '../star/star'
import BulletinInfo from './bulletinInfo/bulletinInfo'
export default {
  name: 'v-layer',
  data () {
    return {
      bulletin: ['优惠信息', '商家公告']
    }
  },
  props: {
    detail: {
      type: Object
    },
    classMap: {
      type: Array
    }
  },
  components: {
    'detail-star': Star,
    'bulletin-info': BulletinInfo
  },
  methods: {
    detailClick () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixni.less';
.detail {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(.7, 17, 27, .8);
  color: #fff;
  .detail-wrapper {
    width: 100%;
    min-height: 100%;
    .content {
      margin-top: 3.2rem;
      padding-bottom: 3.2rem;
      box-sizing:border-box;
      .name {
        line-height: .8rem;
        text-align: center;
        font-size: .8rem;
        font-weight: 700;
      }
      .star-wrapper {
        margin-top: .9rem;
        padding: .1rem 0;
        text-align: center;
      }
      .supports {
        width: 80%;
        margin: 0 auto;
        .supports-item {
          padding: 0 .6rem;
          margin-bottom: .6rem;
          font-weight: 200;
          font-size: 0;
          &:last-child {
            margin-bottom: 0;
          }
          .icons {
            display: inline-block;
            vertical-align: top;
            width: .8rem;
            height: .8rem;
            margin-right: .3rem;
            background-size: .8rem .8rem;
            background-repeat: no-repeat;
            &.decrease {
            .bg-image('@{iconUrl}decrease_2');
            }
            &.discount {
            .bg-image('@{iconUrl}discount_2');
            }
            &.special {
            .bg-image('@{iconUrl}special_2');
            }
            &.invoice {
            .bg-image('@{iconUrl}invoice_2');
            }
            &.guarantee {
            .bg-image('@{iconUrl}guarantee_2');
            }
          }
          .text {
            line-height: .8rem;
            font-size: .6rem;
          }
        }
      }
      .bulletin-text {
        width: 80%;
        margin: 0 auto;
        padding: 0 .6rem;
        line-height: 1.2rem;
        font-size: .6rem;
        font-weight: 200;
        box-sizing: border-box;
      }
    }
  }
  .detail-close {
    position: relative;
    margin-top: -3.2rem;
    height: 3.2rem;
    line-height: 3.2rem;
    clear: both;
    text-align: center;
    font-size: 1.6rem;
    color: rgba(255, 255, 255, .5);
  }
}
</style>
