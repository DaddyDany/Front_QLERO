<template>
  <div>
    <UserNavbar></UserNavbar>
    <div class="container" style="margin-top: 50px">
      <div v-if="serviceNotFound">
        <h1>No encontramos el servicio buscado.</h1>
      </div>
      <div v-else>
        <h1>Todos los paquetes de un servicio</h1>
        <TransitionGroup name="zoomDown" tag="div" class="row">
          <div
            class="col-3"
            v-for="aPackage in packages"
            :key="aPackage.packageId"
          >
            <div
              @click="navigateToUserPackageInfo(aPackage.packageId)"
              style="cursor: pointer"
            >
              <b-card
                :title="aPackage.packageName"
                style="max-width: 20rem"
                class="mb-2"
              >
                <b-card-text class="description">
                  {{ aPackage.packageDescription }}
                  <div>
                    <b-badge style="background-color: lightblue; color: black">
                      {{ aPackage.category.serviceName }}
                    </b-badge>
                  </div>
                </b-card-text>
              </b-card>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script>
import UserNavbar from "./UserNavbar.vue";
import axios from "axios";
export default {
  name: "UserServicePackages",
  components: {
    UserNavbar,
  },
  data() {
    return {
      packages: [],
      serviceId: null,
      serviceNotFound: false,
    };
  },
  methods: {
    obtenerPaquetes() {
      axios
        .get(`http://localhost:8080/api/services/${this.serviceId}/packages`)
        .then((response) => {
          if (response.status === 204) {
            this.serviceNotFound = true;
          } else {
            this.packages = response.data;
            this.serviceNotFound = false;
          }
        })
        .catch((e) => {
          console.error("Error en la petición: ", e);
          this.serviceNotFound = true;
        });
    },
    navigateToUserPackageInfo(packageId) {
      this.$router.push({
        name: "user-package",
        query: { packageId },
      });
    },
  },
  mounted() {
    this.serviceId = this.$route.query.serviceId;
    this.obtenerPaquetes();
  },
};
</script>
<style></style>
