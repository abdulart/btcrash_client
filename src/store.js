import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    setUser(state, user) {
      this.state.user = user;
    },
    setMoney(state, money) {
      this.state.user.rub = money;
    },
  },
  actions: {

  },
});
