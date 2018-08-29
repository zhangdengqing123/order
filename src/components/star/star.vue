<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass, index) of itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  name: 'detail-star',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2 // 计算后台传过来评分数据并向下取整
      let hasDecimal = score % 1 !== 0 // 判断后台传过来的评分数据是不是带小数点
      let integer = Math.floor(score) // 后台传过来评分数据向下取整
      for (let i = 0; i < integer; i++) { // 循环整数评分的个数
        result.push(CLS_ON) // 就把全星添加的数组里
      }
      if (hasDecimal) { // 判断评分是小数
        result.push(CLS_HALF) // 就把半星添加的数组里
      }
      while (result.length < LENGTH) { // 数组里的个数是不是小于初始个数
        result.push(CLS_OFF) // 就把空星添加的数组里
      }
      return result
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/mixni.less';
.star {
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      width: 1rem;
      height: 1rem;
      margin-right: 1.1rem;
      background-size: 1rem 1rem;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image('@{starUrl}star48_on');
      }
      &.half {
        .bg-image('@{starUrl}star48_half');
      }
      &.off {
        .bg-image('@{starUrl}star48_off');
      }
    }
  }
  &.star-36 {
    .star-item {
      width: .75rem;
      height: .75rem;
      margin-right: .3rem;
      background-size: .75rem .75rem;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image('@{starUrl}star36_on');
      }
      &.half {
        .bg-image('@{starUrl}star36_half');
      }
      &.off {
        .bg-image('@{starUrl}star36_off');
      }
    }
  }
  &.star-24 {
    .star-item {
      width: .5rem;
      height: .5rem;
      margin-right: .075rem;
      background-size: .5rem .5rem;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image('@{starUrl}star24_on');
      }
      &.half {
        .bg-image('@{starUrl}star24_half');
      }
      &.off {
        .bg-image('@{starUrl}star24_off');
      }
    }
  }
}
</style>
