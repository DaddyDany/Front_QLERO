<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <div class="container">
        <b-navbar-brand href="#">ORDER</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav style="justify-content: end">
          <b-navbar-nav>
            <b-nav-item href="/user">Home</b-nav-item>
            <b-nav-item href="/user-services">Servicios</b-nav-item>
            <b-nav-item href="/user-all-packages"
              >Todos los paquetes</b-nav-item
            >
            <b-nav-item href="/user-combos">Combos</b-nav-item>
            <b-nav-item href="/user-orders">Mis ordenes</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>Usuario</em>
              </template>
              <b-dropdown-item href="/user-profile">Perfil</b-dropdown-item>
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
  name: "UserNavbar",
  methods: {
    cerrarSesion() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
