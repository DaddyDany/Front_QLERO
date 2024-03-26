<template>
  <div>
    <UserNavbar></UserNavbar>
    <div class="container" style="margin-top: 50px">
      <h1>Detalles del paquete</h1>
      <p>Nombre del paquete: {{ aPackage.packageName }}</p>
      <p>Descripcion del paquete: {{ aPackage.packageDescription }}</p>
      <p>Horas designadas del paquete: {{ aPackage.designatedHours }}</p>
      <p>Trabajadores designados al paquete: {{ aPackage.workersNumber }}</p>
      <p>Servicio al que pertenece: {{ serviceName }}</p>
      <p>Estado del paquete: {{ aPackage.packageState }}</p>
      <p>Precio del paquete: {{ aPackage.packagePrice }}</p>
      <Fancybox
        :options="{
          Carousel: {
            infinite: false,
          },
        }"
        style="display: flex"
      >
        <div
          v-for="(imageUrl, index) in images"
          :key="index"
          class="image-container"
        >
          <a data-fancybox="gallery" :href="imageUrl">
            <img :src="imageUrl" width="200" height="150" />
          </a>
        </div>
      </Fancybox>
      <button>Hacer pedido</button>
    </div>
  </div>
</template>

<script>
import UserNavbar from "./UserNavbar.vue";
import axios from "axios";
import Fancybox from "../PublicPages/Fancybox.vue";

export default {
  name: "UserPackage",
  components: {
    UserNavbar,
    Fancybox,
  },
  data() {
    return {
      packageId: null,
      aPackage: {},
      serviceName: "",
      images: [],
    };
  },
  methods: {
    fetchPackageInfo() {
      axios
        .get(
          `http://localhost:8080/api/packages/package-info-users/${this.packageId}`
        )
        .then((response) => {
          this.aPackage = response.data;
          this.serviceName = response.data.category.serviceName;
          this.images = [];
          if (response.data.images && response.data.images.length > 0) {
            this.images = response.data.images.map((image) => image.imageUrl);
          }
        })
        .catch((e) => {
          console.error("Error en la peticion: ", e);
        });
    },
  },
  mounted() {
    this.packageId = this.$route.query.packageId;
    this.fetchPackageInfo();
  },
};
</script>
<style></style>
