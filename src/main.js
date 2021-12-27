/* eslint-disable no-unused-vars */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import vuetify from "./plugins/vuetify";
import VueVideoPlayer from "vue-video-player";

// global register

Vue.use(VueVideoPlayer);

Vue.config.productionTip = false;
const firebaseConfig = {
  
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
