/* eslint-disable no-unused-vars */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import vuetify from "./plugins/vuetify";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
const firebaseConfig = {
  apiKey: "AIzaSyB3nHO2L-ApcF-7iwEJxD3TqGtDv1XcdL0",
  authDomain: "vueproject-cc1b8.firebaseapp.com",
  databaseURL: "https://vueproject-cc1b8-default-rtdb.firebaseio.com",
  projectId: "vueproject-cc1b8",
  storageBucket: "vueproject-cc1b8.appspot.com",
  messagingSenderId: "765378679509",
  appId: "1:765378679509:web:26b3c8e60d9eb6a613885c",
  measurementId: "G-BK341SQ5PW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
