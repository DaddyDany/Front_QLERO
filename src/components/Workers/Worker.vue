<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <div class="container">
          <b-navbar-brand href="#">ORDER</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav style="justify-content: end">
            <b-navbar-nav>
              <b-nav-item href="#">Home</b-nav-item>
              <b-nav-item href="#">Asignaciones</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <em>Usuario</em>
                </template>
                <b-dropdown-item href="#">Perfil</b-dropdown-item>
                <b-dropdown-item @click="cerrarSesion"
                  >Cerrar Sesión</b-dropdown-item
                >
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </div>
      </b-navbar>
    </div>
    <div class="container" style="margin-top: 50px">
      <h1>Bienvenido Trabajador</h1>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    cerrarSesion() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
