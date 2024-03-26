<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <div class="container">
        <b-navbar-brand href="#">ORDER</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav style="justify-content: end">
          <b-navbar-nav>
            <b-nav-item href="/admin">Home</b-nav-item>
            <b-nav-item href="/services-admin">Servicios</b-nav-item>
            <b-nav-item href="/packages-admin">Paquetes</b-nav-item>
            <b-nav-item href="/combos-admin">Combos</b-nav-item>
            <b-nav-item href="/orders-admin">Pedidos</b-nav-item>
            <b-nav-item href="/admin-administrators"
              >Administradores</b-nav-item
            >
            <b-nav-item href="/admin-workers">Trabajadores</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>Usuario</em>
              </template>
              <b-dropdown-item href="/admin-profile">Perfil</b-dropdown-item>
              <b-dropdown-item @click="cerrarSesion"
                >Cerrar Sesión</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "AdminNavbar",
  methods: {
    cerrarSesion() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
