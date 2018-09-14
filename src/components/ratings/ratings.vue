<template>
  <div class="ratings">
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
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from '@/components/star/star'
import Split from '@/components/split/split'
import axios from 'axios'
export default {
  name: 'v-ratings',
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    'detail-star': Star,
    'split': Split
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
.ratings {
  width: 100%;
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
  }
}
</style>
