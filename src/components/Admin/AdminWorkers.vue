<template>
  <div>
    <AdminNavbar></AdminNavbar>
    <div class="container" style="margin-top: 50px">
      <h1>Admin Trabajadores</h1>
      <div class="login-container">
        <h1>Registro de trabajadores</h1>
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
            <b-form-input
              id="input-1"
              type="text"
              v-model="form.workerName"
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
              v-model="form.workerFirstLastName"
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
              v-model="form.workerSecondLastName"
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
              v-model="form.workerCellphone"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-5" label="Correo:" label-for="input-5">
            <b-form-input
              id="input-5"
              type="email"
              v-model="form.workerEmail"
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
              v-model="form.workerPassword"
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
              v-model="form.workerSecurityNumber"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-8" label="Salario:" label-for="input-8">
            <b-form-input
              id="input-8"
              type="number"
              v-model="form.workerSalary"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-9"
            label="RFC del trabajador:"
            label-for="input-9"
          >
            <b-form-input
              id="input-9"
              type="text"
              v-model="form.workerRfc"
              required
            ></b-form-input>
          </b-form-group>
          <br />
          <b-button type="submit" variant="primary">Registrar</b-button>
          <b-button @click="onReset" variant="danger">Limpiar</b-button>
        </b-form>
      </div>
      <TransitionGroup name="zoomDown" tag="div" class="row">
        <div class="col-3" v-for="worker in workers" :key="worker.workerName">
          <div>
            <b-card
              :title="worker.workerName"
              style="max-width: 20rem"
              class="mb-2"
            >
              <b-card-text class="description">
                {{ worker.workerEmail }}
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
        workerName: "",
        workerFirstLastName: "",
        workerSecondLastName: "",
        workerEmail: "",
        workerPassword: "",
        workerCellphone: null,
        workerSecurityNumber: null,
        workerSalary: null,
        workerRfc: "",
      },
      workers: [],
    };
  },
  methods: {
    actualizarTrabajadores() {
      axios
        .get("http://localhost:8080/api/accounts/workers")
        .then((response) => {
          this.workers = response.data;
        })
        .catch((e) => {
          console.error("Error en la peticion: ", e);
        });
    },
    onSubmit() {
      const apiUrl = "http://localhost:8080/api/accounts/create-worker";
      axios
        .post(apiUrl, this.form)
        .then((response) => {
          this.clearFields();
          this.$swal({
            title: "Accion realizada con exito",
            text: "La cuenta de trabajador ha sido creada",
            icon: "success",
          });
          this.actualizarTrabajadores();
        })
        .catch((error) => {
          console.error("Error al registrar trabajador: ", error);
        });
    },
    onReset() {
      this.clearFields();
    },
    clearFields() {
      this.form.workerName = "";
      this.form.workerFirstLastName = "";
      this.form.workerSecondLastName = "";
      this.form.workerEmail = "";
      this.form.workerPassword = "";
      this.form.workerCellphone = null;
      this.form.workerSecurityNumber = null;
      this.form.workerSalary = null;
      this.form.workerRfc = "";
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/accounts/workers")
      .then((response) => {
        this.workers = response.data;
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
