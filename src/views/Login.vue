<template>
  <div>
    Login

    <form @submit.prevent="pressed">
      <div class="login">
        <input type="email" name="" id="" placeholder="Login" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    pressed() {
      alert("hi");
    },
  },
};
</script>

<style scoped></style>
