<template>
  <div>
    <div class="error" v-if="error">{{ error.message }}</div>
    <form @submit.prevent="pressed">
      Register

      <div class="email">
        <input
          type="email"
          name=""
          id=""
          v-model="email"
          placeholder="Enter your email"
        />
      </div>
      <div class="password">
        <input
          type="password"
          name=""
          id=""
          v-model="password"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
        const user = createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        this.$router.replace({ name: "secret" });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 18px;
}
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
</style>
