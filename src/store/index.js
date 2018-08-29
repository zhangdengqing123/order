import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    seller: {}
  },
  getters: {
    rseult: state => {
      console.log(state.seller)
    }
  }
})
