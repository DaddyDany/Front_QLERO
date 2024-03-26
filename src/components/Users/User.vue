<template>
  <div>
    <UserNavbar></UserNavbar>
    <div class="container" style="margin-top: 50px">
      <h1>Bienvenido Usuario Comun</h1>
    </div>
  </div>
</template>

<script>
import UserNavbar from "./UserNavbar.vue";
export default {
  name: "User",
  components: {
    UserNavbar,
  },
};
</script>
<style></style>
