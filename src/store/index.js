import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goods: [],
    ratings: [],
    seller: []
  },
  getters: {
    selectFoods: state => {
      let foods = []
      state.goods.map(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  }
})
