<template>
  <div class="ratingselect">
    <div class="rating-type border-1px-t">
       <span class="block positive" @click="select(2, $event)" :class="{'active': selecType===2}">{{desc.all}}
         <span class="count">{{ratings.length}}</span>
       </span>
       <span class="block positive" @click="select(0, $event)" :class="{'active': selecType===0}">{{desc.positive}}
         <span class="count">{{positives.length}}</span>
       </span>
       <span class="block negative" @click="select(1, $event)" :class="{'active': selecType===1}">{{desc.negative}}
         <span class="count">{{negatives.length}}</span>
        </span>
    </div>
    <div @click="onContent" class="switch" :class="{'on': onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const POSITIVE = 0
const NEGATIVE = 1
const All = 2
export default {
  data () {
    return {
      selectType: 2
    }
  },
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selecType: {
      type: Number,
      default: All
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => {
        console.log(rating.rateType)
        return rating.rateType === POSITIVE
      })
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select (type, event) {
      if (!event._constructed) {
        return
      }
      this.$emit('increment', type)
    },
    onContent (event) {
      if (!event._constructed) {
        return
      }
      this.$emit('toggle')
    }
  }
}
</script>

<style lang='less' scoped>
@import '../../common/less/mixni.less';
.ratingselect {
  .rating-type {
    margin: 0 .9rem;
    padding: .9rem 0;
    .border-1px-t(rgba(7, 17, 27, .1));
    font-size: 0;
    .block {
      display: inline-block;
      padding: .4rem .6rem;
      margin-right: .4rem;
      line-height: .8rem;
      border-radius: .0.05rem;
      color: rgb(77, 85, 93);
      &.active {
        color: #fff;
      }
      font-size: .6rem;
      .count {
        margin-left: .1rem;
        font-size: .4rem;
      }
    &.positive {
      background-color: rgba(0, 160, 220, 0.2);
      &.active {
        background: rgb(0, 160, 220);
      }
    }
    &.negative {
      background-color: rgba(77, 85, 93, 0.2);
      &.active {
        background: rgb(77, 85, 93);
      }
    }
    }
  }
  .switch {
    padding: .6rem .9rem;
    line-height: 1.2rem;
    border-bottom: .05rem solid rgba(7, 17, 27, .1);
    color: rgb(147, 153, 159);
    font-size: 0;
    &.on{
      .icon-check_circle {
        color: #00c850;
      }
    }
    .icon-check_circle {
      display: inline-block;
      vertical-align: top;
      margin-right: .2rem;
      font-size: 1.2rem;
    }
    .text {
      display: inline-block;
      vertical-align: top;
      font-size: .6rem;
    }
  }
}
</style>
