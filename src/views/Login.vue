<template>
  <div>
    Login

    <form @submit.prevent="pressed">
      <div class="login">
        <input type="email" name="" id="" placeholder="Login" v-model="email" />
      </div>
      <div class="password">
        <input
          type="password"
          name=""
          id=""
          placeholder="password"
          v-model="password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
    <div class="error" v-if="error">{{ error.message }}</div>
    <span
      >Need an account ? Click here to
      <router-link to="/register">Register</router-link></span
    >
  </div>
</template>
//dgdfgd
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async pressed() {
      try {
        const auth = getAuth();
        // eslint-disable-next-line no-unused-vars
        const val = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        this.$router.replace({ name: "secret" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
button {
  width: 400px;
  height: 75px;
  font-size: 100%;
}
.error {
  color: red;
}
</style>
