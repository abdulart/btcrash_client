import Vue from 'vue';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
