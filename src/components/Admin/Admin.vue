<template>
  <div>
    <AdminNavbar></AdminNavbar>
    <div class="container" style="margin-top: 50px">
      <h1>Bienvenido Administrador</h1>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./AdminNavbar.vue";

export default {
  name: "Admin",
  components: {
    AdminNavbar,
  },
};
</script>
<style></style>
