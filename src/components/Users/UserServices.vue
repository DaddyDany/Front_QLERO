<template>
  <div>
    <UserNavbar></UserNavbar>
    <div class="container" style="margin-top: 50px">
      <h1>Servicios</h1>
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
                @click="navigateToServicePackagesUser(service.serviceId)"
                style="cursor: pointer; color: blue; text-decoration: underline"
              >
                Ver paquetes
              </h6>
              <b-card-text class="description">
                {{ service.serviceDescription }}
              </b-card-text>
            </b-card>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import UserNavbar from "./UserNavbar.vue";
import axios from "axios";

export default {
  name: "UserServices",
  components: {
    UserNavbar,
  },
  data() {
    return {
      services: [],
    };
  },
  methods: {
    obtenerServicios() {
      axios
        .get("http://localhost:8080/api/services")
        .then((response) => {
          this.services = response.data;
        })
        .catch((e) => {
          console.error("Error en la peticion: ", e);
        });
    },
    navigateToServicePackagesUser(serviceId) {
      this.$router.push({
        name: "user-service-packages",
        query: { serviceId },
      });
    },
  },
  mounted() {
    this.obtenerServicios();
  },
};
</script>

<style></style>
