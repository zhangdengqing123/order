<template>
  <div>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="3.2rem" height="3.2rem" :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="brand-name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="number" @click="showDetail">
        <span class="size">{{seller.supports.length}}个</span>
        <span class="icon icon-keyboard_arrow_right"></span>
     </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="icon"></span><!--
   --><span class="bulletin">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background-img">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
  </div>
    <v-fade>
      <v-layer v-show="layerDetail" @close="changeShow" :detail="seller" :classMap='classMap' slot="detailFade"></v-layer>
    </v-fade>
  </div>
</template>

<script type="text/ecmascript-6">
import Layer from '../layer/layer'
import Fade from '../fade/fade'
export default {
  name: 'my-header',
  data () {
    return {
      layerDetail: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    'v-layer': Layer,
    'v-fade': Fade
  },
  methods: {
    showDetail () {
      this.layerDetail = true
    },
    changeShow () {
      this.layerDetail = false
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}

</script>

<style lang="less" scoped>
@import '../../common/less/mixni.less';
.header {
  position: relative;
  overflow: hidden;
  color: @fsColor;
  background-color: rgba(.7, 17, 27, .5);
  .content-wrapper {
    position: relative;
    padding: 1.2rem 0.6rem .9rem 1.2rem;
    font-size: 0;
    .avatar {
      display: inline-block;
      vertical-align: top;
      margin-right: .8rem;
      img {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: .05rem;
      }
    }
    .content {
      position: relative;
      display: inline-block;
      .title {
        margin-top: .1rem;
        .brand {
          display: inline-block;
          vertical-align: top;
          width: 1.5rem;
          height: .9rem;
          margin-right: .3rem;
          .bg-image('@{iconUrl}brand');
          background-size: 1.5rem .9rem;
        }
        .brand-name {
          display: inline-block;
          line-height: .9rem;
          font-size: .8rem;
          font-weight: bold;
        }
      }
      .description {
        padding-top: .4rem;
        font-weight: @fw200;
        line-height: @12px;
        font-size: @12px;
        box-sizing: border-box;
      }
      .supports {
        padding-top: @10px;
        box-sizing: border-box;
        .icon {
          display: inline-block;
          vertical-align: top;
          width: @12px;
          height: @12px;
          margin-right: .2rem;
          background-size: @12px @12px;
          background-repeat: no-repeat;
          &.decrease {
            .bg-image('@{iconUrl}decrease_1');
          }
          &.discount {
            .bg-image('@{iconUrl}discount_1');
          }
          &.special {
            .bg-image('@{iconUrl}special_1');
          }
          &.invoice {
            .bg-image('@{iconUrl}invoice_1');
          }
          &.guarantee {
            .bg-image('@{iconUrl}guarantee_1');
          }
        }
        .text {
          line-height: @12px;
          font-size: @10px;
          font-weight: @fw200;
        }
      }
    }
    .number {
      position: absolute;
      right: .6rem;
      bottom: .75rem;
      padding: 0 .4rem;
      height: 1.2rem;
      line-height: 1.2rem;
      border-radius: .7rem;
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;
      .size {
        vertical-align: top;
        line-height: 1.2rem;
        font-weight: @fw200;
        font-size: @10px;
      }
      .icon {
        line-height: 1.2rem;
        margin-left: .1rem;
        font-size: @10px;
      }
    }
  }
  .bulletin-wrapper {
    position: relative;
    height: 1.4rem;
    padding: 0 1.1rem 0 .6rem;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
    background-color: rgba(7, 17, 27, 0.2);
    .icon {
      display: inline-block;
      vertical-align: top;
      margin-top: .4rem;
      width: 1.1rem;
      height: .6rem;
      .bg-image('@{iconUrl}bulletin');
      background-size: 1.1rem .6rem;
      background-repeat: no-repeat;
    }
    .bulletin {
      line-height: 1.4rem;
      margin: 0 .2rem;
      font-size: .5rem;
      font-weight: @fw200;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      font-size: @10px;
      top: .4rem;
      right: .4rem;
    }
  }
  .background-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: inherit;
    filter: blur(10px); // 图片模糊效果
  }
}
</style>
