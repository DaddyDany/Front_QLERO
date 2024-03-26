<template>
  <div>
    <AdminNavbar></AdminNavbar>
    <div class="container" style="margin-top: 50px">
      <h1>Perfil del Adminstrador con id: {{ userProfileInfo.adminId }}</h1>
      <p>Nombre: {{ userProfileInfo.adminName }}</p>
      <p>Apellido Paterno: {{ userProfileInfo.adminFirstLastName }}</p>
      <p>Apellido Materno: {{ userProfileInfo.adminSecondLastName }}</p>
      <p>
        Correo electronico del administrador: {{ userProfileInfo.adminEmail }}
      </p>
      <p>Celular: {{ userProfileInfo.adminCellphone }}</p>
      <p>
        Numero de seguridad Social: {{ userProfileInfo.adminSecurityNumber }}
      </p>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./AdminNavbar.vue";
import axios from "axios";

export default {
  name: "AdminProfile",
  components: {
    AdminNavbar,
  },
  data() {
    return {
      userProfileInfo: {},
    };
  },
  methods: {
    fetchUserProfileInfo() {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get("http://localhost:8080/api/accounts/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.userProfileInfo = response.data;
            console.log(response.data);
          })
          .catch((error) => {
            console.error(
              "Hubo un error al obtener la informacion del usuario",
              error
            );
          });
      }
    },
  },
  mounted() {
    this.fetchUserProfileInfo();
  },
};
</script>

<style></style>
