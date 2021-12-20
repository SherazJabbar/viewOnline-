<template>
  <div class="container">
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>View Online</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text><router-link to="/" tag="li">Home </router-link> </v-btn>
        <v-btn text> My PlayList </v-btn>
        <v-btn text
          ><router-link to="/register" tag="li">Register</router-link>
        </v-btn>
        <v-btn text v-show="loggedIn == false">
          <router-link to="/login" tag="li">Sign in</router-link>
        </v-btn>
        <v-btn text @click="signOut" v-show="loggedIn == true">Sign out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      loggedIn: false,
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
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>
