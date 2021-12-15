<template>
  <div>
    LoggedIn
    <span v-if="loggedIn">Yes</span>
    <span v-else>No</span>
    <div>
      <button @submit="signOut">Sign out</button>
    </div>
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
        const data = await signOut(auth);
        console.log(data);
        this.$router.replace({ name: "login" });
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    console.log("created");
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  },
};
</script>

<style scoped></style>
