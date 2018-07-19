// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from "axios";
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate, { inject: false })




Object.defineProperties(Vue.prototype, {
  '$http': {
    get() {
      return axios;
    }
  },

  axios: {
    get() {
      return axios;
    }
  },

  '$discourse': {
    get() {
      return {
        url: "localhost",
        port: 1337
      };
    }
  }
});

const namespace = "v1/admin";
axios.defaults.baseURL = "http://localhost:3000/" + namespace;
axios.defaults.timeout = 3000;

Vue.config.productionTip = false

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
