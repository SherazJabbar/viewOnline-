/* eslint-disable no-unused-vars */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import vuetify from "./plugins/vuetify";
import VueVideoPlayer from "vue-video-player";
import VueFormulate from "@braid/vue-formulate";

Vue.use(VueFormulate);
Vue.use(VueVideoPlayer);

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

import { getFirestore } from "firebase/firestore";

export const db = getFirestore();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
