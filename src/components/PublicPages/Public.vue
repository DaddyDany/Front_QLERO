<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <div class="container">
          <b-navbar-brand href="/">ORDER</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav style="justify-content: end">
            <b-navbar-nav>
              <b-nav-item href="/login">Iniciar Sesión</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </div>
      </b-navbar>
    </div>
    <div class="container" style="margin-top: 50px">
      <h1>HOME PAGE</h1>
      <br />
      <a href="/signup">Registrarme</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
