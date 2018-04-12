// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import SuiVue from 'semantic-ui-vue';
import App from './App';
import createStore from './vuex/store';

import router from './router';
import 'semantic-ui-css/semantic.min.css';
//  import { apolloProvider } from './vue-apollo';

Vue.use(SuiVue);
Vue.use(VueRouter);
Vue.use(Vuex);
const store = createStore();
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  // provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App)
}).$mount('#app');
