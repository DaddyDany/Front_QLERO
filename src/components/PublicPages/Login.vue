<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <div class="container">
          <b-navbar-brand href="/">ORDER</b-navbar-brand>
        </div>
      </b-navbar>
    </div>

    <div class="container-two">
      <div class="login-container">
        <h1>Inicio de sesión</h1>
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="input-group-1" label="Usuario:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.username"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Contraseña:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.password"
              type="password"
              required
            ></b-form-input>
          </b-form-group>
          <br />
          <b-button type="submit" variant="primary">Ingresar</b-button>
          <b-button @click="onReset" variant="danger">Limpiar</b-button>
        </b-form>
        <br />
        <p>No tienes cuenta? Crea una <a href="/signup">aqui</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      const apiUrl = "http://localhost:8080/api/auth/signin";
      axios
        .post(apiUrl, this.form)
        .then((response) => {
          localStorage.setItem("token", response.data.data);
          const decoded = jwtDecode(response.data.data);
          const role = decoded.roles[0].authority;
          this.redirectUser(role);
        })
        .catch((error) => {
          console.error("Error en el inicio de sesión: ", error);
        });
    },
    redirectUser(role) {
      if (role === "ADMIN") {
        this.$router.push("/admin");
      } else if (role === "COMMON_USER") {
        this.$router.push("/user");
      } else if (role === "WORKER") {
        this.$router.push("/worker");
      }
    },
    onReset() {
      this.form.username = "";
      this.form.password = "";
    },
  },
};
</script>

<style scoped>
.container-two {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 94vh;
}
.login-container {
  width: 30%;
}
</style>
