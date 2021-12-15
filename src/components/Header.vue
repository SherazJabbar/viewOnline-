<template>
  <v-card class="container">
    <v-tabs color="deep-purple accent-4" v-model="activeTab" right>
      <v-tab>Login</v-tab>
      <v-tab>SignUp</v-tab>
      <v-tab>Abstract</v-tab>

      <v-tabs-items v-model="activeTab">
        <v-tab-item> <app-login></app-login> </v-tab-item>
        <v-tab-item> <p>signup</p> </v-tab-item>
        <v-tab-item> <p>Abstract</p> </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-card>
</template>

<script>
import Login from "../views/Login.vue";

export default {
  data() {
    return {
      activeTab: "",
    };
  },
  components: { "app-login": Login },
};
</script>
