import Vue from 'vue';



// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

import axios from 'axios';
import VueAxios from 'vue-axios';

import 'bootstrap'; // Import js file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import css file
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(fas);

import { ValidationObserver, ValidationProvider, localize, configure } from 'vee-validate/dist/vee-validate.full';

// import zh_TW from '@/assets/js/zh_TW.js';
import TW from 'vee-validate/dist/locale/zh_TW.json';
localize('zh_TW', TW);

import App from './App.vue';
import router from './router';
import '@/assets/scss/layout.scss';

Vue.config.productionTip = false;

Vue.component('loading', Loading);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.filter('money', function (num = 0) {
  let parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${parts.join('.')}`;
});

Vue.use(VueAxios, axios);

// 驗證表單 Class 設定
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
