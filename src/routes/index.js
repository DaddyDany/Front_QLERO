import Vue from "vue";
import VueRouter from "vue-router";
import { jwtDecode } from "jwt-decode";

Vue.use(VueRouter);

import Login from "../components/PublicPages/Login.vue";
import Admin from "../components/Admin/Admin.vue";
import Worker from "../components/Workers/Worker.vue";
import User from "../components/Users/User.vue";
import Unauthorized from "../components/PublicPages/Unauthorized.vue";
import NotFound from "../components/PublicPages/NotFound.vue";
import Public from "../components/PublicPages/Public.vue";
import Registration from "../components/PublicPages/Registration.vue";
import ServicesAdmin from "../components/Admin/ServicesAdmin.vue";
import PackagesAdmin from "../components/Admin/PackagesAdmin.vue";
import ServicePackagesAdmin from "../components/Admin/ServicePackagesAdmin.vue";
import CombosAdmin from "../components/Admin/CombosAdmin.vue";
import ComboPackagesAdmin from "../components/Admin/ComboPackagesAdmin.vue";
import AdminAdministrators from "../components/Admin/AdminAdministrators.vue";
import AdminWorkers from "../components/Admin/AdminWorkers.vue";
import AdminProfile from "../components/Admin/AdminProfile.vue";
import UserAllPackages from "../components/Users/UserAllPackages.vue";
import UserCombos from "../components/Users/UserCombos.vue";
import UserOrders from "../components/Users/UserOrders.vue";
import UserPackage from "../components/Users/UserPackage.vue";
import UserServices from "../components/Users/UserServices.vue";
import UserProfile from "../components/Users/UserProfile.vue";
import UserServicePackages from "../components/Users/UserServicePackages.vue";
import OrdersAdmin from "../components/Admin/OrdersAdmin.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: Public,
  },
  {
    name: "signup",
    path: "/signup",
    component: Registration,
  },
  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    name: "admin",
    path: "/admin",
    component: Admin,
    meta: { role: "ADMIN" },
  },
  {
    name: "services-admin",
    path: "/services-admin",
    component: ServicesAdmin,
    meta: { role: "ADMIN" },
  },
  {
    name: "packages-admin",
    path: "/packages-admin",
    component: PackagesAdmin,
    meta: { role: "ADMIN" },
  },
  {
    name: "combos-admin",
    path: "/combos-admin",
    component: CombosAdmin,
    meta: { role: "ADMIN" },
  },
  {
    name: "combo-packages-admin",
    path: "/combo-packages-admin",
    component: ComboPackagesAdmin,
    meta: { role: "ADMIN" },
  },
  {
    name: "service-packages-admin",
    path: "/service-packages-admin",
    component: ServicePackagesAdmin,
    meta: { role: "ADMIN" },
  },
  {
    name: "admin-administrators",
    path: "/admin-administrators",
    component: AdminAdministrators,
    meta: { role: "ADMIN" },
  },
  {
    name: "admin-workers",
    path: "/admin-workers",
    component: AdminWorkers,
    meta: { role: "ADMIN" },
  },
  {
    name: "orders-admin",
    path: "/orders-admin",
    component: OrdersAdmin,
    meta: { role: "ADMIN" },
  },
  {
    name: "admin-profile",
    path: "/admin-profile",
    component: AdminProfile,
    meta: { role: "ADMIN" },
  },
  {
    name: "worker",
    path: "/worker",
    component: Worker,
    meta: { role: "WORKER" },
  },
  {
    name: "user",
    path: "/user",
    component: User,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "user-services",
    path: "/user-services",
    component: UserServices,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "user-all-packages",
    path: "/user-all-packages",
    component: UserAllPackages,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "user-service-packages",
    path: "/user-service-packages",
    component: UserServicePackages,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "user-combos",
    path: "/user-combos",
    component: UserCombos,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "user-package",
    path: "/user-package",
    component: UserPackage,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "user-orders",
    path: "/user-orders",
    component: UserOrders,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "user-profile",
    path: "/user-profile",
    component: UserProfile,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "unauthorized",
    path: "/unauthorized",
    component: Unauthorized,
  },
  {
    name: "NotFound",
    path: "/:catchAll",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/", "/signup", "/unauthorized"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("token");

  if (to.path === "/login" && loggedIn) {
    const decoded = jwtDecode(loggedIn);
    const rol = decoded.roles[0].authority;
    if (rol === "ADMIN") {
      return next("/admin");
    } else if (rol === "COMMON_USER") {
      return next("/user");
    } else {
      return next("/worker");
    }
  }

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  if (loggedIn) {
    try {
      const decoded = jwtDecode(loggedIn);
      const roles = decoded.roles.map((r) => r.authority);
      if (to.meta.role && !roles.includes(to.meta.role)) {
        return next("/unauthorized");
      }
    } catch (error) {
      console.error("Error decodificando el token: ", error);
      localStorage.removeItem("token");
      return next("/login");
    }
  }
  next();
});

export default router;
