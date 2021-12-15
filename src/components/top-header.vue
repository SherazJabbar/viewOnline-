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
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  },

  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    async signOut() {
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
};
</script>

<style scoped></style>
