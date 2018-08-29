<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">{{title}}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'bulletin-info',
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  display: flex;
  width: 80%;
  margin: 1.4rem auto 1.2rem auto;
  .line {
    flex: 1;
    position: relative;
    top: -.3rem;
    border-bottom: solid 1px rgba(255, 255, 255, .2);
  }
  .text {
    padding: 0 .6rem;
    font-size: .7rem;
    font-weight: 700;
  }
}
</style>
