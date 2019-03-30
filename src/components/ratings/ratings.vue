<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h3 class="score">{{seller.score}}</h3>
          <p class="title">综合评分</p>
          <p class="rank">高于商家{{seller.rankRate}}%</p>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <detail-star :size="36" :score="seller.score"></detail-star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <detail-star :size="36" :score="seller.foodScore"></detail-star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
         @increment="onSelectType"
         @toggle="toggleContent"
         :onlyContent="onlyContent"
         :selecType="selecType"
         :ratings="ratings">
      </ratingselect>
      <div class="ratings-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType, rating.text)" v-for="(rating, index) of ratings" :key="index" class="rating-item border-1px-t">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar"/>
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <detail-star class="star" :size="24" :score="rating.score"></detail-star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="recommend-item" v-for="(item, index) of rating.recommend" :key="index">
                  {{item}}
                </span>
              </div>
              <div class="time">{{rating.rateTime | formatDateY}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Star from '@/components/star/star'
import Split from '@/components/split/split'
import { formatDate } from '@/common/js/date'
import axios from 'axios'
import RatingSelect from '@/components/ratingselect/ratingselect'
const All = 2

export default {
  name: 'v-ratings',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      selecType: All,
      onlyContent: true
    }
  },
  filters: {
    formatDateY (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh-mm')
    }
  },
  components: {
    'detail-star': Star,
    'split': Split,
    'ratingselect': RatingSelect
  },
  methods: {
    getRatingsInfo () {
      axios.get('/api/ratings')
        .then(this.getRatingsInfoSucc)
    },
    getRatingsInfoSucc (response) {
      const ERR_OK = 0
      const res = response.data
      if (res.errno === ERR_OK && res.data) {
        let data = res.data
        this.$store.state.ratings = data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    },
    onSelectType (type) {
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
  },
  computed: {
    ratings () {
      return this.$store.state.ratings
    }
  },
  created () {
    this.getRatingsInfo()
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixni.less';
.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .ratings-content {
    .overview{
      display: flex;
      padding: .9rem 0;
      .overview-left {
        width: 34%;
        flex: 0 0 34%;
        text-align: center;
        .score {
          line-height: 1.4rem;
          font-size: 1.2rem;
          color: rgb(255, 153, 0);
        }
        .title {
          padding-top: .3rem;
          line-height: .6rem;
          font-size:.6rem;
          color: rgb(7, 17, 27);
        }
        .rank {
          padding-top: .4rem;
          line-height: .5rem;
          font-size: .5rem;
          color: rgb(7, 17, 27);
        }
      }
      .overview-right {
        flex: 1;
        padding: 0 .8rem;
        border-left: solid 1px #ccc;
        .score-wrapper {
          font-size: 0;
          padding-bottom: .4rem;
          .title {
            display: inline-block;
            font-size: .6rem;
          }
          .star {
            display: inline-block;
            margin: 0 .3rem;
            vertical-align: top;
          }
          .score {
            line-height: .9rem;
            font-size: .6rem;
            color: rgb(255, 153, 0);
          }
        }
        .delivery-wrapper {
          font-size: 0;
          .title {
            display: inline-block;
            line-height: .9rem;
            font-size: .6rem;
            color: rgb(7, 17, 27);
          }
          .delivery {
            padding-left: .3rem;
            display: inline-block;
            line-height: .9rem;
            font-size: .6rem;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
    .ratings-wrapper {
      padding: 0 .9rem;
      .rating-item {
        display: flex;
        padding: .9rem 0;
        .border-1px-t(rgba(7, 17, 27, .1));
        .avatar {
          flex: 0 0 1.4rem;
          width: 1.4rem;
          margin-right: @12px;
          img {
            border-radius: 50%;
          }
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            margin-bottom: .2rem;
            line-height: @12px;
            font-size: @10px;
            color: rgb(7, 17, 27);
          }
          .star-wrapper {
            display: flex;
            margin-bottom: .3rem;
            font-size: 0;
            .star {
              display: inline-block;
              vertical-align: top;
            }
            .delivery {
              display: inline-block;
              margin-left: .3rem;
              vertical-align: top;
              line-height: @12px;
              font-size: @10px;
              font-weight: @fw200;
              color: rgb(147, 153, 159);
            }
          }
          .text {
            margin-bottom: .4rem;
            line-height: .9rem;
            font-size: @12px;
            color: rgb(7, 17, 27);
          }
          .recommend {
            font-size: 0;
            .icon-thumb_up {
              display: inline-block;
              margin-right: .3rem;
              line-height: .8rem;
              font-size: .6rem;
              color: rgb(0, 160, 220);
            }
            .recommend-item {
              display: inline-block;
              line-height: .8rem;
              margin:0 .4rem .2rem 0;
              padding: 0 .3rem;
              border: solid 1px rgba(7, 17, 27, .1);
              border-radius: 1px;
              font-size: .45rem;
              background: #fff;
              color: rgb(147, 153, 159);
            }
          }
          .time {
            position: absolute;
            top: 0;
            right: 0;
            line-height: @12px;
            font-size: @10px;
            font-weight: @fw200;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
}
</style>
