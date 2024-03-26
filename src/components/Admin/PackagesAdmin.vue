<template>
  <div>
    <AdminNavbar></AdminNavbar>
    <div class="container" style="margin-top: 50px">
      <h1>Paquetes Administrador</h1>
      <div class="form-container">
        <h4>Registro de paquetes</h4>
        <b-form @submit.prevent="onSubmit">
          <b-form-group
            id="input-group-1"
            label="Nombre del paquete:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="text"
              v-model="form.packageName"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Descripcion del paquete:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              type="text"
              v-model="form.packageDescription"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Precio del paquete:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              type="number"
              v-model="form.packagePrice"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Horas de duracion del paquete:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              type="number"
              v-model="form.designatedHours"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Numero de trabajadores a asignar al paquete:"
            label-for="input-5"
          >
            <b-form-input
              id="input-5"
              type="number"
              v-model="form.workersNumber"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-6"
            label="Servicio al que pertenece:"
            label-for="input-6"
          >
            <select id="service" v-model="form.category" name="service">
              <option
                v-for="service in services"
                :key="service.serviceId"
                :value="service.serviceId"
              >
                {{ service.serviceName }}
              </option>
            </select>
          </b-form-group>

          <b-form-group
            id="input-group-7"
            label="Cargar imágenes del paquete:"
            label-for="input-7"
          >
            <b-form-file
              id="input-7"
              v-model="form.images"
              :multiple="true"
              accept="image/*"
              @change="handleFiles"
              placeholder="Seleccione una o varias imágenes..."
            ></b-form-file>
          </b-form-group>

          <br />
          <b-button type="submit" variant="primary">Registrar Paquete</b-button>
          <b-button @click="onReset" variant="danger">Limpiar</b-button>
        </b-form>
      </div>
      <TransitionGroup name="zoomDown" tag="div" class="row">
        <div
          class="col-3"
          v-for="aPackage in packages"
          :key="aPackage.packageId"
        >
          <div>
            <b-card
              :title="aPackage.packageName"
              style="max-width: 20rem"
              class="mb-2"
            >
              <b-card-text class="description">
                {{ aPackage.packageDescription }}
                <div>
                  <b-badge style="background-color: lightblue; color: black">{{
                    aPackage.category.serviceName
                  }}</b-badge>
                </div>
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
  name: "PackagesAdmin",
  components: {
    AdminNavbar,
  },
  data() {
    return {
      packages: [],
      services: [],
      form: {
        packageName: "",
        packageDescription: "",
        packagePrice: null,
        designatedHours: null,
        workersNumber: null,
        category: null,
        images: [],
      },
    };
  },
  methods: {
    actualizarPaquetes() {
      axios
        .get("http://localhost:8080/api/packages")
        .then((response) => {
          this.packages = response.data;
        })
        .catch((e) => {
          console.error("Error en la peticion: ", e);
        });
    },
    onSubmit() {
      const apiUrl = "http://localhost:8080/api/packages";
      let formData = new FormData();
      Object.keys(this.form).forEach((key) => {
        if (key !== "images") {
          formData.append(key, this.form[key]);
        }
      });
      if (this.form.images.length) {
        for (let i = 0; i < this.form.images.length; i++) {
          formData.append("images[]", this.form.images[i]);
        }
      }
      axios
        .post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.clearFields();
          this.$swal({
            title: "Accion realizada con exito",
            text: "El paquete ha sido añadido a la lista",
            icon: "success",
          });
          this.actualizarPaquetes();
        })
        .catch((error) => {
          console.error("Error en el registro del paquete: ", error);
        });
    },
    handleFiles(event) {
      this.form.images = Array.from(event.target.files);
    },
    onReset() {
      this.clearFields();
    },
    clearFields() {
      this.form.packageName = "";
      this.form.packageDescription = "";
      this.form.packagePrice = null;
      this.form.designatedHours = null;
      this.form.workersNumber = null;
      this.form.category = null;
      this.form.images = [];
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/services")
      .then((response) => {
        this.services = response.data;
      })
      .catch((e) => {
        console.error("Error en la peticion: ", e);
      });
    axios
      .get("http://localhost:8080/api/packages")
      .then((response) => {
        this.packages = response.data;
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
