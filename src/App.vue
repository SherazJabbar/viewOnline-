<template>
  <v-app>
    <app-header></app-header>
    <router-view></router-view>
  </v-app>
</template>
<script>
import Header from "./components/Header.vue";

export default {
  components: { "app-header": Header },
};
</script>

<style>
div {
  font-family: "Lato", sans-serif;
}
</style>
