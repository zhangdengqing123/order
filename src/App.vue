<template>
  <div id="app">
    <my-header :seller="seller"></my-header>
    <div class="tab border-1px-t">
      <div class="tab-item">
        <router-link :to="{name: 'goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name: 'ratings'}">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name: 'seller'}">商家</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
import header from '@/components/header/header'
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      seller: {}
    }
  },
  components: {
    'my-header': header
  },
  methods: {
    getSellerInfo () {
      axios.get('/api/seller')
        .then(this.getSellerInfoSucc)
        .catch(this.geSellertInfoErr)
    },
    getSellerInfoSucc (response) {
      const ERR_OK = 0
      const res = response.data
      if (res.errno === ERR_OK && res.data) {
        this.seller = res.data
        console.log(this.seller)
      }
    },
    geSellertInfoErr (err) {
      console.log('Error', err.message)
    }
  },
  created () {
    this.getSellerInfo()
  }
}
</script>

<style lang="less" scoped>
@import './common/less/mixni.less';
@import './common/less/base.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .tab {
    display: flex;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    .border-1px-t(rgba(7, 17, 27, 0.1));
    background-color: #fff;
    .tab-item {
      flex: 1;
      text-align: center;
      & > a {
        width: 100%;
        height: 100%;
        display: block;
        font-size: .7rem;
        color: rgb(77, 85, 93);
        &.active {
          color: rgb(200, 20, 20);
        }
      }
    }
  }
}
</style>
