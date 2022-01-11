<template>
  <div>
    <v-toolbar flat>
      <v-btn icon @click="switchTheme()">
        <v-icon v-if="theme === themes[0]">mdi-weather-sunny</v-icon>
        <v-icon v-if="theme === themes[1]">mdi-weather-night</v-icon>
      </v-btn>
      <v-toolbar-title
        ><v-btn plain
          ><router-link to="/" tag="li">ViewOnline</router-link></v-btn
        ></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text><router-link to="/" tag="li">Home </router-link> </v-btn>
        <v-btn text v-if="loggedIn">
          <router-link to="/playlists" tag="li">My Playlist</router-link>
        </v-btn>
        <v-btn text v-show="isRegistered"
          ><router-link to="/register" tag="li">Register</router-link>
        </v-btn>
        <v-btn text v-show="loggedIn == false">
          <router-link to="/login" tag="li">Sign in</router-link>
        </v-btn>
        <v-btn text @click="signOut" v-show="loggedIn == true">Sign out</v-btn>
        <v-avatar color="grey lighten-1" class="mt-2" v-show="loggedIn">
          <span class="white--text text-h5">{{
            this.$store.state.userInitials
          }}</span>
        </v-avatar>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { mapState } from "vuex";

export default {
  data() {
    return {
      loggedIn: false,
      isRegistered: true,
    };
  },
  methods: {
    async signOut() {
      console.log("signout clicked");
      try {
        const auth = getAuth();
        await signOut(auth);
      } catch (error) {
        console.log(error);
      }
    },
    switchTheme() {
      if (this.theme === this.themes[0]) {
        this.theme = this.themes[1];
      } else if (this.theme === this.themes[1]) {
        this.theme = this.themes[0];
      }
      localStorage.setItem("theme", this.theme);
    },
  },
  computed: {
    ...mapState({
      themes: (state) => state.themes.themes,
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
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loggedIn = true;
        this.isRegistered = false;
      } else {
        this.loggedIn = false;
        this.isRegistered = true;
      }
    });
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
v-toolbar-title:hover {
  cursor: pointer;
}
.custom-dark,
.custom-dark .theme--dark.v-btn {
  color: var(--v-primary-base);
}
.v-avatar:hover {
  cursor: pointer;
}
</style>
