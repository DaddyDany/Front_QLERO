<template>
  <div>
    <AdminNavbar></AdminNavbar>
    <div class="container" style="margin-top: 50px">
      <h1>Servicios Administrador</h1>
      <div class="form-container">
        <h4>Registro de servicio</h4>
        <b-form @submit.prevent="onSubmit">
          <b-form-group
            id="input-group-1"
            label="Nombre del servicio:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="text"
              v-model="form.serviceName"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Descripcion del servicio:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              type="text"
              v-model="form.serviceDescription"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Frase del servicio:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              type="text"
              v-model="form.serviceQuote"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Imagen del servicio:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              type="text"
              v-model="form.serviceImageUrl"
              required
            ></b-form-input>
          </b-form-group>

          <br />
          <b-button type="submit" variant="primary"
            >Registrar Servicio</b-button
          >
          <b-button @click="onReset" variant="danger">Limpiar</b-button>
        </b-form>
      </div>
      <TransitionGroup name="zoomDown" tag="div" class="row">
        <div class="col-3" v-for="service in services" :key="service.serviceId">
          <div>
            <b-card
              :title="service.serviceName"
              :img-src="service.serviceImageUrl"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem"
              class="mb-2"
            >
              <h6
                @click="navigateToServicePackagesAdmin(service.serviceId)"
                style="cursor: pointer; color: blue; text-decoration: underline"
              >
                Ver paquetes
              </h6>
              <b-card-text class="description">
                {{ service.serviceDescription }}
              </b-card-text>
              <div style="width: 100%; display: flex">
                <div
                  style="
                    display: flex;
                    width: 100%;
                    justify-content: space-around;
                  "
                >
                  <b-button variant="danger" style="width: 45%; padding: 8px"
                    >Eliminar</b-button
                  >
                  <b-button variant="warning" style="width: 45%; padding: 8px"
                    >Editar</b-button
                  >
                </div>
              </div>
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
  name: "ServicesAdmin",
  components: {
    AdminNavbar,
  },
  data() {
    return {
      services: [],
      form: {
        serviceName: "",
        serviceDescription: "",
        serviceQuote: "",
        serviceImageUrl: "",
      },
    };
  },
  methods: {
    actualizarServicios() {
      axios
        .get("http://localhost:8080/api/services")
        .then((response) => {
          this.services = response.data;
          console.log(this.services);
        })
        .catch((e) => {
          console.error("Error en la peticion: ", e);
        });
    },
    navigateToServicePackagesAdmin(serviceId) {
      this.$router.push({
        name: "service-packages-admin",
        query: { serviceId },
      });
    },
    onSubmit() {
      const apiUrl = "http://localhost:8080/api/services";
      axios
        .post("http://localhost:8080/api/services", this.form)
        .then((response) => {
          this.clearFields();
          this.$swal({
            title: "Accion realizada con exito",
            text: "El servicio ha sido creado",
            icon: "success",
          });
          this.actualizarServicios();
        })
        .catch((error) => {
          console.error("Error en el registro de servicio: ", error);
        });
    },
    onReset() {
      this.clearFields();
    },
    clearFields() {
      this.form.serviceName = "";
      this.form.serviceDescription = "";
      this.form.serviceQuote = "";
      this.form.serviceImageUrl = "";
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/services")
      .then((response) => {
        this.services = response.data;
        console.log(response);
      })
      .catch((e) => {
        console.error("Error en la peticion: ", e);
      });
  },
};
</script>

<style>
.form-container {
  margin-top: 30px;
  width: 30%;
  margin-bottom: 30px;
}
</style>
