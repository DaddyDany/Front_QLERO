<template>
  <div>
    <AdminNavbar></AdminNavbar>
    <div class="container" style="margin-top: 50px">
      <h1>Paquetes Administrador</h1>
      <TransitionGroup name="zoomDown" tag="div" class="row">
        <div class="col-3" v-for="order in orders" :key="order.orderId">
          <div>
            <b-card
              :title="order.orderType"
              style="max-width: 20rem"
              class="mb-2"
            >
              <b-card-text class="description">
                {{ order.orderDate }}
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
                    >Declinar</b-button
                  >
                  <b-button variant="warning" style="width: 45%; padding: 8px"
                    >Aceptar</b-button
                  >
                  <b-button variant="success" style="width: 45%; padding: 8px"
                    >Ver más detalles</b-button
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
  name: "OrdersAdmin",
  components: {
    AdminNavbar,
  },
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    fetchOrders() {
      axios
        .get("http://localhost:8080/api/orders")
        .then((response) => {
          this.orders = response.data;
        })
        .catch((e) => {
          console.error("Error en la peticion: ", e);
        });
    },
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

<style></style>
