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
                <p>Register with your email and password:</p>
                <v-form>
                  <v-text-field
                    outline
                    label="Name"
                    type="text"
                    v-model="name"
                  ></v-text-field>
                  <v-text-field
                    outline
                    label="Email"
                    type="email"
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
                  Register</v-btn
                >
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../main";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      platformName: "Register",
    };
  },
  methods: {
    async pressed() {
      console.log("Pressed");
      try {
        const auth = getAuth();
        // eslint-disable-next-line no-unused-vars
        const user = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        await addDoc(collection(db, "users"), {
          name: this.name,
          email: this.email,
        });
        this.$router.replace({ path: "/" });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped></style>
