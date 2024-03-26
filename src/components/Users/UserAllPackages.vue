<template>
  <div>
    <UserNavbar></UserNavbar>
    <div class="container" style="margin-top: 50px">
      <h1>Todos los paquetes</h1>
    </div>
  </div>
</template>

<script>
import UserNavbar from "./UserNavbar.vue";
export default {
  name: "UserAllPackages",
  components: {
    UserNavbar,
  },
};
</script>
<style></style>
