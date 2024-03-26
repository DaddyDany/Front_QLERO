<template>
  <div>
    <AdminNavbar></AdminNavbar>
    <div class="container" style="margin-top: 50px">
      <h1>Paquetes del combo</h1>
      <br />
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
            </b-card>
          </div>
        </div>
      </TransitionGroup>
      <Fancybox
        :options="{
          Carousel: {
            infinite: false,
          },
        }"
      >
        <a data-fancybox="gallery" href="https://lipsum.app/id/60/1600x1200">
          <img
            src="https://lipsum.app/id/60/200x150"
            width="200"
            height="150"
          />
        </a>
        <a data-fancybox="gallery" href="https://lipsum.app/id/61/1600x1200">
          <img
            src="https://lipsum.app/id/61/200x150"
            width="200"
            height="150"
          />
        </a>
        <a data-fancybox="gallery" href="https://lipsum.app/id/62/1600x1200">
          <img
            src="https://lipsum.app/id/62/200x150"
            width="200"
            height="150"
          />
        </a>
        <a data-fancybox="gallery" href="https://lipsum.app/id/63/1600x1200">
          <img
            src="https://lipsum.app/id/63/200x150"
            width="200"
            height="150"
          />
        </a>
        <a data-fancybox="gallery" href="https://lipsum.app/id/64/1600x1200">
          <img
            src="https://lipsum.app/id/64/200x150"
            width="200"
            height="150"
          />
        </a>
      </Fancybox>
    </div>
  </div>
</template>

<script>
import Fancybox from "../PublicPages/Fancybox.vue";
import AdminNavbar from "./AdminNavbar.vue";
import axios from "axios";

export default {
  name: "ComboPackagesAdmin",
  components: {
    Fancybox,
    AdminNavbar,
  },
  data() {
    return {
      packages: [],
      services: [],
      comboId: null,
    };
  },
  methods: {},
  mounted() {
    this.comboId = this.$route.query.comboId;
    axios
      .get("http://localhost:8080/api/services")
      .then((response) => {
        this.services = response.data;
      })
      .catch((e) => {
        console.error("Error en la peticion: ", e);
      });
    axios
      .get(`http://localhost:8080/api/combos/${this.comboId}/packages`)
      .then((response) => {
        this.packages = response.data;
      })
      .catch((e) => {
        console.error("Error en la peticion: ", e);
      });
  },
};
</script>
<style></style>
