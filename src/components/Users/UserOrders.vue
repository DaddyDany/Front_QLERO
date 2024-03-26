<template>
  <div>
    <UserNavbar></UserNavbar>
    <div class="container" style="margin-top: 50px">
      <h1>Mis ordenes</h1>
    </div>
  </div>
</template>

<script>
import UserNavbar from "./UserNavbar.vue";
export default {
  name: "UserOrders",
  components: {
    UserNavbar,
  },
};
</script>
<style></style>
