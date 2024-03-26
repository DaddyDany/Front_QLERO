<template>
  <div>
    <AdminNavbar></AdminNavbar>
    <div class="container" style="margin-top: 50px">
      <h1>Admin Administradores</h1>
      <div class="login-container">
        <h1>Registro de administrador</h1>
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
            <b-form-input
              id="input-1"
              type="text"
              v-model="form.adminName"
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
              v-model="form.adminFirstLastName"
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
              v-model="form.adminSecondLastname"
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
              v-model="form.adminCellphone"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-5" label="Correo:" label-for="input-5">
            <b-form-input
              id="input-5"
              type="email"
              v-model="form.adminEmail"
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
              v-model="form.adminPassword"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-7"
            label="Numero de seguridad Social:"
            label-for="input-7"
          >
            <b-form-input
              id="input-7"
              type="number"
              v-model="form.adminSecurityNumber"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-8" label="Salario:" label-for="input-8">
            <b-form-input
              id="input-8"
              type="number"
              v-model="form.adminSalary"
              required
            ></b-form-input>
          </b-form-group>
          <br />
          <b-button type="submit" variant="primary">Registrar</b-button>
          <b-button @click="onReset" variant="danger">Limpiar</b-button>
        </b-form>
      </div>
      <TransitionGroup name="zoomDown" tag="div" class="row">
        <div
          class="col-3"
          v-for="admin in administrators"
          :key="admin.adminName"
        >
          <div>
            <b-card
              :title="admin.adminName"
              style="max-width: 20rem"
              class="mb-2"
            >
              <b-card-text class="description">
                {{ admin.adminEmail }}
              </b-card-text>
            </b-card>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./AdminNavbar.vue";
import axios from "axios";

export default {
  name: "AdminAdministrators",
  components: {
    AdminNavbar,
  },
  data() {
    return {
      form: {
        adminName: "",
        adminFirstLastName: "",
        adminSecondLastName: "",
        adminEmail: "",
        adminPassword: "",
        adminCellphone: null,
        adminSecurityNumber: null,
        adminSalary: null,
      },
      administrators: [],
    };
  },
  methods: {
    actualizarAdminstradores() {
      axios
        .get("http://localhost:8080/api/accounts/administrators")
        .then((response) => {
          this.administrators = response.data;
        })
        .catch((e) => {
          console.error("Error en la peticion: ", e);
        });
    },
    onSubmit() {
      const apiUrl = "http://localhost:8080/api/accounts/create-admin";
      axios
        .post(apiUrl, this.form)
        .then((response) => {
          this.clearFields();
          this.$swal({
            title: "Accion realizada con exito",
            text: "La cuenta de administrador ha sido creada",
            icon: "success",
          });
          this.actualizarAdminstradores();
        })
        .catch((error) => {
          console.error("Error al registrar administrador: ", error);
        });
    },
    onReset() {
      this.clearFields();
    },
    clearFields() {
      this.form.adminName = "";
      this.form.adminFirstLastName = "";
      this.form.adminSecondLastName = "";
      this.form.adminEmail = "";
      this.form.adminPassword = "";
      this.form.adminCellphone = null;
      this.form.adminSecurityNumber = null;
      this.form.adminSalary = null;
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/accounts/administrators")
      .then((response) => {
        this.administrators = response.data;
      })
      .catch((e) => {
        console.error("Error en la peticion: ", e);
      });
  },
};
</script>

<style>
.login-container {
  width: 30%;
}
</style>
