<template>
  <div id="app">
    <v-app :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }" id="inspire">
      <v-container>
        <v-layout wrap>
          <v-flex sm12 md6 offset-md3>
            <v-card elevation="4" light tag="section" class="mt-5">
              <v-card-title>
                <v-layout align-center justify-space-between>
                  <h3 class="headline">
                    {{ platformName }}
                  </h3>
                </v-layout>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p>Sign in with your email and password:</p>
                <v-form>
                  <v-text-field
                    outline
                    label="Email"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    outline
                    hide-details
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>

                <v-btn
                  color="blue-grey lighten-4"
                  class="mt-4"
                  block
                  @click="pressed"
                >
                  Sign In</v-btn
                >
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
  <!-- <form @submit.prevent="pressed">
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
    </form> -->
  <!-- <div class="error" v-if="error">{{ error.message }}</div> -->
  <!-- <span
      >Need an account ? Click here to
      <router-link to="/register">Register</router-link></span
    > -->
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      darkTheme: true,
      platformName: "Sign In",
    };
  },
  methods: {
    async pressed() {
      console.log("pressed");
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
