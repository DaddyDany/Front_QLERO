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
        <h1>Registro de usuario</h1>
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
            <b-form-input
              id="input-1"
              type="text"
              v-model="form.userName"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Apellido Paterno:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              type="text"
              v-model="form.userFirstLastName"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Apellido Materno:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              type="text"
              v-model="form.userSecondLastName"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-6"
            label="Numero celular:"
            label-for="input-6"
          >
            <b-form-input
              id="input-6"
              type="number"
              v-model="form.userCellphone"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-5" label="Correo:" label-for="input-5">
            <b-form-input
              id="input-5"
              type="email"
              v-model="form.userEmail"
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
              v-model="form.userPassword"
              type="password"
              required
            ></b-form-input>
          </b-form-group>
          <br />
          <b-button type="submit" variant="primary">Registrar</b-button>
          <b-button @click="onReset" variant="danger">Limpiar</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        userName: "",
        userFirstLastName: "",
        userSecondLastName: "",
        userEmail: "",
        userPassword: "",
        userCellphone: null,
      },
    };
  },
  methods: {
    onSubmit() {
      const apiUrl = "http://localhost:8080/api/accounts/create-common";
      axios
        .post(apiUrl, this.form)
        .then((response) => {
          this.clearFields();
          this.$swal({
            title: "Accion realizada con exito",
            text: "La cuenta ha sido creada",
            icon: "success",
          });
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error("Error al registrar usuario: ", error);
        });
    },
    onReset() {
      this.clearFields();
    },
    clearFields() {
      this.form.userName = "";
      this.form.userFirstLastName = "";
      this.form.userSecondLastName = "";
      this.form.userEmail = "";
      this.form.userPassword = "";
      this.form.userCellphone = null;
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
