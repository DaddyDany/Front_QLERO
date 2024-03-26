<template>
  <div>
    <AdminNavbar></AdminNavbar>
    <div class="container" style="margin-top: 50px">
      <div class="form-container">
        <h1>Panel de combos</h1>
        <b-form @submit.prevent="onSubmit">
          <b-form-group
            id="input-group-1"
            label="Nombre del combo:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="text"
              v-model="form.comboName"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Descripcion del combo:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              type="text"
              v-model="form.comboDescription"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Imagen del combo:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              type="text"
              v-model="form.comboImgUrl"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Costo del combo:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              type="number"
              v-model="form.comboPrice"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-8"
            label="Horas de duracion del combo:"
            label-for="input-8"
          >
            <b-form-input
              id="input-8"
              type="number"
              v-model="form.comboDesignatedHours"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Numero de trabajadores a asignar al combo:"
            label-for="input-5"
          >
            <b-form-input
              id="input-5"
              type="number"
              v-model="form.comboWorkersNumber"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-6"
            label="Paquetes a asignar al combo:"
            label-for="input-6"
          >
            <b-form-select
              id="input-6"
              v-model="form.packageIds"
              :options="packageOptions"
              multiple
              :select-size="5"
            ></b-form-select>
          </b-form-group>
          <br />
          <b-button type="submit" variant="primary">Registrar Combo</b-button>
          <b-button @click="onReset" variant="danger">Limpiar</b-button>
        </b-form>
      </div>
      <TransitionGroup name="zoomDown" tag="div" class="row">
        <div class="col-3" v-for="combo in combos" :key="combo.comboId">
          <div>
            <b-card
              :title="combo.comboName"
              style="max-width: 20rem"
              class="mb-2"
            >
              <h6
                @click="navigateToComboPackagesAdmin(combo.comboId)"
                style="cursor: pointer; color: blue; text-decoration: underline"
              >
                Más información
              </h6>
              <b-card-text class="description">
                {{ combo.comboDescription }}
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
  name: "CombosAdmin",
  components: {
    AdminNavbar,
  },
  data() {
    return {
      combos: [],
      packages: [],
      packageOptions: [],
      form: {
        comboName: "",
        comboDescription: "",
        comboImgUrl: "",
        comboPrice: null,
        comboDesignatedHours: null,
        comboWorkersNumber: null,
        packageIds: [],
      },
    };
  },
  methods: {
    actualizarCombos() {
      axios
        .get("http://localhost:8080/api/combos")
        .then((response) => {
          this.combos = response.data;
        })
        .catch((e) => {
          console.error("Error en la peticion: ", e);
        });
    },
    onSubmit() {
      const apiUrl = "http://localhost:8080/api/combos";
      axios
        .post(apiUrl, this.form)
        .then((response) => {
          this.clearFields();
          this.$swal({
            title: "Accion realizada con exito",
            text: "El combo ha sido añadido",
            icon: "success",
          });
          this.actualizarCombos();
        })
        .catch((error) => {
          console.error("Error en el registro del combo: ", error);
        });
    },
    onReset() {
      this.clearFields();
    },
    clearFields() {
      this.form.comboName = "";
      this.form.comboDescription = "";
      this.form.comboImgUrl = "";
      this.form.comboDesignatedHours = null;
      this.form.comboPrice = null;
      this.form.comboWorkersNumber = null;
      this.form.packageIds = [];
    },
    navigateToComboPackagesAdmin(comboId) {
      this.$router.push({
        name: "combo-packages-admin",
        query: { comboId },
      });
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/combos")
      .then((response) => {
        this.combos = response.data;
      })
      .catch((e) => {
        console.error("Error en la peticion: ", e);
      });
    axios
      .get("http://localhost:8080/api/packages")
      .then((response) => {
        this.packages = response.data;
        this.packageOptions = this.packages.map((pkg) => ({
          value: pkg.packageId,
          text: pkg.packageName,
        }));
      })
      .catch((e) => {
        console.error("Error en la petición: ", e);
      });
  },
};
</script>

<style></style>
