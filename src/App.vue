<template>
  <v-app>
    <app-header></app-header>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { mediaJSON } from "./utils/util";
import { mapState } from "vuex";

export default {
  components: { "app-header": Header },
  computed: {
    ...mapState({
      themes: (state) => state.themes.themes,
      theme: (state) => state.themes.theme,
    }),
    theme: {
      get() {
        return this.$store.state.themes.theme;
      },
      set(newTheme) {
        this.$store.commit("setTheme", newTheme);
      },
    },
  },
  watch: {
    theme() {
      this.$vuetify.theme.dark = this.theme === this.themes[1];
    },
  },
  beforeMount() {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) {
        this.theme = stored;
      } else {
        this.theme = this.themes[0];
      }
      localStorage.setItem("theme", this.theme);
    } catch (err) {
      this.theme = this.themes[0];
      localStorage.setItem("theme", this.theme);
    }
  },
  created() {
    this.$vuetify.theme.dark = this.theme === this.themes[1];
    this.$store.commit("SET_UP_INITIAL_DATA", mediaJSON);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.$store.commit("UPDATE_USER", user);
      if (user) {
        this.$store.dispatch("GET_CURRENT_USER");
        this.$store.dispatch("GET_PLAYLIST");
      }
    });
  },
};
</script>

<style>
div {
  font-family: "Lato", sans-serif;
}
</style>
