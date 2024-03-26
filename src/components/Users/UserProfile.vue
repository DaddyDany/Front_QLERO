<template>
  <div>
    <UserNavbar></UserNavbar>
    <div class="container" style="margin-top: 50px">
      <h1>Perfil del usuario con id: {{ userProfileInfo.commonUserId }}</h1>
      <p>Nombre: {{ userProfileInfo.userName }}</p>
      <p>Apellido Paterno: {{ userProfileInfo.userFirstLastName }}</p>
      <p>Apellido Materno: {{ userProfileInfo.userSecondLastName }}</p>
      <p>
        Correo electronico del administrador: {{ userProfileInfo.userEmail }}
      </p>
      <p>Celular: {{ userProfileInfo.userCellphone }}</p>
    </div>
  </div>
</template>

<script>
import UserNavbar from "./UserNavbar.vue";
import axios from "axios";

export default {
  name: "UserProfile",
  components: {
    UserNavbar,
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
