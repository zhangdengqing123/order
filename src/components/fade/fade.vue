<template>
  <transition name="fade">
     <slot name="detailFade"></slot>
  </transition >
</template>

<script type="text/ecmascript-6">
export default {
  name: 'v-fade'
}
</script>

<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
  backdrop-filter: blur(10px);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
